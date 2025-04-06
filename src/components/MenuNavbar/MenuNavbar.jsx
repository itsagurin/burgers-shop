import './MenuNavbar.scss';
import { categories } from "../../data/categories/categories.js";

const MenuNavbar = ({ activeCategory, onCategoryChange }) => {

    const handleCategoryClick = (categoryId) => {
        onCategoryChange(categoryId);
    };

    return (
        <div className="menu-container">
            <div className="category-nav">
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                        >
                            <span className="category-icon">
                                <img src={category.iconSrc} alt={category.name} />
                            </span>
                            <span className="category-name">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuNavbar;