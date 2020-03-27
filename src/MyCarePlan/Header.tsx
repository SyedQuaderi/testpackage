import React from 'react';
import { Row, Col} from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {FaHome, FaChevronRight}  from "react-icons/fa";
import { Focusable } from 'react-js-spatial-navigation';

function Header(props) {
    return (
        <Row>
            <Col sm={8} className="mycare-plan-header">
            <Breadcrumb>
                <Focusable onClickEnter={()=> props.goToHome()} onFocus={()=> props.selectActivity(0)}>
                    <Breadcrumb.Item href="#" className="care-plan-home-icon"><FaHome/></Breadcrumb.Item>
                </Focusable>
                <Breadcrumb.Item href="#" className="pt-4">
                <FaChevronRight className="care-plan-fa-icon mr-1"/>
                    My Care
                </Breadcrumb.Item>
                <Breadcrumb.Item className="pt-4">
                <FaChevronRight className="care-plan-fa-icon mr-1"/>
                    {props.activity}
                </Breadcrumb.Item>
            </Breadcrumb>
            </Col>
            <Col sm={4} className="pt-3">
                <h1 className="care-plan-font-settings text-right pr-5"> John Smith</h1>
            </Col>
        </Row>
    )
}

export default Header
