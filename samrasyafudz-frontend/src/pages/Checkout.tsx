import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAddresses } from "../api/addresses";
import { checkout } from "../api/orders";
import { useCart } from "../context/CartContext";
import "./Checkout.css";
import { Address } from "../api/types";

export default function CheckoutPage() {
  const { cart, refreshCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses()
      .then((addrs) => {
        setAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.isDefault) ?? addrs[0];
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handlePlaceOrder() {
    if (!selectedAddressId) {
      setError("Please select a delivery address.");
      return;
    }
    setError(null);
    setPlacingOrder(true);
    try {
      const order = await checkout(selectedAddressId);
      await refreshCart();
      navigate(`/orders/${order.id}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  if (loading) return <div className="container"><p className="home-status">Loading…</p></div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container checkout-page">
        <p className="home-status">Your cart is empty.</p>
        <Link to="/" className="btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>

      <section className="checkout-section">
        <h2>Delivery address</h2>

        {addresses.length === 0 ? (
          <div>
            <p className="home-status">You don't have any saved addresses yet.</p>
            <Link to="/account" className="btn-secondary">Add an address</Link>
          </div>
        ) : (
          <div className="checkout-address-list">
            {addresses.map((addr) => (
              <label key={addr.id} className="checkout-address-option">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                />
                <div>
                  {addr.label && <strong>{addr.label}</strong>}
                  <p>{addr.addressLine1}, {addr.area}, {addr.city}, {addr.state} — {addr.pincode}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      <section className="checkout-section">
        <h2>Order summary</h2>
        <div className="checkout-summary-items">
          {cart.items.map((item) => (
            <div key={item.id} className="checkout-summary-row">
              <span>{item.productName} ({item.weightGrams}g) × {item.quantity}</span>
              <span>₹{item.subtotal.toFixed(0)}</span>
            </div>
          ))}
        </div>
        <div className="checkout-summary-total">
          <span>Total</span>
          <span>₹{cart.total.toFixed(0)}</span>
        </div>
      </section>

      {error && <p className="error-text">{error}</p>}

      <button
        className="btn-primary checkout-place-order-btn"
        onClick={handlePlaceOrder}
        disabled={placingOrder || addresses.length === 0}
      >
        {placingOrder ? "Placing order…" : "Place order"}
      </button>
    </div>
  );
}