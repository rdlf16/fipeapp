import { criarMarcas, criarModelos, criarAnos, criarPreco } from './criar.js'
const urlBase = 'https://parallelum.com.br/fipe/api/v1/';

function pegarMarcas(tipo) {
    fetch(urlBase + tipo + '/marcas')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            criarMarcas(data)
        })
}
function pegarVeiculos(tipo, marca) {
    fetch(urlBase + tipo + '/marcas/' + marca + '/modelos')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            criarModelos(data)
        })
}
function pegarAno(tipo, marca, modelo) {
    fetch(urlBase + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos')
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            criarAnos(data)
        })
}
function pegarPreco(tipo, marca, modelo, ano) {
    fetch(urlBase + tipo + '/marcas/' + marca + '/modelos/' + modelo + '/anos/' + ano)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            criarPreco(data)
        })
}

export { pegarPreco, pegarAno, pegarVeiculos, pegarMarcas }