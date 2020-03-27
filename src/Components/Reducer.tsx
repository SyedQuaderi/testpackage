import React, {useReducer, useContext} from 'react'
import {Row, Col, Button} from 'react-bootstrap';
import {themeContext} from './ContextAPI';
import {countingContext} from './../Container/ContextAPI'

const initialState = {
    firstCounter: 0
};

const reducer = (state, action) => {
  switch(action) {
    case 'increment':
    return state + 1
    case 'decrement':
    return state - 1
    case 'reset':
      return 0
    default:
      return state;
  }
}

function Reducer() {

    //const [count, dispatch] = useReducer(reducer, initialState.firstCounter);
    

    const counts = useContext(countingContext);

    return (
     
            <div>
              <Row>
                <Col>
                  <Button variant="success" onClick={() => {counts.CounterDispath('increment')}}>+ Increment</Button>
                  <Button variant="warning" onClick={() => {counts.CounterDispath('decrement')}}>- Decrement</Button>
                  <Button variant="primary" onClick={() => {counts.CounterDispath('reset')}}>Reset</Button>
                </Col>
              </Row>  
                
            </div>
            
        
    )
}

export default Reducer
