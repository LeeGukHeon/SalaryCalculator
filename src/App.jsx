// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 🆕 헤더/네비게이션 추가 */}
        <header
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px 0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.4rem",
                fontWeight: "bold",
              }}
            >
              💰 실수령액 계산기
            </Link>
            <nav
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                계산기
              </Link>
              <Link
                to="/guide"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                📖 사용가이드
              </Link>
              <Link
                to="/privacy"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                개인정보
              </Link>
              <Link
                to="/terms"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                이용약관
              </Link>
              <Link
                to="/contact"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                문의
              </Link>
            </nav>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* 푸터 */}
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
