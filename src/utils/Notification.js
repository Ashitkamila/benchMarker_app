import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles(theme=>({
    root:{
        top:theme.spacing(9)
    }
}))

export default function Notification(props) {
    const classes = useStyles();
    const {notify} = props;
    console.log("noti",notify)
    const [isOpen, setIsOpen]= useState();
    useEffect(()=>{
        setIsOpen(notify.isOpen);
    },[notify])

    const handleClose = (event, reason)=>{
        // this line will prevent from hiding notification on clicking somewhere else
        // if(reason=="clickAway"){
        //     return
        // }
        setIsOpen(false)
    }
    return (
        <Snackbar
        className={classes.root}
        open={isOpen}
        autoHideDuration={1000}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        onClose={handleClose}
        >
            <Alert 
            severity={notify.type}
            //onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}