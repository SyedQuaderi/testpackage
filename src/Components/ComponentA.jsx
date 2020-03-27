import React, {useContext} from 'react';
import {countContext} from './MainComponent';
import {Button, Container, Row, Col} from 'react-bootstrap';

function ComponentA() {

    const count = useContext(countContext)

    return (
        <div>
            Component A
            <div>Count - {count.CounterCount}</div>
            <Button onClick={() => {count.CounterDispath('increment')}}>+ Increment</Button>
            <Button onClick={() => {count.CounterDispath('decrement')}}>- Decrement</Button>
            <Button onClick={() => {count.CounterDispath('reset')}}>Reset</Button>
        </div>
    )
}

export default ComponentA
