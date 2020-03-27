import React, {useContext} from 'react'
import {countingContext} from './ContextAPI';
import { Row, Col, Button } from 'react-bootstrap';

function MainContainer() {

    const context = useContext(countingContext)

    return (
        <div>
            <Row>
                <Col sm={12}>
                    <Button variant="outline-success">Over all Meal:  {context.CounterCount}</Button>
                    <br/>
                    <Button size="lg" variant="success" onClick={()=> {context.CounterDispath('increment')}}>Add item to Meal</Button>
                    <br/>
                    <br/>
                     <Button size="lg" variant="warning" onClick={()=> {context.CounterDispath('decrement')}}>Remove Item </Button>
                     <br/>
                    <br/>
                    <Button size="lg" variant="primary" onClick={()=> {context.CounterDispath('reset')}}>Reset Meal Count</Button>
                    <br/>
                    <br/>
                    
                </Col>
            </Row>
        </div>
    )
}

export default MainContainer

