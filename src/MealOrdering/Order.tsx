import React, {CSSProperties, useEffect, useState, useRef} from 'react';
import './Order.scss';
import PES from '../globalVariables';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SpatialNavigation, {FocusableSection, Focusable } from 'react-js-spatial-navigation';
import { Container, Row, Col, Button, ProgressBar} from 'react-bootstrap';
import {FaInfoCircle, FaChevronLeft}  from "react-icons/fa";
import MealOrderingHome from '../MealOrdering/Main';
import AvailableMenu from './AvailableMenu';
import MealOrderingModal from './MealOrderingModal';
import MenuItems from './MenuItems';

function Order(props) {
    const MealOrderingMain = PES.PESLiteImages.carePlan;
    const modalBtn = PES.modalText;
    const moniter = PES.dietSpec;
    const [MealOrdering, setHomePageLink] = useState<boolean>(false);
    const [meals, setMealItems] = useState<any>({mealItems:[]})
    const MealOrderingMainbg:CSSProperties = {
        backgroundImage: `url(${MealOrderingMain})`
    }
    const patientNutrientsAllowance = {dietSpecification: "Full Diet", foodAllergy: "Allergy", foodPreference: "Preference"}
    const [focusOnMenuItem, setfocusOnMenuItem] = useState<any>(0);
    const [blurOnMenuItem, setBlurOnMenuItem] = useState<any>(0);
    const [flag, setFlag] = useState<any>(false);
    const focusonModal:any = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuItem, setMenuItem] = useState({});
    const menuItemFocus:any = useRef(null);
    const changeQuantity:any = useRef(null);
    const [count, setCount] = useState<number>(0);
    const [orderedList, updateOrderedList] = useState<any>([]);
    const [orderedMenuItemsLength, setOrderedMenuItemsLength] = useState<boolean>(false);
    const [modalButtonName, setModalButtonName] = useState<string>('');
    const [placeOrderFlag, setPlaceOrderFlag] = useState<boolean>(false);
    
    const focusOnOrderedList:any = useRef(null);
    useEffect(() => {
        props.toastr.clear();
        if(orderedList !== undefined) {
            const focusplaceOrderButton: HTMLCollectionOf<any> = document.getElementsByClassName("item-place-order")[0].children;
            if(orderedList.length >= 1) {
                setTimeout(()=>{
                    const focusOrderedItem: HTMLCollectionOf<any> = document.getElementsByClassName("items-overview-offset")[0].children;
                    focusOnOrderedList.current = focusOrderedItem[0].children[0];
                }, 100);
                setOrderedMenuItemsLength(true);
                focusplaceOrderButton[0].classList.add('focusable');
            }
            else {
                setOrderedMenuItemsLength(false);
                focusplaceOrderButton[0].classList.remove('focusable');
            }
        }
    }, [orderedList])
    const [menuItemDetails, setMenuItemDetails] = useState<any>({});
    function setIsModalOpens(menuItem) {
        var ModalCount = orderedList.find(function(obj) { if (obj !== null) return obj.id === menuItem.id });
        let modalText:any;
        if (!ModalCount) {
            menuItem.quantity = 1;
            setCount(menuItem.quantity);
            modalText = modalBtn.add;
        }
        else {
            setCount(ModalCount.quantity);
            modalText = modalBtn.update;
        }
        setModalButtonName(modalText);
        setMenuItem(menuItem);
        setMenuItemDetails(menuItem);
        setIsModalOpen(true);
    }
    const avaialbleMenu: HTMLCollectionOf<any> = document.getElementsByClassName("meal-type");
    useEffect(() => {
        //const removeFocusFromBack:any = (document.getElementsByClassName("meal-ordering-order-icon")[0].children[0] as unknown as HTMLCollectionOf<HTMLElement>);
        //console.log("removeFocusFromBack",removeFocusFromBack);
        if(isModalOpen) {
            const selectMenuItem: HTMLCollectionOf<any> = document.getElementsByClassName("scrollitems")[0].children;
            if(modalButtonName) {
                const menuItemIndex = meals.mealItems.findIndex(obj => {if(obj !==null) return obj.id === menuItemDetails.id});
                menuItemFocus.current = selectMenuItem[menuItemIndex + 1];
            }
            const element: HTMLCollectionOf<any> = document.getElementsByClassName("modalFocus");
            if(element[0].firstElementChild) {
                focusonModal.current = element[0].firstElementChild;
                focusonModal.current.focus();
            }
            for(var i=0; i < selectMenuItem.length; i++) {
                const removeFocus:any = selectMenuItem[i];
                removeFocus.classList.remove('focusable');
            }
            
            for(var i=0; i < avaialbleMenu.length; i++) {
                const removeFocusFromMenu = avaialbleMenu[i].children[0];
                removeFocusFromMenu.classList.value = removeFocusFromMenu.classList.value.substring(7);
            }
            const removeFocuFromPlaceOrderBtn: HTMLCollectionOf<any> = document.getElementsByClassName("item-place-order")[0].children;
            removeFocuFromPlaceOrderBtn[0].classList.remove('focusable');
            //removeFocusFromBack[0].classList.remove('focusable');
        }
    }, [isModalOpen])
    
    function addFocusBacktoPage() {
        const unFocusedElements: HTMLCollectionOf<any> = document.getElementsByClassName("scrollitems")[0].children;
        for(var i=0; i < unFocusedElements.length; i++) {
            const removeFocus:any = unFocusedElements[i];
            removeFocus.classList.add('focusable');
        }
        for(var i=0; i < avaialbleMenu.length; i++) {
            const addFocusFromMenu = avaialbleMenu[i].children[0];
            addFocusFromMenu.classList.value = 'section'+ addFocusFromMenu.classList.value;
        }
        //removeFocusFromBack[0].classList.add('focusable');
        const addFocusBackPlaceOrderBtn: HTMLCollectionOf<any> = document.getElementsByClassName("item-place-order")[0].children;
        addFocusBackPlaceOrderBtn[0].classList.add('focusable');
        if(menuItemFocus.current !== null || menuItemFocus.current !== undefined) {
            menuItemFocus.current.focus();
        }
    }

    function setIsModalCancelAndClose(menuItem) {
        var orderListIndex = orderedList.findIndex(obj => {if(obj !== null) return obj.id === menuItem.id});
        if(orderListIndex !== -1) {
            setCount(orderedList[orderListIndex].quantity);
        }
        else {
            setCount(1);
        }
        setIsModalOpen(false);
        addFocusBacktoPage();
    }
    const [nutrientProgress, setNutrientProgress] = useState<any>({progressBarWidthKJ: 0, progressBarWidthCARBS: 0, progressBarWidthPRO: 0})
    const [nutrientsIntakeLevels, setNutrientIntakeLevels] = useState<any>({
        totalCalories: null,
        totalCarbs: null,
        totalProteins: null
    });

    const [_patientNutrientsAllowance, setPatientNutrientAllowance] = useState<any>({
        dietSpecification: "Full Diet",
        foodAllergy: "Allergy",
        foodPreference: "Preference",
        totalCalories: 3000,
        totalProteins: 10.1,
        totalCarbs: 500
    });
    const [storeMeal, setStoreMeal] = useState<any>({});
    useEffect(()=>{
        if(storeMeal) {
            var cloneOfOrderList = [...orderedList];
            var orderListJSON = JSON.stringify(cloneOfOrderList);
            props.mealMain.mealCategory.map((mealTime, i)=> {
                localStorage.setItem(mealTime.mealTimeId, orderListJSON);
            });   
        }
    }, [storeMeal]);
    
    //var [scrollTopElement, scrollBottom]:any = [document.getElementById('section02'), document.getElementById('section01')];
    const scrollTopElement:any = document.getElementById('section02') as unknown as HTMLCollectionOf<Element>;
    const scrollBottom:any = document.getElementById('section01') as unknown as HTMLCollectionOf<Element>;
    const scrollItems:any = (document.getElementsByClassName('scrollitems') as HTMLCollectionOf<Element>);
    
    useEffect(()=>{
        function scrollEvent(){
            let insideScroll:number = 0;
            for (var i=1; i <= scrollItems[0].children.length -2; i++) {
                insideScroll += scrollItems[0].children[i].clientHeight;
            }
            if(insideScroll - scrollItems[0].scrollHeight ===  scrollItems[0].scrollTop) {
                try {
                    scrollTopElement.style.display = "none";
                    scrollBottom.style.display = "block";
                }
                catch(error) {
                    console.log(error);
                }
                
            }
            else if(insideScroll - scrollItems[0].scrollTop === scrollItems[0].clientHeight){
                try {
                    scrollBottom.style.display = "none";
                    scrollTopElement.style.display = "block";
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        window.addEventListener("scroll", scrollEvent, true);
        return () => {
            window.removeEventListener("scroll", scrollEvent, true);
        };
    }, [scrollTopElement!== null]);

    function scrollToBottom() {
        scrollItems[0].scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': scrollItems[0].scrollHeight
          });
        scrollTopElement.style.display = "block";
        scrollBottom.style.display = "none";
        return false;
    }

    function scrollToTop() {
        scrollItems[0].scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': scrollItems[0].offsetTop
          });
          scrollTopElement.style.display = "none";
          scrollBottom.style.display = "block";
        return false;
    }

    const [caloriesProgressFlag, setCaloriesFlag] = useState<string>(moniter.left);
    const [proteinProgressFlag, setProteinFlag] = useState<string>(moniter.left);
    const [carbsProgressFlag, setCarbsFlag] = useState<string>(moniter.left);
    const [progressBarColourCal, setProgressBarColourCal] = useState<boolean>(true);
    const [progressBarColourCarbs, setProgressBarColourCarbs] = useState<boolean>(true);
    const [progressBarColourPro, setProgressBarColourPro] = useState<boolean>(true);
    
    function setIsModalSaveAndClose(menuItem) {
        if(orderedList !== null) {
            var orderList = orderedList.find(obj => {if(obj !== null) return obj.id === menuItem.id});
            if(orderList === undefined) {
                menuItem.quantity = count;
                updateOrderedList(orderedList => [...orderedList, menuItem]);
            }
            else {
                var orderListIndex = orderedList.findIndex(obj => {if(obj !== null) return obj.id === menuItem.id});
                setCount(menuItem.quantity);
                orderedList[orderListIndex].quantity = count;
                }
            }
        addFocusBacktoPage();
        setIsModalOpen(false);
    }
    
    function addItem() {
        setCount(count => count + 1);  
    }

    function removeItem() {
        if(count > 1) {
            setCount(count => count - 1);  
        }
    }

    useEffect(()=>{
        var calculateNutritionLeft = function(req, selectedList, stat) {
            var totalNutrition = {
                totalCalories: 0,
                totalCarbs: 0,
                totalProteins: 0
            };
            selectedList.map(function(item) {
                totalNutrition.totalCalories += item.nutrients.KJ.value * item.quantity;
                totalNutrition.totalCarbs += item.nutrients.CARBS.value * item.quantity;
                totalNutrition.totalProteins += item.nutrients.PRO.value * item.quantity;
            });
            stat.totalCalories = (req.totalCalories - totalNutrition.totalCalories).toFixed(2);
            stat.totalCarbs = (req.totalCarbs - totalNutrition.totalCarbs).toFixed(2);
            stat.totalProteins = (req.totalProteins - totalNutrition.totalProteins).toFixed(2);
            if (stat.totalCalories >= 0) {
                setCaloriesFlag(moniter.left);
                setProgressBarColourCal(true);
            }
            else {
                setCaloriesFlag(moniter.over);
                setProgressBarColourCal(false);
            }
            if (stat.totalCarbs >= 0) {
                setProteinFlag(moniter.left);
                setProgressBarColourCarbs(true);
            }
            else {
                setProteinFlag(moniter.over);
                setProgressBarColourCarbs(false);
            }
            if (stat.totalProteins >= 0) {
                setCarbsFlag(moniter.left);
                setProgressBarColourPro(true);
            }
            else {
                setCarbsFlag(moniter.over);
                setProgressBarColourPro(false);
            }
            stat.totalCalories = Math.abs(stat.totalCalories);
            stat.totalCarbs = Math.abs(stat.totalCarbs);
            stat.totalProteins = Math.abs(stat.totalProteins);
    
            return totalNutrition;
        };
        var totalNutrition = calculateNutritionLeft(_patientNutrientsAllowance, orderedList, nutrientsIntakeLevels);
        setNutrientProgress({progressBarWidthKJ : (totalNutrition.totalCalories * 100) / _patientNutrientsAllowance.totalCalories,
        progressBarWidthCARBS : (totalNutrition.totalCarbs * 100) / _patientNutrientsAllowance.totalCarbs,
        progressBarWidthPRO : (totalNutrition.totalProteins * 100) / _patientNutrientsAllowance.totalProteins});
    }, [orderedList, count]);

    const [orderButtons, setOrderButtons] = useState<any>(0);

    function toggleOrderButtons(act) {
        if (act.id !== orderButtons) {
            setOrderButtons(act.id);
        }
        else {
            setOrderButtons(0);
        }
    }

    function selectMealType(mealType) {
        //const backIcon:any = document.getElementsByClassName('meal-ordering-order-icon')[0].children[0];
        setMealItems({mealItems: mealType.mealItems});
        setfocusOnMenuItem(mealType.id);
        setFlag(false);
        //backIcon.classList.add('focusable');
        const arrowDown: any  = document.getElementById('section01');
        if(mealType.mealItems.length <= 5) {
            arrowDown.style.display = "none";
        }
        else {
            arrowDown.style.display = "block";
            scrollItems[0].scrollTo({
                'top': scrollItems[0].offsetTop
            });
        }
    }

    function removeFocusFromIcon(menuItem) {
        //const backIcon:any = document.getElementsByClassName('meal-ordering-order-icon')[0].children[0];
        //backIcon.classList.remove('focusable');
    }

    function selectSubMealType (subMealType) {
        if(subMealType.id === focusOnMenuItem) {
            setFlag(true);
            setBlurOnMenuItem(subMealType.id);
        }
        else {
            setFlag(false);
        }
    }

    const [orderQuantity, updateOrderQuantity] = useState<any>({});
    function changeOrderedQuantity(modifyOrderredItem) {
        setModalButtonName(modalBtn.update);
        setCount(modifyOrderredItem.quantity);
        setMenuItem(modifyOrderredItem);
        updateOrderQuantity(modifyOrderredItem);
        const menuItemIndex = orderedList.findIndex(obj => { if(obj !==null) return obj.id === modifyOrderredItem.id});
        const selectMenuItem: HTMLCollectionOf<any> = document.getElementsByClassName("items-overview");
        const focusElement= selectMenuItem[0].children[menuItemIndex + 1].children[1].children[0].children[0];
        changeQuantity.current = focusElement;
        setIsModalOpen(true);
    }

    function deleteSelectedOrderedItem(orderedItem) {
        const orderList = [...orderedList];
        const orderItemIndex = orderList.findIndex(obj => {if(obj !==null) return obj.id === orderedItem.id});
        if(orderItemIndex !== -1 ) {
            orderList.splice(orderItemIndex, 1);
            updateOrderedList(orderList);
            focusOnOrderedList.current.focus();
        }
    }
    
    function goToHome (flag, order) {
        if(flag) {
            setStoreMeal(order);
            setPlaceOrderFlag(true);
        }
        setHomePageLink(!MealOrdering);
    }

    return (
        <Router>
            <Switch>
                <Route path="">
                    {MealOrdering  ?  <MealOrderingHome placeOrderFlag={placeOrderFlag}/> : null }
                </Route>
            </Switch>
            <div style={MealOrderingMainbg} className={"meal-ordering-Order-body" + (MealOrdering ? " hide-mealOrdering" : " ")}>
            <Container fluid={true}>
                <SpatialNavigation>
                    <Row>
                        <Col xs lg="1" className="full-fixed-height">
                            <div className="meal-ordering-order-icon text-center">
                                <Focusable onClickEnter={()=>goToHome(false, orderedList)} >
                                    <FaChevronLeft onClick={()=>goToHome(false, orderedList)}/>
                                </Focusable>
                            </div>
                            <h3 className="session-type">Back</h3>
                        </Col>
                        <AvailableMenu Row={Row} Col={Col} 
                                       Focusable={Focusable} 
                                       Button={Button} 
                                       mealMain={props.mealMain}
                                       selectMealType={selectMealType}
                                       focusOnMenuItem={focusOnMenuItem}
                                       selectSubMealType={selectSubMealType}
                                       flag={flag}
                                       updateOrderedList={updateOrderedList}
                                       FocusableSection={FocusableSection}/>
                        <Col sm={8}>
                        <Row>
                            <Col sm={12} className="order-panel">
                                <Row className="">
                                    <MenuItems meals={meals} setIsModalOpens={setIsModalOpens}
                                             Focusable={Focusable} Row={Row} Col={Col} Button={Button} 
                                             scrollToBottom={scrollToBottom} scrollToTop={scrollToTop}
                                             removeFocusFromIcon={removeFocusFromIcon}/>
                                    <Col sm={5} className="order-summary full-fixed-height">
                                        <Row>
                                            <Col className="order-section">
                                                <h1 className="your-order-text">
                                                    Your Order
                                                </h1>
                                                <Row className="diet-specification justify-content-md-center">
                                                    <Col >
                                                        <p className="diet-spec ">{patientNutrientsAllowance.dietSpecification}</p>
                                                    </Col>
                                                    <Col >
                                                        <p className="food-allergy ">{patientNutrientsAllowance.foodAllergy} <FaInfoCircle/></p>
                                                    </Col>
                                                    <Col >
                                                        <p className="food-preference ">{patientNutrientsAllowance.foodPreference}</p>
                                                    </Col>
                                                </Row>
                                                <Row className="nutrient-wrapper">
                                                    <Col sm={{span: 1, offset: 1}} className="nutrient"><p className="nutrient-type">KJ</p></Col>
                                                    <Col sm={6} className="progress-width">
                                                        <ProgressBar now={nutrientProgress.progressBarWidthKJ} 
                                                        variant={progressBarColourCal ? "info" : "danger"}/>
                                                    </Col>
                                                    <Col sm={3} className="col-gutter">
                                                    <p className="nutrient-energy-content">
                                                        <span className="progressCount">{nutrientsIntakeLevels.totalCalories === null ? _patientNutrientsAllowance.totalCalories : nutrientsIntakeLevels.totalCalories}
                                                        </span> <span className="measure">{caloriesProgressFlag}</span>
                                                    </p>
                                                    </Col>
                                                    <Col ></Col>
                                                </Row>
                                                <Row className="nutrient-wrapper">
                                                    <Col sm={{span: 1, offset: 1}} className="nutrient"><p className="nutrient-type">CARB</p></Col>
                                                    <Col sm={6} className="progress-width"><ProgressBar now={nutrientProgress.progressBarWidthCARBS} 
                                                    variant={progressBarColourCarbs ? 'info' : 'danger'}/>
                                                    </Col>
                                                    <Col sm={3} className="col-gutter">
                                                    <p className="nutrient-energy-content">
                                                        <span className="progressCount">{nutrientsIntakeLevels.totalCarbs === null ? _patientNutrientsAllowance.totalCarbs : nutrientsIntakeLevels.totalCarbs} 
                                                        </span> <span className="measure">gram {proteinProgressFlag}</span>
                                                    </p>
                                                    </Col>
                                                    <Col ></Col>
                                                </Row>
                                                <Row className="nutrient-wrapper">
                                                    <Col sm={{span: 1, offset: 1}} className="nutrient"><p className="nutrient-type">PRO</p></Col>
                                                    <Col sm={6} className="progress-width"><ProgressBar now={nutrientProgress.progressBarWidthPRO} 
                                                    variant={progressBarColourPro ? 'info' : 'danger'}/>
                                                    </Col>
                                                    <Col sm={3} className="col-gutter">
                                                    <p className="nutrient-energy-content">
                                                        <span className="progressCount">{nutrientsIntakeLevels.totalProteins === null ? _patientNutrientsAllowance.totalProteins : nutrientsIntakeLevels.totalProteins}
                                                        </span> <span className="measure">gram {carbsProgressFlag}</span>
                                                    </p>
                                                    </Col>
                                                    <Col ></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col  className="items-overview">
                                                <Row>
                                                    <Col className="empty-list-offset">
                                                        <h2  className={orderedMenuItemsLength ? "order-list" : "empty-list"}>Your list is empty. Please order now</h2>
                                                    </Col>
                                                </Row>
                                                
                                                {orderedList.map((orderedItem, i) =>
                                                <div key={i}>
                                                    <Row >
                                                        <Col className={orderedMenuItemsLength ? "item-hr-offset " : "hide-hr"}>
                                                            <hr />
                                                        </Col>
                                                    </Row>
                                                    <Row  className="items-overview-offset">
                                                        <Col>
                                                            {!isModalOpen ? (
                                                                <Focusable onClickEnter={()=>toggleOrderButtons(orderedItem)}>
                                                                    <Row onClick={()=>toggleOrderButtons(orderedItem)} className="order-wrapper">
                                                                        <Col sm={2}>
                                                                            <h2 className="item-quantity">{orderedItem.quantity}</h2>
                                                                        </Col>
                                                                        <Col sm={9}>
                                                                            <h2 className="item-description">{orderedItem.name}</h2>
                                                                            <p className="item-nutrients">
                                                                            <span>{orderedItem.nutrients.KJ.value}{orderedItem.nutrients.KJ.label}, </span>
                                                                            <span>{orderedItem.nutrients.PRO.value}{orderedItem.nutrients.PRO.measure} {orderedItem.nutrients.PRO.label}, </span>
                                                                            <span>{orderedItem.nutrients.CARBS.value}{orderedItem.nutrients.CARBS.measure} {orderedItem.nutrients.CARBS.label}</span>
                                                                            </p>
                                                                        </Col> 
                                                                    </Row>
                                                                </Focusable>
                                                            ): (
                                                                <div onClick={()=>toggleOrderButtons(orderedItem)}>
                                                                    <Row className="order-wrapper">
                                                                        <Col sm={2}>
                                                                            <h2 className="item-quantity">{orderedItem.quantity}</h2>
                                                                        </Col>
                                                                        <Col sm={9}>
                                                                            <h2 className="item-description">{orderedItem.name}</h2>
                                                                            <p className="item-nutrients">
                                                                            <span>{orderedItem.nutrients.KJ.value}{orderedItem.nutrients.KJ.label}, </span>
                                                                            <span>{orderedItem.nutrients.PRO.value}{orderedItem.nutrients.PRO.measure} {orderedItem.nutrients.PRO.label}, </span>
                                                                            <span>{orderedItem.nutrients.CARBS.value}{orderedItem.nutrients.CARBS.measure} {orderedItem.nutrients.CARBS.label}</span>
                                                                            </p>
                                                                        </Col> 
                                                                    </Row>
                                                                </div>
                                                            )}
                                                            
                                                        </Col>
                                                        <Row className={orderButtons === orderedItem.id ? "item-button-offset" : "hide-item-button-offset"}>
                                                            <Col sm={6} className="pl-0">
                                                                {!isModalOpen ? (
                                                                    <Focusable onClickEnter={()=>changeOrderedQuantity(orderedItem)}>
                                                                        <Button onClick={()=>changeOrderedQuantity(orderedItem)} className="item-change-qty">Change Qty</Button>
                                                                    </Focusable>
                                                                ) : (
                                                                    <div onClick={()=>changeOrderedQuantity(orderedItem)}>
                                                                        <Button className="item-change-qty">Change Qty</Button>
                                                                    </div>
                                                                )}
                                                                
                                                            </Col>
                                                            <Col sm={6} className="btn-custom-padding pr-0">
                                                                {!isModalOpen ? (
                                                                    <Focusable onClickEnter={()=>deleteSelectedOrderedItem(orderedItem)}>
                                                                        <Button onClick={()=>deleteSelectedOrderedItem(orderedItem)} className="item-remove">Remove</Button>
                                                                    </Focusable>
                                                                ) : (
                                                                    <div onClick={()=>deleteSelectedOrderedItem(orderedItem)}>
                                                                        <Button className="item-remove">Remove</Button>
                                                                    </div>
                                                                )}
                                                                
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </div>
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={10} className="item-place-order">
                                                <Focusable onClickEnter={()=>goToHome(true, props.mealMain)} >
                                                    <Button onClick={()=>goToHome(true, props.mealMain)} className={"item-order-button " + (orderedMenuItemsLength ? "" : "btn-disabled")} disabled={orderedMenuItemsLength ? false : true}>Place</Button>
                                                </Focusable>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </Col>
                        <MealOrderingModal 
                            isModalOpen={isModalOpen} 
                            setIsModalOpens={setIsModalOpens} 
                            setIsModalCancelAndClose={setIsModalCancelAndClose} 
                            setIsModalSaveAndClose={setIsModalSaveAndClose}
                            menuItem={menuItem}
                            count={count}
                            addItem={addItem}
                            removeItem={removeItem}
                            modalButtonName={modalButtonName} 
                        />
                    </Row>
                </SpatialNavigation>
            </Container>
            </div>
        </Router>
    )
}

export default Order;
