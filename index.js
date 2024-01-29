import { menuArray } from '/data.js'
 import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const itemsOrdered = document.getElementById("items-ordered")
const orderSectionOne = document.getElementById("order-section-one")
const orderSectionTwo = document.getElementById("order-section-two")
const modalPayment = document.getElementById("modal-payment")
const paymentForm = document.getElementById("payment-form")
const acknowledgementMessage = document.getElementById("acknowledgement-message")

document.addEventListener('click', handleClicks)

function handleClicks(e){
    if(e.target.dataset.add){
        handleAddItemClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveItemClick(e.target.dataset.remove)
    }
    else if(e.target.id === "order-btn"){
        completeOrder()
    }
}

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    
    acknowledgementMessage.textContent = `Thanks, ${name}! Your order is on its way!`
    
    modalPayment.style.display = "none"
    orderSectionOne.style.display = "none"
    orderSectionTwo.style.display = "none" 
    acknowledgementMessage.style.display = "inline"
})

let itemsAddedArray = []

function handleAddItemClick(itemId){
    const itemAdded = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    itemsAddedArray.push(itemAdded)  
    
    render()
}

function getSum(){
    let total = 0
    if(itemsAddedArray.length === 1){
        total = itemsAddedArray[0].price
    }
    else if(itemsAddedArray.length > 1){
        total = itemsAddedArray.reduce(function(total, currentItem){
            return total + currentItem.price
        }, 0)
    }
    return total
}

function  handleRemoveItemClick(itemIndex){
    itemsAddedArray = itemsAddedArray.filter(function(item){
        return itemsAddedArray.indexOf(item) != itemIndex
    })
    render()
}

function getOrderHtml(){
    let orderHtml = ""  
    
    itemsAddedArray.forEach(function(item){
       orderHtml += `
       <div class="item-ordered">
            <div class="item-ordered">${item.name}</div>
            <div class="remove" data-remove = ${itemsAddedArray.indexOf(item)}>remove</div>
            <div class="price">$${item.price}</div>
        </div>
       ` 
    })
    return orderHtml
}

function getMenuHtml(){
    let menuHtml = ""
    
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item-card">
            <img src="images/${item.image}" class="img-item" alt="${item.name} image">
            <div>
                <div class="item-name">${item.name}</div>
                <div class="ingredients">${item.ingredients}</div>
                <div class="price">$${item.price}</div>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>`
    })
    return menuHtml
}

function displayOrderSection(){
    itemsAddedArray.length ? orderSectionOne.style.display = "inline" : orderSectionOne.style.display = "none"
    itemsAddedArray.length ? orderSectionTwo.style.display = "inline" : orderSectionTwo.style.display = "none"
}

function completeOrder(){
    modalPayment.style.display = "inline"
}

function render() {
    document.getElementById("menu-items").innerHTML = getMenuHtml()
    itemsOrdered.innerHTML = getOrderHtml()
    displayOrderSection()
    document.getElementById("total").textContent = `$${getSum()}`
}

render()
