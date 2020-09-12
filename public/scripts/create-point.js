/* Este fetch pega todos os estados que estão armazenados no site do IBGE
fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(function(res){ return res.json() })
    .then(function(data){ console.log(data) }) */

function populateUFs() { //populateUFs == popular ufs
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => { return res.json() }) // Obs: esse res é de response (resposta) | retorna essa resposta que foi transformada em json
        // .then(res => res.json()) // A linha de cima também pode ser feita dessa forma
        .then(states => {
            //ufSelect.innerHTML = `<option value='1'>Valor</option>` // Desta forma irá sobrescrever o valor do campo select
            //ufSelect.innerHTML = ufSelect.innerHTML + `<option value='1'>Valor</option>` // Resumindo, é o campo que a gente já tem + a outra opção que estou adicionando
            // Observação: O 1º .then serve para pegar a resposta do fetch e converter para JSON, que é um array em json e o 2º .then serve para inserir cada conteúdo do array no campo select que recebe os Estados
            for (state of states) { // Para cada estado de estados...
                ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>` // Resumindo: Pegue você mesmo e some esse resultado. | Faz o mesmo que a linha de cima só que de forma simplificada
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]') /* Toda vez que for chamado esse getCities, ou seja, quando a uf mudar, o valor de stateInput mudará */

    const ufValue = event.target.value /* event é o 'change' e o target é o alvo, ou seja, target é ONDE O EVENTO FOI EXECUTADO e value pega o valor que no caso é o valor do state.id */

    const indexOfSelectedState = event.target.selectedIndex // indexOfSelectedState significa: indice do estado selecionado | selectedIndex seleciona o indice do elemento
    stateInput.value = event.target.options[indexOfSelectedState].text // .text para pegar o texto do elemento de indice selecionado

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` /* Agora sempre que eu mudar a ufValue a url irá mudar */

    citySelect.innerHTML = `<option value>Selecione a Cidade</option>` // Recebe 'vazio' para limpar as cidades e adicionar as novas cidades do novo estado
    citySelect.disabled = true

    fetch(url)
        .then(res => { return res.json() })
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>` // Resumindo: Pegue você mesmo e some esse resultado. | Faz o mesmo que a linha de cima só que de forma simplificada
            }

            citySelect.disabled = false
        })
}


document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities) // Sempre que eu trocar o estado o 'ouvidor de eventos' vai chamar a função getCities
    // OBS: No caso acima eu estou passando a função como parâmetro, se eu utilizar os parênteses significa que eu estou chamando a função para ser usada imediatamente.
    // Quando o evento de mudança ocorrer a função getCities será executada

/* ITENS DE COLETA */
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) { // Para cada item de '.items-grid li'...
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe com javascript, ou seja, se existir a classe selected ele remove e se não existir ele adiciona
    itemLi.classList.toggle('selected') // classList tem as funções .add() (que adiciona uma classe), .remove() (que remove uma classe) e .toggle() (que adiciona ou remove uma classe)

    const itemId = itemLi.dataset.id /* dataset.id pega todos os números que tem no id. | Quando clicar no item (li) vai pegar o id */
    // console.log('ITEM ID: ', itemId)

    // Verificando se existem items selecionados, se sim pegar os items selecionados
    const alreadySelected = selectedItems.findIndex( item => { // findIndex precisa receber verdadeiro ou falso como retorno. Se for verdadeiro significa que achou o index e vai coloca-lo na variável
        return item == itemId /* already selected vai receber item se item for igual a itemId, ou seja, alreadySelected vai receber item se o return for true */
        // const itemFound = item == itemId
        // return itemFound
    })

    // Se já estiver selecionado
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => { // Caso .filter() retorne true, vai adicionar o item na variável filteredItems que será um array, caso retorne false vai retirar o item da variável
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else { // Se não estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId) // A função .push() adiciona elementos em um array
    }

    // console.log('selectedItems: ', selectedItems)

    // Por fim, atualizar o campo escondido (hidden) com os items selecionados
    // document.querySelector('input[name=items]') Como o html toda hora vai ficar procurando essa linha de código eu vou jogá-la para cima e colocar em uma variável
    collectedItems.value = selectedItems
}

const backToHome = document.querySelector('#page-create-point header img') /* Para selecionar a imagem da logo Ecoleta */
backToHome.addEventListener('click', (event) => {
    // window.location.href = 'index.html' /* Desta forma volta para o início */
    window.location.href = '/'
})