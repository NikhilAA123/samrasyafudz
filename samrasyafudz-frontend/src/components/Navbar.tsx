import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LoginModal from "./LoginModal";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, refreshCart } = useCart();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    refreshCart();
  }, [user, refreshCart]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          Samrasya FUDZ
        </Link>

        <nav className="navbar-links">
          <Link to="/cart" className="navbar-cart-link">
            Cart
            {itemCount > 0 && <span className="navbar-cart-badge">{itemCount}</span>}
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="navbar-link">Orders</Link>
              <Link to="/account" className="navbar-link">
                Hi, {user.fullName ? user.fullName.split(" ")[0] : user.phone}
              </Link>
              <button className="btn-secondary" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <button className="navbar-link navbar-link-btn" onClick={() => setLoginOpen(true)}>
                Log in
              </button>
              <Link to="/register" className="btn-primary navbar-cta">Create account</Link>
            </>
          )}
        </nav>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}