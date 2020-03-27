import React, {useEffect, useState, useReducer, useContext} from 'react';
import './App.css';
import { Container, Button, Image, Row, Col, Card, CardDeck} from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './CarePlanMain.scss'
import {FaHome, FaChevronRight, FaUser}  from "react-icons/fa";
import axios from 'axios';
//import SpatialNavigation, { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import { array } from 'prop-types';
import Navigation, {VerticalList, HorizontalList, Grid, Focusable} from 'react-key-navigation'
//import {MyGoals} from './../src/MyCarePlan/MyGoals';

const mycareplan = array;

interface CareplanType {
  data?: any[];
}

//export const myCarePlanData = React.createContext<any>([]);

const App: React.FC = () => {

  const [myCarePlan, setCarePlan] = useState<Array<any>>([]);
  const [activeFocus, setActiveFocus] = useState<number>(0);
  const [activityName, setActiveName] = useState<string>('');
  const [myCareSessionActivities, setMyCareSessionActivities] = useState<any>([]);
  const [toggle, setToggle] = useState<number>(0);

  //const data = [] as  any;
 
  useEffect(()=> {
    axios.get('./MyCareData.json')
    .then(response => {
      console.log(response.data);
      setCarePlan(response.data);
      setActiveFocus(1);
      setMyCareSessionActivities(response.data[0].planDays)
      setActiveName('My Goals');
    })
    .catch(error =>{
      console.log(error);
    });
  }, []);
  
  function selectActivity (item)  {
    setActiveFocus(item.id);
    setActiveName(item.title)
    setMyCareSessionActivities(item.planDays);
  }

  function focus(activity) {
    setActiveFocus(activity.id);
    setActiveName(activity.title);
    setMyCareSessionActivities(activity.planDays);
    setToggle(0);
  }

  function removeFocus(activity) {
    setActiveFocus(activity.id);
    setActiveName(activity.title);
    setMyCareSessionActivities(activity.planDays);
    
  }

  function cardFocus(act) {
    toggleElement(0);
  }

  function toggleElement(act) {
    if (act !== toggle) {
      setToggle(act);
    }
    else {
      setToggle(0);
    }
    
  }

  return (
    <div className="care-plan-main-body">
      <Container fluid={true}>
      <Navigation>
        <Row>
          <Col sm={8}>
              <Breadcrumb>
                  <Breadcrumb.Item href="#" className="care-plan-home-icon"><FaHome/></Breadcrumb.Item>
                  
                  <Breadcrumb.Item href="#" className="pt-4">
                    <FaChevronRight className="care-plan-fa-icon mr-1"/>
                      My Care
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="pt-4">
                    <FaChevronRight className="care-plan-fa-icon mr-1"/>
                    {activityName}
                    </Breadcrumb.Item>
              </Breadcrumb>
          </Col>
          <Col sm={4} className="pt-3">
              <h1 className="care-plan-font-settings text-right pr-5"> John Smith</h1>
          </Col>
        </Row>
        
        <Row >
          <Col sm={3} className="pl-0">
          <HorizontalList >
              {
                myCarePlan.map(activity =>
                  
                    <Focusable className="active" onFocus={() => focus(activity)} key={activity.id} onBlur={() => removeFocus(activity)}>
                      <Button className="activity-button "  style={ activeFocus === activity.id ? {backgroundColor: '#087BA5', color: '#fff' ,borderColor: '#087BA5'} : {backgroundColor: 'rgba(255,255,255,.9)'}}  onClick={()=> selectActivity(activity)}>
                        {activity.title}
                        <div className="selection-arrow " style={ activeFocus === activity.id ? {backgroundColor: '#000' } : {backgroundColor: 'transparent' } }>

                        </div>
                      </Button>
                    </Focusable>
                  
                  )
              }
              </HorizontalList>
          </Col>
          
          <Col sm={9}>
          <HorizontalList >
            <Row>
            <Col sm={12} className="pt-3 pl-5 care-plan-main-content">
              {
                myCareSessionActivities.map(session =>
                    <div key={session.id}>
                        <h3 className="care-plan-font-settings text-left pb-1">{session.date.currentDay} - {session.date.day} {session.date.month}</h3>
                      <Row>
                      
                      {session.sessionActivities.map(act=> 
                        <Col sm={3} key={act.id} className="pb-5 card-main">
                            <Focusable onEnterDown={()=>toggleElement(act.id)} onFocus={() => cardFocus(act.id)}>
                              <Card  onClick={()=>toggleElement(act.id)}>
                                <div className="card-toggle" style={ toggle === act.id ? {display: 'block'} : {display: 'none'}}>
                                      <p> {act.session}</p>
                                </div>
                                <Card.Body >
                                  <Card.Title className="pt-4 ">{act.session}</Card.Title>
                                  <Card.Text>
                                    {act.coach !== ''? <FaUser/> : <span>&nbsp;</span>} {act.coach}
                                  </Card.Text>
                                  <Card.Title className="card-time">{act.time}</Card.Title>
                                </Card.Body>
                                <CardDeck><p className="care-plan-status">{act.status}</p></CardDeck>
                                <Card.Footer style={{backgroundColor: act.color}}>
                                </Card.Footer>
                              </Card>
                            </Focusable>
                        </Col> 
                        )}
                      
                       
                       
                        
                      </Row> 
                    </div> 
                    )
              }
              </Col>
            </Row>
            </HorizontalList>                 
          </Col>
           
        </Row>
        </Navigation>  
      </Container>
    </div>
  );
}

export default App;
