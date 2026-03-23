import { useEffect, useRef, useState } from "react";
import "./Tos.css";
import GlobalBackground from "../../components/Default/GlobalBackground";
import axios from "../../utils/axios";

/* ══════════════════════════════════════════════
   CHIBI DOG PAW — chân cún dễ thương
══════════════════════════════════════════════ */
const DogPaw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" fill="none">
    <ellipse cx="45" cy="68" rx="24" ry="20" fill="rgba(200,16,46,0.52)" />
    <ellipse cx="39" cy="62" rx="9" ry="6" fill="rgba(255,255,255,0.07)" />
    <ellipse cx="18" cy="44" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="34" cy="36" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="52" cy="36" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="68" cy="44" rx="8" ry="10" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="15" cy="40" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="31" cy="33" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="49" cy="33" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="65" cy="40" rx="3" ry="4" fill="rgba(255,255,255,0.08)" />
    <path d="M13 34 Q10 26 14 23" stroke="rgba(200,16,46,0.5)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M29 27 Q28 18 32 15" stroke="rgba(200,16,46,0.5)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M48 27 Q49 18 53 16" stroke="rgba(200,16,46,0.5)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M65 34 Q68 26 72 24" stroke="rgba(200,16,46,0.5)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

/* ══════════════════════════════════════════════
   CHIBI CAT PAW — chân mèo dễ thương
══════════════════════════════════════════════ */
const CatPaw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" fill="none">
    <path d="M45 82 C28 72 16 56 22 44 C26 36 34 36 40 41 L45 46 L50 41 C56 36 64 36 68 44 C74 56 62 72 45 82 Z" fill="rgba(200,16,46,0.52)" />
    <ellipse cx="38" cy="55" rx="8" ry="6" fill="rgba(255,255,255,0.07)" />
    <ellipse cx="20" cy="32" rx="9" ry="11" fill="rgba(200,16,46,0.44)" transform="rotate(-12 20 32)" />
    <ellipse cx="45" cy="25" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="70" cy="32" rx="9" ry="11" fill="rgba(200,16,46,0.44)" transform="rotate(12 70 32)" />
    <ellipse cx="17" cy="28" rx="3.5" ry="4" fill="rgba(255,255,255,0.09)" transform="rotate(-12 17 28)" />
    <ellipse cx="42" cy="22" rx="3.5" ry="4" fill="rgba(255,255,255,0.09)" />
    <ellipse cx="67" cy="28" rx="3.5" ry="4" fill="rgba(255,255,255,0.09)" transform="rotate(12 67 28)" />
    <path d="M14 22 Q11 15 16 11" stroke="rgba(200,16,46,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M42 15 Q42 7  47 5" stroke="rgba(200,16,46,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M68 22 Q71 15 74 12" stroke="rgba(200,16,46,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

/* ══════════════════════════════════════════════
   PAW LAYER — floating background
══════════════════════════════════════════════ */
const PAW_CONFIG = [
  { type: "dog", left: "3%", dur: "15s", delay: "0s" },
  { type: "cat", left: "87%", dur: "19s", delay: "2.5s" },
  { type: "dog", left: "20%", dur: "17s", delay: "5s" },
  { type: "cat", left: "65%", dur: "13s", delay: "1.2s" },
  { type: "dog", left: "43%", dur: "21s", delay: "8s" },
  { type: "cat", left: "11%", dur: "16s", delay: "10s" },
  { type: "dog", left: "76%", dur: "18s", delay: "3.8s" },
  { type: "cat", left: "54%", dur: "14s", delay: "12s" },
  { type: "dog", left: "32%", dur: "20s", delay: "7s" },
  { type: "cat", left: "93%", dur: "17s", delay: "14s" },
  { type: "dog", left: "49%", dur: "22s", delay: "4.5s" },
  { type: "cat", left: "7%", dur: "15s", delay: "16s" },
];

function PawLayer() {
  return (
    <div className="paw-layer" aria-hidden="true">
      {PAW_CONFIG.map((p, i) => (
        <div
          key={i}
          className="paw-wrap"
          style={{
            left: p.left,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        >
          {p.type === "cat" ? <CatPaw /> : <DogPaw />}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function Diamonds() {
  return (
    <div className="tos-title-diamonds">
      <span className="diamond" />
      <span className="diamond" />
      <span className="diamond" />
    </div>
  );
}

function Chain({ links = 32 }) {
  return (
    <div className="tos-chain">
      {Array.from({ length: links }).map((_, i) => (
        <span key={i} className="chain-link" />
      ))}
    </div>
  );
}

function StudsRow({ count = 14 }) {
  return (
    <div className="tos-studs">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="stud" />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="tos-divider">
      <span className="tos-divider-line" />
      <span className="tos-divider-dot" />
      <span className="tos-divider-line" />
    </div>
  );
}

function useReveal(margin = "-50px") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return ref;
}

function DynamicSection({ section }) {
  const ref = useReveal();
  return (
    <section className="tos-section" ref={ref}>
      <h2 className="tos-section-title">
        {section.badge && <span className="tos-section-badge">{section.badge}</span>}
        {section.heading}
      </h2>

      {section.subheading && (
        <div className="tos-important-banner">
          <strong>{section.subheading}</strong>
          <span className="exclaim">!</span>
        </div>
      )}

      <div className="tos-slide-block">
        {section.contentBlocks.map((block, idx) => (
          <div
            key={idx}
            className="tos-rule-para"
            dangerouslySetInnerHTML={{ __html: block }}
          />
        ))}
      </div>
    </section>
  );
}

export default function TosPage() {
  const [tosData, setTosData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTOS = async () => {
      try {
        const response = await axios.get("/tos");
        setTosData(response.data);
      } catch (error) {
        console.error("Error fetching TOS:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTOS();
  }, []);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading TOS...</div>;
  if (!tosData) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>No TOS data available.</div>;

  return (
    <>
      <div className="tos-page">
        <GlobalBackground />
        <header className="tos-header">
          <div className="tos-header-inner">
            <Diamonds />
            <div>
              <div className="tos-title-clip">
                <h1 className="tos-title">{tosData.title || "TERMS OF SERVICE"}</h1>
              </div>
              <div className="tos-title-underline" />
            </div>
            <Diamonds />
          </div>
        </header>

        <Chain links={32} />

        <div className="tos-card">
          <StudsRow count={14} />

          <div className="tos-card-inner">
            {tosData.sections.map((section, idx) => (
              <div key={section._id || idx}>
                <DynamicSection section={section} />
                {idx < tosData.sections.length - 1 && <Divider />}
              </div>
            ))}

            {tosData.ctaLinks && tosData.ctaLinks.length > 0 && (
              <div className="tos-cta-section visible">
                <p className="tos-cta-label">
                  ONCE YOU'VE FINISHED READING, PLEASE CONTINUE HERE.
                </p>
                <div className="tos-cta-buttons">
                  {tosData.ctaLinks.map((link, idx) => (
                    <a key={link._id || idx} href={link.url} className={`tos-btn ${idx === 0 ? 'tos-btn-primary' : 'tos-btn-secondary'}`}>
                      <span className="tos-btn-icon">{link.icon}</span> {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
