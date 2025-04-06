import React from 'react';
import './MenuContent.scss';
import { categories } from "../../data/categories/categories.js";

const MenuContent = ({ activeCategory }) => {
    return (
        <div className="menu-content">
            <h2 className="category-title">
                {categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <div className="menu-placeholder">
                <p>Содержимое для категории "{categories.find(cat => cat.id === activeCategory)?.name}" будет здесь</p>
            </div>
        </div>
    );
};

export default MenuContent;