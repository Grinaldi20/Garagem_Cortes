import { useState, useEffect, useRef } from "react";
import "./Garagem.css";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cortes", href: "#cortes" },
  { label: "Preços", href: "#precos" },
  { label: "Contato", href: "#contato" },
];

const CUTS = [
  {
    id: 1,
    name: "Degradê Clássico",
    desc: "Transição perfeita com acabamento preciso",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
  },
  {
    id: 2,
    name: "Undercut Moderno",
    desc: "Contraste marcante, estilo urbano",
    img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
  },
  {
    id: 3,
    name: "Pompadour",
    desc: "Clássico reinventado com toque atual",
    img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  },
  {
    id: 4,
    name: "Corte + Barba",
    desc: "Visual completo do jeito que você merece",
    img: "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&q=80",
  },
  {
    id: 5,
    name: "Buzz Cut",
    desc: "Simplicidade com máximo impacto",
    img: "https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=600&q=80",
  },
  {
    id: 6,
    name: "Barba Desenhada",
    desc: "Linhas impecáveis, personalidade real",
    img: "https://images.unsplash.com/photo-1570515993702-c01382063c59?w=600&q=80",
  },
];

const PRICES = [
  { service: "Corte", price: "R$ 40" },
  { service: "Corte + Sobrancelha", price: "R$ 50" },
  { service: "Corte + Barba", price: "R$ 65" },
  { service: "Barba", price: "R$ 35" },
  { service: "Combo Completo", price: "R$ 80", highlight: true },
];

