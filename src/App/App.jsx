import './App.scss';
import FoodCart from "../components/FoodCart/FoodCart.jsx";
import Header from "../components/Header/Header.jsx";

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <FoodCart />
            </div>
        </>
    )
}

export default App