import { useEffect, useRef } from "react";
import "./Tos.css";
import GlobalBackground from "../../components/Default/GlobalBackground";

/* ══════════════════════════════════════════════
   CHIBI DOG PAW — chân cún dễ thương
══════════════════════════════════════════════ */
const DogPaw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" fill="none">
    {/* Main pad — rounded big shape */}
    <ellipse cx="45" cy="68" rx="24" ry="20" fill="rgba(200,16,46,0.52)" />
    {/* Highlight on pad */}
    <ellipse cx="39" cy="62" rx="9" ry="6" fill="rgba(255,255,255,0.07)" />
    {/* 4 toe beans */}
    <ellipse cx="18" cy="44" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="34" cy="36" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="52" cy="36" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse cx="68" cy="44" rx="8" ry="10" fill="rgba(200,16,46,0.44)" />
    {/* Tiny highlight on each toe */}
    <ellipse cx="15" cy="40" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="31" cy="33" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="49" cy="33" rx="3.5" ry="4" fill="rgba(255,255,255,0.08)" />
    <ellipse cx="65" cy="40" rx="3" ry="4" fill="rgba(255,255,255,0.08)" />
    {/* Claws */}
    <path
      d="M13 34 Q10 26 14 23"
      stroke="rgba(200,16,46,0.5)"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M29 27 Q28 18 32 15"
      stroke="rgba(200,16,46,0.5)"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M48 27 Q49 18 53 16"
      stroke="rgba(200,16,46,0.5)"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M65 34 Q68 26 72 24"
      stroke="rgba(200,16,46,0.5)"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ══════════════════════════════════════════════
   CHIBI CAT PAW — chân mèo dễ thương
══════════════════════════════════════════════ */
const CatPaw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" fill="none">
    {/* Main pad — heart-ish shape */}
    <path
      d="M45 82 C28 72 16 56 22 44 C26 36 34 36 40 41 L45 46 L50 41 C56 36 64 36 68 44 C74 56 62 72 45 82 Z"
      fill="rgba(200,16,46,0.52)"
    />
    {/* Pad highlight */}
    <ellipse cx="38" cy="55" rx="8" ry="6" fill="rgba(255,255,255,0.07)" />
    {/* 3 toe beans — cats have 3 visible front */}
    <ellipse
      cx="20"
      cy="32"
      rx="9"
      ry="11"
      fill="rgba(200,16,46,0.44)"
      transform="rotate(-12 20 32)"
    />
    <ellipse cx="45" cy="25" rx="9" ry="11" fill="rgba(200,16,46,0.44)" />
    <ellipse
      cx="70"
      cy="32"
      rx="9"
      ry="11"
      fill="rgba(200,16,46,0.44)"
      transform="rotate(12 70 32)"
    />
    {/* Highlights */}
    <ellipse
      cx="17"
      cy="28"
      rx="3.5"
      ry="4"
      fill="rgba(255,255,255,0.09)"
      transform="rotate(-12 17 28)"
    />
    <ellipse cx="42" cy="22" rx="3.5" ry="4" fill="rgba(255,255,255,0.09)" />
    <ellipse
      cx="67"
      cy="28"
      rx="3.5"
      ry="4"
      fill="rgba(255,255,255,0.09)"
      transform="rotate(12 67 28)"
    />
    {/* Retractable claw hints — short & curved */}
    <path
      d="M14 22 Q11 15 16 11"
      stroke="rgba(200,16,46,0.45)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M42 15 Q42 7  47 5"
      stroke="rgba(200,16,46,0.45)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M68 22 Q71 15 74 12"
      stroke="rgba(200,16,46,0.45)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
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

