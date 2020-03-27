import React, {useReducer} from 'react'

const initialState = 0;

const reducer = (state, action) => {
    switch(action) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        case 'reset':
            return 0;
        default:
            return initialState;
    }
};

function ContextReducer() {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            Count - {state}
            <button onClick={()=> dispatch('increment')}>increment</button>
            <button onClick={()=> dispatch('decrement')}>decrement</button>
            <button onClick={()=> dispatch('reset')}>reset</button>
        </div>
    )
}

export default ContextReducer
