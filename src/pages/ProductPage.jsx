import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#aaa" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", paddingTop: "80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "1px solid #444", color: "#aaa", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", marginBottom: "32px" }}>
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}
        >
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "280px" }}>
            <img src={product.thumbnail} alt={product.title} style={{ height: "280px", objectFit: "contain" }} />
          </div>

          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ color: "#e91e8c", fontSize: "0.85rem", letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>
              {product.category}
            </p>
            <h1 style={{ color: "white", fontSize: "1.6rem", lineHeight: 1.4, marginBottom: "16px" }}>{product.title}</h1>
            <p style={{ color: "#e91e8c", fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}>${product.price.toFixed(2)}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <span style={{ color: "#f5c518", fontSize: "1.1rem" }}>{"★".repeat(Math.round(product.rating?.rate || 0))}</span>
              <span style={{ color: "#aaa", fontSize: "0.9rem" }}>({product.rating?.count} reviews)</span>
            </div>
            <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "32px" }}>{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              style={{ padding: "14px 40px", background: "#e91e8c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}