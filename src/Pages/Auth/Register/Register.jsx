import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth, database } from "../../../firebase.js";
import { ref, set } from "firebase/database";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const username = e.target.username.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const confirm = e.target.confirmPassword.value;

        if (password !== confirm) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError("Пароль должен быть ≥6 символов");
            setLoading(false);
            return;
        }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: username });

            const uid = userCred.user.uid;
            await set(ref(database, `users/${uid}`), {
                username,
                email,
                createdAt: Date.now()
            });

            navigate("/account");
        } catch (err) {
            let msg = "Ошибка при регистрации";
            if (err.code === "auth/email-already-in-use") msg = "Этот email уже занят";
            else if (err.code === "auth/invalid-email") msg = "Некорректный email";
            else if (err.code === "auth/weak-password") msg = "Слишком слабый пароль";
            console.error("Register error:", err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo"><img src={logo} alt="logo" /></div>
                <h1 className="auth-title">Регистрация</h1>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password" minLength={6} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Загрузка..." : "Зарегистрироваться"}
                    </button>
                    <div className="auth-links">
                        <div className="login-link">
                            <span>Уже есть аккаунт?</span> <Link to="/login">Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;