
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Assets & Icons ---

const WaxSeal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="wax-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.2" specularExponent="20" lightingColor="#ffcccc" result="specOut">
          <fePointLight x="70" y="-50" z="200" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
      </filter>
      <filter id="wax-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="6" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
      </filter>
      <filter id="shadow-seal">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#1a0000" floodOpacity="0.7"/>
      </filter>
    </defs>
    
    <g filter="url(#wax-texture) url(#shadow-seal)">
      <path d="M100 8 C 130 5, 150 15, 170 35 C 190 55, 198 80, 185 110 C 175 140, 185 160, 160 180 C 140 195, 120 185, 100 192 C 70 198, 40 190, 20 165 C 5 140, 10 110, 15 80 C 20 50, 40 30, 60 15 C 75 5, 90 10, 100 8 Z M 160 180 Q 165 195 155 200 Q 145 195 150 182 M 40 165 Q 30 180 45 185 Q 55 175 48 162" fill="#660a0a" />
      <path d="M100 25 C 135 25, 160 40, 165 75 C 170 110, 160 145, 135 165 C 110 185, 70 180, 45 160 C 20 140, 25 100, 35 70 C 45 40, 70 25, 100 25 Z" fill="none" stroke="#3d0303" strokeWidth="3" opacity="0.3" filter="url(#wax-glow)" />
      <g className="seal-content" style={{ mixBlendMode: 'overlay' }}>
        <circle cx="100" cy="100" r="48" fill="none" stroke="#2b0000" strokeWidth="1" strokeDasharray="3 3" />
        <g className="rotate-symbol">
           <path d="M100 50 L100 150 M50 100 L150 100" stroke="#2b0000" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
           <rect x="75" y="75" width="50" height="50" fill="none" stroke="#2b0000" strokeWidth="2" transform="rotate(45 100 100)" />
        </g>
        <text x="100" y="42" fontFamily="Cinzel" fontSize="14" fill="#2b0000" textAnchor="middle" fontWeight="900" letterSpacing="2">GUILD</text>
        <text x="100" y="172" fontFamily="Cinzel" fontSize="14" fill="#2b0000" textAnchor="middle" fontWeight="900" letterSpacing="2">MORTIS</text>
      </g>
    </g>
  </svg>
);

const CoffeeStain = ({ style, type = 1 }: { style?: React.CSSProperties, type?: number }) => (
  <svg viewBox="0 0 200 200" style={{ position: 'absolute', pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.5, ...style }}>
    <defs><filter id="stain-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" /></filter></defs>
    {type === 1 ? (
      <path d="M100,20 C150,25 180,60 175,100 C170,140 130,170 100,175 C60,170 20,130 25,90 C30,50 60,15 100,20 Z" fill="none" stroke="#5c3a1e" strokeWidth="12" filter="url(#stain-blur)" strokeDasharray="140 40 10 20 80 10" opacity="0.4"/>
    ) : (
      <path d="M90,30 C130,30 160,60 160,100 C160,140 130,170 90,170 C50,170 20,140 20,100 C20,60 50,30 90,30 Z" fill="#5c3a1e" filter="url(#stain-blur)" opacity="0.15"/>
    )}
  </svg>
);

