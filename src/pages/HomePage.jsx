import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["all", "smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then(res => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [category, sort, search, products]);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#0f0f0f" }}>
      {/* Filters */}
      <div style={{ padding: "32px 40px 0", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
        <input
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #444", background: "#1a1a1a", color: "white", fontSize: "0.95rem", minWidth: "240px" }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #444", background: "#1a1a1a", color: "white", fontSize: "0.95rem", cursor: "pointer" }}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #444", background: "#1a1a1a", color: "white", fontSize: "0.95rem", cursor: "pointer" }}>
          <option value="default">Default Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{filtered.length} products</p>
      </div>

      {/* Products */}
      <div style={{ padding: "32px 40px", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
        {loading ? (
          <p style={{ color: "#aaa" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#aaa" }}>No products found</p>
        ) : (
          filtered.map(product => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
}