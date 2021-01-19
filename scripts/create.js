import {
    postDish
} from "./api.js"
import {
    refetchAllDishes
} from "./script.js"
const createButton = document.getElementById("create_button")
const modalContent = document.getElementById("modal_content")
const closeButton = document.getElementById("close_button")
const headerInput = document.getElementById("header_input")
const descriptionInput = document.getElementById("description_input")
const priceInput = document.getElementById("price_input")


createButton.addEventListener('click', (event) => {
    event.preventDefault()
    let description = descriptionInput.value
    let header = headerInput.value
    let price = priceInput.value


    if (header == '' ||
    description == '' || price == '') {
        modalContent.style.display = 'block';
    }
    else {
        postDish({
            header,
            description,
            price,
        }).then(refetchAllDishes);
        window.location.href = '/';
    }
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalContent.style.display = 'none';
})
