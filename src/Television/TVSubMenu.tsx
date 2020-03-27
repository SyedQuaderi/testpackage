import React from 'react';
import { Focusable} from 'react-js-spatial-navigation';
import * as reactBootstrap from 'react-bootstrap';
import './Television.scss';

const TVSubMenu = (props) => {
    
    const television = [
            {id: 1, name: "Subtitles", mode: 'MainTuner', subtitles: true},
            {id: 2, name: "Audio Mute", mode: 'MainTuner', audio: true},
            {id: 3, name: "Show Main Menu", mode: 'HDMI2'}
    ]

    return (
            <reactBootstrap.Row>
            {television.map((submenuitem, i) => (
                <reactBootstrap.Col sm={4}  key={i}>
                <Focusable onClickEnter={()=> props.goToHome(submenuitem)}>
                    <div id="tv-menu-items-main" className="card pt-5">
                        <h3 className="tv-options-name">{submenuitem.name}</h3>
                        <p className={submenuitem.subtitles ? 'tv-show-subtitles-flag' : 'tv-hide-subtitles-flag'}>{props.subtitles === 'Off' ? 'On' : 'Off'}</p>
                        <p className={submenuitem.audio ? 'tv-show-audio-flag' : 'tv-hide-audio-flag'}>{props.audio === 'Off' ? 'On' : 'Off'}</p>
                    </div>
                </Focusable>
                </reactBootstrap.Col>
            ))}
        </reactBootstrap.Row>
    )
}
  
export default TVSubMenu;