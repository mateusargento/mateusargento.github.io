document.addEventListener('DOMContentLoaded', function () {
    // Controla o menu mobile
    const menuMobileBg = document.querySelector('.menu-mobile-content-bg')
    const openMenuButton = document.querySelector('#menu-mobile-icon-open')
    const closeMenuButton = document.querySelector('#menu-mobile-icon-close')

    function handleMenuMobile(action) {
        const menuMobileContent = document.querySelector('.menu-mobile-content')

        if (action == 'open') {
            menuMobileBg.style.opacity = '1'
            menuMobileBg.style.visibility = 'visible'
            menuMobileContent.style.opacity = '1'
            menuMobileContent.style.visibility = 'visible'
            menuMobileContent.style.width = '70vw'
        }

        if (action == 'close') {
            menuMobileBg.style.opacity = '0'
            menuMobileBg.style.visibility = 'hidden'
            menuMobileContent.style.opacity = '0'
            menuMobileContent.style.visibility = 'hidden'
            menuMobileContent.style.width = '0vw'
        }
    }

    openMenuButton.addEventListener('click', () => handleMenuMobile('open'))
    closeMenuButton.addEventListener('click', () => handleMenuMobile('close'))
    menuMobileBg.addEventListener('click', () => handleMenuMobile('close'))



    function handleScroll(event) {
        event.preventDefault()

        const id = this.getAttribute('href') || this.getAttribute('form')
        const idFormatted = id.substring(1) // Remove o "#" do id
        const selectedSection = document.getElementById(idFormatted)
        const headerHeight = 100
        const screenWidth = window.screen.width

        if (selectedSection) {
            const top = selectedSection.offsetTop - headerHeight

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })

            screenWidth < 1024 && handleMenuMobile('close')
        }
    }

    // Ao clicar nos links do menu mobile
    const linksMenuMobile = document.querySelectorAll('.menu-mobile-link')
    linksMenuMobile.forEach((link) => {
        link.addEventListener('click', handleScroll)
    })

    // Ao clicar nos links do menu desktop
    const linksMenuDesktop = document.querySelectorAll('.menu-desktop-link')
    linksMenuDesktop.forEach((link) => {
        link.addEventListener('click', handleScroll)
    })

    // Ao clicar no botão da página inicial para visualizar os projetos
    const projectsButton = document.querySelector('#buttonProjects')
    projectsButton.addEventListener('click', handleScroll)


    // Ao rolar a tela, ativa o box-shadow do menu mobile e do menu desktop
    // Ao rolar a tela, deixa em negrito o link do menu desktop correspondente ao tópico que está sendo mostrado na tela
    const sectionList = document.querySelectorAll('main > section')
    let sectionOffsetTopList = []
    sectionList.forEach((section) => sectionOffsetTopList.push(section.offsetTop))

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY
        const minScrollY = 100
        const screenWidth = window.screen.width
        const minWidthDesktop = 1024
        const boxShadow = "0 2px 4px #00000025"

        scrollY >= minScrollY
            ? document.getElementsByTagName('header')[0].style.boxShadow = boxShadow
            : document.getElementsByTagName('header')[0].style.boxShadow = ""

        if (screenWidth >= minWidthDesktop) {
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
        }
    })
})
