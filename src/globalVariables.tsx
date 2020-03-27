declare global {
    interface Window {
        mainMenuSlider:any,
        subMenuSlider:any,
        APIConfig:any,
        PESLiteImages:any,
        tvChannels: any,
        remoteKeys: any,
        modalOverlay: any,
        modalDialog: any,
        toaster: any,
        modalText: any,
        dietSpec: any,
        messages: any
    }
}

const $ = window;

export default $;

