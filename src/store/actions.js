const DOWNLOAD_ITEMRACKS = 'DOWNLOAD_ITEMRACKS';
const ADD_ITEMRACK = 'ADD_ITEMRACK';
const ADD_ITEM = 'ADD_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const MOVE_ITEM_BACK = 'MOVE_ITEM_BACK';
const MOVE_ITEM_FORWARD = 'MOVE_ITEM_FORWARD';
const REMOVE_ITEM = 'REMOVE_ITEM';

const downloadItemracksAction = (itemracks) => ({
    type: DOWNLOAD_ITEMRACKS,
    payload: itemracks
});

const addItemrackAction = ({itemrackName, itemrackUse}) => ({
    type: ADD_ITEMRACK,
    payload: {
        itemrackName,
        itemrackUse
    }
});

const addItemAction = ({itemrackId, itemName}) => ({ //передаём именно объект с полями {itemName, itemrackId}
    type: ADD_ITEM,
    payload: {
        itemrackId,
        itemName
    }
});

const editItemAction = ({itemrackId, itemId, newItemName}) => ({
    type: EDIT_ITEM,
    payload: {
        itemrackId,
        itemId, 
        newItemName
    }
});

const moveItemBackAction = ({itemrackId, itemId}) => ({
    type: MOVE_ITEM_BACK,
    payload: {
        itemrackId,
        itemId
    }
});

const moveItemForwardAction = ({itemrackId, itemId}) => ({
    type: MOVE_ITEM_FORWARD,
    payload: {
        itemrackId,
        itemId
    }
});

const removeItemAction = ({itemrackId, itemId}) => ({
    type: REMOVE_ITEM,
    payload: {
        itemrackId,
        itemId
    }
});

export {
    DOWNLOAD_ITEMRACKS,
    ADD_ITEMRACK,
    ADD_ITEM,
    EDIT_ITEM,
    MOVE_ITEM_BACK,
    MOVE_ITEM_FORWARD,
    REMOVE_ITEM,
    downloadItemracksAction,
    addItemrackAction,
    addItemAction,
    editItemAction,
    moveItemBackAction,
    moveItemForwardAction,
    removeItemAction
}