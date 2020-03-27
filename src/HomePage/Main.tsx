import React, {CSSProperties, useState, useEffect, useRef, useReducer} from 'react';
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import SpatialNavigation from 'react-js-spatial-navigation';
import {FaUser, FaBed}  from "react-icons/fa";
import {TiWeatherSunny} from "react-icons/ti"
import MainMenu from './MainMenu';
import HomePageMenu from './HomePageMenu';
import SubMenu from './SubMenu';
import Axios from 'axios';
import RecentContent from './RecentContent';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import MyCarePlan from '../MyCarePlan/Main'
import PES from '../globalVariables';
import Television from '../Television/Main';
import HDMI from '../HDMI/Main';
import MealOrdering from '../MealOrdering/Main';
import './HomePage.scss'

const initalState = {
    patientDetails: {client: {}, bed: {ward: {}}, patient: {}},
    mainMenu: {mainMenu: {}, subMenuItems:[]},
    subMenu: {mainMenu: {}, subMenuItems:[]},
    isLoading: true,
    isMenuLoaded: true,
    errorMessage: ''
}

const reducer = (state, action)=> {
    switch(action.type) {
        case '_FETCH_PATIENT':
            return {...state, patientDetails: action.patient, isLoading: false}
        case '_FETCH_MENU':
            return {...state, mainMenu: action.mainMenu, isMenuLoaded: false}
        case '_FETCH_SUBMENU':
            return {...state, subMenu: action.subMenu}
        case '_FETCH_FAILURE':
            return { patientDetails: {}, mainMenu: {}, subMenu:{}, isLoading: true, isMenuLoaded: true, errorMessage: action.errorMessage}
        default:
            return state;
    }
}

