import "./Header.scss"
import logo from "../../assets/header/logo.svg"
import burger from "../../assets/header/burger.svg"

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <a href="#"><img src={logo} className="header-image" alt="logo" /></a>
                <div className="header-text">
                    <img src={burger} alt="burger" />
                    <div className="header_new_text">
                        <div>
                            <h1>Только самые <strong>сочные бургеры!</strong></h1>
                            <p>Бесплатная доставка от 599₽</p>
                        </div>
                        <button>Добавить</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;