const ArtifactDiagram = () => (
  <div className="pasted-note diagram-note">
    <div className="tape"></div>
    <svg viewBox="0 0 300 350" className="artifact-drawing">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#3a2f26" /></marker>
        <filter id="pencil-texture"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="1" /></filter>
      </defs>
      <g stroke="#2b1d14" strokeWidth="1.5" fill="none" filter="url(#pencil-texture)">
        <path d="M150 10 C 150 10, 140 40, 150 60" strokeDasharray="3 2" />
        <path d="M150 10 L 152 5 L 148 5 Z" fill="#2b1d14" />
        <path d="M150 15 C 145 25, 155 25, 150 35 C 145 45, 155 45, 150 55" strokeWidth="1" />
        <path d="M150 60 L 145 70 L 155 70 Z" fill="#2b1d14" />
        <path d="M150 70 Q 110 80 110 150 Q 110 220 150 250 Q 190 220 190 150 Q 190 80 150 70" strokeWidth="2" />
        <path d="M150 70 Q 130 110 130 150 Q 130 200 150 250" opacity="0.8" />
        <path d="M150 70 Q 170 110 170 150 Q 170 200 150 250" opacity="0.8" />
        <path d="M110 150 L 190 150" strokeDasharray="2 2" opacity="0.5" />
        <path d="M150 120 Q 170 140 160 170 Q 150 190 140 170 Q 130 140 150 120" fill="#8a1c1c" fillOpacity="0.2" stroke="#8a1c1c" strokeWidth="2" />
        <path d="M180 150 L 195 140 M 180 160 L 195 170" stroke="#8a1c1c" opacity="0.6" strokeWidth="1" />
        <line x1="190" y1="130" x2="230" y2="110" stroke="#3a2f26" strokeWidth="0.5" markerEnd="url(#arrow)" />
        <text x="220" y="100" fontFamily="Shadows Into Light" fontSize="16" fill="#5c4b3e">Pulsing organ?</text>
        <line x1="120" y1="200" x2="80" y2="230" stroke="#3a2f26" strokeWidth="0.5" markerEnd="url(#arrow)" />
        <text x="40" y="245" fontFamily="Shadows Into Light" fontSize="16" fill="#5c4b3e">Calcified cage</text>
      </g>
    </svg>
    <div className="caption">Fig. 4a: Recovered Specimen. Worn around the neck.</div>
  </div>
);

// --- MODULAR PAGE COMPONENTS ---

const CoverPage = () => (
  <div className="journal-page cover-page">
    <div className="decorative-border"></div>
    <header className="cover-header">
      <div className="classification">Vol. IV &mdash; Year of the Iron Lung</div>
      <h1 className="journal-title">The<br/>Hollow<br/>Chronicles</h1>
      <div className="guild-motto">"To map the void is to invite it in."</div>
    </header>
    <div className="cover-body">
      <div className="seal-container"><WaxSeal className="cover-seal" /></div>
      <div className="authorization-stamp">
          <div>PROPERTY OF</div>
          <div className="council-name">THE ROYAL ABYSSAL COMPANY</div>
          <div className="date-stamp">Nov 4, 1848</div>
      </div>
    </div>
    <footer className="cover-footer">
      <div className="instruction-text">Use <span className="key-hint">←</span> and <span className="key-hint">→</span> keys to turn pages</div>
    </footer>
  </div>
);

const ProloguePage = () => (
  <div className="journal-page">
    <header className="page-header">
      <h2>Prologue: The Pale Fugue</h2>
      <div className="sub-header">Excerpt from the First Survivor (1798)</div>
    </header>
    <div className="main-body" style={{ display: 'block' }}>
      <p className="drop-cap"><span className="first-letter">I</span>t began fifty years ago. A fissure opened in the valley floor, not with a quake, but with a sigh. The local tribe, the Sun-Speakers, believed it a gate to the divine. They descended with torches. The torches died. Then, so did the silence.</p>
      <p>Only one man returned. He bore no wounds, no fever. Yet he was... less. He sat in the town square, staring at the sun without blinking, until his eyes burned. He did not eat. He did not speak. He simply faded, day by day, as if his very existence was leaking out of him.</p>
      <div className="pasted-note scribble-note" style={{ float: 'right', width: '220px', transform: 'rotate(2deg)' }}>
        "It is not a disease of the body. It is a vacuum of the self."
      </div>
      <p>We call it <strong>The Pale Fugue</strong>. It spread from him like a cold draft. Those nearby lost their will, then their memories, and finally their consciousness, leaving behind breathing husks. We built High Bastion to contain the zone of influence. Now, we send machines and men of science down to find the plug for this drain on the world's soul.</p>
    </div>
  </div>
);

