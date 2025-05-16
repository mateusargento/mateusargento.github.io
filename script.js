document.addEventListener('DOMContentLoaded', function () {
    // Links do menu desktop
    const linksDesktop = document.querySelectorAll('.menu-desktop-link')
    const projectsButton = document.querySelector('#buttonProjects')

    function handleScroll(event) {
        event.preventDefault()

        const id = this.getAttribute('href') || this.getAttribute('form')
        const idFormatted = id.substring(1)
        const selectedSection = document.getElementById(idFormatted)
        const headerHeight = 100

        if (selectedSection) {
            const top = selectedSection.offsetTop - headerHeight

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })
        }
    }

    // Ao clicar nos links do menu
    linksDesktop.forEach((link) => {
        link.addEventListener('click', handleScroll)
    })

    // Ao clicar no botão para visualizar os projetos
    projectsButton.addEventListener('click', handleScroll)
})
