import { useEffect, useMemo, useRef, useState } from 'react'
import '../animations.css'
import '../layout-styles.css'

const DAY = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const getBusinessIdFromPath = () => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[0] !== 'preview') return null
  const id = Number(parts[1])
  return Number.isInteger(id) && id > 0 ? id : null
}

const getSubdomainFromHost = () => {
  const host = window.location.hostname
  // Extract subdomain (first part before first dot)
  // localhost:5172 -> null
  // donpepe.haychatbusiness.com -> donpepe
  if (host === 'localhost' || host.startsWith('127.')) return null
  const parts = host.split('.')
  if (parts.length > 1) return parts[0]
  return null
}

const normalizeHex = (value) => {
  const input = String(value || '').trim()
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(input)) return null
  if (input.length === 4) {
    const r = input[1]
    const g = input[2]
    const b = input[3]
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }
  return input.toUpperCase()
}

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

const sanitizeBrandColor = (input, fallback) => {
  const hex = normalizeHex(input)
  // Only use hex if it's valid, otherwise use fallback
  return hex || fallback
}

const normalizeMoney = (value) => {
  const n = Number(value ?? 0)
  return n.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  })
}

const getDiscountLabel = (promo) => {
  if (promo.discount_type === 'percentage') return `${promo.discount_value}% OFF`
  return `${normalizeMoney(promo.discount_value)} OFF`
}

const computeOpenNow = (hours) => {
  if (!hours?.length) return false
  const now = new Date()
  const today = now.getDay()
  const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const dayConfig = hours.find((h) => Number(h.day_of_week) === today)
  if (!dayConfig || dayConfig.is_closed || !dayConfig.open_time || !dayConfig.close_time) return false
  return current >= dayConfig.open_time && current <= dayConfig.close_time
}

const RevealSection = ({ children, className = '', id, delay = 0 }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(26px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </section>
  )
}

