export function carregarTema() {
    const input = document.querySelector('[data-tema]')
    input.addEventListener('change', () => {
        alterarTema(input)
    })
    input.checked = getTema()
    alterarTema(input)
}

function alterarTema(input) {
    input.checked ? temaClaro() : temaEscuro()
}

function temaClaro() {
    const header = document.querySelector('header')
    const body = document.querySelector('body')
    const footer = document.querySelector('footer')
    const tituloFavoritos = document.querySelector('.favoritos-titulo-lista')
    const favoritosItem = document.querySelectorAll('.favoritos-item')
    const selectItem = document.querySelectorAll('.veiculos-select')
    const preco = document.querySelector('.veiculos-preco')
    const botoes = document.querySelectorAll('.favoritos-btn')
    header.classList.add('fundoAzul')
    body.classList.add('fundoBranco')
    footer.classList.add('fundoAzul')
    tituloFavoritos.classList.add('letraEscura')
    favoritosItem.forEach(favorito => {
        favorito.classList.add('sombraEscura')
    })
    selectItem.forEach(item => {
        item.classList.add('letraEscura')
    })
    botoes.forEach(botao => {
        botao.classList.add('sombraBtn')
    })
    if(preco !== null) preco.classList.add('letraEscura')
    setTema(true)
}

function temaEscuro() {
    const header = document.querySelector('header')
    const body = document.querySelector('body')
    const footer = document.querySelector('footer')
    const tituloFavoritos = document.querySelector('.favoritos-titulo-lista')
    const favoritosItem = document.querySelectorAll('.favoritos-item')
    const selectItem = document.querySelectorAll('.veiculos-select')
    const preco = document.querySelector('.veiculos-preco')
    const botoes = document.querySelectorAll('.favoritos-btn')
    header.classList.remove('fundoAzul')
    body.classList.remove('fundoBranco')
    footer.classList.remove('fundoAzul')
    tituloFavoritos.classList.remove('letraEscura')
    favoritosItem.forEach(favorito => {
        favorito.classList.remove('sombraEscura')
    })
    selectItem.forEach(item => {
        item.classList.remove('letraEscura')
    })
    botoes.forEach(botao => {
        botao.classList.remove('sombraBtn')
    })
    if(preco !== null) preco.classList.remove('letraEscura')
    setTema(false)
}

export function getTema() {
    let tema = JSON.parse(localStorage.getItem('tema'))
    if(tema === null) tema = false
    return tema
}

function setTema(varivel) {
    localStorage.setItem('tema', JSON.stringify(varivel))
}