import React, {useReducer} from 'react'
import Reducer from './Reducer';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

export const countContext = React.createContext(0);

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

export const  MainComponent = () => {

    const [count, dispatch] = useReducer(reducer, initialState.firstCounter);

    return (
        <countContext.Provider value={{CounterCount: count, CounterDispath: dispatch}}>
            <div>
              Count - {count}
                <ComponentA/>
                <ComponentB/>
                <ComponentC/>
            </div>
        </countContext.Provider>
    )
}


