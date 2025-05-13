import { Link } from "react-router-dom";
import "./OrdersTab.scss"

const OrdersTab = () => {
    return (
        <div className="account-tab-content">
            <div className="orders-section">
                <h2 className="section-title">История заказов</h2>
                <div className="no-orders">
                    <div style={{ fontSize: "48px", opacity: "0.5", marginBottom: "15px" }}>
                        📦
                    </div>
                    <p>У вас пока нет заказов</p>
                    <Link to="/" className="account-button primary">
                        Перейти к меню
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrdersTab;