import React, { Component } from 'react';
import '../../App.css';
import Gestionnaire from "../../model/Gestionnaire";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import GestionnaireService from "../../service/GestionnaireService";

const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

const regexMaj = /^(?=.*[A-Z]).*$/;
const regexMin = /^(?=.*[a-z]).*$/;
const regexDigit = /^(?=.*[0-9]).*$/;

const formSchema = Yup.object().shape({
    password: Yup.string()
        .required("Veuillez saisir un mot de passe valide")
        .min(6, "doivent comprendre au moins 6 caractères."),
    newPassword: Yup.string()
        .required("Veuillez saisir un mot de passe valide")
        .min(6, "doivent comprendre au moins 6 caractères.")
        .matches(regexMaj, 'Veuillez saisir au moins 1 majuscule' )
        .matches(regexMin, 'Veuillez saisir au moins 1 minuscule' )
        .matches(regexDigit, 'Veuillez saisir au moins 1 chiffre' ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Le mot de passe ne correspond pas")
        .required('Veuillez confirmer votre mot de passe'),    
});

export default class GestionnaireUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = new Gestionnaire();
    }

    render() {
        return (
            
            <div className="container ">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Changer votre mot de passe</h5>
                        
                        <Formik
                            initialValues={{
                                password: "",
                                newPassword: "",
                                confirmPassword: "",
                            }}
                            validationSchema={formSchema}

                            onSubmit={(values, actions) => {

                                return new Promise(function (resolve) {
                                    setTimeout(() => {
                                        resolve(GestionnaireService.getByPassword(values.password)
                                            .then((val) => {

                                                if (val.password !== values.password) {
                                                    actions.setFieldError('password', "Mot de passe invalid")
                                                } else {
                                                    values.password = values.newPassword;
                                                    GestionnaireService.put(values, localStorage.getItem("id"));
                                                    actions.resetForm();
                                                    actions.setStatus({message: "Mot de passe mise à jour avec succès"});

                                                    setTimeout(() => {
                                                        actions.setStatus({message: ''});
                                                    }, 3000);

                                                    actions.setSubmitting(false);

                                                }

                                            })
                                            .then((val) => console.log(val))
                                            .catch(function (reason) {
                                                console.log(reason + " reason")
                                            }));

                                        actions.setSubmitting(false);
                                    }, 1000);

                                })
                            }}
                        >

                            {({status, isSubmitting, isValid, isValidating}) => (
                                <Form>
                                    <div className="container text-left justify-content-center">

                                        <div className="row">
                                            <div className="col-sm-6 offset-sm-3 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Old Password </label>
                                                    <Field type="password"
                                                           name="password"
                                                           className="form-control"
                                                           maxLength="255"
                                                          />
                                                    <ErrorMessage name="password">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 offset-sm-3 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> New Password </label>
                                                    <Field type="password"
                                                           name="newPassword"
                                                           className="form-control"
                                                           maxLength="255"
                                                          />
                                                    <ErrorMessage name="newPassword">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 offset-sm-3 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Confirm Password </label>
                                                    <Field type="password"
                                                           name="confirmPassword"
                                                           className="form-control"
                                                           maxLength="255"
                                                          />
                                                    <ErrorMessage name="confirmPassword">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 offset-sm-3 text-center">
                                                <div className="form-group">
                                                    <button type="submit"
                                                            className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
                                                            className="btn btn-primary"
                                                            disabled={isValidating || isSubmitting || !isValid}>Enregistrer
                                                    </button>

                                                    {status && status.message &&
                                                    <div className="alert alert-success mt-3" role="alert">
                                                        {status.message}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        );
    }
}