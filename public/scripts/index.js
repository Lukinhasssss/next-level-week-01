const buttonSearch = document.querySelector('#page-home main a')
const modal = document.querySelector('#modal')
const close = document.querySelector('#modal .header a')

buttonSearch.addEventListener('click', () => { // Quando eu clicar no botão vou adicionar um evento de clique
    modal.classList.remove('hide') // Ou seja, quando eu clicar no botão de pesquisa irá remover a classe hide e o modal irá aparecer
})

close.addEventListener('click', () => {
    modal.classList.add('hide') // Quando eu clicar no fechar (X) vai adicionar a classe hide e esconder o modal
})


/* Voltando para o início */
const backToHome = document.querySelector('#page-home header img') /* Para selecionar a imagem da logo Ecoleta */
backToHome.addEventListener('click', (event) => {
    // window.location.href = 'index.html' /* Desta forma volta para o início */
    window.location.href = '/'
})