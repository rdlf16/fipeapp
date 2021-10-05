import { addLista } from './favoritos.js';
const urlBase = 'https://parallelum.com.br/fipe/api/v1/';
const tipos = [{ caminhao: 'caminhoes' }, { carro: 'carros' }, { moto: 'motos' }]
const section = document.querySelector('[data-veiculos]')
let tipo = null
let marca = null
let modelo = null
let ano = null
async function pegarMarcas() {
    const response = await fetch(urlBase + tipo + '/marcas')
    const data = await response.json()
    criarMarcas(data)
}
async function pegarVeiculos() {
    const response = await fetch(urlBase + tipo + '/marcas/' + marca + '/modelos')
    const data = await response.json()
    criarModelos(data)
}
async function pegarAno() {
    const response = await fetch(urlBase + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos')
    const data = await response.json()
    criarAnos(data)
}
async function pegarPreco() {
    const response = await fetch(urlBase + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos/' + ano)
    const data = await response.json()
    criarPreco(data)
}
export function criarTipoVeiculo() {
    section.innerHTML = ''
    const select = (`
        <h2>Tipo de Veiculos</h2>
        <select name="tipoVeiculo" class="opcaoTipo" id="tipo" data-tipo>
        <option value="null">--- ---- ---- ---- ---</option>
        ${tipos.map(objTipo => {
            return `<option class="opcaoTipo" value="${Object.values(objTipo)}">${Object.keys(objTipo)}</option>`
        })}
        </select>
    `).replaceAll(',', '')
    const div = document.createElement('div')
    div.classList.add('tipos')
    div.innerHTML = select
    section.appendChild(div)
    mudarTipo()
}
function criarMarcas(dados) {
    const select = (`
            <h2>Marcas</h2>
            <select name="marcas" id="marcas">
                <option value="null">Selecione uma marca</option>
                ${dados.map(marca => {
        return `<option value="${marca.codigo}">${marca.nome}</option>`
    })}
            </select>
    `).replaceAll(',', '')
    const marcasEl = document.querySelector('[data-marca]')
    if (marcasEl !== null) {
        marcasEl.innerHTML = select
        section.appendChild(marcasEl)
    } else {
        const div = document.createElement('div')
        div.classList.add('marcas')
        div.setAttribute('data-marca', '')
        div.innerHTML = select
        section.appendChild(div)
    }
    mudarMarca()
}
function criarModelos(dados) {
    const modelosEl = document.querySelector('[data-modelo]') ////////////////////////////
    const select = (`
            <h2>Modelos</h2>
            <select name="modelos" id="modelos">
                <option value="null">Selecione um modelo</option>
                ${dados.modelos.map(modelo => {
        return `<option value="${modelo.codigo}">${modelo.nome}</option>`
    })}
            </select>
    `).replaceAll(',', '')
    if (modelosEl !== null) {
        modelosEl.innerHTML = select
        section.appendChild(modelosEl)
    } else {
        const div = document.createElement('div')
        div.classList.add('modelos')
        div.setAttribute('data-modelo', '')
        div.innerHTML = select
        section.appendChild(div)
    }
    mudarModelo()
}
function criarAnos(dados) {
    const anosEl = document.querySelector('[data-ano]')
    const select = (`
            <h2>Anos</h2>
            <select name="anos" id="anos">
                <option value="null">Selecione um modelo</option>
                ${dados.map(ano => {
                    const anoModificado = ano.nome === '32000' ? `0km` : ano.nome
                    return `<option value="${ano.codigo}">${anoModificado}</option>`
                })}
            </select>
        `).replaceAll(',', '')
    if (anosEl !== null) {
        anosEl.innerHTML = select
        section.appendChild(anosEl)
    } else {
        const div = document.createElement('div')
        div.classList.add('anos')
        div.setAttribute('data-ano', '')
        div.innerHTML = select
        section.appendChild(div)
    }
    mudarAno()
}
export function criarPreco(dados) {
    const anoModificado = dados.AnoModelo === 32000 ? `0km` : dados.AnoModelo
    if (dados !== null && dados !== []) {
        const active = verificarSeItemEFavorito(dados)
        const informacoes = (`
            <h3>Modelo: ${dados.Modelo}</h2>
            <h4>Marca: ${dados.Marca}</h3>
            <h4>Ano: ${anoModificado}</h3>
            <h4>Combustivel: ${dados.Combustivel}</h3>
            <h4>Código Fipe: ${dados.CodigoFipe}</h3>
            <h2>Valor: ${dados.Valor}</h2>
            <h4>Pesquisado em: ${dados.MesReferencia}</h4>
            <button class="botaoAddLista" data-addlista><i class="fas fa-star ${active}" data-iconeFavorito></i></button>
        `)
        const precoEl = document.querySelector('[data-preco]')
        if(precoEl !== null) {
            precoEl.innerHTML = informacoes
        } else {
            const div = document.createElement('div')
            div.setAttribute('data-preco', '')
            div.classList.add('preco')
            div.innerHTML = informacoes
            section.appendChild(div)
        }
        const botao = document.querySelector('[data-addlista]')
        botao.addEventListener('click', () => {
            addLista(dados)
        })
    }
}
function mudarTipo() {
    const select = document.querySelector('[data-tipo]') ////////////////////////////
    select.addEventListener('change', event => {
        const modeloEl = document.querySelector('[data-modelo]')////////////////////////////
        const anoEl = document.querySelector('[data-ano]')////////////////////////////
        const precoEl = document.querySelector('[data-preco')////////////////////////////
        if(anoEl !== null) {
            anoEl.remove()
            ano = null
        }
        if(modeloEl !== null) {
            modeloEl.remove()
            modelo = null
        }
        if(precoEl !== null) {
            precoEl.remove()
        }
        tipo = event.target.value
        if (tipo === 'null') {
            criarTipoVeiculo()
        } else {
            pegarMarcas(tipo)
        }
    })
}
function mudarMarca() {
    const select = document.querySelector('[data-marca]') ////////////////////////////
    select.addEventListener('change', event => {
        const anoEl = document.querySelector('[data-ano]') ////////////////////////////
        const precoEl = document.querySelector('[data-preco]') ////////////////////////////
        if (anoEl !== null) {
            anoEl.remove()
            ano = null
        }
        if(precoEl !== null) {
            precoEl.remove()
        }
        marca = event.target.value
        if (tipo === 'null' || marca === 'null') {
            criarTipoVeiculo()
        } else {
            pegarVeiculos()
        }
    })
}
function mudarModelo() {
    const select = document.querySelector('[data-modelo]') ////////////////////////////
    select.addEventListener('change', event => {
        const precoEl = document.querySelector('[data-preco]') ////////////////////////////
        if(precoEl !== null) {
            precoEl.remove()
        }
        modelo = event.target.value
        if (tipo === 'null' || marca === 'null' || modelo === 'null') {
            criarTipoVeiculo()
        } else {
            pegarAno()
        }
    })
}
function mudarAno() {
    const select = document.querySelector('[data-ano]') ////////////////////////////
    select.addEventListener('change', event => {
        ano = event.target.value
        if (tipo === 'null' || marca === 'null' || modelo === 'null' || ano === 'null') {
            criarTipoVeiculo()
        } else {
            pegarPreco()
        }
    })
}
function verificarSeItemEFavorito(dados) {
    const listaFavoritos = JSON.parse(localStorage.getItem('lista')) || []
    let retorno = ''
    listaFavoritos.forEach(veiculo => {
        if(JSON.stringify(veiculo) === JSON.stringify(dados)) {
            retorno = 'active'
        }
    });
    return retorno
}