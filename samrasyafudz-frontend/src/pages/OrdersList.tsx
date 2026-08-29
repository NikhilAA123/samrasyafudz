import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../api/orders";
import type { Order } from "../api/types";
import "./OrdersList.css";

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then(setOrders).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container"><p className="home-status">Loading orders…</p></div>;

  if (orders.length === 0) {
    return (
      <div className="container orders-list-page">
        <h1>My Orders</h1>
        <p className="home-status">You haven't placed any orders yet.</p>
        <Link to="/" className="btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container orders-list-page">
      <h1>My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <Link key={order.id} to={`/orders/${order.id}`} className="order-list-item">
            <div>
              <strong>Order #{order.id}</strong>
              <p className="orders-list-date">
                {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="orders-list-right">
              <span className={`order-status-badge order-status-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
              <span className="orders-list-total">₹{order.totalAmount.toFixed(0)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}