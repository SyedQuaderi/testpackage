import React from 'react';
import PES from '../globalVariables';

function MenuItems(props) {
    const Arrow = PES.PESLiteImages.downArrow;
    return (
        <props.Col sm={7} className="scrollitems full-fixed-height remove-gutter">
            <div id="section02" onClick={()=>props.scrollToTop()} className=" scrollToTop">
                <a href="#section02"><img src={Arrow}/></a>
            </div>
            {props.meals.mealItems.map((mealItem, i)=>
            <props.Focusable className="active" key={i} onFocus={() => props.removeFocusFromIcon(mealItem)} onClickEnter={() => props.setIsModalOpens(mealItem)}>
                <props.Button  className="item-btn">
                    <props.Row>
                        <props.Col sm={5}>
                            <img src={mealItem.image}/>
                        </props.Col>
                        <props.Col sm={7} className="item-details">
                            <>
                                <div className="menu-item-type">
                                    <h1 className="item-header">{mealItem.name}</h1>
                                </div>
                                <div className="">
                                    <p className="menu-item-nutrients">
                                        <span className="ng-binding">{mealItem.nutrients.KJ.value}{mealItem.nutrients.KJ.label}, </span>
                                        <span className="ng-binding">{mealItem.nutrients.PRO.value}{mealItem.nutrients.PRO.label}, </span>
                                        <span className="ng-binding">{mealItem.nutrients.CARBS.value}{mealItem.nutrients.CARBS.label}</span>
                                    </p>
                                </div>
                                <p className="diet-details">
                                    <span className={mealItem.dietTags.gf.label !== null ? 'gf' : 'hide-diet-icon'}>{mealItem.dietTags.gf.label} </span>  
                                    <span className={mealItem.dietTags.halal.label !== null ? 'halal' : 'hide-diet-icon'} >{mealItem.dietTags.halal.label} </span>  
                                    <span className={mealItem.dietTags.vegan.label !== null ? 'vegan' : 'hide-diet-icon'} >{mealItem.dietTags.vegan.label} </span>  
                                    <span className={mealItem.dietTags.vegeterain.label !== null ? 'vegeterain' : 'hide-diet-icon'}>{mealItem.dietTags.vegeterain.label} </span>
                                </p>
                            </>
                        </props.Col>
                    </props.Row>
                </props.Button>
            </props.Focusable>
            )}
            <div id="section01" className="scrollToBottom">
                <a href="#section01" onClick={()=>props.scrollToBottom()}><img src={Arrow}/></a>
            </div>
        </props.Col>
    )
}

export default MenuItems
