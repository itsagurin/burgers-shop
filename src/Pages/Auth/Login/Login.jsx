import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.js";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);

            navigate("/");
        } catch (error) {
            let errorMessage = "Ошибка при входе";
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Пользователь с таким email не найден";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Неверный пароль";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Некорректный email";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Слишком много попыток входа. Попробуйте позже";
            }
            console.error("Error logging in:", error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Вход в аккаунт</h1>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Введите ваш email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Введите ваш пароль"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>

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