function Main() {
    const [state, dispatchDetails] = useReducer(reducer, initalState);
    const currentMode = PES.APIConfig;
    const homePageImage = PES.PESLiteImages.homePage;
    const API = process.env.NODE_ENV === 'production' ? currentMode.PROD_API : currentMode.DEV_API;
    const globalVersion = "v1";
    const homePage:CSSProperties = {
        backgroundImage: `url(${homePageImage})`,
      }
    const [link, setLink] = useState<number>(0);
    const [redirect, configureRedirect] = useState<boolean>(false);
    let [overrideVersion, usedVersion] = [globalVersion, ""];
    const [time, setTime] = useState<any>(new Date());
    const containerRef:any = useRef(null);

    useEffect(() => {
        var timer: any = 0;
        var IdDateText:any = document.getElementById("IdDateText");
        var IdTimeText:any = document.getElementById("IdTimeText");
        
        RegisterCallbacks();
        timer = setTimeout(()=>{
            getSystemDate();
        }, 1000);
        
        function RegisterCallbacks() {
            try {
                const JAPITWIXPPluginClock:any = document.getElementById('JAPITWIXPPluginClock');
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
                const JAPITWIXPPluginClock:any = document.getElementById('JAPITWIXPPluginClock');
                JAPITWIXPPluginClock.WebIxpSend(WIXPJSONStringForm);
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
    
            IdDateText.innerHTML = currentDate;
            IdTimeText.innerHTML = clockTime;
            
            setTime(new Date());
        }
        return ()=>{
            clearTimeout(timer)
        }
    }, [time, state.patientDetails]);


    useEffect(() => {
        // If override version is not defined, API will use the global version.
        //overrideVersion = "v2"; 
        usedVersion = overrideVersion;

        Axios.get(`${API}/${usedVersion}/client/${currentMode.MacID}`, {timeout: currentMode.timeOut})
        .then(response => {
            dispatchDetails({type: '_FETCH_PATIENT', patient: response.data });
            currentMode.clientGroupID = response.data.client.clientGroupId;
        })
        .catch(error => {
            console.log(error.message);
            dispatchDetails({type: '_FETCH_FAILURE', errorMessage: error.message});
        });        
        setLink(0);
    }, []);    
        
    useEffect(() => {
        // If override version is not defined, API will use the global version.
        //overrideVersion = "v2";
        usedVersion = overrideVersion;

        Axios.get(`${API}/${usedVersion}/menu/${currentMode.ID}`)
        .then(response => {
            dispatchDetails({type: '_FETCH_MENU', mainMenu: response.data})
        })
        .catch(error => {
            console.log(error);
            dispatchDetails({type: '_FETCH_FAILURE'});
        });        
    }, []);

    const [powerState, setPowerState] = useState<any>('')

    useEffect(() => {
        initialisePower();
        function CreateJAPITObjectForWIXPSvcPowerState(this: any){
            this.Svc    = "WIXP";
            this.SvcVer = "3.0";
            this.Cookie = 299;
        }
        
        function initialisePower () {
            var JAPITObjForWIXPSvcPower = new CreateJAPITObjectForWIXPSvcPowerState(); 
                JAPITObjForWIXPSvcPower.CmdType = "Change";
                JAPITObjForWIXPSvcPower.Fun = "PowerState";
                JAPITObjForWIXPSvcPower.CommandDetails = 
                {
                    "ToPowerState": 'On',
                    "PowerAction": `${powerState}`
                }
            sendWIxPCommand(JAPITObjForWIXPSvcPower);
        }
        
        /* function to send commands to TV */
        function sendWIxPCommand(command: any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                var JAPITWIXPPluginPowerState: any = document.getElementById('JAPITWIXPPluginPowerState');
                JAPITWIXPPluginPowerState.WebIxpSend(WIXPJSONStringForm);
                
            }
            catch (ignore) {
            }
        }
        return () => {
        };
    }, [powerState]);

    useEffect(()=>{
        const [currrentActive, hideMyCarePlan, hideHomePage, hideHDMI, hideMealOrdering] = [document.getElementsByClassName('hide-tv') , document.getElementsByClassName('hide-mycare-plan'), 
        document.getElementsByClassName('home-page-hidden'), document.getElementsByClassName('hide-hdmi'), document.getElementsByClassName('hide-mealOrdering')];
        const lastFocusedElementMain = document.getElementsByClassName('home-page-main-menu');
        if(currrentActive.length >= 1 ) {
            setTimeout(()=>{       
                const lastFocusedElement = document.getElementsByClassName('TV');
                if(containerRef.current !== null ) {
                    containerRef.current = lastFocusedElement[0];
                    containerRef.current.focus();
                }
            }, 300);
            currrentActive[0].remove();
        }
        else if(hideMyCarePlan.length >= 1 ) {
            setTimeout(()=>{
                const lastFocusedElement = document.getElementsByClassName('Care-Plan');
                if(containerRef.current !== null ) {
                    containerRef.current = lastFocusedElement[0];
                    containerRef.current.focus();
                }
            }, 300)
            hideMyCarePlan[0].remove();
        }
        else if(hideHDMI.length >= 1) {
            setTimeout(()=>{
                const lastFocusedElement = document.getElementsByClassName('AV-Input');
                if(containerRef.current !== null ) {
                    containerRef.current = lastFocusedElement[0];
                    containerRef.current.focus();
                }
            }, 300)
            hideHDMI[0].remove();
        }
        else if(hideMealOrdering.length >=1 ) {
            setTimeout(()=>{
                const lastFocusedElement = document.getElementsByClassName('Meal-Ordering');
                if(containerRef.current !== null ) {
                    containerRef.current = lastFocusedElement[0];
                    containerRef.current.focus();
                }
            }, 500)
            hideMealOrdering[0].remove();
        }
        else {
            if(!state.isLoading) {
                var att:any = document.createAttribute("ref");
                att.value = "containerRef"; 
                lastFocusedElementMain[0].setAttributeNode(att);
                containerRef.current = lastFocusedElementMain[0];
                containerRef.current.focus();
            }
        }
        if (hideHomePage.length >= 1 ) {
            hideHomePage[0].remove();
        }
    }, []);

    function selectSubMenuItems (subMenuItem:any) {
        // If override version is not defined, API will use the global version.
        //overrideVersion = "v2";
        usedVersion = overrideVersion;
        const action = subMenuItem.menuId;
        Axios.get(`${API}/${usedVersion}/menu/${action}`)
        .then(response => {
            dispatchDetails({type:'_FETCH_SUBMENU', subMenu: response.data});
        })
        .catch(error => {
            dispatchDetails({type:'_FETCH_FAILURE'})
            console.log(error);
        });

        setLink(action);
        if(action === 18 || action === 26 || action === 28 || action === 52) {
            configureRedirect(true);
        }
        else if (action === 4) {
            setPowerState('Reboot');
        }
    }

    return (
        <Router >
            <Switch>
                    <Route path="">
                        {link === 26 ?  ( redirect && <MyCarePlan />): link === 18 ? ( redirect && <Television />) : link === 28 ? ( redirect && <HDMI />)
                        : link === 52 ? (redirect && <MealOrdering />) : null }
                    </Route>
            </Switch>
            <div style={homePage} className={" pt-5 pl-5 pr-5 " + (redirect ? "home-page-hidden" : "home-page-main ")}>
                { state.isLoading ? 
                    (<><Spinner className="text-blue" variant="info" animation="border" role="status" >
                    </Spinner><h4 className={state.errorMessage === '' ? " " : "error-message"}>{state.errorMessage}</h4></>) : 
                    (
                    <Container fluid={true} >
                    <SpatialNavigation>
                    <Row>
                        <Col className="text-left">
                            <div>
                                <FaUser className="bed-icons"/> <h2 className="patient-name align-middle d-inline pl-1">{state.patientDetails.patient.title} {state.patientDetails.patient.firstName}</h2>
                            </div>
                            <div className="mt-1">
                                <FaBed className="bed-icons border-0" /> <p className="patient-room align-middle d-inline pl-1 ">Ward {state.patientDetails.bed.ward.name} Bed {state.patientDetails.bed.name}</p>
                            </div>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <div className="mt-1 text-center">
                                        <FaUser className="bed-icons"/> <h5 className="bed-nurse align-middle d-inline pl-1">{state.patientDetails.patient.consultant}</h5>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="mt-1">
                                        <FaUser className="bed-icons"/> <h5 className="bed-nurse align-middle d-inline pl-1">{state.patientDetails.patient.attendingNurse}</h5> 
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col sm={12}>
                                    <Row>
                                        <Col sm={2}>
                                        </Col>
                                        <Col sm={2}>
                                            <div className="mt-0">
                                                <h3 className="bed-temperature">24 &#8451;</h3>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="mt-0">
                                                <TiWeatherSunny className="bed-icons border-0" /><h6 className="bed-weather align-middle d-inline pl-1">Weather</h6>
                                            </div>
                                        </Col>
                                        <Col sm={5}>
                                            <div className="text-center">
                                                <h1 id="IdTimeText" className="bed-time"></h1>
                                                <h6 id="IdDateText" className="bed-day"></h6>
                                                <object className="main-clock" type="application/jswebixp" width="0" height="0" id="JAPITWIXPPluginClock" ></object>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row  className="fixed-bottom pt-2 home-page-menu">
                        <Col sm={3} className="pt-2">
                            <Row>
                                <HomePageMenu isLoading={state.isLoading}/>
                            </Row>
                        </Col>
                        <Col sm={9} className="pl-0">
                            <MainMenu mainMenu={state.mainMenu} selectSubMenuItems={selectSubMenuItems}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <object className="tv-state" type="application/jswebixp" width="0" height="0" id="JAPITWIXPPluginPowerState" ></object>
                        </Col>
                    </Row>
                    {state.subMenu.subMenuItems.length !== 0 ? 
                    (<Row className="fixed-bottom pt-2 home-page-submenu">
                        <RecentContent recentContent={state.subMenu}/>
                        <Col sm={9} className="pl-0">
                            <Row>
                                <Col>
                                    <h3 className="sub-menu-item-description text-left"> Submenu Description</h3>
                                    <p className="sub-menu-item-header text-left">Some quick example text to build on the card title and make up the bulk of the card's content. </p>
                                </Col>
                            </Row>
                            <SubMenu subMenu={state.subMenu} />
                        </Col>
                    </Row>) : null}
                    </SpatialNavigation>
                    </Container>
                    )
                }
            </div>
        </Router>
    )
}

export default Main;
