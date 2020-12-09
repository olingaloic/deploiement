import {
    FormControl, Typography, Paper,
    Table, TableCell, TableContainer, TableHead, TableRow, FormHelperText, Select, NativeSelect, InputLabel, TextField, MenuItem
} from '@material-ui/core';
import React, { useState } from "react";
import useSetQuestions from '../useSetQuestions';
import { makeStyles } from '@material-ui/core/styles';

const optionReponse = [
    { value: "" },
    { value: "oui" },
    { value: "non" }
]

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

export default function ApreciationGlobaleStagiaire() {
    const classes = useStyles();
    const { apretiationGlobaleStagiaireQuestions } = useSetQuestions();
    const [state, setState] = React.useState({
        value: '',
        name: ' ',
    });
    const [options, setOptions] = useState(optionReponse)
    const [evaluation, setevaluation] = useState([])

    //posiblemente crear un stado paara cada variable
    const handleChange = (event) => {

        evaluation.push({
            section: "evaluation milieu stage",
            question: event.target.name,
            reponse: event.target.value,
        });

        
       // setOptions({...options,value :event.target.value});


        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + state.value);
        event.preventDefault();
      }

    return (
        <div>
            <h4 className={classes.heading} align='center'><strong>ÉVALUATION DU MILIEU DE STAGE</strong></h4>
            <Paper className='container mt-2'>
                <Table className='"table table-striped sticky-header"'  >
                    <thead >
                        <tr>
                        <TableCell></TableCell>
                        </tr>
                    </thead>
                    <tbody>

                        {apretiationGlobaleStagiaireQuestions.map(data =>
                            <TableRow key={data.id}>
                                <TableCell>
                                <Typography variant="subtitle1" > {data.question}</Typography>
                                </TableCell>
                                <TableCell>
                                <FormControl className={classes.formControl} onSubmit={handleSubmit}>
                                            <TextField
                                                select
                                                label="Sélectionner"
                                                name={data.question}
                                                value={options.value }
                                                onChange={handleChange}
                                            >
                                                {optionReponse.map((option) => (
                                                    <MenuItem key={option.value} value={ options.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                </TableCell>
                            </TableRow>
                         )}
                         
                    </tbody>
                </Table>
            </Paper>
        </div>
    )
}
