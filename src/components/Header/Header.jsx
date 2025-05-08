import "./Header.scss";
import logo from "../../assets/header/logo.svg";
import burger from "../../assets/header/burger.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Header = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleAccount = async () => {
            navigate("/account");
    };

    return (
        <header>
            <div className="header-content">
                <div className="header-top">
                    <Link to="/"><img src={logo} className="header-image" alt="logo" /></Link>
                    <div className="auth-buttons">
                        {currentUser ? (
                            <button className="auth-btn logout-btn" onClick={handleAccount}>
                                Аккаунт
                            </button>
                        ) : (
                            <Link to="/login" className="auth-btn login-btn">
                                Войти
                            </Link>
                        )}
                    </div>
                </div>
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
};

export default Header;