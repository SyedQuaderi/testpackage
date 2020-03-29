import React, {useState, useEffect, useRef} from 'react';

function AvailableMenu(props) {
    const [meal, setMeal] = useState<any>(false);
    const focusInit:any = useRef(null);   
    let savedData:any;
    useEffect(()=> {
        setMeal(true);        
        props.mealMain.mealCategory.map((mealTime, i)=> {
            if(i === 0) {
                const fistSelctedMeal: HTMLCollectionOf<any> = document.getElementsByClassName('meal-type')[0].children; 
                focusInit.current = fistSelctedMeal[0];
                focusInit.current.focus();
                props.selectMealType(mealTime);
            }
            savedData = localStorage.getItem(mealTime.mealTimeId);
        });
        if(savedData !== undefined && savedData !== null) {
            const parsedData = JSON.parse(savedData);
            parsedData.map((storedData, i)=> {
                props.updateOrderedList(orderedList => [...orderedList, storedData]);
            });
        } 
        const arrowTop: any  = document.getElementById('section02');
        arrowTop.style.display = "none";
    }, [meal]);

    return (
        <props.Col sm={3} className="full-fixed-height white-filter meal-type-wrapper">
            <div>
                <props.Row>
                    {props.mealMain.mealCategory.map((item, i)=>
                        <props.Col xs={12} key={i} className="meal-type remove-gutter">
                            <props.Focusable onUnfocus={()=>{props.selectSubMealType(item)}} onFocus={()=>{props.selectMealType(item)}}>
                                <props.Button  onClick={()=>{props.selectMealType(item)}} className={"menu-category-btn" + (item.id === props.focusOnMenuItem && !props.flag ? " activity-button-active " : " activity-button-inactive")}>
                                    <props.Row>
                                        <props.Col className="text-center" >
                                            <div className="">
                                                <img src={item.image} className="round-thumbnail" />
                                            </div>
                                        </props.Col>
                                        <props.Col className="text-left full-height">
                                            <span className="menuItems ng-binding">{item.name}</span>
                                        </props.Col>
                                    </props.Row>
                                    <div className={"selection-arrow " + (item.id === props.focusOnMenuItem && props.flag ? "selection-arrow-active "  : "selection-arrow-inactive")}>
                                    </div>
                                </props.Button>
                            </props.Focusable>
                        </props.Col>
                    )}
                </props.Row>
            </div>
        </props.Col>
    )
}

export default AvailableMenu;
