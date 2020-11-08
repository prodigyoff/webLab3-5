import {
    editDish,
    getUrlVars,
    getSingleDish,
} from "./api.js"

const updateButton = document.getElementById("update_button")
const headerInput = document.getElementById("header_input")
const descriptionInput = document.getElementById("description_input")
const priceInput = document.getElementById("price_input")
const modalContent = document.getElementById("modal_content")
const closeButton = document.getElementById("close_button")

const id = getUrlVars()["id"];

(async () => {
    const dish = await getSingleDish()
    headerInput.value = dish.header
    descriptionInput.value = dish.description
    priceInput.value = dish.price
})()

updateButton.addEventListener('click', (event) => {
    event.preventDefault();

    let header = headerInput;
    let description = descriptionInput;
    let price = priceInput;

    const getInputValues = () => {
        return {
            id: id,
            header: header.value,
            description: description.value,
            price: price.value,
        };
    };

    if (header.value == '' || description.value == '' || price.value == ''){
        modalContent.style.display = 'block';
    }

    else {
        editDish(id, getInputValues());
        window.location.href = '/';
    }
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalContent.style.display = 'none';
})