import { useState } from "react";
import { updatePassword } from "firebase/auth";

const SettingsTab = ({
                         currentUser,
                         formData,
                         setFormData,
                         loading,
                         setLoading,
                         setError,
                         setSuccess,
                         handleProfileSave,
                         handleLogout
                     }) => {
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
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

    const saveNotificationSettings = () => {
        handleProfileSave(formData);
    };

    return (
        <div className="account-tab-content">
            <div className="settings-section">
                <h2 className="section-title">Настройки аккаунта</h2>

                <div className="settings-group password-settings">
                    <h3>Безопасность</h3>
                    <button
                        className="account-button secondary"
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                        {showPasswordChange ? "Отменить" : "Изменить пароль"}
                    </button>

                    {showPasswordChange && (
                        <div className="password-change-section">
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

                <div className="settings-group notification-settings">
                    <h3>Уведомления</h3>
                    <div className="settings-form">
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="emailNotifications"
                                name="preferences.emailNotifications"
                                checked={formData.preferences?.emailNotifications || false}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="emailNotifications">Получать уведомления на email</label>
                        </div>
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="smsNotifications"
                                name="preferences.smsNotifications"
                                checked={formData.preferences?.smsNotifications || false}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="smsNotifications">Получать SMS-уведомления</label>
                        </div>
                        <button
                            className="account-button primary"
                            onClick={saveNotificationSettings}
                            disabled={loading}
                        >
                            {loading ? "Сохранение..." : "Сохранить настройки"}
                        </button>
                    </div>
                </div>

                <div className="settings-group logout-settings">
                    <h3>Выход из аккаунта</h3>
                    <button
                        className="account-button danger"
                        onClick={handleLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;