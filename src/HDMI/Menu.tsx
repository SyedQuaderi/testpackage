import React from 'react';
import { Focusable} from 'react-js-spatial-navigation';
import {Row, Col} from 'react-bootstrap';
import './Hdmi.scss';

const Menu = (props:any) => {
    
    const television = [
        {id: 1, name: "Audio Mute", mode: 'MainTuner', audio: true},
        {id: 2, name: "Show Main Menu", mode: 'HDMI2'},
    ]

    return (
            <Row>
            <Col sm={3}>

            </Col>
            {television.map((submenuitem, i) => (
                <Col sm={3}  key={i}>
                <Focusable onClickEnter={()=> props.goToHome(submenuitem)}>
                    <div id="hdmi-menu-items-main" className="card pt-5">
                        <h3 className="hdmi-options-name">{submenuitem.name}</h3>
                        <p className={submenuitem.audio ? 'hdmi-show-audio-flag' : 'hdmi-hide-audio-flag'}>{props.audio === 'Off' ? 'On' : 'Off'}</p>
                    </div>
                </Focusable>
                </Col>
            ))}
            <Col sm={3}>

            </Col>
        </Row>
    )
}
  
export default Menu;