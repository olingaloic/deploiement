import { FormControl, Typography, Paper, FormHelperText, Select, NativeSelect, InputLabel } from '@material-ui/core';
import React, { useState } from "react";
import useSetQuestions from '../useSetQuestions';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));
export default function ObservationsMilieuStage() {
    const classes = useStyles();
    const { observationsGeneralesQuestions } = useSetQuestions();
    const [state, setState] =useState([]);
    const [evaluation, setevaluation] = useState([])

//posiblemente crear un stado paara cada variable
    const handleChange = (event) => {

        evaluation.push({
            section: "evaluation milieu stage",
            question: event.target.name,
            reponse: event.target.value,
        });


        // name = event.target.name;
        setState({
            ...state,
            name: event.target.value,
        });
    };

    return (
        <div>
            <h4 className={classes.heading} align='center'><strong>ÉVALUATION DU MILIEU DE STAGE</strong></h4>
            <Paper className='container mt-2'>
                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle1" className={classes.formControl}> {observationsGeneralesQuestions[0].question}</Typography>
                    </div>
                    <div className='col'>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.value}
                                name={observationsGeneralesQuestions[0].question}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'age' }}
                            >
                                <option value="" disabled>
                                    Selectionner
                             </option>
                                <option value={"Premier stage"}>Premier stage</option>
                                <option value={"deuxième stage"}>Deuxième stage</option>
                            </NativeSelect>
                        </FormControl>

                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle1" className={classes.formControl}> {observationsGeneralesQuestions[1].question}</Typography>
                    </div>
                    <div className='col'>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.value}
                                name={observationsGeneralesQuestions[1].question}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Selectionner
                             </option>
                                <option value={"1"}>Un stagiaire</option>
                                <option value={"2"}>Deux stagiaires</option>
                                <option value={"3"}>Trois stagiaires</option>
                            </NativeSelect>
                        </FormControl>

                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle1" className={classes.formControl}> {observationsGeneralesQuestions[2].question}</Typography>
                    </div>
                    <div className='col'>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.value}
                                name={observationsGeneralesQuestions[2].question}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'age' }}
                            >
                                <option value="" disabled>
                                    Selectionner
                             </option>
                                <option value={"oui"}>Oui</option>
                                <option value={"non"}>Non</option>
                            </NativeSelect>
                        </FormControl>

                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle1" className={classes.formControl}> {observationsGeneralesQuestions[3].question}</Typography>
                    </div>
                    <div className='col'>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={state.value}
                                name={observationsGeneralesQuestions[3].question}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'age' }}
                            >
                                <option value="" disabled>
                                    Selectionner
                             </option>
                                <option value={"oui"}>Oui</option>
                                <option value={"non"}>Non</option>
                            </NativeSelect>
                        </FormControl>

                    </div>
                </div>
            </Paper>
        </div>



    )
}
