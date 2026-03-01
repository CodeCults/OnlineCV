const translations: Record<string, Record<string, string>> = {
  tr: {
    'nav.projects': 'Projeler',
    'nav.skills': 'Nitelikler',
    'nav.about': 'Hakkımda',
    'nav.contact': 'İletişim',
    'hero.student': 'Öğrenci',
    'hero.email': 'E-posta gönder',
    'hero.about1': 'Merhaba, ben Eren. <a href="https://www.ademceylantk.com.tr/" target="_blank" rel="noopener">Özel Adem Ceylan Final Teknik Koleji</a>\'nde Bilişim Teknolojileri öğrencisiyim. Yazılım geliştirme, web uygulamaları ve mobil projelerle ilgileniyorum. Takım çalışmasına önem veriyor, yeni teknolojileri keşfetmeyi seviyorum.',
    'hero.about2': 'Projelerime <a href="https://github.com/403fx" target="_blank" rel="noopener">GitHub</a> üzerinden ulaşabilirsiniz.',
    'currentlyWorking.title': 'Şu an üzerinde çalışıyorum',
    'currentlyWorking.e_cenaze': 'Arkadaşlarımla birlikte bu uygulama üzerinde çalışıyorum. Takım çalışması başta zordu ama artık üstesinden gelebiliyoruz.',
    'currentlyWorking.studyMate': 'Öğrenciler için ders çalışma arkadaşı uygulaması.',
    'skills.title': 'Nitelikler',
    'skills.hint': 'İkonların üzerine gelerek veya tıklayarak detayları görebilirsiniz. Kenarlık rengi türü, opaklık ise yetkinlik seviyesini gösterir.',
    'skills.cisco.desc': 'Ağ yapılandırması ve Cisco cihazları konusunda %90 seviyesinde kullanabiliyorum.',
    'skills.python.desc': 'Temel seviyede Python biliyorum.',
    'skills.linux.desc': 'Linux işletim sistemini kullanabiliyorum.',
    'skills.vscode.desc': 'VS Code editörünü etkin şekilde kullanabiliyorum.',
    'skills.cursor.desc': 'Cursor AI editörünü %100 kullanabiliyorum.',
    'skills.git.desc': 'Git versiyon kontrol sistemini kullanabiliyorum.',
    'skills.html.desc': 'Temel HTML yapısını anlayabiliyorum, baktığımda yapıyı çözebiliyorum.',
    'skills.category.network': 'Ağ',
    'skills.category.language': 'Dil',
    'skills.category.system': 'Sistem',
    'skills.category.tool': 'Araç',
    'projects.title': 'Projeler',
    'project.autoSummarizer': 'Yapay zeka destekli metin özetleme aracı',
    'project.cv': 'Online CV / Portfolyo',
    'project.loadIt': 'Fitness takip uygulaması',
    'project.basicSpoofer': 'Discord ban atlama aracı',
    'project.toDoList': 'JS, CSS, HTML öğrenme projesi',
    'project.code': 'Kod',
    'project.live': 'Canlı',
    'contact.title': 'İletişim',
    'footer.text': '© 2026 Eren · Tutkuyla yapıldı',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.student': 'Student',
    'hero.email': 'Click to send an E-mail',
    'hero.about1': 'Hi, I\'m Eren. I\'m an IT student at <a href="https://www.ademceylantk.com.tr/" target="_blank" rel="noopener">Özel Adem Ceylan Final Teknik Koleji</a>. I\'m interested in software development, web apps and mobile projects. I value teamwork and enjoy exploring new technologies.',
    'hero.about2': 'You can find my projects on <a href="https://github.com/403fx" target="_blank" rel="noopener">GitHub</a>.',
    'currentlyWorking.title': 'Currently working on',
    'currentlyWorking.e_cenaze': 'Currently working on this app with my friends. Working as a team was hard at first but now we can handle it.',
    'currentlyWorking.studyMate': 'Study companion application for students.',
    'skills.title': 'Skills',
    'skills.hint': 'Hover or click on the icons to see more details. Border color represents type, opacity represents proficiency level.',
    'skills.cisco.desc': 'I can use Cisco at about 90% proficiency for network configuration and devices.',
    'skills.python.desc': 'Basic level Python knowledge.',
    'skills.linux.desc': 'I can use Linux operating system.',
    'skills.vscode.desc': 'I use VS Code editor effectively.',
    'skills.cursor.desc': 'I use Cursor AI editor at 100%.',
    'skills.git.desc': 'I can use Git version control system.',
    'skills.html.desc': 'I understand basic HTML structure and can figure it out when I look at it.',
    'skills.category.network': 'Network',
    'skills.category.language': 'Language',
    'skills.category.system': 'System',
    'skills.category.tool': 'Tool',
    'projects.title': 'Projects',
    'project.autoSummarizer': 'AI-powered text summarization tool',
    'project.cv': 'Online CV / Portfolio',
    'project.loadIt': 'Fitness tracking application',
    'project.basicSpoofer': 'Discord ban bypass utility',
    'project.toDoList': 'Trying to learn JS, CSS, HTML',
    'project.code': 'Code',
    'project.live': 'Live',
    'contact.title': 'Contact',
    'footer.text': '© 2026 Eren · Built with passion',
  },
}

const STORAGE_KEY = 'eren-lang'

export type Lang = 'tr' | 'en'

export function getStoredLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  return (stored === 'en' || stored === 'tr') ? stored : 'tr'
}

export function setStoredLang(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang)
}

export function t(key: string, lang: Lang): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key
}

export function applyTranslations(lang: Lang): void {
  document.documentElement.lang = lang === 'tr' ? 'tr' : 'en'

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    if (key) {
      el.textContent = t(key, lang)
    }
  })

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html')
    if (key) {
      el.innerHTML = t(key, lang)
    }
  })

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active')
    } else {
      btn.classList.remove('active')
    }
  })
}
