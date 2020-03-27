import React, {useEffect, useState, useRef, CSSProperties} from 'react';
import '../App.css';
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import axios from 'axios';
import SpatialNavigation, {FocusableSection } from 'react-js-spatial-navigation';
import MyActivity from './MyActivity';
import Menu from './Menu';
import Header from './Header';
import MyGoals from './MyGoals';
import {
    BrowserRouter as Router,
    Switch,
    Route
    } from "react-router-dom";
import HomePage from '../HomePage/Main';
import PES from '../globalVariables';
import './CarePlanMain.scss'
import AddGoal from './AddGoal';

const Main: React.FC = () => {

  const urn1 = PES.APIConfig.URN1;
  const urn2 = PES.APIConfig.URN2;
  const MyCarePlanAPI = process.env.NODE_ENV === 'production' ? PES.APIConfig.PROD_API : PES.APIConfig.DEV_API;
  const myCarebg = PES.PESLiteImages.carePlan;

  const [myCarePlan, setCarePlan] = useState<Array<any>>([]);
  const [activeFocus, setActiveFocus] = useState<number>(0);
  const [activityName, setActiveName] = useState<string>('');
  const [myCareSessionActivities, setMyCareSessionActivities] = useState<any>([]);
  const [activityDetails, setActivityDetails] = useState<number>(0);
  const [currentPlan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<any>({carePlanloading: false, activityLoading: false});
  const mainMenuItem = useRef<any>([React.createRef(), React.createRef()]);
  const [homePageLink, setHomePageLink] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Array<any>>([]);
  const [completedGoals, setCompletedGoals] = useState<any>(false);
  const [goalCount, getGoalCount] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const globalVersion = "v1";
  let [overrideVersion, usedVersion] = [globalVersion, ""];

  useEffect(()=> {
    setIsLoading({ carePlanloading: true });
    // If override version is not defined, API will use the global version.
    //overrideVersion = "v2";
    usedVersion = overrideVersion;

    axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/section/${urn1}`)
    .then(response => {
      setCarePlan(response.data); 
      setIsLoading({carePlanloading: false});
    })
    .catch(error =>{
      console.log(error);
    });
    
  }, []);

    useEffect(() => {

    //If override version is not defined, API will use the global version.
    //overrideVersion = "v2";
    usedVersion = overrideVersion;

     axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/activity/${urn2}`)
    .then(response => {
      setMyCareSessionActivities(response.data);
    })
    .catch(error =>{
      console.log(error);
    });
  }, []);

  function selectActivity (item)  {
    setIsLoading({activityLoading: true});
    setActiveFocus(item.carePlanSectionId);
    setActiveName(item.header);
      if (item.code === 'SCHED') {
      // If override version is not defined, API will use the global version.
      //overrideVersion = "v2";
      usedVersion = overrideVersion;

        setPlan(item.code);
        axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/activity/${urn2}`)
        .then(response => {
          setMyCareSessionActivities(response.data);
          setIsLoading({activityLoading: false});
          setSchedule(['Today', 'Tomorrow']);
        })
        .catch(error =>{
          console.log(error);
        });
    }
    else if (item.code === 'GOALS') {
      setPlan(item.code);

      // If override version is not defined, API will use the global version.
      //overrideVersion = "v2";
      usedVersion = overrideVersion;

      axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/${urn1}`)
      .then(response => {
        setMyCareSessionActivities(response.data);
        setIsLoading({activityLoading: false});
        const completedgoals = response.data.filter(function (a) {
          return a.isCompleted;
        });
        if(completedgoals.length !== 0) {
          setCompletedGoals(true);
        }
        getGoalCount(completedgoals.length);
      })
      .catch(error =>{
        console.log(error);
      });
      
    }
    else {
      setMyCareSessionActivities([]);
      setIsLoading({activityLoading: false});
      setSchedule([]);
      setCompletedGoals(false);
    }
    return;
  }

  function completeGoal (goal) {
   const params = { isCompleted: true };
   // If override version is not defined, API will use the global version.
   //overrideVersion = "v2";
   usedVersion = overrideVersion;

    axios.post(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/update/${goal.fieldId}`, params)
        .then(response => {
          // If override version is not defined, API will use the global version.
          //overrideVersion = "v2";
          usedVersion = overrideVersion;

           axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/${urn1}`)
          .then(response => {
            setMyCareSessionActivities(response.data);
            setIsLoading({activityLoading: false});
            const completedgoals = response.data.filter(function (a) {
              return a.isCompleted ;
            });
            if(completedgoals.length !== 0) {
              setCompletedGoals(true);
            }
            getGoalCount(completedgoals.length);
          })
          .catch(error =>{
            console.log(error);
          });
        })
    .catch(error => {
      console.log(error);
    })
  }

  function incompleteGoals(goal) {
    const params = { isCompleted: false };

    // If override version is not defined, API will use the global version.
    //overrideVersion = "v2";
    usedVersion = overrideVersion;

      axios.post(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/update/${goal.fieldId}`, params)
          .then(response => {
              // If override version is not defined, API will use the global version.
              //overrideVersion = "v2";
              usedVersion = overrideVersion;
              axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/${urn1}`)
              .then(response => {
                setMyCareSessionActivities(response.data);
                setIsLoading({activityLoading: false});
                const [inCompletedgoals, completedgoals]  = [response.data.filter(function (a) {
                  return !a.isCompleted ;
                }), response.data.filter(function (a) {
                  return a.isCompleted ;
                })];

                getGoalCount(Math.abs(inCompletedgoals.length - response.data.length));

                if(completedgoals.length === 0) {
                  setCompletedGoals(false);
                }
        
              })
              .catch(error =>{
                console.log(error);
              });
            })
            .catch(error => {
              console.log(error);
            })
  }

  const handleClose = () => {
    setShow(false); 
    addGoal();
  };
  const handleShow = () => setShow(true); 

  const addGoal = () => {
    const title = (document.getElementById("goalTitle") as HTMLInputElement).value;
    const description = (document.getElementById("goalDescription") as HTMLInputElement).value;

    const params = {
        Title: title,
        Description: description,
    }

    // If override version is not defined, API will use the global version.
    //overrideVersion = "v2";
    usedVersion = overrideVersion;

      axios.post(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/create/${urn1}`, params)
          .then(response => {
              // If override version is not defined, API will use the global version.
              //overrideVersion = "v2";
              usedVersion = overrideVersion;

             axios.get(`${MyCarePlanAPI}/${usedVersion}/careplan/goal/${urn1}`)
                .then(response => {
                  setMyCareSessionActivities(response.data);
                  setIsLoading({activityLoading: false});
                  const completedgoals = response.data.filter(function (a) {
                    return a.isCompleted ;
                  });
                  if(completedgoals.length !== 0) {
                    setCompletedGoals(true);
                  }
                  getGoalCount(completedgoals.length);
                })
                .catch(error =>{
                  console.log(error);
                });
         })
         .catch(error => {console.log(error)});
  }

  function addFocusToActivity(activity) {
    setActiveFocus(activity.carePlanSectionId);
    setActiveName(activity.header);
    setActivityDetails(0);
    selectActivity(activity);
  }

  function removeFocusFromActivity(activity) {
    setActiveFocus(activity.carePlanSectionId);
    setActiveName(activity.header);
  }

  function activateActivity(activity) {
    toggleActivity(activity);
  }

  function toggleActivity(activity) {
    if (activity !== activityDetails) {
      setActivityDetails(activity);
    }
    else {
      setActivityDetails(0);
    }
  }

  function goToHome () {
    setHomePageLink(true);
  }


 const MyCarePlan:CSSProperties = {
    backgroundImage: `url(${myCarebg})`,
  }
  return (
    <Router>
      <Switch>
          <Route path="">
              {homePageLink  ?  <HomePage /> : null }
          </Route>
      </Switch>
    <div style={MyCarePlan} className={" " +(homePageLink ? "hide-mycare-plan" : "care-plan-main-body ")}>

      { isLoading.carePlanloading ? 
        (<Spinner className="text-blue" variant="warning" animation="border" role="status" >
        </Spinner>) :
        (
          <Container fluid={true}>
          <SpatialNavigation>
          <Row>
            <Col sm={12}>
              <FocusableSection  defaultElement={'active'}>
                <Header activity={activityName} goToHome={goToHome} homePageLink={homePageLink} selectActivity={selectActivity}/>
              </FocusableSection>
            </Col>
          </Row>
          <Row >
            <Col sm={3} className="pl-0">
              <Menu  
                mainMenu={myCarePlan} addFocusToActivity={addFocusToActivity} 
                removeFocusFromActivity={removeFocusFromActivity}
                activeFocus={activeFocus}
                selectActivity={selectActivity}
                mainMenuItem={mainMenuItem}
              />
            </Col>
            <Col sm={9}>
            <FocusableSection  defaultElement={'active'}>
              {
                currentPlan === 'SCHED' ? (<MyActivity 
                  activities={myCareSessionActivities} 
                  showActivityDetials={activityDetails} 
                  toggleActivity={toggleActivity} 
                  activateActivity={activateActivity}
                  isLoading={isLoading.activityLoading}
                  schedule={schedule}
                />): currentPlan === 'GOALS' ? (
                  <MyGoals 
                    goals={myCareSessionActivities}
                    activateActivity={activateActivity}
                    isLoading={isLoading.activityLoading}
                    completedGoals={completedGoals}
                    completeGoal={completeGoal}
                    incompleteGoals={incompleteGoals}
                    getGoalsCount={goalCount}
                    handleShow={handleShow}
                  />
                ): null
              }
            </FocusableSection>
            </Col>
          </Row>
          <AddGoal 
                handleClose={handleClose}
                handleShow={handleShow}
                show={show}
            />
          </SpatialNavigation>  
      </Container>
        )
      }
      
    </div>
        </Router>
          
  );
}

export default Main;
