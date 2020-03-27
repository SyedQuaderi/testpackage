import React from 'react';
import Slider from "react-slick";
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import PES from '../globalVariables';

function TVChannelMenu(props) {

    const configure = PES.tvChannels;
    const tvSettings = {
        dots: configure.dots,
        speed: configure.speed,
        infinite: configure.infinite,
        slidesToShow: configure.slidesToShow,
        slidesToScroll: configure.slidesToScroll
    }
    
    return (
        <FocusableSection  enterTo={'last-focused'}>
            {<Slider {...tvSettings} >
                {props.tvchannels.channels.map((channel, i) => (
                        <Focusable key={i} onFocus={()=> props.changeChannel(channel)}>
                            <div id="tv-menu-items" className="card pt-5">{props.tvChannel.name}</div>
                        </Focusable>
                    ))}
            </Slider>}
        <h3 className="tv-channel-name">{props.tvChannel.name}</h3>
        </FocusableSection>
    )
}

export default TVChannelMenu;
