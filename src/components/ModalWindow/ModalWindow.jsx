import './ModalWindow.scss';

const ProductModal = ({ product, isOpen, onClose, onAdd, quantity, onIncrement, onDecrement }) => {
    if (!isOpen || !product) return null;

    const calculateTotalPrice = () => {
        if (!product || !product.price) return 0;
        return quantity * parseInt(product.price);
    }

    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    ×
                </button>
                <h2 className="modal-product-title">{product.name}</h2>

                <div className="modal-content">
                    <div className="modal-product-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-product-details">
                        <p className="modal-product-description">
                            {product.description || "Подробное описание будет добавлено (...)"}
                        </p>

                        <div className="modal-product-composition">
                            <h3>Состав:</h3>
                            {product.composition ? (
                                <ul>
                                    {product.composition.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Состав будет добавлен (...)</p>
                            )}
                        </div>

                        {product.weight && (
                            <div className="modal-product-weight">{product.weight}</div>
                        )}
                    </div>
                </div>

                <div className="modal-actions">
                    <div className="modal-actions-main">
                        <button
                            className="modal-add-button"
                            onClick={() => onAdd(product)}
                        >
                            Добавить
                        </button>

                        <div className="modal-quantity-control">
                            <button
                                className="quantity-button"
                                onClick={onDecrement}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button
                                className="quantity-button"
                                onClick={onIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="modal-button-price">
                        <span>{calculateTotalPrice()}₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;