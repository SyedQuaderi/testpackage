import React, {useContext, useState} from 'react'
import {MainComponent} from './MainComponent';
import Reducer from './Reducer';

const counter = 0 as number;

const Themes = {
    light: {
        background: 'green' as string,
        color: 'white' as string
    },
    dark: {
        background: 'red' as string,
        color: 'black' as string
    }
}
const themeContext = React.createContext(Themes.light);

const counterContext = React.createContext([{}, ()=>{}]);

const ContextAPI = (props) => {    

    const [state, setStates] = useState({});

    return (
        <div>
            <themeContext.Provider value={Themes.dark}>
                <MainComponent/>
            </themeContext.Provider>
            <counterContext.Provider value={[state, setStates]} >
                {props.children}
                <Reducer />
            </counterContext.Provider>
        </div>
    )
}

export  {ContextAPI, themeContext, counterContext}
