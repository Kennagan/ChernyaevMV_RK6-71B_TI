import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {getItemracks, addItemrack} from '../../models/AppModel'
import {downloadItemracksAction, addItemrackAction} from '../../store/actions';
import Itemrack from '../Itemrack/Itemrack';
import './App.css';



class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: '',
        isSecond: false,
        inputStore: '',
    };

    async componentDidMount() {
        const itemracks = await getItemracks();
        //console.log(itemracks);
        this.props.downloadItemracksDispatch(itemracks);
    }

    showInput = () => this.setState({isInputShown: true});

    onInputChange = ({target: {value}}) => this.setState({inputValue: value});

    onKeyDown = async (event) => {
        /*if(event.preventDefault) {
            event.preventDefault();
        }*/ //Не работает так как прерывает любую обработку

        if(event.key === 'Escape') { //Не уверен что тут event.key 
            this.setState({
                isInputShown: false,
                inputValue: '',
                isSecond: false,
                inputStore: '',
            })
        }

        if(event.key === 'Enter') {
            if(!this.state.isSecond) {
                if(this.state.inputValue !== ''){ //Эта обработка неверная
                    this.setState({
                        inputStore: this.state.inputValue,
                        inputValue: '',
                        isInputShown: true,
                        isSecond: true
                    })
                }
                else {
                this.setState({
                    isInputShown: true,
                    inputValue: '',
                    isSecond: false,
                    inputStore: ''
                })}
            }

            if(this.state.isSecond) {
            if(this.state.inputValue !== ''){ //Эта обработка неверная
                const info = await addItemrack({
                    itemrackName: this.state.inputStore,
                    itemrackUse: this.state.inputValue,
                    items: []
                }).then(info => console.log(info));
                console.log(info);
                this.props.addItemrackDispatch({itemrackName:this.state.inputStore,itemrackUse:this.state.inputValue});
                //this.props.addItemrackDispatch({this.});//Можно ещё пробелы поудалять trim'ом
                this.setState({
                    isInputShown: false,
                    inputValue: '',
                    isSecond: false,
                    inputStore: ''
                })
            }
            else {
                this.setState({
                    isInputShown: true,
                    inputValue: '',
                    isSecond: true,
                })}

            // this.setState({
            //     isInputShown: false,
            //     inputValue: '',
            //     isSecond: false,
            //     inputStore: ''
            // })
            }
        }
    }

    render() {
        const {isInputShown, inputValue, isSecond, inputStore} = this.state;
        const {itemracks} = this.props;

        return (
            <Fragment>
                <header id="main-header">
                    Склад
                    <div id="author">
                        Chernyaev Maxim
                    <div className="avatar"></div>
                    </div>
                </header>
                <main id="tm-container">
                    {itemracks.map((itemrack, index) => (
                        <Itemrack
                            itemrackName={itemrack.itemrackName}
                            itemrackUse={itemrack.itemrackUse}
                            itemrackId={index}
                            items={itemrack.items}
                            key={`rack${index}`}
                        />
                    ))}
                    <div className="tm-itemrack">

                        {!isInputShown && (
                            <header
                                className="tm-itemrack-header"
                                onClick={this.showInput}
                            >
                                Добавить стеллаж
                            </header>
                        )}

                        {isInputShown && isSecond &&(
                            <header
                                className="tm-itemrack-header"
                            >
                                {inputStore}
                            </header>
                        )}

                        {isInputShown && isSecond &&(
                            <input
                                type="text"
                                id="add-itemrack-input"
                                placeholder="Назначение стеллажа"
                                value={inputValue}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyDown}
                            />
                        )}

                        {isInputShown && !isSecond &&(
                            <input
                                type="text"
                                id="add-itemrack-input"
                                placeholder="Новый стеллаж"
                                value={inputValue}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyDown}
                            />
                        )}

                    </div>
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = ({itemracks}) => ({itemracks});

const mapDispatchToProps = dispatch => ({
    addItemrackDispatch: ({itemrackName,itemrackUse}) => dispatch(addItemrackAction({itemrackName,itemrackUse})),
    downloadItemracksDispatch: (itemracks) => dispatch(downloadItemracksAction(itemracks))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);