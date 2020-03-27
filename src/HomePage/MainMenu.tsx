import React from 'react';
import Slider from "react-slick";
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import '../HomePage/HomePage.scss';
import PES from '../globalVariables';


const MainMenu = (props) => {
    
    const configure = PES.mainMenuSlider;
    const settings = {
        dots: configure.dots,
        className: configure.className,
        speed: configure.speed,
        infinite: configure.infinite,
        centerPadding: configure.centerPadding,
        slidesToShow: configure.slidesToShow,
        slidesToScroll: configure.slidesToScroll,
        focusOnSelect: configure.focusOnSelect,
        initialSlide: configure.initialSlide,
        zIndex: configure.zIndex,
        useTransform: configure.useTransform,
        slickGoTo: configure.slickGoTo,
        cssEase: configure.cssEase
    }

    return (
        <FocusableSection enterTo={'last-focused'}>
            <Slider {...settings} >
            {props.mainMenu.subMenuItems.slice(0).sort(function(a, b) {return a.action - b.action}).map((submenuitem, i) => (
                    <Focusable className={submenuitem.name.split(" ").join("-")} key={i} onClickEnter={()=> props.selectSubMenuItems(submenuitem)}>
                        <div id="main-menu-items" className="card pt-5">
                            <h3 className="main-menu-title mt-4">{submenuitem.name}</h3>
                        </div>
                    </Focusable>
                ))}
            </Slider>
        </FocusableSection>
    )
}
  
export default MainMenu;