import "./ResetPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/footer/footer_logo.svg";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.js";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        const email = e.target.email.value.trim();

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            e.target.reset();
        } catch (err) {
            let msg = "Ошибка при отправке письма для сброса пароля";

            if (err.code === "auth/user-not-found") {
                msg = "Пользователь с таким email не найден";
            } else if (err.code === "auth/invalid-email") {
                msg = "Некорректный формат email";
            } else if (err.code === "auth/too-many-requests") {
                msg = "Слишком много попыток. Попробуйте позже";
            }

            console.error("Reset password error:", err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-logo">
                    <img src={logo} alt="logo" />
                </div>

                <h1 className="auth-title">Восстановление пароля</h1>

                {success ? (
                    <div className="reset-success">
                        <p>Инструкция по восстановлению пароля отправлена на указанный email</p>
                        <button
                            onClick={handleBackToLogin}
                            className="auth-button"
                        >
                            Вернуться ко входу
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="reset-description">
                            Введите email, указанный при регистрации, и мы отправим вам инструкцию по восстановлению пароля
                        </p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleResetPassword}>
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

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >
                                {loading ? "Отправка..." : "Отправить"}
                            </button>

                            <div className="auth-links">
                                <Link to="/login" className="back-to-login">
                                    Вернуться ко входу
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;