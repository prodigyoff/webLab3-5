import {
    addDishes,
} from "./model.js"
import {
    getAllDishes,
    deleteDish,
} from "./api.js"

const searchButton = document.getElementById('search-button')
const clearButton = document.getElementById('clear-button')
const sortButton = document.getElementById('sort-button')
const mainContainer = document.getElementById('main__container')
const totalPriceButton = document.getElementById('total-price-btn')
const innerSwitch = document.getElementById('inner-switch')
const removeButton = document.getElementById('remove-button')
let dishesList = []

let isSorted = false

function updatePage(list) {
    if (mainContainer) {
        let elements = mainContainer.querySelectorAll('.main__item')
        for (var i = 0; i < elements.length; i++) { elements[i].remove() }
        for (var i = 0; i < list.length; i++) {
            let id = list[i].id
            let header = list[i].header
            let description = list[i].description
            let price = list[i].price
            addDishes({ id, header, description, price })
        }
    }
}


export const refetchAllDishes = async () => {
    const allDishes = await getAllDishes();

    dishesList = allDishes;

    updatePage(dishesList);
}

const removeItem = (item) =>{
    deleteDish(item.id).then(refetchAllDishes)
}

if(removeButton){
    removeButton.addEventListener('click', () =>{
        removeItem(dishesList)
    })
}

if (sortButton) {
    sortButton.addEventListener('click', () => {
        innerSwitch.classList.toggle("active")
        sortButton.classList.toggle("active")
        if (isSorted) {
            updatePage(dishesList)
            isSorted = false
            return
        }
        let sortedList = [...dishesList]
        sortedList.sort((obj1, obj2) => obj2.price - obj1.price)
        updatePage(sortedList)
        isSorted = true
    })
}
if (totalPriceButton) {
    totalPriceButton.addEventListener('click', () => {
        let totalPrice = dishesList.reduce((counter, item) => (counter += item.price), 0)
        document.getElementById('total-price-count').innerText = totalPrice + '$'
    })
}
if (searchButton) {
    searchButton.addEventListener('click', () => {
        let text = document.getElementById("search-input").value;
        let pattern = new RegExp(text)
        let filteredList = dishesList.filter(dish => pattern.test(dish.header) || pattern.test(dish.description)
            || pattern.test(dish.price))
        updatePage(filteredList)
    })
}
if (clearButton) {
    clearButton.addEventListener('click', () => {
        document.getElementById('search-input').value = ''
        updatePage(dishesList)
    })
}

refetchAllDishes();