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

// Loader - notfound404 style
const loader = document.getElementById('loader')!
const menuBtn = document.getElementById('menuBtn')!
const mobileMenu = document.getElementById('mobileMenu')!

window.addEventListener('load', () => {
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
