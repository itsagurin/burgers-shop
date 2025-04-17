import "./Login.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";

const Login = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Вход в аккаунт</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Введите ваш email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите ваш пароль"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">Войти</button>

                    <div className="auth-links">
                        <Link to="/reset-password" className="forgot-password">Забыли пароль?</Link>
                        <div className="register-link">
                            <span>Нет аккаунта?</span>
                            <Link to="/register">Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;