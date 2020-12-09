import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";


export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(true);
    const [redirect, setredirect] = useState(false)
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
        if(props.redirect !==null ){
            history.push(props.redirect);
        }
    };
   
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="primary" autoFocus>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}