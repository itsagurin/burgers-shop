import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../firebase.js";
import { ref, get } from "firebase/database";
import { useAuth } from "../../../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { loading: ctxLoading } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const uid = cred.user.uid;

            const userSnap = await get(ref(database, `users/${uid}`));
            if (!userSnap.exists()) {
                console.warn("Профиль юзера не найден в RTDB");
            } else {
                const profile = userSnap.val();
                console.log("Профиль из RTDB:", profile);
            }

            navigate("/account");
        } catch (err) {
            let msg = "Ошибка при входе";
            if (err.code === "auth/user-not-found") msg = "Пользователь не найден";
            else if (err.code === "auth/wrong-password") msg = "Неверный пароль";
            else if (err.code === "auth/invalid-email") msg = "Некорректный email";
            else if (err.code === "auth/too-many-requests") msg = "Слишком много попыток";
            console.error("Login error:", err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo"><img src={logo} alt="logo" /></div>
                <h1 className="auth-title">Вход в аккаунт</h1>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Вход..." : "Войти"}
                    </button>
                    <div className="auth-links">
                        <Link to="/reset-password" className="forgot-password">Забыли пароль?</Link>
                        <div className="register-link">
                            <span>Нет аккаунта?</span> <Link to="/register">Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
