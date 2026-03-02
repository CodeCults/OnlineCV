import './style.css'
import { getStoredLang, setStoredLang, applyTranslations, type Lang } from './i18n'

// Custom cursor - only on devices with mouse
const cursorTrail = document.getElementById('cursorTrail')!
const dot = cursorTrail.querySelector('.cursor-dot--main') as HTMLElement

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let initialized = false

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.15
  cursorY += (mouseY - cursorY) * 0.15
  dot.style.left = cursorX + 'px'
  dot.style.top = cursorY + 'px'
  requestAnimationFrame(updateCursor)
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    if (!initialized) {
      cursorX = e.clientX
      cursorY = e.clientY
      initialized = true
    }
    mouseX = e.clientX
    mouseY = e.clientY
  })
  requestAnimationFrame(updateCursor)

  const hoverTargets = 'a, button, .project-card, .currently-working-card, .hero-btn, .skill-item'
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursorTrail.classList.add('hover'))
    el.addEventListener('mouseleave', () => cursorTrail.classList.remove('hover'))
  })

  // Skill tooltip - click for mobile
  document.querySelectorAll('.skill-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault()
        document.querySelectorAll('.skill-item.active').forEach((other) => {
          if (other !== item) other.classList.remove('active')
        })
        item.classList.toggle('active')
      }
    })
  })
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.skill-item') && window.matchMedia('(hover: none)').matches) {
      document.querySelectorAll('.skill-item.active').forEach((el) => el.classList.remove('active'))
    }
  })
}

// e_cenaze photo gallery
// Fotoğrafları buraya ekle: public/screenshots/ klasörüne at, yolunu yaz
const eCenazePhotos: string[] = [
  '/screenshots/e_cenaze_1.png',
]

const lightbox = document.getElementById('lightbox')!
const lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement
const lightboxCounter = document.getElementById('lightboxCounter')!
const lightboxClose = document.getElementById('lightboxClose')!
const lightboxPrev = document.getElementById('lightboxPrev') as HTMLButtonElement
const lightboxNext = document.getElementById('lightboxNext') as HTMLButtonElement
const galleryBtn = document.getElementById('eCenazeGalleryBtn')!

let currentPhotoIndex = 0
let touchStartX = 0

function updateLightbox() {
  const photo = eCenazePhotos[currentPhotoIndex]
  lightboxImg.src = photo
  lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${eCenazePhotos.length}`
  lightboxPrev.disabled = currentPhotoIndex === 0
  lightboxNext.disabled = currentPhotoIndex === eCenazePhotos.length - 1
}

function showPhoto(index: number) {
  lightboxImg.classList.add('fading')
  setTimeout(() => {
    currentPhotoIndex = index
    updateLightbox()
    lightboxImg.classList.remove('fading')
  }, 150)
}

function openLightbox() {
  if (eCenazePhotos.length === 0) return
  currentPhotoIndex = 0
  updateLightbox()
  lightbox.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.classList.remove('open')
  document.body.style.overflow = ''
}

galleryBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  openLightbox()
})

lightboxClose.addEventListener('click', closeLightbox)

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox()
})

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation()
  if (currentPhotoIndex > 0) showPhoto(currentPhotoIndex - 1)
})

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation()
  if (currentPhotoIndex < eCenazePhotos.length - 1) showPhoto(currentPhotoIndex + 1)
})

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft' && currentPhotoIndex > 0) showPhoto(currentPhotoIndex - 1)
  if (e.key === 'ArrowRight' && currentPhotoIndex < eCenazePhotos.length - 1) showPhoto(currentPhotoIndex + 1)
})

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX
}, { passive: true })

lightbox.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) < 40) return
  if (diff > 0 && currentPhotoIndex < eCenazePhotos.length - 1) showPhoto(currentPhotoIndex + 1)
  if (diff < 0 && currentPhotoIndex > 0) showPhoto(currentPhotoIndex - 1)
}, { passive: true })

// Auto-sort skills by proficiency level (highest first)
const skillsGrid = document.querySelector('.skills-grid')
if (skillsGrid) {
  const items = Array.from(skillsGrid.querySelectorAll('.skill-item'))
  items.sort((a, b) => {
    const aLevel = parseInt(a.querySelector('.skill-level')?.textContent ?? '0')
    const bLevel = parseInt(b.querySelector('.skill-level')?.textContent ?? '0')
    return bLevel - aLevel
  })
  items.forEach(item => skillsGrid.appendChild(item))
}

// Loader - notfound404 style
const loader = document.getElementById('loader')!
const menuBtn = document.getElementById('menuBtn')!
const mobileMenu = document.getElementById('mobileMenu')!

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

window.addEventListener('load', () => {
  window.scrollTo(0, 0)
  setTimeout(() => {
    loader.classList.add('hidden')
  }, 600)
})

// Apply saved language on load
applyTranslations(getStoredLang())

// Language switcher
document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang') as Lang
    setStoredLang(lang)
    applyTranslations(lang)
  })
})

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
  menuBtn.classList.toggle('active')
})

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    menuBtn.classList.remove('active')
  })
})

// Visit toast - show when reaching the bottom, hide after 8 seconds
const visitToast = document.getElementById('visitToast')!
const footer = document.querySelector('.footer') as HTMLElement
let toastShown = false

const footerObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !toastShown) {
      toastShown = true
      visitToast.classList.add('show')
      setTimeout(() => visitToast.classList.remove('show'), 4000)
      footerObserver.disconnect()
    }
  },
  { threshold: 0.1 }
)

footerObserver.observe(footer)
