import React, { useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';

export default function EvaluationMilieuStage() {
  const { evaluationMilieuStageQuestions } = useSetQuestions();
  const [redirect, setRedirect] = useState(false)
  const params = useParams();

  if (redirect) {
    return <Redirect to={`/observationsMilieuStage/${params.id}`} />
  }
  return (

    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2 border-right '>
          <div className="card mt-5 sticky-top">
            <div className="card-body">
              <h5 className="card-title">Employeur</h5>
              <p className="card-text">{params.employeur}</p>
              <h5 className="card-title">Étudiant</h5>
              <p className="card-text">{params.nomEtudiant} {params.prenomEtudiant}</p>
            </div>
          </div>
        </div>
        <div className='col-sm-8'>
          <CreateQuestions questions={evaluationMilieuStageQuestions}
            field={"Evaluation milieu stage"}
            isFinalStep={true}
            isMilieuStage={true}
            titre="ÉVALUATION DU MILIEU DE STAGE"
            redirect ="/evaluationMilieuStageHome"
            idEnseignant = {params.idEnseignant}
            idCandidature = {params.idCandidature}
          />
        </div>
      </div>
    </div>
  )
}
