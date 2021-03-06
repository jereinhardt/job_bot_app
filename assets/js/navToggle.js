const navToggle = document.querySelector("[data-navigation-toggle]")

const toggleNavigation = (event) => {
  console.log(event)
  event.preventDefault()
  const itemsContainer = document.querySelector("[data-navigation-items-container]")
  itemsContainer.classList.toggle("expanded")
  if (navToggle.getAttribute("aria-expanded") === "true") {
    navToggle.setAttribute("aria-expanded", false)
  } else {
    navToggle.setAttribute("aria-expanded", true)
  }
}

navToggle.addEventListener("click", toggleNavigation);