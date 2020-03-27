import React, { useReducer } from 'react'
import Reducer from './../Components/Reducer';
import ComponentF from './ComponentF';
import ComponentE from './ComponentE';
import {Button, Row, Col} from 'react-bootstrap'
import ComponentG from './ComponentG';
import MainContainer from './MainContainer';

const firstCounter = 0;
const initialState = 0;

export const countingContext = React.createContext<number | any>(firstCounter);

const reducer = (state, action) => {
    switch(action) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        case 'reset':
            return initialState;
        default:
            return 0;
    }
} 

export const ContextAPI = () => {

    const [count, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            <countingContext.Provider value={{CounterCount: count, CounterDispath: dispatch}}>
                <br/>              
                <Button variant="outline-success">Over all Meal:  {count}</Button>
                <Row className="justify-content-md-center">                    
                    <Col xs lg="2">
                        <br/>
                        <p>Component A</p>
                        <ComponentG/>
                    </Col>
                    <Col md="auto">
                        <br/>
                        <p>Component B</p>
                        <ComponentF/>
                    </Col>
                    <Col xs lg="2">
                        <br/>
                        <p>Component C</p>
                        <ComponentE/>
                    </Col>
                </Row>              
            </countingContext.Provider>
        </div>
    )
}


