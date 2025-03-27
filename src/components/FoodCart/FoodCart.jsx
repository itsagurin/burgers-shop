import React, { useState } from 'react';
import './FoodCart.scss';

// Images would need to be imported or replaced with actual image paths
import superCheeseBurger from '../../assets/burgers_mini/super-cheese-burger.png';
import frenchFries from '../../assets/burgers_mini/frenchFries.png';
import hotDog from '../../assets/burgers_mini/hotDog.png';

const FoodCart = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Супер сырный',
            image: superCheeseBurger,
            price: 550,
            quantity: 1
        },
        {
            id: 2,
            name: 'Картошка фри',
            image: frenchFries,
            price: 245,
            quantity: 2
        },
        {
            id: 3,
            name: 'Жгучий хот-дог',
            image: hotDog,
            price: 239,
            quantity: 1
        }
    ]);

    const updateQuantity = (id, change) => {
        setItems(items.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + change) }
                : item
        ));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart">
            <h2>Корзина</h2>
            <div className="cart-items">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">{item.price}₽</span>
                        </div>
                        <div className="quantity-control">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="quantity-button"
                            >
                                -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="quantity-button"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <span>Итого</span>
                <span className="total-price">{calculateTotal()}₽</span>
            </div>
            <button className="order-button">Оформить заказ</button>
            <div className="delivery-info">
                <span>🚚 Бесплатная доставка</span>
            </div>
        </div>
    );
};

export default FoodCart;