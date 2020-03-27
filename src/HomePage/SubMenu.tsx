import React from 'react';
import Slider from "react-slick";
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import '../HomePage/HomePage.scss';
import PES from '../globalVariables';

const SubMenu = (props) => {
    const config = PES.subMenuSlider;

    const settings = {
        dots: config.dots,
        className: config.className,
        centerPadding: config.centerPadding,
        slidesToShow: config.slidesToShow,
        infinite: config.infinite,
        slidesToScroll: config.slidesToScroll,
        initialSlide: config.initialSlide,
    };

    return (
        <FocusableSection  defaultElement={'active'}>
            <div id="sub-menu-main" >
                <Slider {...settings}>
                    {props.subMenu.subMenuItems.map((subMenuItem, i) => 
                        <Focusable className="active sub-menu-focusable" key={i} >
                            <div id="sub-menu-description" className="pt-0" >
                                <h3 className="sub-menu-item" >{subMenuItem.name}</h3>
                            </div>
                        </Focusable>
                    )}  
                </Slider>
            </div>
        </FocusableSection>
    )
}

export default SubMenu;