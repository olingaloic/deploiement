import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import ModalMessage from '../../components/utils/ModalMessage';
import ContratService from '../../service/ContratService';
import {ListeContrat} from "./ListeContrats";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    input: {
        display: 'none',
    },
}));

function Televerser() {
    const [file, setFile] = useState([]);
    const [messageResponse, setMessageResponse] = useState('');
    const [isButtonDisable, setIsButtonDisable] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [candidatureHasContrat, setCandidatureHasContrat] = useState(false)
    const classes = useStyles();
    const { params } = useRouteMatch();
    const [displayInvalidFileMessage, setDisplayInvalidFileMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const saveContrat = async (e) => {
        setIsLoading(true)
        let response = await ContratService.createContrat(params.id, file);
        setMessageResponse(response.data);
        setIsButtonDisable(true)
        setIsSubmit(true)
        setIsLoading(false)
    }

    const selectFile = (e) => {
        let files = e.target.files;
        const types = "application/pdf"
        for (let x = 0; x < files.length; x++) {
            if (files[x].type !== types) {
                setDisplayInvalidFileMessage(true);
                setIsButtonDisable(false);
                setFile("")
            } else {
                setDisplayInvalidFileMessage(false);
                setFile(files[0])
                setIsButtonDisable(true);
            }
        }
    };

    const deleteFile = () => {
        setFile([]);
        setIsButtonDisable(false);
    }

    const candidatureHasContratFunction = async () => {
        const response = await ContratService.candidatureHasContrat(params.id);
        setCandidatureHasContrat(response.data);
    }

    useEffect(() => {
        candidatureHasContratFunction();
        return () => {
            setFile([]);
            setIsSubmit(false);
            setDisplayInvalidFileMessage(false);
            setIsButtonDisable(false);
            setCandidatureHasContrat(false);
        }
    }, [])

    if (isLoading) {
        return <CircularProgress disableShrink />;
    }

    return (
        <div>





            <div className={classes.root}>
                <input
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={selectFile}
                    disabled={isButtonDisable}
                />

                <div className="row">
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={isButtonDisable}>
                            Sélectionner un fichier
                        </Button>
                    </label>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" disabled={isButtonDisable} />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" disabled={isButtonDisable}>
                            <PublishIcon />
                        </IconButton>
                    </label>
                </div>



                {file.name &&
                    <>
                        <div className="row">
                            <div className="col">
                                <Alert severity="success" > {file.name}</Alert>
                            </div>
                            <div className="col">
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={deleteFile}>
                                    <HighlightOffIcon style={{ color: "red" }} />
                                </IconButton>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col">
                                <Button variant="contained" color="primary" component="span" className="mt-2"
                                    onClick={saveContrat}
                                    disabled={isSubmit}
                                >
                                    Confirmer et envoyer à l'employeur
                            </Button>
                            </div>
                        </div>
                    </>
                }
            </div>

            {displayInvalidFileMessage &&
                AlertFormatInvalide("Seuls les fichiers en format pdf sont acceptés", "warning")
            }

            {messageResponse &&
                <ModalMessage
                    message={messageResponse + " Le contrat a été envoyé au employeur, vous pouvez passer au contrat suivant"}
                    redirect="/rapportContrat/0"
                    title="Le contrat existe déjà" />
                // AlertFormatInvalide(messageResponse, "info")
            }

            {candidatureHasContrat &&
                <ModalMessage
                    message={"un contrat a déjà été créé pour ce stage, si vous souhaitez le supprimer veuillez consulter la liste de tous les contrats"}
                    redirect="/"
                    title="Le contrat existe déjà" />
            }
        </div>
    )
}

export default Televerser;

function AlertFormatInvalide(message, type) {

    return (
        <div className="row justify-content-md-center">
            <Alert severity={type} variant="outlined" className="text-center">{message}</Alert>
        </div>
    );

}