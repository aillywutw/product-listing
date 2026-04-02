import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "#1a1a1a", borderRadius: "12px", overflow: "hidden",
        width: "220px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column",
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <div style={{ background: "white", padding: "20px", display: "flex", justifyContent: "center" }}>
          <img src={product.thumbnail} alt={product.title} style={{ height: "160px", objectFit: "contain" }} />
        </div>
        <div style={{ padding: "16px" }}>
          <p style={{ color: "white", fontSize: "0.85rem", marginBottom: "8px", lineHeight: 1.4,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.title}
          </p>
          <p style={{ color: "#e91e8c", fontWeight: "bold", fontSize: "1.1rem" }}>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div style={{ padding: "0 16px 16px" }}>
        <button
          onClick={() => addToCart(product)}
          style={{
            width: "100%", padding: "10px", background: "#e91e8c",
            color: "white", border: "none", borderRadius: "8px",
            cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}