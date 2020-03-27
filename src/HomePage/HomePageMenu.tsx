import React from 'react';
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import { Row, Col, Card} from 'react-bootstrap';
import {FaHome, FaRegBell} from "react-icons/fa";
import {IoIosSettings} from 'react-icons/io';
import {GoMail} from 'react-icons/go';
import '../HomePage/HomePage.scss';

function HomePageMenu(props) {
    return (
        <div>
            {props.isLoading === false ? (
                <Col sm={12}>
                <FocusableSection default={''} enterTo={'default-element'}>
                    <Card  id="main-page-menu-section" text="white">
                        <Row className="pt-5 mt-3" >
                            <Col sm={3} className="text-right">
                                <Focusable className="home-page-main-menu" >
                                    <FaHome className="home-page-main-menu-icons"  />
                                </Focusable>
                            </Col>
                            <Col sm={3} className="text-center ">
                                <Focusable className="home-page-main-menu">
                                    <IoIosSettings className="home-page-main-menu-icons" />
                                </Focusable>
                            </Col>
                            <Col sm={3} className="text-center " >
                                <Focusable className="home-page-main-menu">
                                    <GoMail className="home-page-main-menu-icons" />  
                                </Focusable>
                            </Col>
                            <Col sm={3} className="text-left " >
                                <Focusable className="home-page-main-menu">
                                    <FaRegBell className="home-page-main-menu-icons" />
                                </Focusable>
                            </Col>
                        </Row>
                    </Card>
                </FocusableSection>
            </Col>
            ) : null}
        </div>
    )
}

export default HomePageMenu