const WHATSAPP = "5514999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de agendar um horário na Garagem Cortes.");

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* ── NAVBAR ── */}
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <a className="navbar__logo" href="#inicio" onClick={() => handleNav("#inicio")}>
            <span className="logo-icon">✂</span>
            <span>Garagem<strong>Cortes</strong></span>
          </a>

          <nav className={`navbar__menu${menuOpen ? " navbar__menu--open" : ""}`}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`navbar__link${activeSection === l.href.replace("#", "") ? " navbar__link--active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--sm btn--red"
            >
              Agendar
            </a>
          </nav>

          <button
            className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="inicio" className="hero" ref={heroRef}>
        <div className="hero__overlay" />
        <img
          className="hero__bg"
          src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1800&q=80"
          alt="Barbearia moderna"
          loading="eager"
        />
        <div className="hero__content">
          <p className="hero__eyebrow">— Barbearia Premium</p>
          <h1 className="hero__title">
            Garagem<br /><span>Cortes</span>
          </h1>
          <p className="hero__sub">
            Onde estilo encontra precisão.<br />Cada corte conta uma história.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--red btn--lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.571A.75.75 0 00.75 24.5l6.918-1.814A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.856 0-3.607-.502-5.112-1.38l-.367-.217-3.803.997.999-3.74-.24-.386A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Agendar pelo WhatsApp
          </a>
        </div>
        <div className="hero__scroll-hint">
          <span>Role para baixo</span>
          <div className="hero__scroll-arrow" />
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="sobre section">
        <div className="container sobre__inner">
          <div className="sobre__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
              alt="Interior da barbearia"
              className="sobre__img"
              loading="lazy"
            />
            <div className="sobre__img-badge">
              <strong>+10</strong>
              <span>Anos de<br />Experiência</span>
            </div>
          </div>

          <div className="sobre__text">
            <p className="section__eyebrow">Nossa história</p>
            <h2 className="section__title">Tradição que<br /><span>Evolui com Você</span></h2>
            <p className="sobre__desc">
              A <strong>Garagem Cortes</strong> nasceu da paixão pelo cuidado masculino de verdade. Aqui, cada cliente é tratado como VIP — sem pressa, sem atendimento em série.
            </p>
            <p className="sobre__desc">
              Nossos barbeiros são altamente treinados, dominando desde os clássicos atemporais até as tendências mais atuais. Usamos produtos premium para garantir um resultado impecável e duradouro.
            </p>
            <p className="sobre__desc">
              Um ambiente que mistura o clima autêntico das barbearias tradicionais com o conforto e o estilo contemporâneo que você merece.
            </p>
            <div className="sobre__features">
              {["Barbeiros Certificados", "Produtos Premium", "Ambiente Exclusivo", "Agendamento Fácil"].map((f) => (
                <span key={f} className="sobre__feature">
                  <span className="feature-dot" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORTES ── */}
      <section id="cortes" className="cortes section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow section__eyebrow--light">Nosso trabalho</p>
            <h2 className="section__title section__title--light">
              Galeria de <span>Cortes</span>
            </h2>
            <p className="section__sub">Estilo que fala por si mesmo</p>
          </div>

          <div className="gallery">
            {CUTS.map((cut) => (
              <div key={cut.id} className="gallery__card">
                <div className="gallery__img-wrap">
                  <img src={cut.img} alt={cut.name} loading="lazy" />
                  <div className="gallery__overlay">
                    <div className="gallery__info">
                      <h3>{cut.name}</h3>
                      <p>{cut.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section id="precos" className="precos section">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">Investimento</p>
            <h2 className="section__title">
              Nossos <span>Preços</span>
            </h2>
            <p className="section__sub section__sub--dark">Qualidade premium sem surpresas</p>
          </div>

          <div className="precos__list">
            {PRICES.map((item) => (
              <div
                key={item.service}
                className={`precos__item${item.highlight ? " precos__item--highlight" : ""}`}
              >
                <span className="precos__service">
                  {item.highlight && <span className="precos__badge">★ Popular</span>}
                  {item.service}
                </span>
                <span className="precos__dots" />
                <span className="precos__price">{item.price}</span>
              </div>
            ))}
          </div>

          <p className="precos__note">
            * Valores podem variar. Entre em contato para mais informações.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--red btn--lg precos__cta"
          >
            Agendar Agora
          </a>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="contato section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow section__eyebrow--light">Fale conosco</p>
            <h2 className="section__title section__title--light">
              Entre em <span>Contato</span>
            </h2>
          </div>

          <div className="contato__grid">
            {/* Info */}
            <div className="contato__info">
              <div className="contato__block">
                <h3 className="contato__block-title">Redes Sociais</h3>
                <div className="contato__links">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contato__link contato__link--whatsapp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.571A.75.75 0 00.75 24.5l6.918-1.814A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.856 0-3.607-.502-5.112-1.38l-.367-.217-3.803.997.999-3.74-.24-.386A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    (14) 99999-9999
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="contato__link contato__link--instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    @garagem.cortes
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="contato__link contato__link--facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Garagem Cortes
                  </a>
                </div>
              </div>

              <div className="contato__block">
                <h3 className="contato__block-title">Localização</h3>
                <p className="contato__address">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  Rua das Tesouras, 42 – Centro<br />Marília, SP – 17500-000
                </p>
              </div>

              <div className="contato__block">
                <h3 className="contato__block-title">Horários</h3>
                <div className="horarios">
                  <div className="horarios__row">
                    <span className="horarios__day">Segunda a Sexta</span>
                    <span className="horarios__time">9h às 20h</span>
                  </div>
                  <div className="horarios__row">
                    <span className="horarios__day">Sábado</span>
                    <span className="horarios__time">9h às 17h</span>
                  </div>
                  <div className="horarios__row horarios__row--closed">
                    <span className="horarios__day">Domingo</span>
                    <span className="horarios__time horarios__time--closed">Fechado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="contato__map">
              <iframe
                title="Localização Garagem Cortes"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117926.49066574836!2d-49.9985!3d-22.2137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf2840738e1c3b%3A0x6c33e0ba45fc2609!2sMarília%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="logo-icon footer__logo-icon">✂</span>
            <span className="footer__name">Garagem<strong>Cortes</strong></span>
          </div>
          <p className="footer__tagline">Estilo. Precisão. Identidade.</p>
          <div className="footer__socials">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.571A.75.75 0 00.75 24.5l6.918-1.814A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.856 0-3.607-.502-5.112-1.38l-.367-.217-3.803.997.999-3.74-.24-.386A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} Garagem Cortes. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}