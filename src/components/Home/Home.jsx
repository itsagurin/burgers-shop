import { useState } from 'react';
import FoodCart from "../FoodCart/FoodCart.jsx";
import MenuNavbar from "../MenuNavbar/MenuNavbar.jsx";
import MenuContent from "../MenuContent/MenuContent.jsx";
import cartItemsData from "../../data/cart/cartItems.json";

function Home() {
    const [activeCategory, setActiveCategory] = useState('burgers');
    const [cartItems, setCartItems] = useState(cartItemsData);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <>
            <MenuNavbar
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />
            <div className="main-menu">
                <div className="menu-section">
                    <MenuContent
                        activeCategory={activeCategory}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />
                </div>
                <FoodCart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                />
            </div>
        </>
    )
}

export default Home