import "./Register.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";

const Register = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Регистрация</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Введите ваше имя"
                            required
                        />
                    </div>

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
                            placeholder="Придумайте пароль"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Повторите пароль"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">Зарегистрироваться</button>

                    <div className="auth-links">
                        <div className="login-link">
                            <span>Уже есть аккаунт?</span>
                            <Link to="/login">Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;