/* ══════════════════════════════════════════════
   useReveal hook
══════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════
   SECTION: IMPORTANT RULES
   — prose slide, không phải từng dòng hộp
══════════════════════════════════════════════ */
function ImportantRules() {
  const ref = useReveal();
  return (
    <section className="tos-section" ref={ref}>
      <h2 className="tos-section-title">
        <span className="tos-section-badge">READ FIRST</span>
        IMPORTANT RULES
      </h2>

      <div className="tos-important-banner">
        <strong>IMPORTANT</strong> — PLEASE READ BEFORE COMMISSIONING.
        <span className="exclaim">!</span>
      </div>

      <div className="tos-slide-block">
        <p className="tos-rule-para">
          <span className="warn">Absolutely do not</span> use my work for{" "}
          <em>AI / NFTs / software</em> that has the function of generating AI.
          You are also <em>not allowed</em> to claim my work as drawn by you.
        </p>

        <p className="tos-rule-para">
          Do <em>not</em> use my work without permission — commercially, as a
          streaming model, or resell for a higher price, etc.
        </p>

        <p className="tos-rule-para">
          When posting commission works on social networks, please{" "}
          <em>credit my name</em> as the author. I will also credit my client's
          name in return.
        </p>

        <p className="tos-rule-para">
          Work can take up to <em>2–3 weeks</em> (or longer) depending on
          complexity — counted from the time I <em>start drawing</em>, not from
          the waitlist.
        </p>

        <p className="tos-rule-para">
          Please pay <em>50%–100%</em> of the order value before I start. If
          money is <span className="warn">not transferred after 10 days</span>,
          I will cancel your order.
        </p>

        <p className="tos-rule-para">
          If you cancel mid-commission, please pay according to the{" "}
          <em>current progress</em>.{" "}
          <span className="warn">I won't do refunds</span> unless I am at fault.
        </p>

        <p className="tos-rule-para">
          Except for <em>private orders</em>, I reserve the right to post my
          works on social networking sites — with watermark &amp; client credit.
        </p>

        <p className="tos-rule-para">
          I reserve the right to <span className="warn">decline orders</span>{" "}
          that make me uncomfortable.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION: WAITLIST
   — prose slide format
══════════════════════════════════════════════ */
function Waitlist() {
  const ref = useReveal();
  return (
    <section className="tos-section" ref={ref}>
      <h2 className="tos-section-title">
        <span className="tos-section-badge">QUEUE</span>
        UPDATE PROGRESS &amp; WAITLIST
      </h2>

      <div className="tos-waitlist-slide">
        <div className="tos-waitlist-eyebrow">— HOW TO JOIN THE WAITLIST —</div>

        <div className="tos-waitlist-body">
          <p>
            <span className="step-inline">1</span>
            Contact me to discuss in advance or join my waitlist directly on{" "}
            <a href="#" rel="noreferrer">
              Vgen
            </a>
            . The earlier you reach out, the sooner we can plan your spot.
          </p>

          <p>
            <span className="step-inline">2</span>
            After finalizing the price, you will pay <em>50%–100%</em>{" "}
            (depending on your preference) and I will add your name to the
            waiting list right away.
          </p>

          <p>
            <span className="step-inline">3</span>
            If you cancel your order when it's your turn, you will{" "}
            <span className="warn">lose 50%</span> of the total value of your
            order — so please be sure before committing.
          </p>

          <p>
            <span className="step-inline">4</span>
            You can follow my current progress and queue position{" "}
            <a href="#" rel="noreferrer">
              here
            </a>{" "}
            via my public Trello board.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CTA
══════════════════════════════════════════════ */
function CtaSection() {
  const ref = useReveal("-40px");
  return (
    <div className="tos-cta-section" ref={ref}>
      <p className="tos-cta-label">
        ONCE YOU'VE FINISHED READING, PLEASE CONTINUE HERE.
      </p>
      <div className="tos-cta-buttons">
        <a href="#" className="tos-btn tos-btn-primary">
          <span className="tos-btn-icon">◈</span> VGEN
        </a>
        <a href="#" className="tos-btn tos-btn-secondary">
          <span className="tos-btn-icon">✦</span> ILLUSTRATION COMM
        </a>
        <a href="#" className="tos-btn tos-btn-secondary">
          <span className="tos-btn-icon">◉</span> VTUBER COMMISSION
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function TosPage() {
  return (
    <>
      {/* <PawLayer /> */}
      <div className="tos-page">
        <GlobalBackground />
        {/* ── HEADER với slide-in title ── */}
        <header className="tos-header">
          <div className="tos-header-inner">
            <Diamonds />
            <div>
              <div className="tos-title-clip">
                <h1 className="tos-title">TERMS OF SERVICE</h1>
              </div>
              <div className="tos-title-underline" />
            </div>
            <Diamonds />
          </div>
        </header>

        <Chain links={32} />

        {/* ── CARD ── */}
        <div className="tos-card">
          <StudsRow count={14} />

          <div className="tos-card-inner">
            <ImportantRules />
            <Divider />
            <Waitlist />
            <CtaSection />
          </div>
        </div>
      </div>
    </>
  );
}
