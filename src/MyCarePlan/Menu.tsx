import React from 'react';
import  { Focusable, FocusableSection } from 'react-js-spatial-navigation';
import {  Button } from 'react-bootstrap';

function Menu(props) {
    return (
        <div>
            <FocusableSection  defaultElement={'active'}>
                {
                    props.mainMenu.map((activity, i) =>
                        <Focusable className="active" onFocus={() => props.addFocusToActivity(activity)} key={activity.carePlanSectionId} onUnFocus={() => props.removeFocusFromActivity(activity)}>
                            <Button className={"activity-button " + (props.activeFocus === activity.carePlanSectionId ? "activity-button-active " : "activity-button-inactive")}  
                                    onClick={()=> props.selectActivity(activity)}>
                                {activity.header}
                                <div className={"selection-arrow " + (props.activeFocus === activity.carePlanSectionId ? "selection-arrow-active "  : "selection-arrow-inactive")}>
                                </div>
                            </Button>
                        </Focusable>
                    )
                }
            </FocusableSection>
        </div>
    )
}

export default Menu
