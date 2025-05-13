import "./AdminPanel.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase.js";
import { ref, get, set, remove } from "firebase/database";
import logo from "../../assets/footer/footer_logo.svg";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            navigate("/login");
            return;
        }

        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const usersRef = ref(database, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const usersArray = Object.keys(usersData).map(uid => ({
                    uid,
                    ...usersData[uid]
                }));
                setUsers(usersArray);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Ошибка при загрузке пользователей:", err);
            setError("Не удалось загрузить список пользователей");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/login");
    };

    const handleDeleteUser = async (uid) => {
        if (!window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
            return;
        }

        try {
            await remove(ref(database, `users/${uid}`));
            setUsers(users.filter(user => user.uid !== uid));
        } catch (err) {
            console.error("Ошибка при удалении пользователя:", err);
            setError("Не удалось удалить пользователя");
        }
    };

    const handleEditClick = (user) => {
        setEditUser(user);
        setEditForm({ ...user });
    };

    const handleEditCancel = () => {
        setEditUser(null);
        setEditForm({});
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditForm({
                ...editForm,
                [parent]: {
                    ...editForm[parent],
                    [child]: value === 'true'
                }
            });
        } else {
            setEditForm({
                ...editForm,
                [name]: value
            });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const userRef = ref(database, `users/${editUser.uid}`);
            const { ...userData } = editForm;
            await set(userRef, userData);

            setUsers(users.map(user =>
                user.uid === editUser.uid ? { uid: editUser.uid, ...userData } : user
            ));

            setEditUser(null);
            setEditForm({});
        } catch (err) {
            console.error("Ошибка при обновлении пользователя:", err);
            setError("Не удалось обновить данные пользователя");
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-logo"><img src={logo} alt="logo" /></div>
                <h1 className="admin-title">Админ-панель</h1>
                <button className="admin-logout" onClick={handleLogout}>Выйти</button>
            </div>

            {error && <div className="admin-error">{error}</div>}

            {loading ? (
                <div className="admin-loading">Загрузка пользователей...</div>
            ) : (
                <div className="admin-content">
                    <h2>Список пользователей ({users.length})</h2>

                    {editUser ? (
                        <div className="edit-user-form">
                            <h3>Редактирование пользователя</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Имя пользователя</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={editForm.username || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editForm.email || ''}
                                        onChange={handleEditFormChange}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Телефон</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={editForm.phone || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Адрес</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={editForm.address || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Город</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={editForm.city || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zipCode">Индекс</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={editForm.zipCode || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthday">Дата рождения</label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        name="birthday"
                                        value={editForm.birthday || ''}
                                        onChange={handleEditFormChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Уведомления по email</label>
                                    <select
                                        name="preferences.emailNotifications"
                                        value={editForm.preferences?.emailNotifications || false}
                                        onChange={handleEditFormChange}
                                    >
                                        <option value={true}>Включены</option>
                                        <option value={false}>Выключены</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>SMS уведомления</label>
                                    <select
                                        name="preferences.smsNotifications"
                                        value={editForm.preferences?.smsNotifications || false}
                                        onChange={handleEditFormChange}
                                    >
                                        <option value={true}>Включены</option>
                                        <option value={false}>Выключены</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="admin-button save">Сохранить</button>
                                    <button type="button" className="admin-button cancel" onClick={handleEditCancel}>Отмена</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <table className="users-table">
                            <thead>
                            <tr>
                                <th>Имя пользователя</th>
                                <th>Email</th>
                                <th>Телефон</th>
                                <th>Адрес</th>
                                <th>Город</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.uid}>
                                        <td>{user.username || user.displayName || '-'}</td>
                                        <td>{user.email || '-'}</td>
                                        <td>{user.phone || '-'}</td>
                                        <td>{user.address || '-'}</td>
                                        <td>{user.city || '-'}</td>
                                        <td className="actions">
                                            <button
                                                className="admin-button edit"
                                                onClick={() => handleEditClick(user)}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                className="admin-button delete"
                                                onClick={() => handleDeleteUser(user.uid)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-users">Нет пользователей</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;