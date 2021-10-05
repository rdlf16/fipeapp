import regex from "../util/util.js"
import { criarTipoVeiculo, criarPreco } from './main.js'

const btnLimparFavoritos = document.querySelector('[data-btnlimparfavoritos]')
    btnLimparFavoritos.addEventListener('click', limparFavoritos)
const btnLimparComparar = document.querySelector('[data-btnlimparcomparar]')
    btnLimparComparar.addEventListener('click', limparComparacao)
const btnComparar = document.querySelector('[data-btncomparar]')
    btnComparar.addEventListener('click', Comparar)

export function atualizaFavoritos() {
    const veiculos = JSON.parse(localStorage.getItem('lista')) || []
    const listaComparacao = JSON.parse(localStorage.getItem('comparacao')) || ['', '']
    const lista = document.querySelector('[data-listafavoritos]')

    lista.innerHTML = (`    
    ${veiculos.map(veiculo => {
        let x = ''
        listaComparacao.forEach((veiculoComparacao) => {
            if (JSON.stringify(veiculo) === JSON.stringify(veiculoComparacao)) {
                x = 'active'
            }
        })
        const anoModificado = veiculo.AnoModelo === 32000 ? "0km" : veiculo.AnoModelo
        return (`<li class="favoritos-item ${x}" data-codigo="${veiculo.CodigoFipe}" data-anoModelo="${veiculo.AnoModelo}"><h2>${veiculo.Modelo} - ${anoModificado}</h2></li>`)
    })}`).replaceAll(',', '')

    const li = document.querySelectorAll('[data-codigo]')
    li.forEach(item => {
        item.children[0].addEventListener('click', () => {
            adicionarComparacao(item)
        })
        item.children[0].addEventListener('dblclick', () => {
            carregarInformacoesVeiculo(item)
        })
    })
}

function carregarInformacoesVeiculo(item) {
    const veiculo = pegarVeiculoPeloCodigoFipe(item)
    criarPreco(veiculo)
}

export function addLista(dados) {
    let igual = false
    const favoritos = JSON.parse(localStorage.getItem('comparacao')) || []
    const lista = JSON.parse(localStorage.getItem('lista')) || []
    if (lista !== null) {
        lista.forEach((veiculo, index) => {
            if (JSON.stringify(veiculo) === JSON.stringify(dados)) {
                igual = true
                lista.splice(index, 1) // Se o veiculo que esta tentando entra na lista de favoritos já esta lá este trecho o remove dos favoritos.
                favoritos.forEach((comp, index) => {
                    if (JSON.stringify(dados) === JSON.stringify(comp)) {
                        favoritos[index] = ''
                    }
                })
                localStorage.setItem('comparacao', JSON.stringify(favoritos))
            }
        })
    }
    if (!igual) {
        lista.push(dados)
    }
    localStorage.setItem('lista', JSON.stringify(lista))
    alterarCorFavorito() // A cada click adiciona ou remove o active do icone.
    atualizaFavoritos() // Atualiza a lista dos favoritos
}

function alterarCorFavorito() {
    const icone = document.querySelector('[data-iconeFavorito]')
    icone.classList.toggle('active')
}