export default function BusinessWebPreview() {
  const businessId = useMemo(() => getBusinessIdFromPath(), [])
  const subdomain = useMemo(() => getSubdomainFromHost(), [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [payload, setPayload] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSlide, setActiveSlide] = useState(0)
  const [menuSlideIndex, setMenuSlideIndex] = useState(0)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Function to fetch preview data
  const fetchPreviewData = useMemo(() => async () => {
    if (!businessId && !subdomain) return

    const endpoint = subdomain
      ? `/admin/public/webpage/${subdomain}`
      : `/admin/public/webpage-preview/${businessId}`

    try {
      const res = await fetch(endpoint)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'No se pudo cargar el preview')
      setPayload(json.data)
      setError('')
      setLastUpdate(new Date())
    } catch (err) {
      setError(err.message)
    }
  }, [businessId, subdomain])

  // Initial load
  useEffect(() => {
    setLoading(true)
    fetchPreviewData().finally(() => setLoading(false))
  }, [businessId, subdomain, fetchPreviewData])

  // Auto-refresh every 2 seconds
  useEffect(() => {
    if (!businessId && !subdomain) return
    
    const interval = setInterval(fetchPreviewData, 2000)
    return () => clearInterval(interval)
  }, [businessId, subdomain, fetchPreviewData])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    
    html.classList.add('preview-mode')
    body.classList.add('preview-mode')
    
    html.style.backgroundColor = '#FFFFFF !important'
    body.style.backgroundColor = '#FFFFFF !important'
    body.style.color = '#171717 !important'
    
    return () => {
      html.classList.remove('preview-mode')
      body.classList.remove('preview-mode')
      html.removeAttribute('style')
      body.removeAttribute('style')
    }
  }, [])

  // Move all hooks BEFORE conditional returns
  const { business, webpage, links, products, services, promotions, hours } = payload ?? {
    business: {},
    webpage: {},
    links: {},
    products: [],
    services: [],
    promotions: [],
    hours: [],
  }
  const config = webpage?.config ?? {}
  const media = webpage?.media ?? []
  const notices = webpage?.notices ?? []

  const mainColor = sanitizeBrandColor(config?.theme_json?.primary, '#E10600')
  const accent = sanitizeBrandColor(config?.theme_json?.accent, '#FFC727')
  const lightBg = `${mainColor}14`
  const warmBg = `linear-gradient(135deg, ${mainColor}10, ${accent}22)`
  const openNow = computeOpenNow(hours)

  const heroTitle = config.hero_title || business.name
  const heroSubtitle = config.hero_subtitle || business.description || 'El sabor que se antoja, rápido y delicioso.'

  const slides = useMemo(() => {
    const list = (media || [])
      .filter((m) => m.is_active === true && m.url)
      .map((m) => ({ id: m.id, url: m.url, alt: m.alt_text || business.name, section: m.section }))
    const dedup = []
    const seen = new Set()
    for (const item of list) {
      if (seen.has(item.url)) continue
      seen.add(item.url)
      dedup.push(item)
    }
    return dedup
  }, [media, business.name])

  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4200)
    return () => clearInterval(t)
  }, [slides.length])

  useEffect(() => {
    if (activeSlide >= slides.length) setActiveSlide(0)
  }, [slides.length, activeSlide])

  // NOW we can do conditional returns
  if (loading) return <div className="min-h-screen bg-white text-[#171717] p-8">Cargando preview...</div>

  if (error) {
    return (
      <div className="min-h-screen bg-white text-[#171717] p-8">
        <h1 className="text-2xl font-semibold mb-3">Preview local</h1>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  const categories = ['all', ...new Set(products.map((p) => p.category_name || 'Sin categoría'))]
  const visibleProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => (p.category_name || 'Sin categoría') === activeCategory)

  const categoryCards = categories.filter((c) => c !== 'all').map((name, idx) => ({
    name,
    count: products.filter((p) => (p.category_name || 'Sin categoría') === name).length,
    image: slides[idx % (slides.length || 1)]?.url || null,
  }))

  const currentSlide = slides[activeSlide]

  const onPrevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const onNextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)

  return (
    <div className={`min-h-screen bg-white text-[#171717] layout-${config?.layout_style || 'modern'}`} style={{ fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif' }}>
      <div className="sticky top-0 z-50 shadow-md animate-fade-in-up" style={{ background: mainColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {config?.logo_url ? (
              <img 
                src={config.logo_url} 
                alt={business.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-white/95 text-[#111] grid place-items-center font-black text-sm">
                {String(business.name || 'B').slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="text-white">
              <p className="font-black leading-tight uppercase tracking-wide">{business.name}</p>
              <p className="text-xs text-white/90">Preview local</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-white text-sm font-semibold">
            <a href="#promos" className="hover:opacity-80 transition-opacity">Promos</a>
            <a href="#categorias" className="hover:opacity-80 transition-opacity">Categorías</a>
            <a href="#menu" className="hover:opacity-80 transition-opacity">Menú</a>
            <a href="#contacto" className="hover:opacity-80 transition-opacity">Contacto</a>
          </nav>

          {links.chat && (
            <a
              href={links.chat}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-md text-sm font-black uppercase tracking-wide transition-all hover:scale-[1.03] active:scale-95"
              style={{ background: '#fff', color: mainColor }}
            >
              Ordenar
            </a>
          )}
        </div>
      </div>

      <header className="border-b border-[#ececec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 grid lg:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-in-left">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold animate-fade-in-up" style={{ color: mainColor, animationDelay: '0.1s' }}>Fast Food Experience</p>
            <h1 className="mt-3 text-4xl md:text-6xl leading-[0.95] font-black animate-fade-in-up" style={{ fontFamily: '"Impact", "Arial Black", sans-serif', animationDelay: '0.2s' }}>
              {heroTitle}
            </h1>
            <p className="mt-4 text-[#3a3a3a] text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{heroSubtitle}</p>

            <div className="mt-6 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {links.chat && (
                <a
                  href={links.chat}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-md text-white font-black uppercase text-sm tracking-wide transition-all hover:translate-y-[-2px] shadow-md hover:shadow-xl active:scale-95"
                  style={{ background: mainColor }}
                >
                  Ordena ahora
                </a>
              )}
              <a
                href="#menu"
                className="px-6 py-3 rounded-md font-bold text-sm border border-[#d4d4d4] transition-all hover:bg-[#f8f8f8] hover:scale-[1.02]"
              >
                Ver menú
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <span className="px-3 py-1 rounded-full font-semibold" style={{ background: lightBg, color: mainColor }}>
                {openNow ? 'Abierto ahora' : 'Cerrado ahora'}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f3f3f3]">{products.length} productos</span>
              <span className="px-3 py-1 rounded-full bg-[#f3f3f3]">{promotions.length} promos</span>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="rounded-2xl overflow-hidden border border-[#e4e4e4] shadow-xl bg-[#fafafa] hover-lift">
              <div className="aspect-[4/3] relative">
                {currentSlide ? (
                  <img src={currentSlide.url} alt={currentSlide.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-6xl animate-pulse" style={{ background: warmBg }}>🍔</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/80">Destacado</p>
                  <p className="font-black">{business.name}</p>
                </div>
              </div>
            </div>

            {slides.length > 1 && (
              <>
                <button
                  onClick={onPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/95 border border-[#e4e4e4] shadow grid place-items-center hover:scale-105 transition-transform active:scale-95"
                >
                  ‹
                </button>
                <button
                  onClick={onNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/95 border border-[#e4e4e4] shadow grid place-items-center hover:scale-105 transition-transform active:scale-95"
                >
                  ›
                </button>
                <div className="flex justify-center gap-2 mt-3">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(i)}
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: i === activeSlide ? 24 : 10, background: i === activeSlide ? mainColor : '#cfcfcf' }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {!!notices.length && (
          <RevealSection className="rounded-xl overflow-hidden border border-[#ebebeb] shadow-sm">
            <div className="px-4 py-2 text-white text-sm font-bold uppercase tracking-wide" style={{ background: mainColor }}>
              Avisos importantes
            </div>
            <div className="divide-y divide-[#efefef] bg-[#fffdf8] animate-stagger">
              {notices.map((n) => (
                <article key={n.id} className="p-4">
                  <h3 className="font-black text-lg">{n.title}</h3>
                  <p className="text-[#424242] mt-1">{n.body || 'Sin contenido.'}</p>
                </article>
              ))}
            </div>
          </RevealSection>
        )}

        {!!promotions.length && (
          <RevealSection id="promos" delay={0.05}>
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-3xl font-black" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>Promociones</h2>
              <span className="text-sm text-[#666]">Ofertas por tiempo limitado</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger">
              {promotions.map((promo) => (
                <article
                  key={promo.id}
                  className="rounded-2xl p-5 border border-[#ececec] transition-all hover:translate-y-[-4px] hover:shadow-xl hover:scale-[1.02]"
                  style={{ background: warmBg }}
                >
                  <p className="inline-block text-xs font-black uppercase px-2.5 py-1 rounded" style={{ background: accent, color: '#111' }}>
                    {getDiscountLabel(promo)}
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">{promo.title}</h3>
                  <p className="text-[#4a4a4a] mt-2">{promo.description || 'Promoción especial para ti.'}</p>
                </article>
              ))}
            </div>
          </RevealSection>
        )}

        {!!categoryCards.length && (
          <RevealSection id="categorias" delay={0.08}>
            <h2 className="text-3xl font-black mb-5" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>Categorías</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryCards.map((cat, i) => (
                <article
                  key={cat.name}
                  className="group rounded-2xl overflow-hidden border border-[#ececec] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => setActiveCategory(cat.name)}
                >
                  <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${mainColor}22, ${accent}33)` }}>
                    {cat.image && <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-black text-lg">{cat.name}</h3>
                    <p className="text-sm text-[#666]">{cat.count} opciones</p>
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>
        )}

        <RevealSection id="menu" delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h2 className="text-3xl font-black" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>Menú</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setMenuSlideIndex(0)
                    }}
                    className="px-4 py-2 rounded-full text-sm border transition-all hover:scale-[1.02]"
                    style={active ? { background: mainColor, borderColor: mainColor, color: '#fff' } : { borderColor: '#d3d3d3', color: '#333', background: '#fff' }}
                  >
                    {cat === 'all' ? 'Todo' : cat}
                  </button>
                )
              })}
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <p className="text-[#666]">No hay productos para esta categoría.</p>
          ) : (
            <div className="relative">
              {/* Carousel Grid - 3 productos por slide */}
              {(() => {
                const itemsPerSlide = 3
                const slides = []
                for (let i = 0; i < visibleProducts.length; i += itemsPerSlide) {
                  slides.push(visibleProducts.slice(i, i + itemsPerSlide))
                }

                return (
                  <>
                    {/* Slider Container */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fafafa] to-[#ffffff] p-8">
                      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${menuSlideIndex * 100}%)` }}>
                        {slides.map((slideGroup, slideIdx) => (
                          <div key={slideIdx} className="min-w-full">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-stagger">
                              {slideGroup.map((product, i) => {
                                const cardImage = slides[0][i % (slides[0].length || 1)]?.slides?.url
                                return (
                                  <article key={product.id} className="group rounded-2xl overflow-hidden border border-[#ececec] bg-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className="h-48 relative" style={{ background: `linear-gradient(135deg, ${mainColor}22, ${accent}33)` }}>
                                      {product && visibleProducts.indexOf(product) < visibleProducts.length && slides[Math.floor(visibleProducts.indexOf(product) / itemsPerSlide)]?.[visibleProducts.indexOf(product) % itemsPerSlide]?.url ? (
                                        <img 
                                          src={slides[Math.floor(visibleProducts.indexOf(product) / itemsPerSlide)][visibleProducts.indexOf(product) % itemsPerSlide]?.url} 
                                          alt={product.name} 
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                      ) : slides.flat()[visibleProducts.indexOf(product) % visibleProducts.length]?.url ? (
                                        <img 
                                          src={slides.flat()[visibleProducts.indexOf(product) % visibleProducts.length]?.url} 
                                          alt={product.name} 
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                      ) : (
                                        <div className="w-full h-full grid place-items-center text-6xl animate-pulse">🍗</div>
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                      <span
                                        className="absolute top-3 right-3 text-xs font-black px-2.5 py-1 rounded shadow-lg transition-transform group-hover:scale-110"
                                        style={{ background: accent, color: '#111' }}
                                      >
                                        {normalizeMoney(product.price)}
                                      </span>
                                    </div>
                                    <div className="p-4">
                                      <h3 className="font-black text-sm leading-tight line-clamp-2">{product.name}</h3>
                                      <p className="text-[#666] text-xs mt-2 line-clamp-2">{product.description || 'Delicioso'}</p>
                                      {links.chat && (
                                        <a
                                          href={links.chat}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex mt-3 px-3 py-1.5 rounded-md text-xs font-bold text-white transition-all hover:translate-y-[-2px] w-full justify-center"
                                          style={{ background: mainColor }}
                                        >
                                          Pedir
                                        </a>
                                      )}
                                    </div>
                                  </article>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Navigation Buttons */}
                      {slides.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setMenuSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
                            }
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg border border-[#e4e4e4] grid place-items-center hover:bg-[#f8f8f8] hover:scale-110 transition-all"
                            style={{ color: mainColor }}
                          >
                            ‹
                          </button>
                          <button
                            onClick={() =>
                              setMenuSlideIndex((prev) => (prev + 1) % slides.length)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg border border-[#e4e4e4] grid place-items-center hover:bg-[#f8f8f8] hover:scale-110 transition-all"
                            style={{ color: mainColor }}
                          >
                            ›
                          </button>

                          {/* Dots */}
                          <div className="flex justify-center gap-2 mt-6">
                            {slides.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setMenuSlideIndex(i)}
                                className="h-3 rounded-full transition-all"
                                style={{
                                  width: i === menuSlideIndex ? 32 : 12,
                                  background: i === menuSlideIndex ? mainColor : '#d3d3d3',
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </RevealSection>

        {!!services.length && (
          <RevealSection delay={0.12}>
            <h2 className="text-3xl font-black mb-5" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>Servicios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <article key={s.id} className="rounded-2xl border border-[#ececec] p-5 bg-[#fffdf8] transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="font-black text-lg">{s.name}</h3>
                  <p className="text-sm text-[#555] mt-2">{s.description || 'Servicio disponible para tus clientes.'}</p>
                  <p className="mt-3 text-xl font-black" style={{ color: mainColor }}>{normalizeMoney(s.price)}</p>
                </article>
              ))}
            </div>
          </RevealSection>
        )}

        <RevealSection delay={0.15}>
          <h2 className="text-3xl font-black mb-4" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>Horarios</h2>
          {hours.length === 0 ? (
            <p className="text-[#666]">No hay horarios configurados.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {hours.map((h) => (
                <div key={h.id} className="rounded-lg border border-[#ececec] p-3 bg-white flex justify-between">
                  <span>{DAY[h.day_of_week] ?? `Día ${h.day_of_week}`}</span>
                  <span className="font-semibold">{h.is_closed ? 'Cerrado' : `${h.open_time} - ${h.close_time}`}</span>
                </div>
              ))}
            </div>
          )}
        </RevealSection>
      </main>

      <footer id="contacto" className="bg-[#121212] text-white mt-14 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-black">{business.name}</h3>
            <p className="text-white/70 text-sm mt-2">Comida rápida con experiencia premium.</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#promos" className="hover:text-white transition-colors">Promociones</a></li>
              <li><a href="#categorias" className="hover:text-white transition-colors">Categorías</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menú</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>{business.phone || 'Teléfono no disponible'}</li>
              <li>{business.email || 'Correo no disponible'}</li>
              <li>{business.city || 'Ciudad no disponible'}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Síguenos</h4>
            <div className="flex gap-3 animate-stagger">
              {config?.social_json?.facebook && (
                <a 
                  href={config.social_json.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 text-white grid place-items-center hover:bg-[#1877F2] hover:scale-110 transition-all duration-300"
                  title="Facebook"
                >
                  <span className="font-bold text-lg">f</span>
                </a>
              )}
              {config?.social_json?.instagram && (
                <a 
                  href={config.social_json.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 text-white grid place-items-center hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:scale-110 transition-all duration-300"
                  title="Instagram"
                >
                  <span className="font-bold text-lg">📷</span>
                </a>
              )}
              {config?.social_json?.tiktok && (
                <a 
                  href={config.social_json.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 text-white grid place-items-center hover:bg-[#000000] hover:scale-110 transition-all duration-300"
                  title="TikTok"
                >
                  <span className="font-bold text-lg">🎵</span>
                </a>
              )}
              {config?.social_json?.whatsapp && (
                <a 
                  href={`https://wa.me/${config.social_json.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 text-white grid place-items-center hover:bg-[#25D366] hover:scale-110 transition-all duration-300"
                  title="WhatsApp"
                >
                  <span className="font-bold text-lg">💬</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
