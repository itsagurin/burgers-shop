import "./Account.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import logo from "../../assets/footer/footer_logo.svg";

const Account = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Ошибка при выходе:", err);
            setError("Ошибка при выходе из аккаунта");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError("Пароль должен быть ≥6 символов");
            setLoading(false);
            return;
        }

        try {
            await updatePassword(currentUser, newPassword);
            setSuccess("Пароль успешно изменен");
            e.target.reset();
            setShowPasswordChange(false);
        } catch (err) {
            console.error("Ошибка при смене пароля:", err);
            setError("Ошибка при смене пароля. Возможно, требуется повторный вход");
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="account-container">
                <div className="account-loading">Загрузка профиля...</div>
            </div>
        );
    }

    return (
        <div className="account-container">
            <div className="account-card">
                <div className="account-header">
                    <div className="account-logo"><img src={logo} alt="logo" /></div>
                    <h1 className="account-title">Личный кабинет</h1>
                </div>

                {error && <div className="account-error">{error}</div>}
                {success && <div className="account-success">{success}</div>}

                <div className="account-info">
                    <div className="account-avatar">
                        {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="account-details">
                        <div className="account-detail-item">
                            <span className="account-label">Имя пользователя:</span>
                            <span className="account-value">{currentUser.displayName || "Не указано"}</span>
                        </div>
                        <div className="account-detail-item">
                            <span className="account-label">Email:</span>
                            <span className="account-value">{currentUser.email}</span>
                        </div>
                        <div className="account-detail-item">
                            <span className="account-label">Дата регистрации:</span>
                            <span className="account-value">
                                {currentUser.metadata?.creationTime
                                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString('ru-RU')
                                    : "Не указано"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="account-actions">
                    <button
                        className="account-button secondary"
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                        {showPasswordChange ? "Отменить" : "Изменить пароль"}
                    </button>
                    <button
                        className="account-button primary"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>

                {showPasswordChange && (
                    <div className="password-change-section">
                        <h2 className="section-title">Изменение пароля</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label htmlFor="newPassword">Новый пароль</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    minLength={6}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="account-button primary"
                                disabled={loading}
                            >
                                {loading ? "Обновление..." : "Обновить пароль"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;