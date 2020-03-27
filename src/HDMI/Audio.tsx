import React from 'react';
import {FiVolume2, FiVolumeX, FiVolume1} from "react-icons/fi"
import {Row, Col} from 'react-bootstrap';
import './Hdmi.scss'

function Audio(props) {
    return (
        <div>
            <Row>
                <Col>
                <object className="hdmi-audio" type="application/jswebixp" aria-label="Hdmi Audio" width="0" height="0" id="JAPITWIXPPluginAudio" ></object>
                </Col>
            </Row>
            <Row className="volume-control">
                {props.volumeController ? (
                    <Col sm={3}>
                        <Row className="hdmi-volume-controller-wrapper">
                            <Col className="hdmi-volume-control">
                            {props.volume <= 0 ? <FiVolumeX/> : props.volume === 16 ? <FiVolume1/> : props.volume >= 20 ? <FiVolume2/> : <FiVolume1/>}
                            </Col>
                            <Col className="channel-volume-col">
                                <h2 id="channelVolume">{props.volume <= 0 ? 0 : props.volume}</h2>
                            </Col>
                        </Row>
                    </Col>
                    ) : null
                }
            </Row>    
        </div>
    )
}

export default Audio
