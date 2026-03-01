import './style.css'
import { getStoredLang, setStoredLang, applyTranslations, type Lang } from './i18n'

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
