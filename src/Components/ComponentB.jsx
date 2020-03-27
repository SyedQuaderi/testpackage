import React, {useContext} from 'react';
import {countContext} from './MainComponent';
import {Button, Container, Row, Col} from 'react-bootstrap';

function ComponentB() {

    const count = useContext(countContext)

    return (
        <div>
            Component B
            <div>Count - {}</div>
            <Button onClick={() => {count.CounterDispath('increment')}}>+ Increment</Button>
            <Button onClick={() => {count.CounterDispath('decrement')}}>- Decrement</Button>
            <Button onClick={() => {count.CounterDispath('reset')}}>Reset</Button>
        </div>
    )
}

export default ComponentB
