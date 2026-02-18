import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import SalaryInfo from "./pages/SalaryInfo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import InsuranceRateChangesArticle from "./pages/articles/InsuranceRateChangesArticle";
import YearEndTaxGuideArticle from "./pages/articles/YearEndTaxGuideArticle";
import TakeHomePayTipsArticle from "./pages/articles/TakeHomePayTipsArticle";
import "./styles/main.css";

const primaryLinks = [
  { to: "/", label: "계산기" },
  { to: "/info", label: "2026년 정보" },
  { to: "/guide", label: "사용가이드" },
];

const legalLinks = [
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "이용약관" },
  { to: "/contact", label: "문의하기" },
];

function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="site-header">
          <div className="site-header__inner">
            <NavLink to="/" className="site-logo">
              💰 실수령액 계산기
            </NavLink>

            <nav className="site-nav" aria-label="주요 메뉴">
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? "is-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <a
                href="https://www.loancalc2026.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__external"
              >
                🏠 대출이자 계산기
              </a>
            </nav>
          </div>
        </header>

        <main id="main-content" className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<SalaryInfo />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/articles/2026-insurance-rate-changes"
              element={<InsuranceRateChangesArticle />}
            />
            <Route
              path="/articles/2026-year-end-tax-guide"
              element={<YearEndTaxGuideArticle />}
            />
            <Route
              path="/articles/5-ways-to-increase-take-home-pay"
              element={<TakeHomePayTipsArticle />}
            />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="site-footer__inner">
            <p className="site-footer__copyright">
              © 2026 실수령액 계산기. 데이터 기반 급여 정보 콘텐츠를 지속적으로
              업데이트합니다.
            </p>
            <nav className="site-footer__links" aria-label="푸터 메뉴">
              {legalLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className="site-footer__link">
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
