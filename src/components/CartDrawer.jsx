import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "360px",
              background: "#1a1a1a", zIndex: 201, padding: "32px 24px",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ color: "white" }}>🛒 Cart</h2>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: "#aaa", textAlign: "center", marginTop: "40px" }}>Your cart is empty</p>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: "12px", alignItems: "center", background: "#2a2a2a", borderRadius: "8px", padding: "12px" }}>
                      <img src={item.thumbnail} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "contain", background: "white", borderRadius: "4px", padding: "4px" }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "white", fontSize: "0.8rem", marginBottom: "4px",
                          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {item.title}
                        </p>
                        <p style={{ color: "#e91e8c", fontSize: "0.9rem" }}>${item.price.toFixed(2)}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtn}>-</button>
                          <span style={{ color: "white", fontSize: "0.9rem" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtn}>+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "1.2rem" }}>🗑️</button>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #333", paddingTop: "16px", marginTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ color: "#aaa" }}>Total</span>
                    <span style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>${total.toFixed(2)}</span>
                  </div>
                  <button style={{ width: "100%", padding: "14px", background: "#e91e8c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const qtyBtn = { background: "#444", border: "none", color: "white", width: "24px", height: "24px", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" };