import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../store/actions';

class Counter extends Component {
   
    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                {this.props.storedResults.map(storedResult => (
                    <li onClick={() => this.props.onDeleteResults(storedResult.id)} key={storedResult.id}>{storedResult.value}</li>
                ))}
                   
                </ul>
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        ctr:state.ctr.counter,
        storedResults: state.res.results
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () =>dispatch({type: actionTypes.ADD, payload:5}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, payload:5}),
        onStoreResult: (result) => dispatch({type:actionTypes.STORE_RESULT, result: result}),
        onDeleteResults: (id) => dispatch({type:actionTypes.DELETE_RESULT, resultElId: id})
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Counter);