import React from 'react';

function ChannelInfo(props) {
    return (
        <div>
            <props.Row className="tv-channel-info">
                <props.Col sm={4} className="channel-name-wrapper" >
                    <h1 className="channel-name">{props.tvChannel.name}</h1>
                </props.Col>
                <props.Col sm={8} className="channel-datetime-wrapper text-right pr-5" >
                    <h2 id="IdTime" className="channel-time"></h2>
                    <h4 id="IdDate" className="channel-day"></h4>
                    <object className="channel-clock" type="application/jswebixp" width="0" height="0" id="JAPITWIXPPluginChannel" ></object> 
                </props.Col>
            </props.Row>
        </div>
    )
}

export default ChannelInfo;
