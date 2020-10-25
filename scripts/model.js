export class Dish{
    constructor(id, header, description, price) {
        this.id = id;
        this.header = header;
        this.description = description;
        this.price = price;
    }
}

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
                <button class="main__item-edit-btn" id="edit-button">Edit</button>
                <button class="main__item-remove-btn" data-set="${id}">Remove</button>
                </div>
            </div>
        </div>`

export const addDishes = ({id, header, description, price}) =>
{
    let dishContainer = document.getElementById('main__container');
    dishContainer.insertAdjacentHTML('beforeend', newContent({
        id,
        header,
        description,
        price
    }))
}