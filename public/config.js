
/********* Web API Configuration *******/ 

const PESconfig = window;

PESconfig.APIConfig = {
  PROD_API : 'http://vm-mel-bh18:8086/pes/api', // API config settings for Production
  DEV_API : 'https://localhost:44313/api',       // API config settings for Development
  ID: 12,
  MacID: '00187D0D1AFD',
  URN1: 77732,
  URN2: 223543,
  channelID: 19,
  clientGroupID: '',
  timeOut: 10000
}
/**************************************/


/*********** Home Page Config ********/

PESconfig.PESLiteImages = {
  homePage : 'Assets/Images/beach-back-image.png',
  carePlan : 'Assets/Images/pesbg.jpg',
  television: '',
  orderMinus: 'Assets/Images/Minus.svg',
  orderPlus: 'Assets/Images/Plus.svg',
  downArrow: 'Assets/Images/down-arrow.svg'
}

/********** MainMenu Slider Settings****/ 

PESconfig.mainMenuSlider = {
  dots: false,
  className: 'center',
  speed: 100,
  infinite: false,
  centerPadding: '60px',
  slidesToShow: 5.05,
  slidesToScroll: 1,
  focusOnSelect: true,
  initialSlide: 0,
  zIndex: 1000,
  useTransform: true,
  slickGoTo: 1,
  cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
}
/**************************************/


// Sub Menu Slider Settings

PESconfig.subMenuSlider = {
  speed: 100,
  slidesToShow: 4.6,
  infinite: false,
  slidesToScroll: 0,
  initialSlide: 1
}

// TV Channels 
PESconfig.tvChannels = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 0
}

PESconfig.remoteKeys = {
  _backTV: 461,
  _backKeyboard: 8
}

// Meal Ordering Modal
PESconfig.modalOverlay = {
  mealOrdering: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 1,
      background: 'rgba(0,127,108,0.7)',
      transition: 'transform .3s ease-out'
  }
}

PESconfig.modalDialog = {
  mealOrdering: {
    background: '#fff',
    borderRadius: '5px',
    padding: '20px',
    width: '50%',
    height: '700px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    transition: 'all 0.5s',
    animation: 'zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
  },
  mealConfirmation: {
    background: '#fff',
    borderRadius: '5px',
    padding: '20px',
    width: '50%',
    height: '455px',
    position: 'absolute',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    transition: 'all 0.5s',
    animation: 'zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
  }
}

PESconfig.modalText = {
  add: 'Add',
  update: 'Update'
}

PESconfig.dietSpec = {
  left: 'left',
  over: 'over'
}

// Toaster
PESconfig.toaster = {
  mealOrdering: {
    class : 'toast-bottom-right',
    duration: 0,
    time: 5000,
  }
}

PESconfig.messages = {
  orderSuccessful: "Your order has been placed Successfully!!!"
 }

PESconfig.PORT=3000 // Port settings