import { pegarMarcas, pegarVeiculos, pegarAno, pegarPreco } from './captarDados.js';
import { criarPreco, criarTipoVeiculo } from './criar.js';

let tipo = null
let marca = null
let modelo = null
let ano = null

function mudarTipo(evento) {
    const modeloEl = document.querySelector('[data-modelo]')
    const anoEl = document.querySelector('[data-ano]')
    const precoEl = document.querySelector('[data-preco')
    if (anoEl !== null) {
        anoEl.parentNode.remove()
        ano = null
    }
    if (modeloEl !== null) {
        modeloEl.parentNode.remove()
        modelo = null
    }
    if (precoEl !== null) {
        precoEl.remove()
    }
    tipo = evento.target.value
    if (tipo === 'null') {
        criarTipoVeiculo()
    } else {
        pegarMarcas(tipo)
    }
}
function mudarMarca(evento) {
    const anoEl = document.querySelector('[data-ano]')
    const precoEl = document.querySelector('[data-preco]')
    if (anoEl !== null) {
        anoEl.parentNode.remove()
        ano = null
    }
    if (precoEl !== null) {
        precoEl.remove()
    }
    marca = evento.target.value
    if (tipo === 'null' || marca === 'null') {
        criarTipoVeiculo()
    } else {
        pegarVeiculos(tipo, marca)
    }
}
function mudarModelo(evento) {
    const precoEl = document.querySelector('[data-preco]')
    if (precoEl !== null) {
        precoEl.remove()
    }
    modelo = evento.target.value
    if (tipo === 'null' || marca === 'null' || modelo === 'null') {
        criarTipoVeiculo()
    } else {
        pegarAno(tipo, marca, modelo)
    }
}
function mudarAno(evento) {
    const select = document.querySelector('[data-ano]')
        ano = evento.target.value
        if (tipo === 'null' || marca === 'null' || modelo === 'null' || ano === 'null') {
            criarTipoVeiculo()
        } else {
            pegarPreco(tipo, marca, modelo, ano, criarPreco)// Alterado
        }
}

export { mudarTipo, mudarModelo, mudarMarca, mudarAno }