function Comparar() {
        const listaComparacao = JSON.parse(localStorage.getItem('comparacao')) || ['', '']
        const body = document.querySelector('body')
        const span = document.createElement('span')
        span.classList.add('comparacao')
        span.setAttribute('data-span', '')
        if (listaComparacao[0] !== '' && listaComparacao[1] !== '') {
            let veiculoMaisBarato = {}
            let diferenca = 0
            let valor1 = parseInt(listaComparacao[0].Valor.replace(/[^\d]/g, ''))
            let valor2 = parseInt(listaComparacao[1].Valor.replace(/[^\d]/g, ''))
            const veiculo1 = { ...listaComparacao[0], Cor: '' }
            const veiculo2 = { ...listaComparacao[1], Cor: '' }
            if (valor1 > valor2) {
                veiculo1.Cor = 'vermelho'
                veiculo2.Cor = 'verde'
                veiculoMaisBarato = veiculo2
                diferenca = valor1 - valor2
            } else {
                veiculo2.Cor = 'vermelho'
                veiculo1.Cor = 'verde'
                veiculoMaisBarato = veiculo1
                diferenca = valor2 - valor1
            }
            diferenca = regex(diferenca)
            span.innerHTML = (`
                <div class="comparacao-container">
                    <button class="comparacao-botao--fechar" data-botaofechar><i class="fas fa-times"></i></button>
                    <div class="comparacao-div">
                        <ul class="comparacao-lista">
                            <li class="comparacao-item"><h4 class="${veiculo1.Cor}">Modelo: ${veiculo1.Modelo}</h3></li>
                            <li class="comparacao-item"><h4 class="${veiculo1.Cor}">Ano: ${veiculo1.AnoModelo}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo1.Cor}">Marca: ${veiculo1.Marca}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo1.Cor}">Combustivel: ${veiculo1.Combustivel}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo1.Cor}">Preço: ${veiculo1.Valor}</h4></li>
                        </ul>
                        <h2 class="comparacao-x">X</h2>
                        <ul class="comparacao-lista">
                            <li class="comparacao-item"><h4 class="${veiculo2.Cor}">Modelo: ${veiculo2.Modelo}</h3></li>
                            <li class="comparacao-item"><h4 class="${veiculo2.Cor}">Ano: ${veiculo2.AnoModelo}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo2.Cor}">Marca: ${veiculo2.Marca}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo2.Cor}">Combustivel: ${veiculo2.Combustivel}</h4></li>
                            <li class="comparacao-item"><h4 class="${veiculo2.Cor}">Preço: ${veiculo2.Valor}</h4></li>
                        </ul>
                    </div>
                    <div class="comparacao-resultado">
                        <h2>O veiculo: ${veiculoMaisBarato.Modelo} ano: ${veiculoMaisBarato.AnoModelo} é <br><span class="barato">R$ ${diferenca}</span> mais barato.</h2>
                    </div>
                </div>
            `)
        } else {
            span.innerHTML = (`
                <div class="comparacao-container">
                    <button class="comparacao-botao--fechar" data-botaofechar><i class="fas fa-times"></i></button>
                    <h2>Você precisa selecionar 2 veiculos.</h2>
                </div>
            `)
        }
        body.prepend(span)
        fecharSpan()
}

function pegarVeiculoPeloCodigoFipe(item) {
    let listaFavoritos = JSON.parse(localStorage.getItem('lista')) || []
    let itemVeiculo = null
    listaFavoritos.forEach(veiculo => {
        if (veiculo.CodigoFipe === item.dataset.codigo && veiculo.AnoModelo === parseInt(item.dataset.anomodelo)) {
            itemVeiculo = veiculo
        }
    })
    return itemVeiculo
}

function adicionarComparacao(item) {
    let itemVeiculo = null
    let veiculosComparacao = JSON.parse(localStorage.getItem('comparacao')) || ['', '']
    let removeu = false

    itemVeiculo = pegarVeiculoPeloCodigoFipe(item)

    veiculosComparacao.forEach((veiculo, index) => {
        if (JSON.stringify(veiculo) === JSON.stringify(itemVeiculo)) {
            veiculosComparacao[index] = ''
            item.classList.remove('active')
            removeu = true
        }
    })

    if (!removeu) {
        if (veiculosComparacao[0] === '') {
            veiculosComparacao[0] = itemVeiculo
            item.classList.add('active')
        } else if (veiculosComparacao[1] === '') {
            veiculosComparacao[1] = itemVeiculo
            item.classList.add('active')
        }
    }

    localStorage.setItem('comparacao', JSON.stringify(veiculosComparacao))
}

function limparComparacao() {
    const itens = document.querySelectorAll('[data-codigo]')
    itens.forEach(item => {
        item.classList.remove('active')
    })
    localStorage.setItem('comparacao', JSON.stringify(['', '']))
}

function limparFavoritos() {
    limparComparacao()
    localStorage.setItem('lista', JSON.stringify([]))
    atualizaFavoritos()
    criarTipoVeiculo()
}

function fecharSpan() {
    const botaoFechar = document.querySelector('[data-botaofechar]')
    botaoFechar.addEventListener('click', () => {
        const span = document.querySelector('[data-span]')
        span.remove()
    })
}