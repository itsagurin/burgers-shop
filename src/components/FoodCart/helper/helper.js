export const changeQuantity = (id, change, cart, setCart) => {
    const currentItem = cart.find(item => item.id === parseInt(id));

    if (!currentItem && change === 1) {
        return;
    }

    if (currentItem && currentItem.quantity === 1 && change === -1) {
        const filterArr = cart.filter(item => item.id !== parseInt(id));
        setCart(filterArr);
        return;
    }

    const arr = cart.map(item => {
        if (item.id === parseInt(id)) {
            const newQuantity = item.quantity + change;
            return {
                ...item,
                quantity: newQuantity
            };
        }
        return item;
    });

    setCart(arr);
};

export const addToCart = (product, cart, setCart, customQuantity = 1) => {
    const productId = parseInt(product.id);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: item.quantity + customQuantity
                };
            }
            return item;
        });
        setCart(updatedCart);
    } else {
        const weightValue = parseInt(product.weight.replace(/\D/g, ''));

        const newItem = {
            id: productId,
            name: product.name,
            image: product.image,
            weight: weightValue,
            price: parseInt(product.price),
            quantity: customQuantity
        };

        setCart([...cart, newItem]);
    }
};