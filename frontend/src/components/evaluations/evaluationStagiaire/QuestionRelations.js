import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import { useRouteMatch } from "react-router-dom";

export default function QuestionRelations() {
    const { relationsQuestions } = useSetQuestions();
    const [redirect, setRedirect] = useState(false)
    const { params } = useRouteMatch();
  

    const goToHabilites = () => {
      setRedirect(true);
    }
  
    if (redirect) {
      return <Redirect to={`/questionsHabilites/${params.id}`} />
    }
      return (
          <CreateQuestions questions= {relationsQuestions}  
          field={"Qualité des relations interpersonnelles"} 
          continuer={goToHabilites} 
          titre ={"3. QUALITÉS DES RELATIONS INTERPERSONNELLES"} 
          sousTitre={"Capacité à établir des relations interpersonnelles harmonieuses dans son milieu de travail"}/>
        )
}
