import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.js";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, {
                displayName: username
            });

            console.log("User registered:", userCredential.user);
            navigate("/login");
        } catch (error) {
            let errorMessage = "Ошибка при регистрации";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Этот email уже используется";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Некорректный email";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Слишком слабый пароль";
            }
            console.error("Error registering user:", error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Регистрация</h1>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Введите ваше имя"
                            required
                        />
                    </div>

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
                            placeholder="Придумайте пароль (минимум 6 символов)"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Загрузка..." : "Зарегистрироваться"}
                    </button>

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