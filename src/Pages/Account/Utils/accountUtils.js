import { signOut } from "firebase/auth";
import { database } from "../../../firebase.js";
import {get, ref, set} from "firebase/database";

export const fetchUserData = async ({
                                        currentUser,
                                        setLoading,
                                        setIsNewUser,
                                        setActiveTab,
                                        setUserData,
                                        setFormData,
                                        checkMissingFields,
                                        setError
                                    }) => {
    if (!currentUser) return;

    try {
        setLoading(true);
        const isNewReg = sessionStorage.getItem("newRegistration");
        if (isNewReg) {
            setIsNewUser(true);
            sessionStorage.removeItem("newRegistration");
            setActiveTab("profile");
        }

        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(prevState => ({
                ...prevState,
                displayName: currentUser.displayName || "",
                ...data
            }));
            setFormData({
                displayName: currentUser.displayName || "",
                ...data
            });
        } else {
            const initialData = {
                displayName: currentUser.displayName || "",
                email: currentUser.email,
                phone: "",
                address: "",
                city: "",
                zipCode: "",
                birthday: "",
                preferences: {
                    emailNotifications: true,
                    smsNotifications: false,
                }
            };
            setUserData(initialData);
            setFormData(initialData);

            await set(ref(database, `users/${currentUser.uid}`), initialData);
        }

        checkMissingFields();
    } catch (err) {
        console.error("Ошибка загрузки данных пользователя:", err);
        setError("Не удалось загрузить данные профиля");
    } finally {
        setLoading(false);
    }
};

export const handleUserLogout = async ({ auth, navigate, setError }) => {
    try {
        await signOut(auth);
        navigate("/login");
    } catch (err) {
        console.error("Ошибка при выходе:", err);
        setError("Ошибка при выходе из аккаунта");
    }
};