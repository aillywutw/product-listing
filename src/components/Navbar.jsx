import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ onCartOpen }) {
  const { count } = useCart();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      background: "rgba(15,15,15,0.95)", backdropFilter: "blur(10px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 40px", zIndex: 100, borderBottom: "1px solid #222",
    }}>
      <Link to="/" style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem", textDecoration: "none" }}>
        🛍️ Shop
      </Link>
      <button onClick={onCartOpen} style={{
        background: "#e91e8c", color: "white", border: "none",
        borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "0.95rem",
      }}>
        🛒 Cart {count > 0 && `(${count})`}
      </button>
    </nav>
  );
}