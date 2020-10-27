const createButton = document.getElementById("create_button")
const modalContent = document.getElementById("modal_content")
const closeButton = document.getElementById("close_button")
const headerInput = document.getElementById("header_input")
const descriptionInput = document.getElementById("description_input")
const priceInput = document.getElementById("price_input")

createButton.addEventListener('click', (event)=>{
    event.preventDefault()
    if (headerInput.value == '' || 
    descriptionInput.value == '' || priceInput.value == ''){
        modalContent.style.display = 'block';
    }
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalContent.style.display = 'none';
})