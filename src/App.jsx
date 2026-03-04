import { useState, useEffect, useRef } from 'react'

// ─── CONFIGURATION ───────────────────────────────────────────
const CONFIG = {
  name: "Azareel Naomie MEBOUNOU",
  shortName: "Naomie",
  formation: "Licence 3 en Réseaux & Télécommunications",
  university: "UCAO-UUC, Cotonou",
  goal: 200000,
  currency: "FCFA",
  pcName: "HP EliteBook 840 G5",
  pcPrice: "200 000 FCFA",
  mtnNumber: "0159006502",
  mtnName: "Azareel MEBOUNOU",
}

const PC_SPECS = [
  { icon: "⚡", label: "Processeur", value: "Intel Core i5-8365U (8è Gen)" },
  { icon: "🧠", label: "RAM", value: "16 Go DDR4" },
  { icon: "💾", label: "Stockage", value: "SSD 256 Go" },
  { icon: "🖥️", label: "Écran", value: '14" Full HD' },
  { icon: "🔋", label: "Autonomie", value: "4 heures" },
  { icon: "🔒", label: "Sécurité", value: "Empreinte digitale" },
]

// ─── HOOKS ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return count
}

// ─── COMPONENTS ──────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="font-display text-lg sm:text-xl font-bold text-rose-600">
            ❤️ SolidaritéPC
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#histoire" className="hover:text-rose-600 transition-colors">Son Histoire</a>
            <a href="#pc" className="hover:text-rose-600 transition-colors">Le PC</a>
            <a href="#contribuer" className="hover:text-rose-600 transition-colors">Contribuer</a>
          </div>
          <a href="#contribuer" className="cta-button text-white px-5 py-2.5 rounded-full text-sm font-semibold">
            Faire un don
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background shapes */}
      <div className="floating-shape w-96 h-96 bg-rose-500 top-20 -right-48 animate-float" />
      <div className="floating-shape w-72 h-72 bg-amber-400 bottom-20 -left-36 animate-float" style={{ animationDelay: '2s' }} />
      <div className="floating-shape w-64 h-64 bg-rose-300 top-1/2 left-1/3 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text */}
          <div className="order-2 lg:order-1">
            <div className="opacity-0 animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6">
                🆘 Appel à la solidarité
              </span>
            </div>
            
            <h1 className="opacity-0 animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              Aidez {CONFIG.shortName} à{' '}
              <span className="gradient-text">terminer ses études</span>
            </h1>

            <p className="opacity-0 animate-fade-up-delay-2 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Étudiante en <strong className="text-gray-800">{CONFIG.formation}</strong> à l'UCAO, 
              {CONFIG.shortName} a perdu son seul outil de travail. Sans ordinateur, impossible de 
              préparer son projet de fin d'études et sa soutenance. <em className="text-rose-600">Ensemble, offrons-lui cette chance.</em>
            </p>

            <div className="opacity-0 animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
              <a href="#contribuer" className="cta-button text-white px-8 py-4 rounded-full text-base sm:text-lg font-bold text-center">
                💝 Contribuer maintenant
              </a>
              <a href="#histoire" className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-rose-300 hover:text-rose-600 transition-all text-center">
                Découvrir son histoire →
              </a>
            </div>

            {/* Quick stats */}
            <div className="opacity-0 animate-fade-up-delay-3 mt-10 flex gap-8">
              <QuickStat number="200K" label="Objectif FCFA" />
              <QuickStat number="L3" label="Dernière année" />
              <QuickStat number="2025" label="Soutenance" />
            </div>
          </div>

          {/* Right - Photo */}
          <div className="order-1 lg:order-2 opacity-0 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-200/50 to-amber-200/50 rounded-3xl blur-2xl" />
              <div className="relative image-reveal rounded-3xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:max-w-none shadow-2xl">
                <img 
                  src="/images/photo1.jpg" 
                  alt={CONFIG.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-xl sm:text-2xl font-bold">{CONFIG.name}</p>
                  <p className="text-white/80 text-sm mt-1">{CONFIG.formation}</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl animate-float border border-rose-100">
                <div className="text-3xl animate-heartbeat">❤️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuickStat({ number, label }) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl font-bold text-gray-900">{number}</div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}

function StorySection() {
  const [ref, isVisible] = useInView()

  return (
    <section id="histoire" ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-20" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
              Son Parcours
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              L'histoire de <span className="gradient-text">{CONFIG.shortName}</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Photos - 2 cols */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="image-reveal rounded-2xl overflow-hidden aspect-[3/4]">
                <img src="/images/photo2.jpg" alt="Naomie" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden aspect-[3/4] mt-8">
                <img src="/images/photo3.jpg" alt="Naomie" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          {/* Story - 3 cols */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-6">
              <StoryBlock 
                emoji="🎓"
                title="Une étudiante brillante et déterminée"
                text={`${CONFIG.shortName} est actuellement en dernière année de Licence en Réseaux et Télécommunications à l'UCAO-UUC de Cotonou. Disciplinée, curieuse et travailleuse, elle s'est battue pour arriver jusqu'ici. Sa formation lui a permis d'acquérir des compétences en programmation (PHP, Java, HTML/CSS), en développement web, et en outils informatiques.`}
              />
              <StoryBlock 
                emoji="💔"
                title="Un coup dur au pire moment"
                text="Son ordinateur portable, son seul outil de travail, vient de la lâcher. Sans PC, elle ne peut ni développer son projet de fin d'études, ni préparer sa soutenance qui approche à grands pas. Elle a déjà vécu une mauvaise expérience en empruntant un ordinateur et hésite à retenter l'aventure."
              />
              <StoryBlock 
                emoji="🌟"
                title="Pourquoi votre aide est cruciale"
                text="Les soutenances arrivent bientôt. Chaque jour qui passe sans ordinateur est un jour de retard sur son projet. Avec votre contribution, aussi petite soit-elle, vous lui offrez bien plus qu'un PC : vous lui offrez la possibilité de décrocher son diplôme et de construire son avenir."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StoryBlock({ emoji, title, text }) {
  return (
    <div className="card-elevated rounded-2xl p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="text-2xl sm:text-3xl flex-shrink-0 mt-1">{emoji}</span>
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{text}</p>
        </div>
      </div>
    </div>
  )
}

function CVSection() {
  const [ref, isVisible] = useInView()

  const skills = [
    { name: "PHP / Java / HTML-CSS", level: 60 },
    { name: "WordPress", level: 55 },
    { name: "Adobe Photoshop", level: 40 },
    { name: "MS Office (Word, Excel, PPT)", level: 85 },
  ]

  const languages = [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Scolaire" },
    { name: "Fon", level: "Maternelle" },
  ]

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
              Profil Académique
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Qui est <span className="gradient-text">{CONFIG.shortName}</span> ?
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Un aperçu de son parcours, ses compétences et sa détermination.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Formation */}
          <div className="card-elevated rounded-3xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg">🎓</span>
              Formation
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-rose-200">
                <div className="absolute left-0 top-0 w-3 h-3 bg-rose-500 rounded-full -translate-x-[7px]" />
                <p className="font-semibold text-gray-900">Licence 3 — Réseaux & Télécommunications</p>
                <p className="text-sm text-gray-500 mt-1">UCAO-UUC • En cours (2024-2025)</p>
              </div>
              <div className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute left-0 top-0 w-3 h-3 bg-gray-300 rounded-full -translate-x-[7px]" />
                <p className="font-semibold text-gray-900">Baccalauréat Série D</p>
                <p className="text-sm text-gray-500 mt-1">CS Abbé Florent Nascimento • 2022</p>
              </div>
            </div>
            
            {/* Langues */}
            <h4 className="font-display text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">🌍</span>
              Langues
            </h4>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span key={lang.name} className="px-4 py-2 rounded-full bg-warm-50 border border-warm-200 text-sm">
                  <strong>{lang.name}</strong> <span className="text-gray-400">·</span> {lang.level}
                </span>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div className="card-elevated rounded-3xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">💻</span>
              Compétences Techniques
            </h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar-fill h-full"
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-display text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg">✨</span>
              Qualités personnelles
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Ponctualité", "Discipline", "Esprit d'équipe", "Curiosité", "Envie d'apprendre", "Respect"].map((q) => (
                <span key={q} className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 text-sm text-gray-700">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PCSection() {
  const [ref, isVisible] = useInView()
  const [activeImg, setActiveImg] = useState(0)
  const pcImages = ["/images/pc1.jpg", "/images/pc2.jpg", "/images/pc3.jpg"]

  return (
    <section id="pc" ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-20" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            💻 L'outil nécessaire
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Le PC qui changera <span className="gradient-text">tout</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Un ordinateur professionnel, fiable et performant pour mener à bien son projet de fin d'études.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* PC Images */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="image-reveal rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100">
                <img 
                  src={pcImages[activeImg]} 
                  alt={CONFIG.pcName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex gap-3 mt-4 justify-center">
                {pcImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-rose-500 shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PC Specs */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="card-elevated rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">RECONDITIONNÉ</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">GARANTI</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
                {CONFIG.pcName}
              </h3>
              <p className="text-gray-500 mt-2 mb-8">Livré avec sacoche + SAV Garantie</p>

              <div className="grid grid-cols-2 gap-4">
                {PC_SPECS.map((spec) => (
                  <div key={spec.label} className="p-4 rounded-2xl bg-warm-50/80 border border-warm-100">
                    <span className="text-lg">{spec.icon}</span>
                    <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{spec.label}</p>
                    <p className="font-semibold text-gray-900 text-sm mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-end justify-between p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Prix total</p>
                  <p className="font-display text-3xl sm:text-4xl font-bold gradient-text">{CONFIG.pcPrice}</p>
                </div>
                <a href="#contribuer" className="cta-button text-white px-6 py-3 rounded-full text-sm font-bold">
                  Participer →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContributeSection() {
  const [ref, isVisible] = useInView()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CONFIG.mtnNumber).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      // Fallback
      const el = document.createElement('textarea')
      el.value = CONFIG.mtnNumber
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section id="contribuer" ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="floating-shape w-80 h-80 bg-rose-400 -top-20 -right-40 animate-float" />
      <div className="floating-shape w-60 h-60 bg-amber-300 bottom-20 -left-30 animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            💝 Contribuer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Chaque geste <span className="gradient-text">compte</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
            Il n'y a pas de petite contribution. 500 FCFA, 1000 FCFA, 5000 FCFA… 
            ensemble, nous pouvons atteindre l'objectif.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 rounded-[2rem] blur-lg opacity-20 animate-pulse-slow" />
            <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-rose-100">
              
              {/* MTN MoMo Section */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400 mb-6">
                  <span className="text-3xl font-bold text-black">MTN</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                  Envoyez via MTN Mobile Money
                </h3>
                <p className="text-gray-500 mt-2">Rapide, simple et sécurisé</p>
              </div>

              {/* Number display */}
              <div className="bg-gradient-to-r from-warm-50 to-rose-50 rounded-2xl p-6 sm:p-8 mb-8 border border-warm-200">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 text-center">Numéro de dépôt</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="font-display text-3xl sm:text-5xl font-bold tracking-wider text-gray-900">
                    {CONFIG.mtnNumber}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className={`p-3 rounded-xl transition-all ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-white text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                    } shadow-sm border border-gray-200`}
                    title="Copier le numéro"
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-center mt-4 text-gray-600 font-medium">
                  Au nom de : <strong className="text-gray-900">{CONFIG.mtnName}</strong>
                </p>
                {copied && (
                  <p className="text-center mt-2 text-green-600 text-sm font-medium animate-fade-up">
                    ✅ Numéro copié !
                  </p>
                )}
              </div>

              {/* Steps */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <Step number="1" text="Ouvrez votre application MTN MoMo" />
                <Step number="2" text={`Envoyez au ${CONFIG.mtnNumber}`} />
                <Step number="3" text="Montant de votre choix 💛" />
              </div>

              {/* Encouragement */}
              <div className="text-center p-6 rounded-2xl bg-rose-50 border border-rose-100">
                <p className="text-rose-800 font-medium text-sm sm:text-base leading-relaxed">
                  🙏 Même <strong>500 FCFA</strong> fait avancer la cagnotte. <br className="hidden sm:block" />
                  N'hésitez pas à <strong>partager cette page</strong> autour de vous, c'est aussi une façon d'aider !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share section */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-500 mb-4 font-medium">Partagez cette page ❤️</p>
          <div className="flex justify-center gap-3">
            <ShareButton 
              label="WhatsApp" 
              color="bg-green-500 hover:bg-green-600" 
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('🆘 Aidez Naomie à obtenir un PC pour finir ses études ! Chaque contribution compte 💛 ' + window.location.href)}`, '_blank')} 
            />
            <ShareButton 
              label="Facebook" 
              color="bg-blue-600 hover:bg-blue-700" 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} 
            />
            <ShareButton 
              label="Copier le lien" 
              color="bg-gray-700 hover:bg-gray-800" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert('Lien copié !')
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ number, text }) {
  return (
    <div className="text-center p-4 rounded-xl bg-warm-50/50">
      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">
        {number}
      </div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )
}

function ShareButton({ label, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-sm`}
    >
      {label}
    </button>
  )
}

function UrgencyBanner() {
  const [ref, isVisible] = useInView()
  
  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-amber-100 rounded-[2rem] blur-xl opacity-60" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 sm:p-16 border border-white shadow-lg">
            <span className="text-5xl sm:text-6xl mb-6 block animate-heartbeat">🎓</span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Le temps presse
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Les soutenances approchent rapidement. Sans ordinateur, {CONFIG.shortName} ne pourra pas 
              développer son projet de fin d'études. <strong className="text-rose-600">Chaque jour compte.</strong>
              <br /><br />
              Votre contribution, quelle que soit sa taille, est un pas de plus vers son diplôme. 
              Ensemble, montrons-lui qu'elle n'est pas seule dans ce combat.
            </p>
            <a href="#contribuer" className="cta-button inline-block text-white px-10 py-4 rounded-full text-lg font-bold">
              💝 Aider {CONFIG.shortName} maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative py-12 border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-xl font-bold text-rose-600 mb-3">❤️ SolidaritéPC</p>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            Une initiative solidaire pour aider {CONFIG.name} à obtenir 
            un ordinateur et terminer ses études.
          </p>
          <div className="section-divider max-w-xs mx-auto mb-6" />
          <p className="text-gray-300 text-xs">
            Cagnotte initiée avec amour · Cotonou, Bénin · 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <StorySection />
      <CVSection />
      <PCSection />
      <ContributeSection />
      <UrgencyBanner />
      <Footer />
    </div>
  )
}
