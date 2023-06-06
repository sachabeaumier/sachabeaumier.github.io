// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a')
const navbar = document.querySelector('nav')
const navbarHeight = navbar.offsetHeight
let isNavbarLocked = false

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const targetId = link.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    targetElement.scrollIntoView({ behavior: 'smooth' })
    closeNavigationMenu()
  })
})

// Responsive navigation menu
const menuButton = document.querySelector('.menu-button')
const navigation = document.querySelector('nav ul')

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('show')
})

// Lock the navbar to the top when scrolling down
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset

  if (scrollPosition > navbarHeight && !isNavbarLocked) {
    navbar.classList.add('navbar-locked')
    isNavbarLocked = true
  } else if (scrollPosition <= navbarHeight && isNavbarLocked) {
    navbar.classList.remove('navbar-locked')
    isNavbarLocked = false
  }
})

function closeNavigationMenu() {
  navigation.classList.remove('show')
}
