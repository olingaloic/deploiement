import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import ModalMessage from '../../components/utils/ModalMessage';
import ContratService from '../../service/ContratService';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const iframeStyle = {
    width: '100%',
    height: '100%',
    border: '0',
    position: 'relative',
    margin: 'auto'
}

export default function CreationContratApercue() {
    const [open, setOpen] = useState(false);
    const [imageContrat, setImageContrat] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [candidatureHasContrat, setCandidatureHasContrat] = useState(false)
    const classes = useStyles();
    const [messageResponse, setMessageResponse] = useState('');
    const {params} = useRouteMatch();


    const getApercueContrat = async () => {
        setIsLoading(true)
        const response = await ContratService.telechargerApercueContrat(params.id)
        const url = window.URL.createObjectURL(new Blob([response.data], {type: "application/pdf"}));
        await setImageContrat(url)
        setIsLoading(false)
    };

    const candidatureHasContratFunction = async () => {
        const response = await ContratService.candidatureHasContrat(params.id);
        setCandidatureHasContrat(response.data);
    }


    useEffect(() => {
        candidatureHasContratFunction();
        return () => {
            URL.revokeObjectURL(imageContrat)
        }
    }, [])

    const handleClickOpen = () => {
        getApercueContrat();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const saveContrat = async (e) => {
        setIsLoading(true)
        const response = await ContratService.createContratAuto(params.id);
        setMessageResponse(response.data);
        setIsSubmit(true)
        setIsLoading(false)
    }


    if (isLoading) {
        return <CircularProgress disableShrink/>;
    }

    return (

        <div>
            {candidatureHasContrat &&
            <ModalMessage
                message={"un contrat a déjà été créé pour ce stage, si vous souhaitez le supprimer veuillez consulter la liste de tous les contrats"}
                redirect="/"
                title="Le contrat existe déjà"/>
            }

            {messageResponse &&

            <ModalMessage
                message={messageResponse + " Le contrat a été envoyé à l'employeur, vous pouvez passer au contrat suivant"}
                redirect="/rapportContrat/0"
                title="Le contrat existe déjà"/>
                // AlertFormatInvalide(messageResponse, "info")
            }


            <div className="col">
                <Button variant="contained" color="primary" component="button"
                        className="mt-4 btn btn-primary btn-lg btn-block" onClick={handleClickOpen}>
                    Voir aperçu
                </Button>
                {isLoading ?
                    <CircularProgress/>
                    : null
                }
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Aperçu du contrat
                    </DialogTitle>

                    <Dialog fullScreen open={open}>

                        <Toolbar style={{background: '#ECECEC'}}>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                <strong>Fermer</strong>
                            </Typography>
                        </Toolbar>

                        {/* affichage du contrat */}

                        <iframe title="apercue contrat" src={imageContrat} width={'100%'} height={'100%'}
                                style={iframeStyle}/>

                    </Dialog>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
            <div className="col">
                <Button variant="contained" color="primary" component="span" className="mt-4 btn-lg btn-block" fullWidth
                        onClick={saveContrat}
                        disabled={isSubmit}
                >
                    Confirmer et envoyer à l'employeur
                </Button>
            </div>
        </div>
    );

}
