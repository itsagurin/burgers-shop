import { useState } from 'react';
import './App.scss';
import FoodCart from "../components/FoodCart/FoodCart.jsx";
import Header from "../components/Header/Header.jsx";
import MenuNavbar from "../components/MenuNavbar/MenuNavbar.jsx";
import MenuContent from "../components/MenuContent/MenuContent.jsx";
import Footer from "../components/Footer/Footer.jsx";
import cartItemsData from "../data/cart/cartItems.json";

function App() {
    const [activeCategory, setActiveCategory] = useState('burgers');
    const [cartItems, setCartItems] = useState(cartItemsData);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <>
            <Header />
            <div className="container">
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
            </div>
            <Footer
                cartItems={cartItems}
                setCartItems={setCartItems}/>
        </>
    )
}

export default App