import React from 'react'
import { Row, Col, Button} from 'react-bootstrap';
import { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import Spinner from 'react-bootstrap/Spinner';
import {FaRegStar, FaStar} from 'react-icons/fa';
import { isOpera, CustomView } from 'react-device-detect';

function MyGoals(props) {
    return (
        <div>
            {
                props.isLoading ? 
                (<Spinner className="text-blue" variant="info" animation="border" role="status" >
                </Spinner>): 
                (<div>
                    <Row>
                        <Col sm={12}>
                            <Row>
                                {
                                    props.goals.length ? (
                                        <>
                                            <Col sm={8} className="text-left pl-5">
                                                <h4 className="goals-count">You have completed {props.getGoalsCount} of {props.goals.length} goals</h4>
                                                <h4 className="goals-motive">Keep going you can do it</h4>
                                            </Col>
                                            <CustomView condition={!isOpera}>
                                                <Col sm={2} className="text-right"><Button onClick={props.handleShow} className="activity-button-active add-new-goals">Add new Goal</Button></Col>
                                            </CustomView>
                                        </>
                                    ) : null
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="pt-3 pl-5 goal-main-content">
                            <FocusableSection  defaultElement={'active'}>
                                <Row className="incomplete-goals">
                                    {
                                        props.goals.filter(goal => !goal.isCompleted).map(goal =>
                                            <Col sm={10}  key={goal.fieldId} className="pb-3 goal-card-main mt-2" onClick={()=> props.completeGoal(goal)}>
                                                <Focusable  className="active" onClickEnter={()=> props.completeGoal(goal)} onFocus={() => props.activateActivity(goal)}>
                                                    <Row className="goals-main">
                                                        <Col sm={12} className="pl-0 pr-0">
                                                            <h3 className="goals-title">
                                                                {goal.header}
                                                            </h3>
                                                            <FaRegStar />
                                                            <p className="goals-description">
                                                                {goal.text}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Focusable>
                                            </Col> 
                                        )
                                    }
                                </Row>
                                <Row>
                                    {
                                    props.completedGoals ? 
                                        (<h4 className="completed-goals text-left pl-3 mb-3 mt-3">Completed Goals</h4>) : null
                                    }
                                </Row>
                                <Row className="completed-goal">
                                {
                                    props.goals.filter(goal => goal.isCompleted).map(goal =>
                                        <Col sm={10}  key={goal.fieldId} className="pb-3 goal-card-main" onClick={()=> props.incompleteGoals(goal)}>
                                            <Focusable  className="active" onClickEnter={()=> props.incompleteGoals(goal)} onFocus={() => props.activateActivity(goal)}>
                                                <Row className="goals-main">
                                                    <Col sm={12} className="pl-0 pr-0">
                                                        <h3 className="goals-title">
                                                            {goal.header}
                                                        </h3>
                                                        <FaStar />
                                                        <p className="goals-description">
                                                            {goal.text}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Focusable>
                                        </Col> 
                                    )
                                }
                                </Row>
                            </FocusableSection>
                        </Col>   
                    </Row>
                 </div>   
                
                )
            }
        </div>
    )
}

export default MyGoals;