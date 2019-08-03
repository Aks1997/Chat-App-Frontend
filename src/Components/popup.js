import React from 'react';
import classes from './popup.module.css';

const Popup = (props)=>{
    return (  
        <div className={classes.popup}>  
            <div className={classes.popup_inner}>  
                <h1 className={classes.popupheader}>{props.message}</h1>  
                {props.children}
                <br/>
                <button className={classes.btn} onClick={props.closePopup}>{props.buttonMess}</button>  
                <br/>
                {props.warning}
            </div>  
        </div>  
    );  
}

export default Popup;