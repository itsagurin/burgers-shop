import { useState, useEffect } from 'react';
import './FoodCart.scss';
import { changeQuantity } from "./helper/helper.js";
import CartContent from '../CartContent/CartContent.jsx';

const FoodCart = ({ cartItems, setCartItems }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const items = cartItems || [];
    const setItems = setCartItems || (() => {});

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);

        if (isMobile) {
            if (!isExpanded) {
                document.body.classList.add('modal-open');
            } else {
                document.body.classList.remove('modal-open');
            }
        }
    };

    const handleModalBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            toggleExpand();
        }
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

    const isEmpty = items.length === 0 || items.every(item => item.quantity === 0);

    const getImagePath = (relativePath) => {
        return relativePath.replace(/^\.\.\/\.\.\//, '/');
    };

    return (
        <>
            <div
                className={`cart ${isMobile ? 'cart-mobile' : ''}`}
                onClick={toggleExpand}
            >
                <div className="cart-desc">
                    <h2>Корзина</h2>
                    <div className="quantity-total">
                        {calculateTotalQuantity()}
                    </div>
                </div>

                {!isMobile && (
                    <CartContent
                        items={items}
                        isEmpty={isEmpty}
                        getImagePath={getImagePath}
                        handleUpdateQuantity={handleUpdateQuantity}
                        calculateTotal={calculateTotal}
                        shouldShowDeliveryInfo={shouldShowDeliveryInfo}
                    />
                )}
            </div>

            {isMobile && isExpanded && (
                <div
                    className="modal-backdrop"
                    onClick={handleModalBackdropClick}
                >
                    <div
                        className="cart cart-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div className="cart-desc">
                                <h2>Корзина</h2>
                                <div className="quantity-total">
                                    {calculateTotalQuantity()}
                                </div>
                            </div>
                            <button
                                className="close-modal-button"
                                onClick={toggleExpand}
                            >
                                ✕
                            </button>
                        </div>
                        <CartContent
                            items={items}
                            isEmpty={isEmpty}
                            getImagePath={getImagePath}
                            handleUpdateQuantity={handleUpdateQuantity}
                            calculateTotal={calculateTotal}
                            shouldShowDeliveryInfo={shouldShowDeliveryInfo}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FoodCart;