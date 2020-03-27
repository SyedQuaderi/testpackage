import React, {useContext} from 'react'
import {countingContext} from './ContextAPI';
import {Row, Col, Button} from 'react-bootstrap';

function ComponentG() {

    const context = useContext(countingContext)
    return (
        <div>
            <Row>
                <Col sm={12}>
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

export default ComponentG
