import React from 'react';
import './MenuContent.scss';
import { categories } from "../../data/categories/categories.js";
import productsData from "../../data/products/products.json";

const MenuContent = ({ activeCategory }) => {
    const categoryName = categories.find(cat => cat.id === activeCategory)?.name;

    const categoryToProductsMap = {
        'burgers': 'burgers',
        'appetizers': 'snacks',
        'hotdogs': 'hotdogs',
        'combo': 'combos',
        'shawarma': 'shurmas',
        'pizza': 'pizza',
        'wok': 'vok',
        'desserts': null,
        'sauces': null
    };

    const productsKey = categoryToProductsMap[activeCategory];

    const categoryProducts = productsKey ? productsData[productsKey]?.items : null;

    return (
        <div className="menu-content">
            <h2 className="category-title">{categoryName}</h2>

            {categoryProducts ? (
                <div className="products-grid">
                    {categoryProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <div className="product-price">{product.price}₽</div>
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-weight">{product.weight}</div>
                                <button className="add-button">Добавить</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="menu-placeholder">
                    <p>Содержимое для категории "{categoryName}" будет скоро добавлено</p>
                </div>
            )}
        </div>
    );
};

export default MenuContent;