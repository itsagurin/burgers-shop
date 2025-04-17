import "./ResetPassword.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";

const ResetPassword = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Восстановление пароля</h1>
                <p className="reset-description">Введите email, указанный при регистрации, и мы отправим вам инструкцию по восстановлению пароля</p>

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

                    <button type="submit" className="auth-button">Отправить</button>

                    <div className="auth-links">
                        <Link to="/login" className="back-to-login">Вернуться ко входу</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;