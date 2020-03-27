import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {FiVolume2, FiVolumeX, FiVolume1} from "react-icons/fi"

function VolumeController(props) {
    return (
        <Row className="volume-control">
            {props.volumeController ? (
                <Col sm={3}>
                    <Row className="tv-volume-controller-wrapper">
                        <Col className="tv-volume-control">
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
    )
}

export default VolumeController;
