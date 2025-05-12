import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase.js";

const ProfileTab = ({
                        userData,
                        formData,
                        setFormData,
                        currentUser,
                        loading,
                        setLoading,
                        setError,
                        setSuccess,
                        setUserData,
                        setIsNewUser,
                        isNewUser,
                        checkMissingFields
                    }) => {
    const [editMode, setEditMode] = useState(isNewUser || false);

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

    const handleProfileSave = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

            // Update profile in Firebase Auth
            if (formData.displayName !== currentUser.displayName) {
                await updateProfile(currentUser, {
                    displayName: formData.displayName
                });
            }

            // Update profile in Realtime Database (вместо Firestore)
            const userRef = ref(database, `users/${currentUser.uid}`);
            await update(userRef, formData);

            // Update local state
            setUserData(formData);
            setEditMode(false);
            setSuccess("Профиль успешно обновлен");

            // Recheck missing fields
            checkMissingFields();

            // If this was a new user, mark welcome message as shown
            if (isNewUser) {
                setIsNewUser(false);
            }
        } catch (err) {
            console.error("Ошибка при обновлении профиля:", err);
            setError("Не удалось обновить профиль");
        } finally {
            setLoading(false);
        }
    };

    // Cancel edit mode
    const handleCancel = () => {
        setFormData(userData);
        setEditMode(false);
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="account-tab-content">
            <div className="profile-section">
                <div className="profile-header">
                    <h2 className="section-title">Ваш профиль</h2>
                    {!editMode && (
                        <button
                            className="edit-button"
                            onClick={() => setEditMode(true)}
                        >
                            ✏️ Редактировать
                        </button>
                    )}
                </div>

                <div className="profile-content">
                    <div className="profile-avatar">
                        <div className="avatar-container">
                            {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : "У"}
                        </div>
                        {editMode && (
                            <div className="avatar-hint">
                                <small>Инициалы генерируются из имени</small>
                            </div>
                        )}
                    </div>

                    <div className="profile-details">
                        {editMode ? (
                            <form className="profile-form">
                                <div className="form-section">
                                    <h3>Основная информация</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="displayName">Имя пользователя*</label>
                                            <input
                                                type="text"
                                                id="displayName"
                                                name="displayName"
                                                value={formData.displayName || ""}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email*</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={currentUser.email}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Телефон*</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone || ""}
                                                onChange={handleInputChange}
                                                placeholder="+7 (___) ___-__-__"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="birthday">Дата рождения</label>
                                            <input
                                                type="date"
                                                id="birthday"
                                                name="birthday"
                                                value={formData.birthday || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Адрес доставки</h3>
                                    <div className="form-group full-width">
                                        <label htmlFor="address">Адрес*</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address || ""}
                                            onChange={handleInputChange}
                                            placeholder="Улица, дом, квартира"
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="city">Город*</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city || ""}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="zipCode">Почтовый индекс*</label>
                                            <input
                                                type="text"
                                                id="zipCode"
                                                name="zipCode"
                                                value={formData.zipCode || ""}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="account-button secondary"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="button"
                                        className="account-button primary"
                                        onClick={handleProfileSave}
                                        disabled={loading}
                                    >
                                        {loading ? "Сохранение..." : "Сохранить изменения"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="profile-info">
                                <div className="info-group">
                                    <h3>Основная информация</h3>
                                    <div className="info-row">
                                        <div className="info-item">
                                            <span className="info-label">Имя пользователя:</span>
                                            <span className="info-value">{userData.displayName || "Не указано"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Email:</span>
                                            <span className="info-value">{currentUser.email}</span>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-item">
                                            <span className="info-label">Телефон:</span>
                                            <span className="info-value">{userData.phone || "Не указано"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Дата рождения:</span>
                                            <span className="info-value">
                                                {userData.birthday ? new Date(userData.birthday).toLocaleDateString('ru-RU') : "Не указано"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <h3>Адрес доставки</h3>
                                    <div className="info-row">
                                        <div className="info-item full-width">
                                            <span className="info-label">Адрес:</span>
                                            <span className="info-value">{userData.address || "Не указано"}</span>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-item">
                                            <span className="info-label">Город:</span>
                                            <span className="info-value">{userData.city || "Не указано"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Почтовый индекс:</span>
                                            <span className="info-value">{userData.zipCode || "Не указано"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <h3>Дата регистрации</h3>
                                    <div className="info-row">
                                        <div className="info-item full-width">
                                            <span className="info-value register-date">
                                                {currentUser.metadata?.creationTime
                                                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString('ru-RU')
                                                    : "Не указано"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;