const ManifestPage = () => (
  <div className="journal-page">
    <header className="page-header">
      <h2>Expedition Manifest</h2>
      <div className="sub-header">Approved by the Board of Directors</div>
    </header>
    <div className="manifest-grid">
      {[
        { name: "Cpt. Valerius", role: "Vanguard", status: "Eviscerated" },
        { name: "Dr. Isole", role: "Physicist", status: "Dissipated" },
        { name: "Sterling", role: "Archivist", status: "Deceased" },
        { name: "Elowen", role: "Botanist", status: "Transmuted" },
        { name: "Garrick", role: "Demolitionist", status: "Crushed" },
        { name: "Themsin", role: "Engineer", status: "Consumed" },
        { name: "Caelum", role: "Navigator", status: "Missing" },
        { name: "Aeliana", role: "Geologist", status: "Catatonic" },
        { name: "Balthazar", role: "Chemist", status: "Dissolved" },
        { name: "Fenris", role: "Cartographer", status: "Lost" },
        { name: "Thorne", role: "Mercenary", status: "Betrayed" },
        { name: "Seraphina", role: "Surgeon", status: "Deceased" },
      ].map((person, i) => (
        <div key={i} className="manifest-entry">
          <div className="person-info">
            <span className="person-name">{person.name}</span>
            <span className="person-role">{person.role}</span>
          </div>
          <div className="stamp-container">
            <span className="status-stamp">{person.status}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="pasted-note warning-note" style={{ marginTop: '50px', transform: 'rotate(1deg)' }}>
       <div className="pin"></div>
       Day 0: We bring no bibles. Only ballistics and barometers. The Abyss respects only mass and momentum.
    </div>
  </div>
);

// --- SEPARATOR PAGES ---

const NarrativeIndexPage = () => (
  <div className="journal-page divider-page">
    <div className="divider-content">
      <h1>Book I</h1>
      <h2>The Descent</h2>
      <div className="divider-line"></div>
      <p className="divider-sub">"The deeper we go, the heavier the air becomes."</p>
      <ul className="toc-simple">
        <li><span>Day 1: The Gate of Tears</span> ................. p. 4</li>
        <li><span>Day 2: The Throat</span> .......................... p. 5</li>
        <li><span>Day 10: The Silent City</span> ................... p. 8</li>
      </ul>
    </div>
  </div>
);

const CompendiumIndexPage = () => (
  <div className="journal-page divider-page">
    <div className="divider-content">
      <h1>Book II</h1>
      <h2>The Compendium</h2>
      <div className="divider-line"></div>
      <p className="divider-sub">
        Classified discoveries: Flora, Fauna, and Anomalous Materials.
      </p>
       <ul className="toc-simple">
        <li><span>The Bleeder</span> ............................... p. 51</li>
        <li><span>Weeping Shield</span> .......................... p. 52</li>
      </ul>
    </div>
  </div>
);

// --- NARRATIVE PAGES ---

const DeparturePage = () => (
  <div className="journal-page">
    <header className="page-header">
      <h2>Day 1: The Gate of Tears</h2>
      <div className="sub-header">The Industrial Precipice</div>
    </header>
    <div className="main-body">
      <div style={{ gridColumn: '1 / -1' }}>
        <p className="drop-cap"><span className="first-letter">T</span>he Gate of Tears is not a poetic name. It is the sound the massive hydraulic hinges make—a screaming of metal that resembles a thousand weeping widows. It stands twenty feet tall, a barrier of lead-lined iron meant to keep the <strong>Miasma</strong> down.</p>
        <p>The staging area was choked with steam. Engineers in heavy leather aprons oiled the pistons of the descent-cage. <strong>Themsin</strong> was arguing with the Quartermaster about the coal supply for the boilers. "The pressure down there will dampen the combustion," she warned. "We need purified anthracite."</p>
        <p>There were no cheers today. The town of High Bastion knows better. They watched us from behind soot-stained glass, their faces pale. <strong>Valerius</strong> adjusted the brass gorget of his diving suit. <strong>Isole</strong> was calibrating her Aether-Barometer, muttering about "surface tension" and "shear force."</p>
        <div className="quote-block">"We are not explorers. We are a needle, trying to pierce the skin of a god." <cite>&mdash; Valerius</cite></div>
        <p>When the whistle blew, it rattled our teeth. The cage jerked, the chains groaned, and we sank into the steam. The last thing I saw was the grey sky, choked by factory smoke. It was the brightest thing I would see for the rest of my life.</p>
      </div>
    </div>
  </div>
);

const FirstLayerPage = () => (
  <div className="journal-page">
    <header className="page-header">
      <h2>Day 2: The Throat</h2>
      <div className="sub-header">Stratum I - The Upper Crust</div>
    </header>
    <div className="main-body" style={{ display: 'block' }}>
      <p className="drop-cap"><span className="first-letter">W</span>e have breached the crust. The descent took fourteen hours of grinding darkness. The air here is thick, pressing against the eardrums like water. <strong>Isole</strong> calls it the "Force"—a fluid pressure that seems to want to push us back up, or crush us flat.</p>
      <p>We have established a beachhead in an ancient cavern. <strong>Themsin</strong> set up the galvanic lamps; their electric hum is the only comfort in this silence. The light they cast is sickly yellow, struggling against the gloom. </p>
      <p><strong>Garrick</strong>'s canary died within the hour. Not from gas, but from... stillness. It just stopped moving. I looked at the barometer. The needle is trembling, not pointing north, but <em>down</em>. Always down. <strong>Elowen</strong> found roots penetrating the ceiling—petrified, iron-hard. We are inside a fossilized ribcage of the earth.</p>
      <div className="pasted-note mechanics-note" style={{ transform: 'rotate(-1deg)', marginTop: '40px' }}>
        <div className="tape"></div>
        <strong>Observation:</strong> The shadows here do not align with the light sources. They lag behind movement by a fraction of a second.
      </div>
    </div>
  </div>
);

// --- ARTIFACT PAGES ---

const BleederPage = () => (
  <article className="journal-page content-grid">
    <WaxSeal className="seal-stamp-corner" />
    <header className="entry-header">
      <div className="classification">Catalogus Artefacterra &mdash; Stratum IV</div>
      <h1 className="artifact-title">The Bleeder</h1>
      <div className="sub-title">Designation: Sanguis Mora</div>
    </header>
    <div className="main-body">
      <section className="column-left">
        <ArtifactDiagram />
        <div className="pasted-note warning-note">
          <div className="pin"></div>
          Do not handle without lead gloves. The pulse synchronizes with your own heart. It initiates a reverse-flow event. <br/>- Dr. S.
        </div>
        <p className="drop-cap"><span className="first-letter">R</span>ecovered from the chest cavity of a previous excavator. It appears to be a biological pump calcified into a mineral casing. It is warm to the touch.</p>
      </section>
      <section className="column-right">
        <h3 className="section-header">Mechanisms of Action</h3>
        <p>The artifact acts as a kinetic buffer. When the user is subjected to blunt force trauma, the device absorbs the energy through unknown thaumaturgic capillary action.</p>
        <p>However, energy cannot be destroyed. The device stores this trauma and re-introduces it into the user's circulatory system over time, manifesting as <span className="keyword-bleed">Systemic Haemorrhage</span>.</p>
        <div className="pasted-note mechanics-note">
          <div className="tape"></div>
          <h4 className="mechanics-header">Safety Protocols</h4>
          <ul className="mechanics-list">
            <li><strong>Containment Breach:</strong> If the device casing is cracked while charged, the stored kinetic energy releases instantly. Result: Liquefaction of the host.</li>
            <li><strong>Binding:</strong> Requires fresh blood to activate. It thirsts.</li>
          </ul>
        </div>
      </section>
    </div>
  </article>
);

const BlankPage = ({ pageNum }: { pageNum: number }) => {
    const randomSeed = pageNum * 123.45;
    const stainType = Math.floor((randomSeed % 2) + 1);
    const top = (randomSeed % 60) + 10;
    const left = (randomSeed % 80);
    const rotation = (randomSeed % 360);
    const hasStain = (randomSeed % 10) > 6;
    
    return (
        <div className="journal-page blank-page">
            <div className="page-number-corner">{pageNum + 1}</div>
            {hasStain && (
                <CoffeeStain type={stainType} style={{ top: `${top}%`, left: `${left}%`, width: '150px', transform: `rotate(${rotation}deg)` }} />
            )}
            <div className="empty-content">
                <span className="faded-line"></span>
                <span className="faded-line" style={{ width: '80%' }}></span>
                <span className="faded-line" style={{ width: '60%' }}></span>
            </div>
            {(pageNum === 99) && <div className="pasted-note scribble-note" style={{ margin: 'auto' }}>End of Records.</div>}
        </div>
    );
};

// --- APP & SCAFFOLDING ---

const App = () => {
  const [flicker, setFlicker] = useState(1);
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);

  // --- PAGE REGISTRY ---
  const pages = useMemo(() => {
    const definedPages = [
      { id: 'cover', component: <CoverPage /> },           // Page 0
      { id: 'prologue', component: <ProloguePage /> },     // Page 1
      { id: 'manifest', component: <ManifestPage /> },     // Page 2
      { id: 'idx-narrative', component: <NarrativeIndexPage /> }, // Page 3 (Book I Index)
      { id: 'dep-gate', component: <DeparturePage /> },    // Page 4
      { id: 'dep-layer1', component: <FirstLayerPage /> }, // Page 5
      
      // Page 50: Start of Compendium (Book II Index)
      { id: 'idx-compendium', component: <CompendiumIndexPage />, forceIndex: 50 },
      { id: 'art-bleeder', component: <BleederPage /> },
    ];

    const fullBook = new Array(100).fill(null).map((_, i) => {
        const found = definedPages.find(p => p.forceIndex === i);
        if (found) return found.component;
        
        const sequential = definedPages.filter(p => p.forceIndex === undefined);
        if (i < sequential.length) return sequential[i].component;

        return <BlankPage key={i} pageNum={i} />;
    });

    return fullBook;
  }, []);

  const totalPages = pages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(0.9 + Math.random() * 0.15); 
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (animating) return;
        if (e.key === 'ArrowRight' && page < totalPages - 1) {
            setAnimating(true);
            setTimeout(() => { setPage(p => p + 1); setAnimating(false); }, 300);
        } else if (e.key === 'ArrowLeft' && page > 0) {
            setAnimating(true);
            setTimeout(() => { setPage(p => p - 1); setAnimating(false); }, 300);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, animating, totalPages]);

  return (
    <div className="world-container">
      <div className="ambient-light" style={{ opacity: flicker }}></div>
      <div className="desk-surface">
        <div className="parchment-wrapper">
          <div className={`parchment-sheet ${animating ? 'turning' : ''}`}>
            <div className="charred-border"></div>
            <div className="crease-texture"></div>
            <div className="page-content-area key-animation">
                {pages[page]}
            </div>
            <footer className="global-footer">
               <span className="page-indicator">Page {page + 1} of {totalPages}</span>
            </footer>
          </div>
        </div>
      </div>
      <style>{`
        /* --- CSS VARIABLES --- */
        :root {
          --parchment-bg: #e8dccb;
          --ink-color: #1a120b;
          --ink-light: #4a3b2e;
          --red-accent: #660e0e;
          --note-bg: #f7f1e3;
          --divider-bg: #1c1c1c;
          --divider-text: #d4c5b0;
        }
        /* --- LAYOUT --- */
        .world-container { width: 100vw; min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; background: #050403; position: relative; padding: 40px 20px; perspective: 1500px; overflow: hidden; }
        .ambient-light { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 50% 50%, rgba(255, 210, 160, 0.25) 0%, rgba(0,0,0,0.6) 100%); pointer-events: none; z-index: 10; }
        .desk-surface { width: 100%; max-width: 900px; position: relative; z-index: 1; }
        .parchment-wrapper { filter: drop-shadow(0 20px 30px rgba(0,0,0,0.9)); width: 100%; transform-style: preserve-3d; }
        .parchment-sheet {
          background-color: var(--parchment-bg); width: 100%; min-height: 1100px; position: relative; padding: 80px 70px; color: var(--ink-color); font-family: 'Caveat', cursive; 
          background-image: linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.05)), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E");
          clip-path: polygon(2% 0%, 8% 1%, 15% 0%, 25% 1%, 30% 0%, 40% 1%, 48% 0%, 55% 1%, 65% 0%, 75% 1%, 85% 0%, 92% 1%, 98% 0%, 100% 5%, 99% 12%, 100% 20%, 99% 30%, 100% 40%, 99% 50%, 100% 60%, 99% 70%, 100% 80%, 99% 90%, 100% 98%, 95% 100%, 88% 99%, 80% 100%, 70% 99%, 60% 100%, 50% 99%, 40% 100%, 30% 99%, 20% 100%, 10% 99%, 2% 100%, 0% 95%, 1% 85%, 0% 75%, 1% 65%, 0% 55%, 1% 45%, 0% 35%, 1% 25%, 0% 15%, 1% 5%);
          transition: transform 0.3s ease-in-out;
        }
        .turning .page-content-area { opacity: 0.5; transform: scale(0.98); filter: blur(2px); transition: all 0.3s; }
        .page-content-area { opacity: 1; transform: scale(1); filter: blur(0); transition: all 0.5s ease-out; min-height: 900px; }
        .key-animation { animation: pageFade 0.6s ease-out; }
        @keyframes pageFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        
        /* --- ASSETS --- */
        .charred-border { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 5; mix-blend-mode: multiply; box-shadow: inset 0 0 100px 30px rgba(0,0,0,1), inset 0 0 50px 10px rgba(50, 10, 0, 0.8); background: radial-gradient(circle at 50% 50%, transparent 60%, rgba(139, 69, 19, 0.1) 80%, rgba(0,0,0,0.8) 100%); }
        .crease-texture { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(178deg, transparent 40%, rgba(0,0,0,0.04) 40.5%, transparent 42%), linear-gradient(4deg, transparent 60%, rgba(0,0,0,0.04) 60.5%, transparent 62%); pointer-events: none; z-index: 2; }
        .seal-content { animation: pulseGlow 4s infinite alternate; }
        .rotate-symbol { transform-origin: 100px 100px; animation: rotateSymbol 20s linear infinite; }
        @keyframes rotateSymbol { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseGlow { 0% { opacity: 0.8; filter: drop-shadow(0 0 0px transparent); } 100% { opacity: 1; filter: drop-shadow(0 0 5px rgba(255, 100, 100, 0.4)); } }

        /* --- TYPOGRAPHY & ELEMENTS --- */
        .entry-header, .cover-header, .page-header { text-align: center; margin-bottom: 50px; border-bottom: 2px solid var(--ink-color); padding-bottom: 20px; position: relative; }
        .classification, .sub-header { font-family: 'IM Fell English SC', serif; font-size: 1.1rem; letter-spacing: 0.1em; opacity: 0.8; margin-bottom: 10px; }
        .journal-title { font-family: 'Cinzel', serif; font-size: 5rem; margin: 20px 0; line-height: 0.9; font-weight: 900; color: #3b0e0e; }
        .artifact-title { font-family: 'Cinzel', serif; font-size: 4rem; margin: 0; font-weight: 900; text-transform: uppercase; }
        .guild-motto { font-family: 'IM Fell English SC', serif; font-style: italic; font-size: 1.3rem; margin-top: 20px; color: var(--ink-light); }
        .instruction-text { font-family: 'IM Fell English SC', serif; opacity: 0.5; margin-top: 100px; }
        .key-hint { border: 1px solid currentColor; padding: 2px 6px; border-radius: 4px; font-family: sans-serif; font-size: 0.8em; }
        .main-body { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; position: relative; z-index: 2; }
        .seal-stamp-corner { position: absolute; top: 60px; right: 50px; width: 120px; height: 120px; transform: rotate(25deg); z-index: 6; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.4)); }
        .cover-seal { width: 200px; height: 200px; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3)); }
        .seal-container { display: flex; justify-content: center; margin: 50px 0; }
        .pasted-note { background-color: var(--note-bg); padding: 15px 20px; box-shadow: 2px 3px 5px rgba(0,0,0,0.3); font-family: 'Shadows Into Light', cursive; color: #2e302f; position: relative; margin-bottom: 30px; transform: rotate(-1deg); border: 1px solid rgba(0,0,0,0.1); }
        .tape { position: absolute; top: -10px; left: 50%; width: 80px; height: 25px; background: rgba(255, 255, 255, 0.4); transform: translateX(-50%) rotate(2deg); backdrop-filter: blur(1px); }
        .pin { position: absolute; top: -10px; left: 50%; width: 12px; height: 12px; border-radius: 50%; background: #7a7a7a; box-shadow: 1px 2px 3px rgba(0,0,0,0.4); }
        .warning-note { background: #ebdccb; border-left: 4px solid #8a1c1c; font-size: 1.4rem; }
        .mechanics-note { background: #f0f0f0; transform: rotate(1.5deg); }
        .diagram-note { background: #fdfbf7; transform: rotate(2deg); padding: 10px; margin-bottom: 40px; }
        .scribble-note { background: transparent; box-shadow: none; border: none; font-size: 1.5rem; color: #8a1c1c; padding: 0; }
        .blank-page { position: relative; min-height: 800px; }
        .page-number-corner { position: absolute; top: -20px; right: 0; font-family: 'IM Fell English SC', serif; font-size: 1.2rem; opacity: 0.4; }
        .empty-content { margin-top: 100px; opacity: 0.1; }
        .faded-line { display: block; height: 2px; background: #000; margin-bottom: 40px; }
        .global-footer { margin-top: auto; border-top: 1px solid var(--ink-light); padding-top: 15px; text-align: center; font-family: 'IM Fell English SC', serif; opacity: 0.6; }
        .drop-cap .first-letter { float: left; font-family: 'Cinzel', serif; font-size: 5rem; line-height: 0.8; margin-right: 15px; margin-top: 10px; color: var(--red-accent); font-weight: 700; }
        p { font-size: 1.6rem; line-height: 1.4; }
        .mechanics-list { list-style: square; padding-left: 20px; font-size: 1.3rem; }
        .keyword-bleed { color: var(--red-accent); font-family: 'IM Fell English SC', serif; font-weight: bold; }
        .emphasis-danger { color: #bf2121; font-weight: bold; }
        .caption { font-family: 'Shadows Into Light', cursive; font-size: 1.1rem; text-align: center; margin-top: 5px; color: var(--ink-light); }
        .blur-text { filter: blur(3px); user-select: none; opacity: 0.7; }
        .quote-block { margin-top: 40px; font-style: italic; padding: 20px; position: relative; }
        .quote-block::before { content: '"'; position: absolute; top: -20px; left: -10px; font-family: 'Cinzel', serif; font-size: 6rem; opacity: 0.1; }
        .quote-block cite { display: block; text-align: right; margin-top: 10px; font-size: 1.2rem; font-weight: bold; font-style: normal; font-family: 'Shadows Into Light', cursive; }
        
        /* --- DIVIDER PAGES --- */
        .divider-page { background-color: var(--divider-bg); color: var(--divider-text); margin: -80px -70px; padding: 80px 70px; min-height: 1100px; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 4px double var(--divider-text); }
        .divider-content { text-align: center; width: 100%; border-top: 1px solid var(--divider-text); border-bottom: 1px solid var(--divider-text); padding: 40px 0; }
        .divider-page h1 { font-family: 'Cinzel', serif; font-size: 4rem; margin: 0; color: var(--divider-text); letter-spacing: 5px; }
        .divider-page h2 { font-family: 'IM Fell English SC', serif; font-size: 3rem; margin: 10px 0; color: #a89f91; font-style: italic; }
        .divider-line { width: 100px; height: 3px; background: var(--red-accent); margin: 20px auto; }
        .divider-sub { font-family: 'Caveat', cursive; font-size: 1.8rem; opacity: 0.8; margin-top: 20px; }
        .toc-simple { list-style: none; padding: 0; text-align: left; max-width: 500px; margin: 40px auto; font-family: 'IM Fell English SC', serif; font-size: 1.4rem; }
        .toc-simple li { margin-bottom: 15px; border-bottom: 1px dashed rgba(255,255,255,0.2); display: flex; justify-content: space-between; }
        
        /* --- SPECIFIC PAGE STYLES --- */
        .decorative-border { position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 2px solid var(--ink-light); pointer-events: none; opacity: 0.5; }
        .decorative-border::after { content: ''; position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px; border: 1px solid var(--ink-light); }
        .authorization-stamp { margin-top: 60px; border: 3px double var(--ink-color); padding: 20px; display: inline-block; font-family: 'IM Fell English SC', serif; transform: rotate(-2deg); opacity: 0.8; }
        .council-name { font-size: 1.2rem; font-weight: bold; margin: 5px 0; letter-spacing: 1px; }
        .date-stamp { color: var(--red-accent); font-weight: bold; }
        .manifest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
        .manifest-entry { border-bottom: 1px dashed rgba(0,0,0,0.2); padding: 10px 0; display: flex; justify-content: space-between; align-items: center; }
        .person-info { display: flex; flex-direction: column; }
        .person-name { font-family: 'IM Fell English SC', serif; font-size: 1.4rem; font-weight: bold; }
        .person-role { font-size: 1.1rem; opacity: 0.7; font-style: italic; }
        .stamp-container { transform: rotate(-5deg); }
        .status-stamp { border: 2px solid #8a1c1c; color: #8a1c1c; padding: 2px 8px; font-family: 'Cinzel', serif; font-weight: bold; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjUiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+"); }

        @media (max-width: 800px) {
          .main-body, .manifest-grid { grid-template-columns: 1fr; }
          .parchment-sheet { padding: 50px 25px; clip-path: none; }
          .journal-title { font-size: 3.5rem; }
          .divider-page { margin: 0; padding: 20px; }
        }
      `}</style>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
