import React from 'react'

export const Vegetable = ({ name, price, image, addToCart }) => {
    return (
        <div className="App-vegetable" onClick={addToCart}>
            <img src={image} alt=""/>
            <span>{name}</span>
            <span>{price}€</span>
        </div>
    )
}
