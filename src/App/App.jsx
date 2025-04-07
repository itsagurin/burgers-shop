import { useState } from 'react';
import './App.scss';
import FoodCart from "../components/FoodCart/FoodCart.jsx";
import Header from "../components/Header/Header.jsx";
import MenuNavbar from "../components/MenuNavbar/MenuNavbar.jsx";
import MenuContent from "../components/MenuContent/MenuContent.jsx";
import Footer from "../components/Footer/Footer.jsx";

function App() {
    const [activeCategory, setActiveCategory] = useState('burgers');

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
                        <MenuContent activeCategory={activeCategory} />
                    </div>
                    <FoodCart />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default App