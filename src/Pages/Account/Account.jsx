import "./Account.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { auth } from "../../firebase.js";
import logo from "../../assets/footer/footer_logo.svg";

import ProfileTab from "../../components/Account/ProfileTab/ProfileTab.jsx";
import OrdersTab from "../../components/Account/OrdersTab/OrdersTab.jsx";
import SettingsTab from "../../components/Account/SettingsTab/SettingsTab.jsx";
import { fetchUserData, handleUserLogout } from "./Utils/accountUtils.js";

const Account = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [userData, setUserData] = useState({
        displayName: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        birthday: "",
        preferences: {
            emailNotifications: true,
            smsNotifications: false,
        }
    });
    const [missingFields, setMissingFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        fetchUserData({
            currentUser,
            setLoading,
            setIsNewUser,
            setActiveTab,
            setUserData,
            setFormData,
            checkMissingFields,
            setError
        });
    }, [currentUser]);

    const checkMissingFields = () => {
        const required = ["phone", "address", "city", "zipCode"];
        const missing = required.filter(field =>
            !userData[field] || userData[field].trim() === ""
        );
        setMissingFields(missing);
    };

    const handleLogout = async () => {
        await handleUserLogout({ auth, navigate, setError });
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
            <div className="account-card expanded">
                <div className="account-header">
                    <div className="account-logo"><img src={logo} alt="logo" /></div>
                    <h1 className="account-title">Личный кабинет</h1>
                    {isNewUser && (
                        <div className="account-welcome">
                            Добро пожаловать! Пожалуйста, заполните данные для доставки.
                        </div>
                    )}
                </div>

                {error && <div className="account-error">{error}</div>}
                {success && <div className="account-success">{success}</div>}

                {missingFields.length > 0 && activeTab !== "profile" && (
                    <div className="account-warning">
                        <p>Для быстрого оформления заказов, пожалуйста, заполните: {missingFields.map(field => {
                            const fieldNames = {
                                phone: "телефон",
                                address: "адрес",
                                city: "город",
                                zipCode: "индекс"
                            };
                            return fieldNames[field];
                        }).join(", ")}</p>
                        <button
                            className="account-button warning"
                            onClick={() => {
                                setActiveTab("profile");
                            }}
                        >
                            Заполнить сейчас
                        </button>
                    </div>
                )}

                <div className="account-tabs">
                    <button
                        className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Профиль
                    </button>
                    <button
                        className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        История заказов
                    </button>
                    <button
                        className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Настройки
                    </button>
                </div>

                {activeTab === "profile" && (
                    <ProfileTab
                        userData={userData}
                        formData={formData}
                        setFormData={setFormData}
                        currentUser={currentUser}
                        loading={loading}
                        setLoading={setLoading}
                        setError={setError}
                        setSuccess={setSuccess}
                        setUserData={setUserData}
                        setIsNewUser={setIsNewUser}
                        isNewUser={isNewUser}
                        checkMissingFields={checkMissingFields}
                    />
                )}

                {activeTab === "orders" && (
                    <OrdersTab />
                )}

                {activeTab === "settings" && (
                    <SettingsTab
                        currentUser={currentUser}
                        formData={formData}
                        setFormData={setFormData}
                        loading={loading}
                        setLoading={setLoading}
                        setError={setError}
                        setSuccess={setSuccess}
                        handleProfileSave={(data) => {
                            setUserData(data);
                            setSuccess("Настройки успешно сохранены");
                        }}
                        handleLogout={handleLogout}
                    />
                )}
            </div>
        </div>
    );
};

export default Account;