import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import CreateQuestions from '../createQuestions';
import useSetQuestions from '../useSetQuestions';
import ModalMessage from '../../utils/ModalMessage'
import { useRouteMatch } from "react-router-dom";

export default function QuestionsHabilites() {
    const { habilitesQuestions } = useSetQuestions();
    const [redirect, setRedirect] = useState(false)
    const { params } = useRouteMatch();

    const finish = () => {
      setRedirect(true);
    }

      return (
          <CreateQuestions questions= {habilitesQuestions}  
          field={"Habilités personnelles"} 
          isFinalStep={true}
          titre ={"4. HABILETÉS PERSONNELLES"} 
          sousTitre={"Capacité à faire preuve d’un comportement mature et responsable"}
          redirect ="/evaluationsEmployeur"
          />
        )
}
