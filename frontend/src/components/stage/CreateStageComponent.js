import { Button, Paper } from "@material-ui/core";
import { ErrorMessage, Field, Form, withFormik } from "formik";
import React, { Component } from 'react';
import '../../App.css';
import Stage from '../../model/Stage';
import EmployeurService from "../../service/EmployeurService";
import SessionService from "../../service/SessionService";
import StageService from '../../service/StageService';
import AlertDialog from '../utils/ModalMessage';
import ValidationChamp from '../validation/ValidationChampVide';
import ValidationDate from '../validation/ValidationDate';

import AuthService from "../../service/security/auth.service";

const isRequired = (message) => (value) => (!!value ? undefined : message);

class CreateStageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sended: true, 
      currentSession: "",  
    }
  }

  componentDidMount() {
    let idSession = localStorage.getItem("session");
    if (idSession !== null || idSession !== undefined) {
    SessionService.getSessionById(idSession).then((res)=>{
      this.setState({currentSession: res.data })
    })
  }}

  feedBack() {
    this.setState({ sended: false });
  }

  render() {
    const { handleSubmit, isSubmitting, isValid, isValidating, status, sended } = this.props;
    const session = this.state.currentSession;

    return (
      <Paper className="container p-4 mt-3"  >
        <h5 className="card-title text-center mb-3" /*style={{background: '#E3F9F0 '}}*/><strong>Nouveau stage</strong></h5>

        <Form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">

              <div className="form-group col">
                <label className="control-label">Titre</label>
                <Field name="titre" className="form-control" validate={isRequired(<ValidationChamp field={"un titre "} />)} />
                <ErrorMessage className="text-danger" name="titre">{msg => <div>{msg}</div>}</ErrorMessage >
              </div>

              <div className=" form-group col" >
                <label className="control-label">Programme</label>
                <Field as="select"
                  name="programme"
                  className="form-control"
                  validate={isRequired(<ValidationChamp field={" un programme "} />)}
                >
                  <option value="">Choisir un programme</option>
                  <option value="Gestion de commerces">Gestion de commerces</option>
                  <option value="Soins infirmiers">Soins infirmiers</option>
                  <option value="Soins infirmiers pour auxiliaires">Soins infirmiers pour auxiliaires</option>
                  <option value="Techniques d’éducation à l’enfance">Techniques d’éducation à l’enfance</option>
                  <option value="Techniques de bureautique">Techniques de bureautique</option>
                  <option value="Techniques de comptabilité et de gestion">Techniques de comptabilité et de gestion</option>
                  <option value="Techniques de l’informatique">Techniques de l’informatique</option>
                  <option value="Techniques de la logistique du transport">Techniques de la logistique du transport</option>
                  <option value="Technologie de l’architecture">Technologie de l’architecture</option>
                  <option value="Technologie de l’électronique industrielle">Technologie de l’électronique industrielle</option>
                  <option value="Technologie de l’estimation et de l’évaluation en bâtiment">Technologie de l’estimation et de l’évaluation en bâtiment</option>
                  <option value="Technologie du génie civil">Technologie du génie civil</option>
                  <option value="Techniques de la logistique du transport">Techniques de la logistique du transport</option>
                  <option value="Technologie du génie physique">Technologie du génie physique</option>
                </Field>
                <ErrorMessage className="text-danger" name="programme">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>

              <div className=" form-group col" >
                <label className="control-label">Ville</label>
                <Field name="ville" className="form-control" validate={isRequired(<ValidationChamp field={" une ville "} />)} />
                <ErrorMessage className="text-danger" name="ville">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            {/* Dates */}
            <div className="row">
              <div className="form-group col">
                <label className="control-label">Date limite de postulation</label>
                <Field type="date" name="dateLimiteCandidature" className="form-control" validate={isRequired(<ValidationChamp field={"une date "} />)} />
                <ErrorMessage name="dateLimiteCandidature">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Date de début du stage</label>
                <Field type="date" name="dateDebut" className="form-control" validate={isRequired(<ValidationChamp field={"une date "} />)} />
                <ErrorMessage className="text-danger" name="dateDebut">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Date de fin du stage</label>
                <Field type="date" name="dateFin" className="form-control" validate={isRequired(<ValidationChamp field={"une date "} />)} />
                <ErrorMessage className="text-danger" name="dateFin">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label className="control-label">Nombre de places</label>
                <Field type="number" name="nbAdmis" className="form-control" validate={isRequired(<ValidationChamp field={"un nombre de places "} />)} min="0" />
                <ErrorMessage name="nbAdmis">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Nombre d'heures par semaine</label>
                <Field type="number" name="nbHeuresParSemaine" className="form-control" validate={isRequired(<ValidationChamp field={" un nombre d'heures par semaine"} min="0" step=".01" />)} />
                <ErrorMessage name="nbHeuresParSemaine">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label>Salaire</label>
                <Field type="number" name="salaire" className="form-control" min="0" step=".01" />
              </div>

            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Description</label>
                <Field component="textarea" name="description" className="form-control" validate={isRequired(<ValidationChamp field={" une description"} />)} />
                <ErrorMessage name="description">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Exigences</label>
                <Field component="textarea" name="exigences" className="form-control" validate={isRequired(<ValidationChamp field={"une exigence"} />)} />
                <ErrorMessage name="exigences">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>
            <div className="form-group">
              <Button type="submit" variant="contained" color="primary" style={{ textTransform: 'none' }} 
                className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
                disabled={isValidating || isSubmitting || !isValid} onClick={this.feedBack.bind(this)}>Créer le stage</Button>

              {status && status.message &&
                <AlertDialog titre={status.message} 
                  redirect = "/rapportStageEmployeur"
                  message="Votre offre de stage est maintenant en attente d'approbation par le gestionnaire."/>
              }
            </div>
          </div>
        </Form>
      </Paper>
    );
  }
}

export default withFormik({

  mapPropsToValues(props) {
    return new Stage();
  },
  
  validate(values) {
    const today = new Date();
    let startDate = new Date(values.dateDebut);
    let finalDate = new Date(values.dateFin);
    let limitApplicationDate = new Date(values.dateLimiteCandidature);
    const errors = {}

    if (startDate < today) {
      errors.dateDebut = 'La date de début ne doit être inférieure ou égale à la date d\'aujourd\'hui'
    }

    if (finalDate <= startDate) {
      errors.dateFin = 'La date finale ne doit pas être inférieure à la date initiale. '
    }

    if (limitApplicationDate >= startDate) {
      errors.dateLimiteCandidature = 'La date doit être inférieure à la date de début'
    }

    if (limitApplicationDate < today) {
      errors.dateLimiteCandidature = 'La date limite ne doit être inférieure ou égale à la date d\'aujourd\'hui'
    }

    return errors;
  },


  handleSubmit(values, formikBag) {
    
    let id =  AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR" ? AuthService.getTokenId() : ''
    let stage = new Stage();

    EmployeurService.getById(id).then((res) => {
      stage = values;
      stage.employeur = res.data;

      StageService.createStage(stage).then(() => {

        formikBag.setStatus({ message: "Stage crée avec succès. " });
      });

    })
    formikBag.resetForm()
    formikBag.setSubmitting(false);
  }

})(CreateStageComponent);