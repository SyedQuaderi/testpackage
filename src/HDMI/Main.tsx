import React,{useEffect, useState, useRef} from 'react';
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import  SpatialNavigation from 'react-js-spatial-navigation';
import './Hdmi.scss';
import PES from '../globalVariables';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from '../HomePage/Main';
import MediaObject from './MediaObject';
import Menu from './Menu';
import Audio from './Audio'

const currentMode = PES.APIConfig;
const currentDevice = PES.remoteKeys;

function Main() {   
    const backKey = process.env.NODE_ENV === 'production' ? currentDevice._backTV : currentDevice._backKeyboard;
    const [homePageLink, setHomePageLink] = useState<boolean>(false);
    const [audio, setAudio] = useState<string>('Off');
    const extendTimeOut:any = useRef(null);
    const [volume, setVolume] = useState<number>(16);
    const [volumeController, toggleVolumeController] = useState<boolean>(false);

    useEffect(()=>{
        const hdmiMenu:any = document.getElementsByClassName('hdmi-submenu');
        hdmiMenu[0].style.display = "none";
    },[])

    useEffect(() => {
        let isEventListenerRemoved:any = false; 
        if(!homePageLink) {
            document.addEventListener("keydown", keyDownHandler, true);
        } else {
            document.removeEventListener("keydown", keyDownHandler, true);
        }
        return function cleanupListener(){
            document.removeEventListener("keydown", keyDownHandler, true); 
            isEventListenerRemoved = true;
        }
    }, [homePageLink]);

    function keyDownHandler(event:any) {
        keyHandler(event.keyCode);
    }

    const timeoutID:any = useRef(null);
    const volumeTimeOut:any = useRef(null);
    let hideMenu:boolean = false;
    let hdmiMenu:any = document.getElementsByClassName('hdmi-submenu');
    var toggleTVMenu = function (time: number, volumeControl:boolean) {
        if(volumeControl) {
            if(!hideMenu) {
                hdmiMenu[0].style.display = "flex";
                hideMenu = !hideMenu;
                toggleVolumeController(false);
            }
            else {
                hideMenu = !hideMenu;
                hdmiMenu[0].style.display = "none";
                toggleVolumeController(false);
            }
        }
        timeoutID.current = setTimeout(()=> {
            hdmiMenu[0].style.display = "none";
            if(hideMenu) { hideMenu = !hideMenu;}
            toggleVolumeController(false);
        }, time);
    }

    function extendandClearTime(time:number, returnKey:boolean) {
        clearTimeout(timeoutID.current);
        toggleTVMenu(time, returnKey);      
    }

    function keyHandler(keyCode: any)
    {   
        switch (keyCode) {
            case 403:
                clearTimeout(timeoutID.current);
                window.location.reload();
            break;
            case backKey:
                clearTimeout(volumeTimeOut.current);
                extendandClearTime(15000, true);
                toggleVolumeController(false);
            break;
            case 37: 
                extendandClearTime(15000, false);
                if(hideMenu === false) {
                    setVolume(vol =>vol-1);
                    if(volumeZeroRef.current <= 1) {
                        setAudio('On');
                    }
                    clearTimeout(volumeTimeOut.current);
                    toggleVolumeController(true);
                    volumeTimeOut.current = setTimeout(()=>{
                        toggleVolumeController(false);
                    }, 5000)
                }
            break;    
            case 38: 
                extendandClearTime(15000, false);
                break;
            case 39: 
                extendandClearTime(15000, false);
                if(hideMenu === false) {
                    setVolume(vol =>vol+1);
                    setAudio('Off');
                    clearTimeout(volumeTimeOut.current);
                    toggleVolumeController(true);
                    volumeTimeOut.current = setTimeout(()=>{
                        toggleVolumeController(false);
                    }, 5000)
                }
            break;
            case 40: 
                extendandClearTime(15000, false);
            break;
            case 13:
                extendandClearTime(8000, false);
                break;
            default:
            break;
        } 
    }
    const [isHPLoading, setIsHPLoading] = useState<boolean>(false);

    useEffect(() => {
        let isChannelChanged: boolean = false;
        function CreateJAPITObjectForWIXPSvcHDMI(this: any){
            this.Svc    = "WIXP";
            this.SvcVer = "4.0";
            this.Cookie = 222;
        }

        function initial () {
            var JAPITObjForWIXPSvcHDMI = new CreateJAPITObjectForWIXPSvcHDMI(); 
                JAPITObjForWIXPSvcHDMI.Cookie = 299;
                JAPITObjForWIXPSvcHDMI.CmdType = "Change";
                JAPITObjForWIXPSvcHDMI.Fun = "Source";
                JAPITObjForWIXPSvcHDMI.CommandDetails = 
                {
                    "TuneToSource" : "HDMI1"
                }  
            sendWIxPCommand(JAPITObjForWIXPSvcHDMI);
        }
        /* function to send commands to TV */
        function sendWIxPCommand(command: any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                var JAPITWIXPPluginHDMI: any = document.getElementById('JAPITWIXPPluginHDMI');
                JAPITWIXPPluginHDMI.WebIxpSend(WIXPJSONStringForm);
            }
            catch (ignore) {
            }
        }
        initial();
        return ()=> {
            isChannelChanged = true;
        }
    }, [])

    const volumeRef:any = useRef(null);
    const volumeZeroRef:any = useRef(null);

    useEffect(() => {
        let isAudioMuted:boolean = false;
       
        initialiseAudioMute();
        function CreateJAPITObjectForWIXPSvcAudio(this: any){
            this.Svc    = "WIXP";
            this.SvcVer = "4.0";
            this.Cookie = 222;
        }
        
        function initialiseAudioMute () {
            var JAPITObjForWIXPSvcAudio = new CreateJAPITObjectForWIXPSvcAudio(); 
                JAPITObjForWIXPSvcAudio.SvcVer = "3.0";
                JAPITObjForWIXPSvcAudio.Cookie = 299;
                JAPITObjForWIXPSvcAudio.CmdType = "Change";
                JAPITObjForWIXPSvcAudio.Fun = "AudioControl";
                JAPITObjForWIXPSvcAudio.CommandDetails = 
                {
                    "AudioMute": `${audio}`,
                    "SmartSound": "Original",
                    "Volume": `${volume}`,
                }
            sendWIxPCommand(JAPITObjForWIXPSvcAudio);

            if(volume !== 0) {
                volumeRef.current = volume;
            }
            volumeZeroRef.current = volume;
        }
        /* function to send commands to TV */
        function sendWIxPCommand(command: any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                var JAPITWIXPPluginAudio: any = document.getElementById('JAPITWIXPPluginAudio');
                JAPITWIXPPluginAudio.WebIxpSend(WIXPJSONStringForm);
            }
            catch (ignore) {
            }
        }
        return ()=> {
                isAudioMuted = true;
            }
        },[audio, volume]);    

    function goToHome (menuitem:any) {
        if(menuitem.id === 2) {    
            setIsHPLoading(true);
            clearTimeout(extendTimeOut.current);
            clearTimeout(timeoutID.current);
            setTimeout(()=>{
                setIsHPLoading(false);
                setHomePageLink(!homePageLink);
            }, 1000);
        }
        else {
            if(audio === 'Off') {
                setAudio('On');
                setVolume(0);
                clearTimeout(volumeTimeOut.current);
                toggleVolumeController(true);
                volumeTimeOut.current = setTimeout(()=>{
                    toggleVolumeController(false);
                }, 4000)
            }
            else {
                setAudio('Off');
                clearTimeout(volumeTimeOut.current);
                toggleVolumeController(true);
                setVolume(volumeRef.current);
                volumeTimeOut.current = setTimeout(()=>{
                    toggleVolumeController(false);
                }, 4000)
            }
        }
    } 

    return (
        <Router>
            <Switch>
                <Route path="">
                    {
                    isHPLoading ? (<Spinner className="text-blue" variant="danger" animation="border" role="status" >
                    </Spinner>) : ( homePageLink &&  <HomePage />)
                    }
                </Route>
            </Switch>
            <div  className={"hdmi-page-main " +(homePageLink ? "hide-hdmi" : "") }>
                <SpatialNavigation>
                    <Container fluid={true} >
                            <MediaObject />
                            <Audio volume={volume} volumeController={volumeController}/>
                        <Row  className="fixed-bottom pt-1 hdmi-submenu">
                            <Col sm={12}>
                                <Menu goToHome={goToHome} audio={audio}/>
                            </Col>
                        </Row>
                    </Container>
                </SpatialNavigation>
            </div>
        </Router>   
    )
}

export default Main;
