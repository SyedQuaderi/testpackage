import React,{useEffect, useState, useRef} from 'react';
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import  SpatialNavigation from 'react-js-spatial-navigation';
import './Television.scss';
import PES from '../globalVariables';
import Axios from 'axios';
import TVSubMenu from './TVSubMenu';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from '../HomePage/Main';
import TVChannel from './TVChannel';
import TVChannelMenu from './TVChannelMenu';
import ChannelInfo from './ChannelInfo';
import Subtitles from './Subtitles';
import Audio from './Audio';
import VolumeController from './VolumeController';

const currentMode = PES.APIConfig;
const currentDevice = PES.remoteKeys;

function Main() {   
    const [homePageLink, setHomePageLink] = useState<boolean>(false);
    const [tvChannel, setTVChannel] = useState<any>({ name: null,  address: null , port: null, channelId: null});
    const [tvchannels, setTVChannels] = useState<any>({clientGroupService: {}, channels: [] });
    const [tvMode, setTVMode] = useState<string>('MainTuner');
    const [channelInfo, setChannelInfo] = useState<boolean>(false);
    const [channelTime, setChannelTime] = useState<any>(new Date());
    const [subtitles, setSubtitles] = useState<string>('Off');
    const [audio, setAudio] = useState<string>('Off');
    const API = process.env.NODE_ENV === 'production' ? currentMode.PROD_API : currentMode.DEV_API;
    const backKey = process.env.NODE_ENV === 'production' ? currentDevice._backTV : currentDevice._backKeyboard;
    const extendTimeOut:any = useRef(null);
    const [trickMode, setTrickMode] = useState<any>('Play');
    const [volume, setVolume] = useState<number>(16);
    const [volumeController, toggleVolumeController] = useState<boolean>(false);

    useEffect(() => {
        let isChannelReady: boolean = false;
        const tvchannelmenu:any = document.getElementsByClassName('tv-submenu');
        tvchannelmenu[0].style.display = "none";
        Axios.get(`${API}/v1/client/channel/${currentMode.clientGroupID}`)
        .then(response => {
            const firstChannel = response.data.channels[0];
            setTVChannel({name: firstChannel.name, address: firstChannel.address, port: firstChannel.port, channelId: firstChannel.channelId });
            setTVChannels(response.data);            
        })
        .catch(error => {
            console.log(error);
        });
        return ()=>{
            isChannelReady = true;
        }
    }, [])
    
    const secondsCounter:any = useRef(null);
    const counter:any = useRef(null);
    const currentChannel:any = useRef(null);
    const currentChannelName:any = useRef(null);

    useEffect(()=>{
        clearInterval(secondsCounter.current);
        let seconds:any = 0;
        secondsCounter.current = setInterval(function() {
            counter.current = seconds++;
        }, 1000);

        const params:any = {
            ApplicationName : currentChannelName.current,
            Details: counter.current + 1,
            ClientId : "0187D0D1FD",
            Urn: "77732",
            subSystem: currentChannel.current
        }
        if(params.subSystem !== null) {
            Axios.post(`${API}/v1/audit/create`, params)
            .then(response => {
                console.log(response);
                counter.current = 0;
            })
            .catch(error => {
                console.log(error);
            });
        }
        
    }, [tvChannel.channelId]);

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

    function keyDownHandler(event) {
        keyHandler(event.keyCode);
    }

    const timeoutID:any = useRef(null);
    const volumeTimeOut:any = useRef(null);
    let hideMenu:boolean = false;
    let tvchannelmenu:any = document.getElementsByClassName('tv-submenu');
    
    var toggleTVMenu = function (time: number, volumeControl:boolean) {
        if(volumeControl) {
            if(!hideMenu) {
                tvchannelmenu[0].style.display = "flex";
                hideMenu = !hideMenu;
                toggleVolumeController(false);
            }
            else {
                hideMenu = !hideMenu;
                tvchannelmenu[0].style.display = "none";
                toggleVolumeController(false);
            }
        }
        timeoutID.current = setTimeout(()=> {
            tvchannelmenu[0].style.display = "none";
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

    function changeChannel (channel: any) {
        currentChannel.current = tvChannel.channelId;
        currentChannelName.current = tvChannel.name;
        setTVChannel({name: channel.name, address: channel.address, port: channel.port, channelId: channel.channelId});
        setChannelInfo(!channelInfo);
    }

    useEffect(() => {
        let isChannelInfoVisible = false;
        clearTimeout(extendTimeOut.current);
        const tvchannelInfo:any = document.getElementsByClassName('tv-channel-info');
        tvchannelInfo[0].style.display = 'flex';
        extendTimeOut.current = setTimeout(()=>{
            tvchannelInfo[0].style.display = 'none';
        },
        10000);
        return () => {
            isChannelInfoVisible = true;
            clearTimeout(extendTimeOut.current);
        };
    }, [channelInfo]);

    var channelTimer:any = 0;
    useEffect(() => {
        var IdDate:any = document.getElementById("IdDate");
        var IdTime:any = document.getElementById("IdTime");
        
        RegisterCallbacks();
        channelTimer = setTimeout(()=>{
            getSystemDate();
        }, 1000);
        
        function RegisterCallbacks(){
            try {
                const JAPITWIXPPluginChannel:any = document.getElementById('JAPITWIXPPluginChannel');
                JAPITWIXPPluginChannel.WebIXPOnReceive = WIXPResponseHandler;
            }
            catch(ignore){}
        }

        function WIXPResponseHandler(WIXPResponseJSON:any){
            try {
                var parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
                
                if (parsedWIXPJSON.Fun === "ClockControl") {
                    DisplayCurrentDateAndTime(parsedWIXPJSON);
                }  
            } catch(e){
                alert(e);
                return e;
            }
        }

        function sendWIxPCommand(command:any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                const JAPITWIXPPluginChannel:any = document.getElementById('JAPITWIXPPluginChannel');
                JAPITWIXPPluginChannel.WebIxpSend(WIXPJSONStringForm);
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

            IdDate.innerHTML =  currentDate;
            IdTime.innerHTML =  clockTime;
            setChannelTime(new Date());
        }
        return ()=>{
            clearTimeout(channelTimer)
        }
    }, [channelTime, channelInfo]); 
    
    const [isHPLoading, setIsHPLoading] = useState<boolean>(false);
    useEffect(() => {
        let isChannelChanged: boolean = false;
        function CreateJAPITObjectForWIXPSvc(this: any){
            this.Svc    = "WIXP";
            this.SvcVer = "4.0";
            this.Cookie = 222;
        }

        function initial () {
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc(); 
                JAPITObjForWIXPSvc.Cookie = 299;
                JAPITObjForWIXPSvc.CmdType = "Change";
                JAPITObjForWIXPSvc.Fun = "Source";
                JAPITObjForWIXPSvc.CommandDetails = 
                {
                    "TuneToSource" : `${tvMode}`
                }  
            sendWIxPCommand(JAPITObjForWIXPSvc);
            tune();
        }

        function tune() {
            if(tvChannel.port !== 0) {
                var url1 = `multicast://${tvChannel.address}:${tvChannel.port}/0/0/0/VBR`;	// Canvas
                IPTuning(url1);
            try {
                var video: any = document.getElementById("vidObject");
                video.bindToCurrentChannel();
            }
            catch(ignore) {}
            }
        }

        /* function to send commands to TV */
        function sendWIxPCommand(command: any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                var JAPITWIXPPlugin: any = document.getElementById('JAPITWIXPPlugin');
                JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
            }
            catch (ignore) {
            }
        }

        /* create some attributes of the WIXP object */
        function IPTuning(url: any) {
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie  = 1091;
            JAPITObjForWIXPSvc.CmdType = "Change";
            JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
            JAPITObjForWIXPSvc.CommandDetails = {
                "ChannelTuningDetails": {
                     "URL": url,
                 },
                 "TrickMode": `${trickMode}`
             };
            sendWIxPCommand(JAPITObjForWIXPSvc);
        }
         initial();
        return ()=> {
            isChannelChanged = true;
        }
    }, [tvChannel.address, trickMode])

    useEffect(() => {
        let isSubtitlesActivated:boolean = false;
        initialiseSubtitlesActivation();
        function CreateJAPITObjectForWIXPSvcSubtitles(this: any){
            this.Svc    = "WIXP";
            this.SvcVer = "4.0";
            this.Cookie = 222;
        }
        
        function initialiseSubtitlesActivation () {
            var JAPITObjForWIXPSvcSubtitles = new CreateJAPITObjectForWIXPSvcSubtitles(); 
                JAPITObjForWIXPSvcSubtitles.SvcVer = "3.0";
                JAPITObjForWIXPSvcSubtitles.Cookie = 300;
                JAPITObjForWIXPSvcSubtitles.CmdType = "Change";
                JAPITObjForWIXPSvcSubtitles.Fun = "Subtitles";
                JAPITObjForWIXPSvcSubtitles.CommandDetails = 
                {
                    "SubtitleState" : `${subtitles}`,
                    "SubtitleLanguageIndex" : 2 
                }
            sendWIxPCommand(JAPITObjForWIXPSvcSubtitles);
        }
        
        /* function to send commands to TV */
        function sendWIxPCommand(command: any) {
            try {
                var WIXPJSONStringForm = JSON.stringify(command);
                var JAPITWIXPPluginSubtitles: any = document.getElementById('JAPITWIXPPluginSubtitles');
                JAPITWIXPPluginSubtitles.WebIxpSend(WIXPJSONStringForm);
            }
            catch (ignore) {
            }
        }

        return ()=> {
            isSubtitlesActivated = true;
        }
    },[subtitles]);

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
        if(menuitem.id === 3) {    
            setIsHPLoading(true);
            currentChannel.current = tvChannel.channelId;
            currentChannelName.current = tvChannel.name;
            setTVChannel({name: tvChannel.name, address: tvChannel.address, port: tvChannel.port, channelId: Date.now()});
            clearInterval(secondsCounter.current);
            setTrickMode('Stop');
            clearTimeout(extendTimeOut.current);
            clearTimeout(timeoutID.current);
            setTimeout(()=>{
                setIsHPLoading(false);
                setHomePageLink(!homePageLink);
            }, 1000);
        }
        else if(menuitem.id === 1) {
            if(subtitles === 'Off') {
                setSubtitles('On');
            }
            else {
                setSubtitles('Off');
            }
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
            <div  className={"tv-page-main " +(homePageLink ? "hide-tv" : "") }>
                <SpatialNavigation>
                    <Container fluid={true} >
                            <ChannelInfo Row={Row} Col={Col} tvChannel={tvChannel}/>
                            <TVChannel />
                            <Subtitles />
                            <Audio />
                            <VolumeController volumeController={volumeController} volume={volume}/>
                        <Row  className="fixed-bottom pt-1 tv-submenu">
                            <Col sm={3} className="pl-0">
                                <TVChannelMenu tvchannels={tvchannels} changeChannel={changeChannel} tvChannel={tvChannel}/>
                            </Col>
                            <Col sm={9}>
                                <TVSubMenu goToHome={goToHome} subtitles={subtitles} audio={audio}/>
                            </Col>
                        </Row>
                    </Container>
                </SpatialNavigation>
            </div>
        </Router>   
    )
}

export default Main;
