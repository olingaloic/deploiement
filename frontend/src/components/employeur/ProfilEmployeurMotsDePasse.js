import React, { Component } from 'react';
import '../../App.css';
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import EmployeurService from "../../service/EmployeurService";
import { Button } from '@material-ui/core';

import AuthService from "../../service/security/auth.service";

const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

const formSchema = Yup.object().shape({
    password: Yup.string()
        .required("Veuillez saisir un mot de passe valide")
        .min(6, "doit comprendre au moins 6 caractères"),
    newPassword: Yup.string()
        .required("Veuillez saisir un mot de passe valide")
        .min(6, "Doit comprendre au moins 6 caractères")
        .matches(passwordRequirements, 'Doit comprendre 1 majuscule, 1 minuscule et 1 chiffre' ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Le mot de passe ne correspond pas")
        .required('Veuillez confirmer votre mot de passe'),    
});

export default class ProfileEmployeurMotsDePasse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="container ">
                <div className="col">
                    <div className="card p-3 m-3">

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
                                    resolve(AuthService.validate(AuthService.getTokenEmail(), values.password)
                                        .then(() => {
                                            values.password = values.newPassword;
                                            EmployeurService.updatePassword(values, AuthService.getTokenId());
                                            actions.resetForm();
                                            actions.setStatus({message: "Mot de passe mise à jour avec succès"});

                                            setTimeout(() => {
                                                actions.setStatus({message: ''});
                                            }, 3000);

                                            actions.setSubmitting(false);
                                        },
                                        error => {
                                            actions.setFieldError('password', "Mot de passe invalid")
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
                                                <label className="control-label"> Entrer le mot de passe actuel </label>
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
                                                <label className="control-label"> Entrer le nouveau mot de passe </label>
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
                                                <label className="control-label"> Confirmer le mot de passe </label>
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
                                                <Button type="submit"
                                                        className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
                                                        color="primary"
                                                        variant="contained"
                                                        style={{ textTransform: 'none' }}
                                                        disabled={isValidating || isSubmitting || !isValid}>Enregistrer
                                                </Button>

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