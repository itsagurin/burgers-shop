import './ModalWindow.scss';

const ProductModal = ({ product, isOpen, onClose, onAdd, quantity, onIncrement, onDecrement }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    ×
                </button>

                <div className="modal-content">
                    <div className="modal-product-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-product-details">
                        <h2 className="modal-product-title">{product.name}</h2>

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

                        <div className="modal-actions">
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

                            <button
                                className="modal-add-button"
                                onClick={() => onAdd(product)}
                            >
                                Добавить {product.price && <span>{product.price}₽</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;