import {
    Button,
    Checkbox, FormControl, FormControlLabel,
    Link, Paper, Radio, RadioGroup,
    Table, TableCell, TableRow, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import ModalMessage from '../../components/utils/ModalMessage';
import EvaluationService from '../../service/EvaluationService';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
    sticky: {
        position: 'sticky',
        left: 0,
        top: 0,
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },


}));

const ChoixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord', 'Non Applicable']

export default function CreateQuestions(props) {
    const [questions, setQuestions] = useState(props.questions)
    const [evaluation, setEvaluation] = useState([])
    const [isCopletedQuestions, setIsCopletedQuestions] = useState(true)
    const [questionLength, setQuestionLength] = useState(props.questions.length)
    const [commentValue, setCommentvalue] = useState('')
    const [isConditionsAccepted, setIsConditionsAccepted] = useState(true)
    const { params } = useRouteMatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [showConditions, setshowConditions] = useState(false)
    const [isEvaluationCompletee, setIsEvaluationCompletee] = useState(false)
    const classes = useStyles();



    useEffect(() => {

        return () => {
            setEvaluation([]);
            setQuestions([])
            setQuestionLength(0)
        }
    }, [])

    const continuer = (e) => {
        props.continuer();
    }

    const setCommentaire = (e) => {
        setCommentvalue(e.target.value)
    }


    const accepterConditions = () => {
        setIsConditionsAccepted(!isConditionsAccepted)
    }

    const handleChange = (e) => {

        //update response pour question
        for (var i = 0; i < evaluation.length; i++) {
            if (evaluation[i].question === e.target.name) {
                evaluation.splice(evaluation.id, 1)
            }
        }
        evaluation.push({
            section: props.field,
            question: e.target.name,
            reponse: e.target.value,
        });

        if (evaluation.length === questionLength) {
            setIsCopletedQuestions(false)
        }
    }

    const sendQuestionaire = async () => {
        var result = ({
            questions: evaluation,
            commentaires: {
                ennonce: commentValue,
                section: props.field
            },
            isEvaluee : isEvaluationCompletee
        })

        if (!props.isMilieuStage) {
            await EvaluationService.putEvaluationStagiaire(result, params.id)
            setEvaluation([])
            setIsCopletedQuestions(true)
            if(!props.isFinalStep){
                continuer();
            }else (
                setIsSubmit(true)
            )
            
        } else {
            await EvaluationService.putEvaluationMilieuStage(result, props.idCandidature, props.idEnseignant)
            setEvaluation([])
            setIsCopletedQuestions(true)
            setIsSubmit(true)
        }

    }

    const showPolitiquesEtConditions = () => {
        setshowConditions(!showConditions)
    }
    return (

        <div>
             <h5 align='center' className='m-2 sticky-top' ><strong>{props.titre} </strong></h5>
            <h6 align='center'>{props.sousTitre}</h6>
            <Paper className='container mt-2'>
             {questions &&
                <div >
                    <Table  >
                        <thead className="table table-striped " >
                            <tr className='row border-bottom mt-2  font-weight-bold sticky-top bg-light' >
                                <th className='col' align="left">Quéstion</th>
                                {ChoixResponses.map((choix, i) =>
                                    <th key={i} align="center" className='col'>{choix}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(data =>
                                <TableRow key={data.id}>
                                    <TableCell>
                                        <RadioGroup
                                            onChange={handleChange}
                                            row={true}
                                            component='td'
                                            name={data.question}
                                        >
                                            <div className='col' >
                                                {data.question}
                                            </div>

                                            <div className='col' align="center" >
                                                <FormControlLabel
                                                    value={ChoixResponses[0]}
                                                    control={<Radio id={data.id} />}
                                                />
                                            </div>

                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[1]}
                                                    control={<Radio id={data.id} />}
                                                />
                                            </div>

                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[2]}
                                                    control={<Radio id={data.id} />}
                                                />
                                            </div>
                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[3]}
                                                    control={<Radio id={data.id} />}
                                                />
                                            </div>
                                            <div className='col' align="center">
                                                <FormControlLabel
                                                    value={ChoixResponses[4]}
                                                    control={<Radio id={data.id} />}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            )}
                        </tbody>
                    </Table>

                    <FormControl fullWidth variant="outlined" color='primary' className="mt-4 mb-4">
                        <TextField
                            label="Souhaitez-vous nous expliquer un peu plus"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Commentaires"
                            onChange={setCommentaire}
                        />
                    </FormControl>
                    <p className="card-text "><small className="text-danger">* Veuillez répondre à toutes les questions</small></p>

                    {props.isFinalStep ?
                        <div>
                            <div >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={accepterConditions}
                                            name="checkedB"
                                            color="primary"
                                            disabled={isCopletedQuestions}
                                            className='pr-0'
                                        />
                                    }
                                />
                                <span>Accepter </span>
                                <Link onClick={showPolitiquesEtConditions}  >
                                    les Politiques et conditions
                                   {showConditions &&
                                        <ModalMessage
                                            message={conditions}
                                        />
                                    }
                                </Link>
                            </div>

                            <div >
                                <Button variant="contained" className=' m-2' color="primary" disabled={isConditionsAccepted}
                                    onClick={sendQuestionaire}>
                                    Terminer et envoyer
                                </Button>

                            </div>
                        </div>
                        :
                        <Button variant="contained" className=' m-2' color="primary" disabled={isCopletedQuestions}
                            onClick={sendQuestionaire}>
                            Continuer
                        </Button>
                    }
                </div >
            }
            { isSubmit &&
                <ModalMessage
                    message={"Votre évaluation a été soumise avec succès. Merci pour votre contribution."}
                    redirect={props.redirect}
                    title="nouvelle évaluation" />
            }

        </Paper >

        </div>
        
    )

}

const conditions = "En acceptant les conditions générales, vous acceptez la divulgation publique de cette évaluation."
