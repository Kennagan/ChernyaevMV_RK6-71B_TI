import React, {memo} from 'react'; //Функциональные компоненты - компоненты без внутреннего состояния?
import {connect} from 'react-redux';
import {
  addItem as addItemServer
} from '../../models/AppModel'
import {addItemAction} from '../../store/actions';
import Item from '../Item/Item'

const Itemrack = ({
    itemrackName,
    itemrackUse,
    itemrackId,
    items,
    addItemDispatch
}) => {
    const addItem = async () => {
        let newItemName = prompt('Введите товар');
        
        if(!newItemName) return;

        newItemName = newItemName.trim();

        if(!newItemName) return;

        console.log({itemrackId, newItemName});
        const info = await addItemServer({itemrackId, newItemName});
        console.log(info);
        addItemDispatch({itemrackId, itemName: newItemName});
    }

    return(
    <div className="tm-itemrack">
      <header className="tm-itemrack-header">
        {itemrackName}
      </header>
      <header className="tm-itemrack-use">
      {itemrackUse}
      </header>
      <div className="tm-itemrack-items">
          {items.map((item, index) => (
              <Item
                  itemName={item}
                  itemId={index}
                  itemrackId={itemrackId}
                  key={`rack${itemrackId}-item${index}`}
              />
          ))}
      </div>
      <footer 
        className="tm-itemrack-add-item"
        onClick={addItem}
      >
        Добавить товар
      </footer>
    </div>);
};

const mapDispatchToProps = dispatch => ({
    addItemDispatch: ({itemrackId, itemName}) => dispatch(addItemAction({itemrackId, itemName}))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Itemrack));