import React from 'react'
import { Row, Col, Card, CardDeck} from 'react-bootstrap';
import { Focusable } from 'react-js-spatial-navigation';
import {FaUser}  from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

// The below section is meant to be used once we have the actual(Live) data. 
const date = new Date();
var Today = date.toJSON();
Today = new Date(Today).toString();
var currentTime = Today.split(' ').slice(4,5)

function MyActivity(props) {
    return (
        <div>
            {
                props.isLoading ? (<Spinner className=" text-blue" variant="warning" animation="border" role="status" >
                </Spinner>):
                (<Row>
                    <Col sm={12} className="pt-0 pl-5 care-plan-main-content">
                        <h3 className="care-plan-font-settings text-left pb-1"> {props.schedule[0]} </h3>
                        <Row className="active">
                            {
                                props.activities.map(session =>
                                    session.date !== null ? (
                                        <Col sm={3}  key={session.fieldId} className="pb-2 card-main">
                                            <Focusable  className="active" onClickEnter={()=>props.toggleActivity(session.fieldId)} onFocus={() => props.activateActivity(session)}>
                                                <Card  onClick={()=>props.toggleActivity(session.fieldId)}>
                                                <div className="card-toggle" style={ props.showActivityDetials === session.fieldId ? {display: 'block'} : {display: 'none'}}>
                                                        <p> {session.description}</p>
                                                </div>
                                                <Card.Body >
                                                    <Card.Title className="pt-4 ">{session.description}</Card.Title>
                                                    <Card.Text>
                                                    {session.text !== ''? <FaUser/> : <span>&nbsp;</span>} {session.text}
                                                    </Card.Text>
                                                    <Card.Title className="care-plan-time">{currentTime}</Card.Title>
                                                </Card.Body>
                                                <CardDeck><p className="care-plan-status">{session.status}</p></CardDeck>
                                                <Card.Footer style={{backgroundColor: session.statusCSS}}>
                                                </Card.Footer>
                                                </Card>
                                            </Focusable>
                                        </Col>
                                    ): null
                                )
                            }
                        </Row>
                        <h3 className="care-plan-font-settings text-left pb-1"> {props.schedule[1]} </h3>
                        <Row>
                            {
                                props.activities.map(session =>
                                    session.date === null ? (
                                        <Col sm={3}  key={session.fieldId} className="pb-5 card-main">
                                            <Focusable  className="active" onClickEnter={()=>props.toggleActivity(session.fieldId)} onFocus={() => props.activateActivity(session)}>
                                                <Card  onClick={()=>props.toggleActivity(session.fieldId)}>
                                                <div className="card-toggle" style={ props.showActivityDetials === session.fieldId ? {display: 'block'} : {display: 'none'}}>
                                                        <p> {session.description}</p>
                                                </div>
                                                <Card.Body >
                                                    <Card.Title className="pt-4 ">{session.description}</Card.Title>
                                                    <Card.Text>
                                                    {session.text !== ''? <FaUser/> : <span>&nbsp;</span>} {session.text}
                                                    </Card.Text>
                                                    <Card.Title className="care-plan-time">10:30 PM</Card.Title>
                                                </Card.Body>
                                                <CardDeck><p className="care-plan-status">{session.status}</p></CardDeck>
                                                <Card.Footer style={{backgroundColor: session.statusCSS}}>
                                                </Card.Footer>
                                                </Card>
                                            </Focusable>
                                        </Col>
                                    ): null
                                )
                            }
                        </Row>
                    </Col>
                </Row>)
            }     
        </div>
    )
}

export default MyActivity;
