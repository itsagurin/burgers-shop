import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./ProtectedRoute.scss"

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                Загрузка...
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default ProtectedRoute;