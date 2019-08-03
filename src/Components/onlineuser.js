import React from 'react';

import classes from './onlineuser.module.css';

const onlineuser = (props) => {
    return(
        <div>
            <p className={classes.namediv}>{props.user} <span className={classes.spanbg}>Live</span></p>
        </div>
    );
}

export default onlineuser;