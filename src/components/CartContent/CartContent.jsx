import './CartContent.scss';

const CartContent = ({
                         items,
                         isEmpty,
                         getImagePath,
                         handleUpdateQuantity,
                         calculateTotal,
                         shouldShowDeliveryInfo
                     }) => (
    <>
        {isEmpty ? (
            <div className="empty-cart-message">Тут пока пусто :(</div>
        ) : (
            <>
                <div className="cart-items">
                    {items.filter(item => item.quantity > 0).map(item => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={getImagePath(item.image)}
                                alt={item.name}
                                className="item-image"
                            />
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <span className="item-weight">{item.weight}г</span>
                                <span className="item-price">{item.price}₽</span>
                            </div>
                            <div className="quantity-controlmica">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateQuantity(item.id, -1);
                                    }}
                                    className="quantity-button"
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateQuantity(item.id, 1);
                                    }}
                                    className="quantity-button"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {!isEmpty && (
                    <>
                        <div className="cart-summary">
                            <span>Итого</span>
                            <span className="total-price">{calculateTotal()}₽</span>
                        </div>
                        <button
                            className="order-button"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Оформить заказ
                        </button>
                        {shouldShowDeliveryInfo() && (
                            <div className="delivery-info">
                                <span>🚚 Бесплатная доставка</span>
                            </div>
                        )}
                    </>
                )}
            </>
        )}
    </>
);

export default CartContent;