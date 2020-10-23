class Dish{
    constructor(id, header, description, price) {
        this.id = id;
        this.header = header;
        this.description = description;
        this.price = price;
    }
}

const addDishButton = document.getElementById('add-dish-btn')
const searchButton = document.getElementById('search-button')
const clearButton = document.getElementById('clear-button')
const sortButton = document.getElementById('sort-button')
const mainContainer = document.getElementById('main__container')
const totalPriceButton = document.getElementById('total-price-btn')
const innerSwitch = document.getElementById('inner-switch')
const dishesList = []

let idCounter = 0


const newContent = ({id, header, description, price}) =>
        `<div class="main__item" id="${id}" draggable="true">
            <img src="assets/loading1.gif" alt="senseless-image" class="main__item-image">
            <h2 class="main__item-header">${header}</h2>
            <div class="main__item-text">${description}</div>
            <div class="main__item-footer">
                <div class="main__item-price">
                    <h4>Price:</h4>
                    <h4>${price}$</h4>
                </div>
                <div class="main__item-buttons-container">
                <button class="main__item-edit-btn">Edit</button>
                <button class="main__item-remove-btn">Remove</button>
                </div>
            </div>
        </div>`
        
const addDishes = ({id, header, description, price}) =>
{
    let dishContainer = document.getElementById('main__container');
    dishContainer.insertAdjacentHTML('beforeend', newContent({
        id,
        header,
        description,
        price
    }))
}

function updateDOM(list){
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
})

sortButton.addEventListener('click', () => {
    innerSwitch.classList.toggle("active")
    sortButton.classList.toggle("active")
    dishesList.sort((obj1, obj2) => obj2.price - obj1.price)
    updateDOM(dishesList)
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
    updateDOM(filteredList)
})

clearButton.addEventListener('click', () => {
    document.getElementById('search-input').value = ''
    updateDOM(dishesList)
})