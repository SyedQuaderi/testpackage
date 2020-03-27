import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import {Focusable } from 'react-js-spatial-navigation';
import './Modal.scss';
import PES from '../globalVariables';

const modalOverlays = PES.modalOverlay.mealOrdering; 
const modalDialogs = PES.modalDialog.mealOrdering;

function MealOrderingModal(props) {
    const orderMinus = PES.PESLiteImages.orderMinus;
    const orderPlus = PES.PESLiteImages.orderPlus;

    return (
        <>          
          {props.isModalOpen && (
            <Overlay>
              <Dialog className="modal-dialog-main">
                <div className="modal-heading text-center">
                    <h2 className="modal-item-header ng-binding">{props.menuItem.name}</h2>
                    <p className="">
                        <span>{props.menuItem.nutrients.KJ.value}{props.menuItem.nutrients.KJ.label}, </span>
                        <span>{props.menuItem.nutrients.PRO.value}{props.menuItem.nutrients.PRO.measure} {props.menuItem.nutrients.PRO.label}, </span>
                        <span>{props.menuItem.nutrients.CARBS.value}{props.menuItem.nutrients.CARBS.measure} {props.menuItem.nutrients.CARBS.label}</span>
                    </p>
                </div>
                <Row className="modal-body-spacing">
                    <Col sm={2}>
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Col>
                                <Focusable  onClickEnter={() => props.removeItem()}>
                                    <img onClick={() => props.removeItem()} src={orderMinus}/>
                                </Focusable>
                            </Col>
                            <Col>
                                <h2 className="modal-item-count">{props.count}</h2>
                            </Col>
                            <Col>
                                <Focusable  onClickEnter={() => props.addItem()}>
                                    <img onClick={() => props.addItem()} src={orderPlus}/>
                                </Focusable>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                    </Col>
                </Row>
                <div  className="modalFocus" >
                    <Focusable onClickEnter={() => props.setIsModalSaveAndClose(props.menuItem)}>
                        <button className="modal-save-button" onClick={() => props.setIsModalSaveAndClose(props.menuItem)}>{props.modalButtonName}</button>
                    </Focusable>
                    <Focusable onClickEnter={() => props.setIsModalCancelAndClose(props.menuItem)}>
                        <button className="modal-close-button" onClick={() => props.setIsModalCancelAndClose(props.menuItem)}>Cancel</button>
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

export default MealOrderingModal;
