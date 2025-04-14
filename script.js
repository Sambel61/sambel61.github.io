document.addEventListener("DOMContentLoaded", () => {
  // Show loading screen for 2 seconds
  showLoadingScreen()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Initialize language
  initLanguage()

  // Initialize header scroll effect
  initHeaderScroll()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize hero slider
  initHeroSlider()

  // Initialize process steps
  initProcessSteps()

  // Initialize testimonials slider
  initTestimonialsSlider()

  // Initialize package vine animations
  initVineAnimations()

  // Initialize form submission
  initFormSubmission()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Initialize language dropdowns
  initLanguageDropdowns()
})

// Loading screen
function showLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")

  // Hide loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.classList.add("fade-out")

    // Remove loading screen from DOM after fade out animation
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
}

// Language handling
function initLanguage() {
  // Get saved language or default to English
  const savedLang = localStorage.getItem("language") || "en"
  setLanguage(savedLang)

  // Set active language in dropdowns
  document.querySelectorAll(".language-option").forEach((option) => {
    if (option.dataset.lang === savedLang) {
      option.classList.add("active")
    }

    option.addEventListener("click", () => {
      setLanguage(option.dataset.lang)
    })
  })
}

function setLanguage(lang) {
  // Save language preference
  localStorage.setItem("language", lang)

  // Update active language in dropdowns
  document.querySelectorAll(".language-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === lang)
  })

  // Set RTL for Arabic
  document.body.classList.toggle("rtl", lang === "ar")
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

  // Update text content
  updateTextContent(lang)
}

function updateTextContent(lang) {
  // Get translations for the selected language
  const translations = window.translations[lang] || window.translations.en

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n
    if (translations[key]) {
      element.textContent = translations[key]
    }
  })

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder
    if (translations[key]) {
      element.placeholder = translations[key]
    }
  })
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Mobile menu
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link")

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active")

    // Toggle between menu and close icons
    const menuIcon = menuToggle.querySelector("svg")
    if (mobileNav.classList.contains("active")) {
      menuIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
    } else {
      menuIcon.innerHTML =
        '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
    }
  })

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")

      // Reset menu icon
      const menuIcon = menuToggle.querySelector("svg")
      menuIcon.innerHTML =
        '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
    })
  })
}

// Hero slider
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".slider-dots .dot")
  const prevBtn = document.querySelector(".prev-slide")
  const nextBtn = document.querySelector(".next-slide")
  let currentSlide = 0
  let slideInterval

  // Function to show a specific slide
  const showSlide = (index) => {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show the selected slide
    slides[index].classList.add("active")
    dots[index].classList.add("active")
    currentSlide = index
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
      resetInterval()
    })
  })

  // Event listeners for prev/next buttons
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
    resetInterval()
  })

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
    resetInterval()
  })

  // Auto-advance slides
  const startInterval = () => {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }, 5000)
  }

  const resetInterval = () => {
    clearInterval(slideInterval)
    startInterval()
  }

  // Start the slideshow
  startInterval()
}

// Process steps
function initProcessSteps() {
  const steps = document.querySelectorAll(".process-step")
  const images = document.querySelectorAll(".process-image img")
  const caption = document.querySelector(".image-caption")
  const stepNumber = caption.querySelector(".step-number")
  const stepTitle = caption.querySelector(".step-title")
  const stepDescription = caption.querySelector(".step-description")

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      // Remove active class from all steps
      steps.forEach((s) => s.classList.remove("active"))

      // Add active class to clicked step
      step.classList.add("active")

      // Get step data
      const stepNum = step.getAttribute("data-step")
      const title = step.querySelector("h4").textContent
      const desc = step.querySelector("p").textContent

      // Update images
      images.forEach((img) => {
        img.classList.remove("active")
        if (img.getAttribute("data-step") === stepNum) {
          img.classList.add("active")
        }
      })

      // Update caption
      const translations = window.translations[localStorage.getItem("language") || "en"]
      stepNumber.textContent = `${translations["process.step"]} ${stepNum}:`
      stepTitle.textContent = title
      stepDescription.textContent = desc
    })
  })
}

// Testimonials slider
function initTestimonialsSlider() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const dots = document.querySelectorAll(".testimonial-dots .dot")
  const prevBtn = document.querySelector(".prev-testimonial")
  const nextBtn = document.querySelector(".next-testimonial")
  let currentTestimonial = 0

  // Function to show a specific testimonial
  const showTestimonial = (index) => {
    // Hide all testimonials
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show the selected testimonial
    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
    currentTestimonial = index
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Event listeners for prev/next buttons
  prevBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
    showTestimonial(currentTestimonial)
  })

  nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  })
}

// Package vine animations
function initVineAnimations() {
  const packageCards = document.querySelectorAll(".package-card")

  packageCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const vines = card.querySelectorAll(".vine-path")
      const leaves = card.querySelectorAll(".vine-leaf")

      vines.forEach((vine) => {
        vine.style.animation = "grow-vine 3s ease-out forwards"
      })

      leaves.forEach((leaf, index) => {
        leaf.style.animation = `leaf-appear 0.5s ease-out ${1.5 + index * 0.5}s forwards`
      })
    })

    card.addEventListener("mouseleave", () => {
      const vines = card.querySelectorAll(".vine-path")
      const leaves = card.querySelectorAll(".vine-leaf")

      vines.forEach((vine) => {
        vine.style.animation = "none"
      })

      leaves.forEach((leaf) => {
        leaf.style.animation = "none"
      })
    })
  })
}

// Form submission
function initFormSubmission() {
  const form = document.getElementById("whitelist-form")

  if (form) {
    // Update form action with the correct admin email
    const adminEmail = "your-email@example.com" // Replace with the actual admin email
    if (form.action.includes("your-email@example.com")) {
      form.action = form.action.replace("your-email@example.com", adminEmail)
    }

    // Update the _next hidden field with the correct domain
    const nextField = form.querySelector('input[name="_next"]')
    if (nextField && nextField.value.includes("yourdomain.com")) {
      const currentDomain = window.location.origin
      nextField.value = `${currentDomain}/thank-you.html`
    }

    // Add form submission event listener for validation
    form.addEventListener("submit", (e) => {
      // Show processing state
      const submitButton = form.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      const translations = window.translations[localStorage.getItem("language") || "en"]
      submitButton.textContent = translations["form.processing"] || "Processing..."
      submitButton.disabled = true

      // Form will be submitted normally to FormSubmit.co
      // No need to prevent default or handle submission manually

      // Reset button state after a short delay (in case submission is blocked)
      setTimeout(() => {
        if (document.activeElement === submitButton) {
          submitButton.textContent = originalText
          submitButton.disabled = false
        }
      }, 3000)
    })
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  const scrollLinks = document.querySelectorAll("[data-scroll]")

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("data-scroll")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        const mobileNav = document.querySelector(".mobile-nav")
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active")
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })
}

// Language dropdowns
function initLanguageDropdowns() {
  const dropdowns = document.querySelectorAll(".language-dropdown")

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".language-button")

    button.addEventListener("click", () => {
      dropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active")
      }
    })
  })

  // Floating language button
  const floatingButton = document.querySelector(".floating-language-button")
  if (floatingButton) {
    const toggleButton = floatingButton.querySelector(".language-toggle")

    toggleButton.addEventListener("click", () => {
      floatingButton.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!floatingButton.contains(e.target)) {
        floatingButton.classList.remove("active")
      }
    })
  }
}
