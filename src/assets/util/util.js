function regex(preco) {
    let valor = preco.toString()
    if (valor.length <= 2) {
        return valor.replace(/(\d{1,2})/, '0,$1')
    } else if (valor.length === 3) {
        return valor.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    } else if (valor.length <= 5) {
        valor = valor.replace(/^0/, '')
        return valor.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    } else if (valor.length <= 8) {
        valor = valor.replace(/^0/, '')
        return valor.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2,$3')
    } else if (valor.length <= 11) {
        valor = valor.replace(/^0/, '')
        return valor.replace(/(\d{1,3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4')
    } else if (valor.length <= 14) {
        valor = valor.replace(/^0/, '')
        return valor.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4,$5')
    }
}
export default regex