import { useState, useEffect } from "react";
import "./ProductsPanel.scss";
import productsData from "../../../data/products/products.json";

const ProductsPanel = () => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [addProductForm, setAddProductForm] = useState({
        name: "",
        price: "",
        weight: "",
        image: "/images/products/",
        category: ""
    });
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setCategories(productsData);
        } catch (err) {
            console.error("Ошибка при загрузке продуктов:", err);
            setError("Не удалось загрузить список продуктов");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = (categoryKey, productId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
            return;
        }

        try {
            const updatedCategories = { ...categories };
            updatedCategories[categoryKey].items = updatedCategories[categoryKey].items.filter(
                product => product.id !== productId
            );

            setCategories(updatedCategories);

            console.log("Продукт удален. Обновленные категории:", updatedCategories);
            alert("Продукт успешно удален! В реальном проекте данные были бы сохранены на сервере.");
        } catch (err) {
            console.error("Ошибка при удалении продукта:", err);
            setError("Не удалось удалить продукт");
        }
    };

    const handleEditClick = (categoryKey, product) => {
        setEditProduct({ categoryKey, ...product });
        setEditForm({ categoryKey, ...product });
    };

    const handleEditCancel = () => {
        setEditProduct(null);
        setEditForm({});
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        try {
            const { categoryKey, id, name, price, weight, image } = editForm;
            const updatedCategories = { ...categories };
            const productIndex = updatedCategories[categoryKey].items.findIndex(item => item.id === id);

            if (productIndex !== -1) {
                updatedCategories[categoryKey].items[productIndex] = {
                    id,
                    name,
                    price,
                    weight,
                    image
                };

                setCategories(updatedCategories);

                console.log("Продукт обновлен. Обновленные категории:", updatedCategories);

                alert("Продукт успешно обновлен! В реальном проекте данные были бы сохранены на сервере.");

                setEditProduct(null);
                setEditForm({});
            }
        } catch (err) {
            console.error("Ошибка при обновлении продукта:", err);
            setError("Не удалось обновить данные продукта");
        }
    };

    const handleAddProductClick = () => {
        setIsAddingProduct(true);
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddProductForm({
            ...addProductForm,
            [name]: value
        });
    };

    const handleAddProductSubmit = (e) => {
        e.preventDefault();

        try {
            const { name, price, weight, image, category } = addProductForm;

            if (!category) {
                alert("Пожалуйста, выберите категорию продукта");
                return;
            }

            const updatedCategories = { ...categories };

            const newId = String(Math.max(...Object.values(categories)
                .flatMap(cat => cat.items)
                .map(item => parseInt(item.id))) + 1);

            updatedCategories[category].items.push({
                id: newId,
                name,
                price,
                weight,
                image
            });

            setCategories(updatedCategories);

            console.log("Продукт добавлен. Обновленные категории:", updatedCategories);

            alert("Продукт успешно добавлен! В реальном проекте данные были бы сохранены на сервере.");

            setAddProductForm({
                name: "",
                price: "",
                weight: "",
                image: "/images/products/",
                category: ""
            });
            setIsAddingProduct(false);
        } catch (err) {
            console.error("Ошибка при добавлении продукта:", err);
            setError("Не удалось добавить продукт");
        }
    };

    const handleAddCancel = () => {
        setIsAddingProduct(false);
        setAddProductForm({
            name: "",
            price: "",
            weight: "",
            image: "/images/products/",
            category: ""
        });
    };

    return (
        <div className="products-content">
            <div className="products-header">
                <h2>Управление продуктами</h2>
                {!isAddingProduct && !editProduct && (
                    <button className="admin-button add" onClick={handleAddProductClick}>
                        Добавить продукт
                    </button>
                )}
            </div>

            {error && <div className="admin-error">{error}</div>}

            {loading ? (
                <div className="admin-loading">Загрузка продуктов...</div>
            ) : (
                <>
                    {isAddingProduct ? (
                        <div className="edit-product-form">
                            <h3>Добавление нового продукта</h3>
                            <form onSubmit={handleAddProductSubmit}>
                                <div className="form-group">
                                    <label htmlFor="category">Категория</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={addProductForm.category}
                                        onChange={handleAddFormChange}
                                        required
                                    >
                                        <option value="">Выберите категорию</option>
                                        {Object.keys(categories).map(key => (
                                            <option key={key} value={key}>
                                                {categories[key].title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Название продукта</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={addProductForm.name}
                                        onChange={handleAddFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Цена (руб)</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={addProductForm.price}
                                        onChange={handleAddFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight">Вес/объем</label>
                                    <input
                                        type="text"
                                        id="weight"
                                        name="weight"
                                        value={addProductForm.weight}
                                        onChange={handleAddFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Путь к изображению</label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        value={addProductForm.image}
                                        onChange={handleAddFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="admin-button save">Сохранить</button>
                                    <button type="button" className="admin-button cancel" onClick={handleAddCancel}>Отмена</button>
                                </div>
                            </form>
                        </div>
                    ) : editProduct ? (
                        <div className="edit-product-form">
                            <h3>Редактирование продукта</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Название продукта</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editForm.name || ''}
                                        onChange={handleEditFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Цена (руб)</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={editForm.price || ''}
                                        onChange={handleEditFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight">Вес/объем</label>
                                    <input
                                        type="text"
                                        id="weight"
                                        name="weight"
                                        value={editForm.weight || ''}
                                        onChange={handleEditFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Путь к изображению</label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        value={editForm.image || ''}
                                        onChange={handleEditFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="admin-button save">Сохранить</button>
                                    <button type="button" className="admin-button cancel" onClick={handleEditCancel}>Отмена</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="products-list">
                            {Object.keys(categories).length > 0 ? (
                                Object.keys(categories).map((categoryKey) => (
                                    <div key={categoryKey} className="category-section">
                                        <h3>{categories[categoryKey].title}</h3>
                                        <table className="products-table">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Название</th>
                                                <th>Цена (руб)</th>
                                                <th>Вес/объем</th>
                                                <th>Путь к изображению</th>
                                                <th>Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {categories[categoryKey].items.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.weight}</td>
                                                    <td className="image-path">{product.image}</td>
                                                    <td className="actions">
                                                        <button
                                                            className="admin-button edit"
                                                            onClick={() => handleEditClick(categoryKey, product)}
                                                        >
                                                            Редактировать
                                                        </button>
                                                        <button
                                                            className="admin-button delete"
                                                            onClick={() => handleDeleteProduct(categoryKey, product.id)}
                                                        >
                                                            Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            ) : (
                                <div className="no-products">Нет доступных продуктов</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPanel;