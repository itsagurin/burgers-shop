import React, { useState } from 'react';
import './MenuContent.scss';
import { categories } from "../../data/categories/categories.js";
import productsData from "../../data/products/products.json";
import { addToCart } from "../FoodCart/helper/helper.js";
import { categoryToProductsMap } from "../../data/categoryToProductsMap/categoryToProductsMap.js";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const MenuContent = ({ activeCategory, cartItems, setCartItems }) => {
    const [addedProductId, setAddedProductId] = useState(null);
    const [modalProduct, setModalProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const categoryName = categories.find(cat => cat.id === activeCategory)?.name;

    const productsKey = categoryToProductsMap[activeCategory];
    const categoryProducts = productsKey ? productsData[productsKey]?.items : null;

    const handleAddToCart = (product) => {
        addToCart(product, cartItems, setCartItems);

        setAddedProductId(product.id);
        setTimeout(() => {
            setAddedProductId(null);
        }, 500);
    };

    const openModal = (product) => {
        setModalProduct(product);
        setIsModalOpen(true);
        setQuantity(1);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalProduct(null);
    };

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleAddFromModal = (product) => {
        addToCart(product, cartItems, setCartItems, quantity);
        closeModal();
    };

    return (
        <div className="menu-content">
            <h2 className="category-title">{categoryName}</h2>

            {categoryProducts ? (
                <div className="products-grid">
                    {categoryProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image" onClick={() => openModal(product)}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <div className="product-price">{product.price}₽</div>
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-weight">{product.weight}</div>
                                <button
                                    className={`add-button ${addedProductId === product.id ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {addedProductId === product.id ? 'Добавлено' : 'Добавить'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="menu-placeholder">
                    <p>Содержимое для категории "{categoryName}" будет скоро добавлено</p>
                </div>
            )}

            <ModalWindow
                product={modalProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
                onAdd={handleAddFromModal}
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />
        </div>
    );
};

export default MenuContent;