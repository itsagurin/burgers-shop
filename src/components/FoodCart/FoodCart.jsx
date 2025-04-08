import { useState } from 'react';
import './FoodCart.scss';
import { changeQuantity } from "./helper/helper.js";

const FoodCart = ({ cartItems, setCartItems }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const items = cartItems || [];
    const setItems = setCartItems || (() => {});

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleUpdateQuantity = (id, change) => {
        changeQuantity(id, change, items, setItems);
    };

    const calculateTotal = () => {
        const totalPrice = items.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.price * currentItem.quantity);
        }, 0);

        return totalPrice;
    };

    const calculateTotalQuantity = () => {
        const totalQuantity = items.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
        }, 0);

        return totalQuantity;
    };

    const shouldShowDeliveryInfo = () => {
        const totalQuantity = calculateTotalQuantity();
        const totalPrice = calculateTotal();

        return totalQuantity > 7 || totalPrice > 2500;
    };

    const isEmpty = items.every(item => item.quantity === 0);

    const getImagePath = (relativePath) => {
        return relativePath.replace(/^\.\.\/\.\.\//, '/');
    };

    return (
        <div className={`cart ${isExpanded ? 'cart-expanded' : ''}`} onClick={toggleExpand}>
            <div className="cart-desc">
                <h2>Корзина</h2>
                <div className="quantity-total">
                    {calculateTotalQuantity()}
                </div>
            </div>

            {isEmpty ? (
                <div className="empty-cart-message">Тут пока пусто :(</div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.filter(item => item.quantity > 0).map(item => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={getImagePath(item.image)}
                                    alt={item.name}
                                    className="item-image"
                                />
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-weight">{item.weight}г</span>
                                    <span className="item-price">{item.price}₽</span>
                                </div>
                                <div className="quantity-control">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateQuantity(item.id, -1);
                                        }}
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateQuantity(item.id, 1);
                                        }}
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
                    <button
                        className="order-button"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Оформить заказ
                    </button>
                    {shouldShowDeliveryInfo() && (
                        <div className="delivery-info">
                            <span>🚚 Бесплатная доставка</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FoodCart;