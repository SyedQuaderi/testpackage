import React from 'react';
import styled from "styled-components";
import SpatialNavigation, {FocusableSection, Focusable } from 'react-js-spatial-navigation';
import './Modal.scss';
import PES from '../globalVariables';

const modalOverlays = PES.modalOverlay.mealOrdering; 
const modalDialogs = PES.modalDialog.mealConfirmation;

function Confirmation(props) {
    return (
        <>          
          {props.isConfirmationPageOpen && (
            <Overlay>
              <Dialog className="modal-dialog-main">
                <div className="modal-heading text-center">
                    <h2 className="modal-confirm-message">Do you wish to go back to the Main Menu?</h2>
                    <p className="">
                    </p>
                </div>
                <div  className="modalFocus" >
                    <Focusable onClickEnter={() => props.setIsGoToHome(true)}>
                        <button className="modal-save-button" onClick={() => props.setIsGoToHome(true)}>Ok</button>
                    </Focusable>
                    <Focusable onClickEnter={() => props.setIsGoToHome(false)}>
                        <button className="modal-close-button" onClick={() => props.setIsGoToHome(false)}>Cancel</button>
                    </Focusable>
                </div>
              </Dialog>
            </Overlay>
          )}
        </>
    );
}

const Overlay = styled.div`${modalOverlays}`;
const Dialog = styled.div`${modalDialogs}`

export default Confirmation;
