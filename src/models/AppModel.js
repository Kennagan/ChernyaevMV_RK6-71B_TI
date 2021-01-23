const getItemracks = async () => {
    const response = await fetch('http://localhost:7154/itemracks', {
        method: 'GET',
    });
    const itemracks = await response.json();
    return itemracks;
};

const addItemrack = async (itemrack) => {
    const response = await fetch('http://localhost:7154/itemracks', {
        method: 'POST',
        body: JSON.stringify(itemrack),//переводим объект в строку
        headers: {
            'Content-Type': 'application/json'//говорим что объект типа json
        }
    });

    const {info} = await response.json();

    return info;
};

const addItem = async ({itemrackId, newItemName}) => {
    console.log({itemrackId, newItemName});
    const response = await fetch(`http://localhost:7154/itemracks/${itemrackId}/items`, {
        method: 'POST',
        body: JSON.stringify({newItemName}),//переводим объект в строку
        headers: {
            'Content-Type': 'application/json'//говорим что объект типа json
        }
    });

    const {info} = await response.json();

    return info;
};

const editItem = async ({itemrackId, itemId, newItemName}) => {
    const response = await fetch(`http://localhost:7154/itemracks/${itemrackId}/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({newItemName}),//переводим объект в строку
        headers: {
            'Content-Type': 'application/json'//говорим что объект типа json
        }
    });

    const {info} = await response.json();

    return info;
};

const removeItem = async ({itemrackId, itemId}) => {
    const response = await fetch(`http://localhost:7154/itemracks/${itemrackId}/items/${itemId}`, {
        method: 'DELETE'
    });

    const {info} = await response.json();

    return info;
};

const moveItem = async ({itemrackId, itemId, destItemrackId}) => {
    const response = await fetch(`http://localhost:7154/itemracks/${itemrackId}`, {
        method: 'PATCH',
        body: JSON.stringify({itemId, destItemrackId}),//переводим объект в строку
        headers: {
            'Content-Type': 'application/json'//говорим что объект типа json
        }
    });

    if(response.status !== 200) {
        const {error} = await response.json();
        return Promise.reject(error);
    }

    const {info} = await response.json();

    return info;
};

export {
    getItemracks,
    addItemrack,
    addItem,
    editItem,
    moveItem,
    removeItem
};