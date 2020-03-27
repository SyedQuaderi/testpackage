import React, {useContext} from 'react';
import {countContext} from './MainComponent';
import {Button, Container, Row, Col} from 'react-bootstrap';

function ComponentD() {

    const count = useContext(countContext)

    return (
        <div>
            Component D
            <div>Count - {}</div>
            <Button onClick={() => {dispatch('increment')}}>+ Increment</Button>
            <Button onClick={() => {dispatch('decrement')}}>- Decrement</Button>
            <Button onClick={() => {dispatch('reset')}}>Reset</Button>
        </div>
    )
}

export default ComponentD
