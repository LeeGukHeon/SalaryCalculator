// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* 푸터 추가 */}
        <footer
          style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "#f9fafb",
            marginTop: "60px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p
              style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}
            >
              © 2026 실수령액 계산기. All rights reserved.
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/privacy"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                개인정보처리방침
              </Link>
              <Link
                to="/terms"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                이용약관
              </Link>
              <Link
                to="/contact"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                문의하기
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
