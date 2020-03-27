import React, {CSSProperties, useEffect, useState, useReducer, useRef} from 'react';
import './Home.scss';
import PES from '../globalVariables';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from '../HomePage/Main';
import SpatialNavigation, {FocusableSection, Focusable } from 'react-js-spatial-navigation';
import { Container, Row, Col, Spinner, Button} from 'react-bootstrap';
import {FaHome}  from "react-icons/fa";
import Axios from 'axios';
import Order from './Order';
import Sessions from './Sessions';
import toastr from 'toastr';
import Confirmation from './Confirmation';
import 'toastr/build/toastr.min.css';

const initialState = {
    sessions: {today:[], tomorrow:[]},
    isLoading: true
}

const reducer = (state, action)=> {
    switch(action.type) {
        case '_FETCH_MEAL_SESSIONS':
            return { ...state, sessions: action.mealSession, isLoading: false}
        case '_FAILED_MEAL_SESSIONS':
            return { sessions: {}, isLoading: true}
    }
}

function Main(props) {
    const MealOrdering = PES.PESLiteImages.carePlan;
    const mealToast = PES.toaster.mealOrdering;
    const mealMsg = PES.messages;
    const [homePageLink, setHomePageLink] = useState<boolean>(false);
    const [orderPage, setOrderPage] = useState<boolean>(false);
    const [activeFocus, setActiveFocus] = useState<number>(0);
    const [activityName, setActiveName] = useState<any>({today: 'Today', tomorrow:'Tomorrow'});
    const [availableMeals, setAvailableMeals] = useState<any>({activeSession: []})
    const MealOrderingbg:CSSProperties = {
        backgroundImage: `url(${MealOrdering})`,
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const [activeMeal, setActiveMeal] = useState<any>({indicator: 0});
    const [mealAvailability, setMealAvailability] = useState<any>('');
    const [focusFlag, setFocusFlag] = useState<boolean>(false);
    const [time, setTime] = useState<any>(new Date());
    const [mealTime, setMealTime] = useState<any>(null);
    const [mealMain, setMealMain] = useState<any>({mealCategory: []});
    const [isConfirmationPageOpen, setIsConfirmationPageOpen] = useState<boolean>(false);
    const [focusHomeBtn, setFocusHomeBtn] = useState<any>({homeBtn: '',sessionToday: '', sessionTomorrow: ''});

    useEffect(()=>{
        const [hideOrderPage] = [document.getElementsByClassName('hide-mealOrdering')];
        if(hideOrderPage.length >= 1) {
            if(props.placeOrderFlag) {
                toastr.options = {
                    positionClass : mealToast.class,
                    hideDuration: mealToast.duration,
                    timeOut: mealToast.time
                }
                toastr.clear();
                setTimeout(() => toastr.success(mealMsg.orderSuccessful), 300)
            }
            hideOrderPage[0].remove();
        }
        Axios.get('./MyCareSample.json')
        .then(response => {dispatch({type: '_FETCH_MEAL_SESSIONS', mealSession: response.data.days[0]});
                            const elementFocus: HTMLCollectionOf<any> = document.getElementsByClassName('section-1');
                            focusToday.current = elementFocus[0];
                            const home:any = (document.getElementsByClassName("meal-ordering-home-icon")[0].children as HTMLCollectionOf<Element>);
                            const today:any = (document.getElementsByClassName("session-today")[0].children as HTMLCollectionOf<Element>);
                            const tomorrow:any = (document.getElementsByClassName("session-tomorrow")[0].children as HTMLCollectionOf<Element>);
                            setFocusHomeBtn({homeBtn: home, sessionToday: today, sessionTomorrow: tomorrow })
                        })     
        .catch(error =>{
            console.log(error);
        });
    }, []);
    
    const focusToday:any = useRef(null);
    useEffect(()=> {
        const timeCalculator = ()=> {
            var dateTime = new Date();
            dateTime.setUTCHours(dateTime.getUTCHours() + 11);
            var currentDateTime = dateTime.getUTCHours() + '.' + dateTime.getUTCMinutes(); 
            const availability:any = (document.getElementsByClassName('focus') as HTMLCollectionOf<Element>);                         
            availableMeals.activeSession.map(function(items){
                if(items.mealDayId === 1) {
                    if(currentDateTime >= items.startTime  && currentDateTime <= items.endTime) {
                        items.availability = 'Ends';
                        items.currentMeal = 'Current Meal';
                        setActiveMeal({indicator: items.id});
                        for(var i=0; i <= availability.length - 1; i++) {
                            var addFocus:any = availability[i].parentElement;
                            addFocus.classList.add('focusable');
                        }
                    }
                    if (currentDateTime >= items.startTime && currentDateTime > items.endTime){
                        items.availability = 'Ended';
                        items.currentMeal = ''
                        setMealAvailability(items.availability);
                        const focusAvailability: HTMLCollectionOf<any> = document.getElementsByClassName('removeFocus');
                        for(var j=0; j <= focusAvailability.length - 1; j++) {
                            const removeFocus:any = focusAvailability[j].parentElement;
                            removeFocus.classList.remove('focusable');
                        }
                    }
                    if (currentDateTime < items.startTime && currentDateTime < items.endTime) {
                        items.availability = 'Ends';
                        items.currentMeal = '';
                        for(var k=0; k <= availability.length - 1; k++) {
                            var addFocus:any = availability[k].parentElement;
                            addFocus.classList.add('focusable');
                        }
                    }
                }
                else {
                    for(var n=0; n <= availability.length - 1; n++) {
                        var addFocus:any = availability[n].parentElement;
                        addFocus.classList.add('focusable');
                    }
                }
            });
        };
        const timer = setInterval(()=>{ 
            timeCalculator();
        },100);
        return ()=> clearInterval(timer);
    }, [availableMeals.activeSession])
   
    useEffect(()=>{
        state.sessions.today.map((first, i)=>{
            setAvailableMeals({activeSession: first.mealTime});
            const sessionFocus: any = (document.getElementsByClassName("session-today")[0].children as HTMLCollectionOf<Element>);
            sessionFocus.current = sessionFocus[0];
            sessionFocus.current.focus();
        });
    }, [state])
    const confirmBtn:any = useRef(null);
    const homeBtnFocus:any = useRef(null);
    const [focus, setFocus] = useState<boolean>(false);
    useEffect(()=>{
        if(isConfirmationPageOpen) {
            focusHomeBtn.homeBtn[0].classList.remove('focusable');
            focusHomeBtn.sessionToday[0].classList.remove('focusable');
            focusHomeBtn.sessionTomorrow[0].classList.remove('focusable');
            const modalFocus:any = (document.getElementsByClassName("modalFocus")[0].children as HTMLCollectionOf<Element>);
            confirmBtn.current = modalFocus[0];
            homeBtnFocus.current = focusHomeBtn.homeBtn[0];
            confirmBtn.current.focus();
        } 
        if (focus) {
            focusHomeBtn.homeBtn[0].classList.add('focusable');
            focusHomeBtn.sessionToday[0].classList.add('focusable');
            focusHomeBtn.sessionTomorrow[0].classList.add('focusable');
            homeBtnFocus.current.focus();
        }
    }, [isConfirmationPageOpen])

    useEffect(() => {
        var timer: any = 0;        
        RegisterCallbacks();
        timer = setTimeout(()=>{
            getSystemDate();
        }, 1000);
        
        function RegisterCallbacks() {
            try {
                const JAPITWIXPPluginClock:any = document.getElementById('JAPITWIXPMealClock');
                JAPITWIXPPluginClock.WebIXPOnReceive = WIXPResponseHandler;
            }
            catch(ignore){}
        }
        function WIXPResponseHandler(WIXPResponseJSON:any){
            try {
                var parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
                
                if (parsedWIXPJSON.Fun === "ClockControl") {
                    DisplayCurrentDateAndTime(parsedWIXPJSON);
                }  
                else {
                    console.log(parsedWIXPJSON);
                }
            } catch(e){
                alert(e);
                return e;
            }
        }
        function sendWIxPCommand(command:any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                const JAPITWIXPMealClock:any = document.getElementById('JAPITWIXPMealClock');
                JAPITWIXPMealClock.WebIxpSend(WIXPJSONStringForm);
            }
            catch (e) {
                
            }
        }
        function CreateJAPITObjectForWIXPSvc(){
            this.Svc    = "WIXP";
            this.SvcVer = "3.0";
            this.Cookie = 222;
        }
        function getSystemDate(){
            
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie         = 1050;
            JAPITObjForWIXPSvc.CmdType        = "Request";
            JAPITObjForWIXPSvc.Fun            = "ClockControl";
            JAPITObjForWIXPSvc.CommandDetails = {
                "ClockControlParameters" :[
                        "ClockTime",
                        "CurrentDate"
                ]
            };
            sendWIxPCommand(JAPITObjForWIXPSvc);
        }
        function DisplayCurrentDateAndTime(WIXPJsonResponse:any)
        {           
            if(WIXPJsonResponse)
            {
                var clockTime = WIXPJsonResponse.CommandDetails.ClockTime || "Unkown";
                var currentDate = WIXPJsonResponse.CommandDetails.CurrentDate || "Unkown";
            }
            setMealTime(clockTime);
            setTime(new Date());
        }
        return ()=>{
            clearTimeout(timer)
        }
    }, [time, availableMeals.activeSession]);

    function addFocusToActivity (session) {
        const addFocusFromHomeIcon:any = document.getElementsByClassName('meal-ordering-home-icon')[0].children[0];
        addFocusFromHomeIcon.classList.add('focusable');
        setActiveFocus(session.id);
        if(session.id === 1) {
            setAvailableMeals({activeSession: session.mealTime})
            setFocusFlag(!focusFlag);
        }
        else {
            setAvailableMeals({activeSession: session.mealTime})
        }
    }

    function removeFocusFromActivity(session){
        setActiveFocus(session.id);
    }

    function selectActivity(session){
        setActiveFocus(session.id);
    }

    function orderMeal(meal) {
        setOrderPage(!orderPage)
        setMealMain({mealCategory: meal.mealCategory});
    }

    function selectHome(activity) {
        setAvailableMeals({activeSession: []});
        setActiveFocus(activity);
    }
    function focusOnSessions() {
        const removeFocusFromHomeIcon:any = document.getElementsByClassName('meal-ordering-home-icon')[0].children[0];
        removeFocusFromHomeIcon.classList.remove('focusable');
    }
    function goToHome () {
        toastr.clear();
        setFocus(false);
        setIsConfirmationPageOpen(true);
    }

    function setIsGoToHome(goHome) {
        if(goHome) {
            setHomePageLink(!homePageLink);
            setIsConfirmationPageOpen(false);
        }
        else {
            setFocus(true);
            setIsConfirmationPageOpen(false);
        }
    }

    return (
        <Router>
            <Switch>
                <Route path="">
                    {homePageLink  ?  <HomePage /> : orderPage ? <Order mealMain={mealMain} toastr={toastr}/> : null }
                </Route>
            </Switch>
            <div style={MealOrderingbg} className={"meal-ordering-main-body" + (homePageLink ? " hide-mealOrdering" : " ") + (orderPage ? " hide-mealOrdering" : " ")}>
            {
                state.isLoading ? 
                (<Spinner className="text-blue" variant="info" animation="border" role="status" >
                </Spinner>) : (
                    <>
                    <h1 id="IdTimeText" className="bed-time"></h1>
                    <object className="meal-clock" type="application/jswebixp" width="0" height="0" id="JAPITWIXPMealClock" ></object>
                    <Container fluid={true}>
                        <SpatialNavigation>
                            <Row>
                                <Col xs lg="2" className="">    
                                    <div className="meal-ordering-home-icon text-center">
                                        <Focusable onClickEnter={()=>goToHome()} onFocus={()=> selectHome(0)}>
                                            <FaHome/>
                                        </Focusable>
                                    </div>
                                    <h3 className="session-type">Meals</h3>
                                </Col>
                                <Col sm={10} >
                                    <Row>
                                        <Sessions state={state} addFocusToActivity={addFocusToActivity}
                                                    removeFocusFromActivity={removeFocusFromActivity}
                                                    activityName={activityName} activeFocus={activeFocus} 
                                                    selectActivity={selectActivity}/>
                                        <Col sm={9} className="meal-sessions">
                                            <Row>
                                                <Col sm={12}>
                                                    <Row>
                                                    {availableMeals.activeSession.map((meal, i)=>
                                                        <Col sm={4} key={i} className="meal-session">
                                                            <Focusable onClickEnter={()=> orderMeal(meal)} onFocus={()=> focusOnSessions()}>
                                                            <Button  className={"session-times" + (meal.mealDayId === 1 && mealAvailability === meal.availability ? ' removeFocus' : ' focus')} 
                                                                disabled={meal.mealDayId === 1 && mealAvailability === meal.availability ? true : false}>
                                                                <Row >
                                                                    <Col sm={4} className="text-center icon-container">
                                                                        <div className="meal-course-image" >
                                                                            <img src={meal.image}/>
                                                                        </div>
                                                                    </Col>
                                                                    <Col sm={8} className="text-left">
                                                                        <div className="clearfix"></div>
                                                                        <div className="session-title">
                                                                            <div>
                                                                                {meal.name}
                                                                            </div>
                                                                            <div id="sessionP" className={"circle indicator" + (activeMeal.indicator === meal.id ? ' pulse' : ' ')}>
                                                                                </div>
                                                                            <div className="session-title-sub">
                                                                                {meal.currentMeal}
                                                                            </div>
                                                                        </div>
                                                                        <div className="session-timing">
                                                                            {meal.availability} at {meal.availableTime} 
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Button>
                                                            </Focusable>
                                                        </Col>)}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Confirmation setIsGoToHome={setIsGoToHome} isConfirmationPageOpen={isConfirmationPageOpen}/>          
                        </SpatialNavigation>
                    </Container>
                    </>
                )
            }
            </div>
        </Router>
    )
}

export default Main
