import React, {memo} from 'react'; //Функциональные компоненты - компоненты без внутреннего состояния?
import {connect} from 'react-redux';
import {
    editItem as editItemServer,
    moveItem as moveItemServer,
    removeItem as removeItemServer
} from '../../models/AppModel'
import {
    editItemAction,
    moveItemBackAction,
    moveItemForwardAction,
    removeItemAction
} from '../../store/actions';

const Item = ({
    itemName,
    itemId,
    itemrackId,
    editItemDispatch,
    moveItemForwardDispatch,
    moveItemBackDispatch,
    removeItemDispatch
}) => {

    const editItem = async () => {
        let newItemName = prompt('Введите товар', itemName);

        if(!newItemName) return;

        newItemName = newItemName.trim();

        if(!newItemName || newItemName === itemName) return;

        const info = await editItemServer({itemrackId, itemId, newItemName});
        console.log(info);
        editItemDispatch({itemrackId, itemId, newItemName});
    };

    const removeItem = async () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Товар '${itemName}' будет удален. Продолжить?`)){
            const info = await removeItemServer({itemrackId, itemId});
            console.log(info);
            removeItemDispatch({itemrackId, itemId});
        }
    };

    const moveItemBack = async () => {
        try {
            const info = await moveItemServer({
                itemrackId,
                itemId,
                destItemrackId: itemrackId - 1
            });
            console.log(info);
            moveItemBackDispatch({ itemrackId, itemId });
        } catch (error) {
            console.log(error);
        }
    };

    const moveItemForward = async () => {
        try {
            const info = await moveItemServer({
                itemrackId,
                itemId,
                destItemrackId: itemrackId + 1
            });
            console.log(info);
            moveItemForwardDispatch({ itemrackId, itemId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="tm-itemrack-item">
        <div className="tm-itemrack-item-text">
          {itemName}
        </div>
        <div className="tm-itemrack-item-controls">
          <div className="tm-itemrack-item-controls-row">
            <div 
                className="tm-itemrack-item-controls-icon left-arrow-icon"
                onClick={moveItemBack}
            ></div>
            <div 
                className="tm-itemrack-item-controls-icon right-arrow-icon"
                onClick={moveItemForward}//() => moveItemForwardDispatch({itemrackId, itemId})
            ></div>
          </div>
          <div className="tm-itemrack-item-controls-row">
            <div 
                className="tm-itemrack-item-controls-icon edit-icon"
                onClick={editItem}
            ></div>
            <div 
                className="tm-itemrack-item-controls-icon delete-icon"
                onClick={removeItem}
            ></div>
          </div>
        </div>
      </div>
    );
};

const mapDispatchToProps = dispatch => ({
    editItemDispatch: ({itemrackId, itemId, newItemName}) => dispatch(editItemAction({itemrackId, itemId, newItemName})),
    moveItemBackDispatch: ({itemrackId, itemId}) => dispatch(moveItemBackAction({itemrackId, itemId})),
    moveItemForwardDispatch: ({itemrackId, itemId}) => dispatch(moveItemForwardAction({itemrackId, itemId})),
    removeItemDispatch: ({itemrackId, itemId}) => dispatch(removeItemAction({itemrackId, itemId}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Item))