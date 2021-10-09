import { addLista, atualizarPreco } from './favoritos.js';
import { getTema } from './tema.js'
import { mudarTipo, mudarModelo, mudarMarca, mudarAno } from './mudar.js';
const tipos = [{ caminhao: 'caminhoes' }, { carro: 'carros' }, { moto: 'motos' }]
const section = document.querySelector('[data-veiculos]')

export function criarTipoVeiculo() {
    section.innerHTML = ''
    const select = document.createElement('select')
    const option = document.createElement('option')
    const div = document.createElement('div')

    select.name = "tipoVeiculo"
    select.classList.add('veiculos-select')
    select.id = "tipo"
    select.setAttribute('data-tipo', '')

    option.classList.add('veiculos-item')
    option.value = "null"
    option.innerText = "Selecione o tipo de veiculo"

    select.appendChild(option)

    tipos.forEach(tipo => {
        const option = document.createElement('option')
        option.classList.add('veiculos-item')
        option.value = Object.values(tipo)
        option.innerText = Object.keys(tipo)
        select.appendChild(option)
    })

    select.addEventListener('change', mudarTipo)

    div.classList.add('veiculos-dropdown')
    div.appendChild(select)

    section.appendChild(div)
}
export function criarMarcas(dados) {
    const select = document.createElement('select')
    const option = document.createElement('option')

    select.name = "marcas"
    select.classList.add('veiculos-select')
    if(getTema()) select.classList.add('letraEscura')
    select.id = "marcas"
    select.setAttribute('data-marca', '')

    option.classList.add('veiculos-item')
    option.value = "null"
    option.innerText = "Selecione uma marca"

    select.appendChild(option)

    dados.forEach(marca => {
        const option = document.createElement('option')
        option.classList.add('veiculos-item')
        option.value = marca.codigo
        option.innerText = marca.nome
        select.appendChild(option)
    })
    select.addEventListener('change', mudarMarca)

    const marcasEl = document.querySelector('[data-marca]')
    if (marcasEl !== null) {
        marcasEl.parentNode.remove()
    }
    const div = document.createElement('div')
    div.classList.add('veiculos-dropdown')
    div.appendChild(select)
    section.appendChild(div)
}
export function criarModelos(dados) {
    const select = document.createElement('select')
    const option = document.createElement('option')

    select.name = "modelos"
    select.classList.add('veiculos-select')
    if(getTema()) select.classList.add('letraEscura')
    select.id = "modelos"
    select.setAttribute('data-modelo', '')

    option.classList.add('veiculos-item')
    option.value = "null"
    option.innerText = "Selecione um modelo"

    select.appendChild(option)

    dados.modelos.forEach(modelo => {
        const option = document.createElement('option')
        option.classList.add('veiculos-item')
        option.value = modelo.codigo
        option.innerText = modelo.nome
        select.appendChild(option)
    })
    select.addEventListener('change', mudarModelo)

    const modeloEl = document.querySelector('[data-modelo]')
    if (modeloEl !== null) {
        modeloEl.parentNode.remove()
    }
    const div = document.createElement('div')
    div.classList.add('veiculos-dropdown')
    div.appendChild(select)
    section.appendChild(div)
}
export function criarAnos(dados) {
    const select = document.createElement('select')
    const option = document.createElement('option')

    select.name = "anos"
    select.classList.add('veiculos-select')
    if(getTema()) select.classList.add('letraEscura')
    select.id = "anos"
    select.setAttribute('data-ano', '')

    option.classList.add('veiculos-item')
    option.value = "null"
    option.innerText = "Selecione o ano"

    select.appendChild(option)
    dados.forEach(ano => {
        const option = document.createElement('option')
        option.classList.add('veiculos-item')
        option.value = ano.codigo
        let anoAlterado = ano.nome.replace(/[^\d]/g, '')
        if(anoAlterado === '32000') {
            option.innerText = '0km'
        } else {
            option.innerText = ano.nome
        }
        select.appendChild(option)
    })
    select.addEventListener('change', mudarAno)

    const anosEl = document.querySelector('[data-ano]')
    if (anosEl !== null) {
        anosEl.parentNode.remove()
    }
    const div = document.createElement('div')
    div.classList.add('veiculos-dropdown')
    div.appendChild(select)
    section.appendChild(div)
}
export function criarPreco(dados) { // Alterado
    atualizarPreco(dados)
    const anoModificado = dados.AnoModelo === 32000 ? `0km` : dados.AnoModelo
    if (dados !== null && dados !== []) {
        const active = verificarSeItemEFavorito(dados)
        const informacoes = (`
            <h4>Modelo: ${dados.Modelo}</h4>
            <h4>Marca: ${dados.Marca}</h4>
            <h4>Ano: ${anoModificado}</h4>
            <h4>Combustivel: ${dados.Combustivel}</h4>
            <h4>Código Fipe: ${dados.CodigoFipe}</h4>
            <h4>Preço Médio: ${dados.Valor}</h4>
        `)
        const botao = document.createElement('button')
        botao.classList.add('veiculos-button--addLista')
        const icone = document.createElement('i')
        icone.classList.add('fas', 'fa-star')
        if(active !== '') icone.classList.add(`${active}`)
        icone.setAttribute('data-iconeFavorito', '')
        botao.appendChild(icone)
        botao.addEventListener('click', () => {
            addLista(dados)// Alterado
        })

        const precoEl = document.querySelector('[data-preco]')
        if (precoEl !== null) {
            precoEl.innerHTML = informacoes
            precoEl.appendChild(botao)
        } else {
            const div = document.createElement('div')
            div.classList.add('veiculos-preco')
            if(getTema()) div.classList.add('letraEscura')
            div.setAttribute('data-preco', '')
            div.innerHTML = informacoes
            div.appendChild(botao)
            section.appendChild(div)
        }
    }
}
function verificarSeItemEFavorito(dados) {
    const listaFavoritos = JSON.parse(localStorage.getItem('lista')) || []
    let retorno = ''
    listaFavoritos.forEach(veiculo => {
        if (JSON.stringify(veiculo) === JSON.stringify(dados)) {
            retorno = 'active'
        }
    });
    return retorno
}