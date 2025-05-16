document.addEventListener('DOMContentLoaded', function () {
    function handleScroll(event) {
        event.preventDefault()

        const id = this.getAttribute('href') || this.getAttribute('form')
        const idFormatted = id.substring(1) // Remove o "#" do id
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
    const linksMenuDesktop = document.querySelectorAll('.menu-desktop-link')
    linksMenuDesktop.forEach((link) => {
        link.addEventListener('click', handleScroll)
    })

    // Ao clicar no botão para visualizar os projetos
    const projectsButton = document.querySelector('#buttonProjects')
    projectsButton.addEventListener('click', handleScroll)


    // Ao rolar a tela, ativa o box-shadow do menu desktop
    // Ao rolar a tela, deixa em negrito o link do menu correspondente ao tópico que está sendo mostrado na tela
    const sectionList = document.querySelectorAll('main > section')
    let sectionOffsetTopList = []
    sectionList.forEach((section) => sectionOffsetTopList.push(section.offsetTop))

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY
        const minScrollY = 100
        const screenWidth = window.screen.width
        const minWidthDesktop = 1024
        const boxShadow = "0 2px 4px #00000025"

        scrollY >= minScrollY && screenWidth >= minWidthDesktop
            ? document.getElementsByTagName('header')[0].style.boxShadow = boxShadow
            : document.getElementsByTagName('header')[0].style.boxShadow = ""

        let smallerSectionOffsetTopAndScrollYDifference = sectionOffsetTopList[sectionList.length - 1]

        sectionOffsetTopList.forEach((sectionOffsetTop, i) => {
            const sectionOffsetTopAndScrollYDifference = Math.abs(sectionOffsetTop - scrollY)

            if (sectionOffsetTopAndScrollYDifference <= smallerSectionOffsetTopAndScrollYDifference) {
                smallerSectionOffsetTopAndScrollYDifference = sectionOffsetTopAndScrollYDifference

                linksMenuDesktop.forEach((item) => {
                    item.style.fontWeight = 'normal'
                })
                linksMenuDesktop[i].style.fontWeight = 'bold'
            }
        })
    })
})
