import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../api/orders";
import type { Order } from "../api/types";
import "./OrderDetails.css";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Order placed",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    if (!id) return;
    setLoading(true);
    fetchOrder(Number(id))
      .then(setOrder)
      .catch(() => setError("Order not found."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [id]);

  async function handleCancel() {
    if (!order) return;
    setCancelling(true);
    setError(null);
    try {
      const updated = await cancelOrder(order.id);
      setOrder(updated);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not cancel this order.");
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <div className="container"><p className="home-status">Loading order…</p></div>;

  if (error || !order) {
    return (
      <div className="container order-detail-page">
        <p className="error-text">{error ?? "Order not found."}</p>
        <Link to="/orders" className="btn-secondary">Back to orders</Link>
      </div>
    );
  }

  const canCancel = order.status === "PENDING" || order.status === "CONFIRMED";

  return (
    <div className="container order-detail-page">
      <Link to="/orders" className="product-detail-back">← Back to orders</Link>

      <h1>Order #{order.id}</h1>
      <span className={`order-status-badge order-status-${order.status.toLowerCase()}`}>
        {STATUS_LABELS[order.status] ?? order.status}
      </span>

      <div className="order-detail-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-detail-row">
            <span>{item.productName} ({item.weightGrams}g) × {item.quantity}</span>
            <span>₹{item.subtotal.toFixed(0)}</span>
          </div>
        ))}
      </div>

      <div className="order-detail-total">
        <span>Total</span>
        <span>₹{order.totalAmount.toFixed(0)}</span>
      </div>

      <p className="order-detail-date">
        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      {error && <p className="error-text">{error}</p>}

      {canCancel && (
        <button className="btn-secondary" onClick={handleCancel} disabled={cancelling}>
          {cancelling ? "Cancelling…" : "Cancel order"}
        </button>
      )}
    </div>
  );
}