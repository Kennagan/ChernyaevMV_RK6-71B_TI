import {
    DOWNLOAD_ITEMRACKS,
    ADD_ITEMRACK,
    ADD_ITEM,
    EDIT_ITEM,
    MOVE_ITEM_BACK,
    MOVE_ITEM_FORWARD,
    REMOVE_ITEM
}   from "./actions";

const initialState = {
    itemracks: []
}

export default function reducer(state = initialState, { type, payload}) {
    switch (type) {

        case DOWNLOAD_ITEMRACKS:
            return {
                ...state,
                itemracks: payload
            };

        case ADD_ITEMRACK:
            return {
                ...state,
                itemracks: [
                    ...state.itemracks,
                    {
                        itemrackName: payload.itemrackName,
                        itemrackUse: payload.itemrackUse,
                        items: []
                    }
                ]
            };

        case ADD_ITEM:
            return {
                ...state,
                itemracks: state.itemracks.map((itemrack, index) =>
                    index !== payload.itemrackId
                        ? { ...itemrack }
                        : { ...itemrack, items: [...itemrack.items, payload.itemName] })
            };

        case EDIT_ITEM:
            return {
                ...state,
                itemracks: state.itemracks.map((itemrack, index) =>
                    index !== payload.itemrackId
                        ? { ...itemrack }
                        : {
                            ...itemrack,
                            items: itemrack.items.map((item, itemIndex) =>
                                itemIndex !== payload.itemId
                                    ? item         //item, я не уверен что у меня правильно
                                    : payload.newItemName
                            )
                        })
            };

        case MOVE_ITEM_BACK:
            //const {backItemId, backItemrackId} = payload;
            if (payload.itemrackId === 0)
                return state;
            const movedBackItem = state.itemracks[payload.itemrackId].items[payload.itemId];
            const backItems = state.itemracks[payload.itemrackId].items.filter(
                item => item !== movedBackItem
            );
            return {
                ...state,
                itemracks: state.itemracks.map((itemrack, index) => {
                    if (index === payload.itemrackId - 1) {
                        return {
                            ...itemrack,
                            items: [...itemrack.items, movedBackItem]
                        };
                    };

                    if (index === payload.itemrackId) {
                        return {
                            ...itemrack,
                            items: backItems
                        };
                    };

                    return { ...itemrack };
                })
            }

        case MOVE_ITEM_FORWARD:
            //const {forwardItemId, forwardItemrackId} = payload;
            if (payload.itemrackId === state.itemracks.length - 1)
                return state;
            const movedForwardItem = state.itemracks[payload.itemrackId].items[payload.itemId];
            const forwardItems = state.itemracks[payload.itemrackId].items.filter(
                item => item !== movedForwardItem
            );
            return {
                ...state,
                itemracks: state.itemracks.map((itemrack, index) => {
                    if (index === payload.itemrackId + 1) {
                        return {
                            ...itemrack,
                            items: [...itemrack.items, movedForwardItem]
                        };
                    }

                    if (index === payload.itemrackId) {
                        return {
                            ...itemrack,
                            items: forwardItems
                        };
                    }

                    return { ...itemrack };
                })
            }

        case REMOVE_ITEM:
            //const {itemId, itemrackId} = payload;
            const removedItem = state.itemracks[payload.itemrackId].items[payload.itemId];
            const otherItems = state.itemracks[payload.itemrackId].items.filter(
                item => item !== removedItem
            );
            return {
                ...state,
                itemracks: state.itemracks.map((itemrack, index) => index === payload.itemrackId
                    ? {
                        ...itemrack,
                        items: otherItems
                    }

                    : { ...itemrack }
                )
            }
        default:
            return state;
    }
}