import React from 'react'

function MediaObject() {
    return (
        <>
        <object className="dhmi-object" type="application/jswebixp" width="0" height="0" id="JAPITWIXPPluginHDMI"></object>
        <div id="hdmiObj" className ="hdmi-main" > 
            <object id="hdmiObject" className="hdmi-object" type="video/broadcast" aria-label="hdmi object"> </object>
        </div>
        </>
        
    )
}

export default MediaObject;