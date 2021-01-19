import {
    Dish,
    addDishes
}from "./model.js"

const addDishButton = document.getElementById('add-dish-btn')
const searchButton = document.getElementById('search-button')
const clearButton = document.getElementById('clear-button')
const sortButton = document.getElementById('sort-button')
const mainContainer = document.getElementById('main__container')
const totalPriceButton = document.getElementById('total-price-btn')
const innerSwitch = document.getElementById('inner-switch')
const dishesList = []

let idCounter = 0
let isSorted = false

function updatePage(list){
    let elements = mainContainer.querySelectorAll('.main__item')
    for(var i = 0; i < elements.length; i++){elements[i].remove()}
    for (var i = 0; i < list.length; i++) {
        let id = list.id
        let header = list[i].header
        let description = list[i].description
        let price = list[i].price
        addDishes({id, header, description, price})
    }
}

addDishButton.addEventListener('click', () => {
    let id = idCounter
    idCounter += 1
    let header = `Header`
    let description = 'Some description text. Chuvash'
    let price = Math.floor(Math.random() * 500)
    let dish = new Dish(id, header, description, price)
    dishesList.push(dish)
    addDishes({id, header, description, price})
    updatePage(dishesList)
    document.getElementById('search-input').value = ''
})

sortButton.addEventListener('click', () => {
    innerSwitch.classList.toggle("active")
    sortButton.classList.toggle("active")
    if(isSorted){
        updatePage(dishesList)
        isSorted = false
        return
    }
    let chuvashList = [...dishesList]
    chuvashList.sort((obj1, obj2) => obj2.price - obj1.price)
    updatePage(chuvashList)
    isSorted = true
})

totalPriceButton.addEventListener('click', () => {
    let totalPrice = dishesList.reduce((counter, item) => (counter += item.price), 0)
    document.getElementById('total-price-count').innerText = totalPrice + '$'
})

searchButton.addEventListener('click', () => {
    let text = document.getElementById("search-input").value;
    let pattern = new RegExp(text)
    let filteredList = dishesList.filter(dish => pattern.test(dish.header) || pattern.test(dish.description)
    || pattern.test(dish.price))
    updatePage(filteredList)
})

clearButton.addEventListener('click', () => {
    document.getElementById('search-input').value = ''
    updatePage(dishesList)
})