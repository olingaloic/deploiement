import Button from '@material-ui/core/Button';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from 'react';
import * as Yup from 'yup';
import EmployeurService from "../../service/EmployeurService";
import UserService from "../../service/UserService";
import AlertDialog from '../utils/ModalMessage'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{2,4}?[ \\-]*[0-9]{2,4}?$/;

const formSchema = Yup.object().shape({
    nom: Yup.string().required('Veuillez saisir un nom valide'),
    email: Yup.string()
        .required('Veuillez saisir un email valide')
        .email("Courriel invalide"),
    password: Yup.string()
        .required("Veuillez saisir un password valide")
        .min(6, "doivent comprendre au moins 6 caractères."),
    confimerPassword: Yup.string()
        .required("Veuillez confirmer votre mot de passe ")
        .min(6, "Doit comprendre au moins 6 caractères."),
    telephone: Yup.string().required('Veuillez saisir un telephone valide')
        .min(8, "doivent comprendre au moins 8 caractères.")
        .max(14, 'Numéro de téléphone invalide')
        .matches(phoneRegExp, 'Numéro de téléphone invalide'),
    adresse: Yup.string().required('Veuillez saisir un adresse valide'),

});


export default class EmployeurRegister extends Component {

    render() {
        return (
            <div className="container">
                <h5 className="card-title text-center " /*style={{background: '#E3F9F0 '}}*/><strong>Inscription employeur</strong></h5>
                <Formik
                    initialValues={{
                        nomEntreprise: "",
                        email: "",
                        password: "",
                        confimerPassword: "",
                        telephone: "",
                        adresse: "",
                        rol: "Employeur"
                    }}
                    validationSchema={formSchema}

                    onSubmit={(values, actions) => {

                        return new Promise(function (resolve) {
                            setTimeout(() => {
                                resolve(UserService.getByEmail(values.email)
                                    .then((val) => {
                                        if (val.email === values.email) {
                                            actions.setFieldError('email', "Adresse électronique déjà utilisée")
                                        } else if (values.password !== values.confimerPassword) {
                                            actions.setFieldError('confimerPassword', "Les mots de passe ne sont pas les mêmes")
                                        } else {
                                            EmployeurService.post(values);
                                            actions.resetForm();
                                            actions.setStatus({ message: "Votre compte a été créé avec succès" });
                                            actions.setSubmitting(false);
                                        }

                                    }));

                                actions.setSubmitting(false);
                            }, 1000);

                        })
                    }}
                >

                    {({ status, isSubmitting, isValid, isValidating }) => (
                        <Form>
                            <div className="container text-left justify-content-center">

                                <div className="row justify-content-center ">
                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label">Nom de l'entreprise</label>
                                            <Field type="text"
                                                name="nom"
                                                className="form-control"
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="nom">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>

                                    <div className="col-sm-5  ">
                                        <div className="form-group">
                                            <label className="control-label"> Email </label>
                                            <Field type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="example@email.com"
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="email">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label">Mot de passe</label>
                                            <Field type="password"
                                                name="password"
                                                className="form-control"
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="password">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>

                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label">Confirmer votre mot de passe </label>
                                            <Field type="password"
                                                name="confimerPassword"
                                                className="form-control"
                                                placeholder=""
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="confimerPassword">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>

                                        </div>
                                    </div>
                                </div>



                                <div className="row justify-content-center">
                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label"> Téléphone </label>
                                            <Field type="text"
                                                name="telephone"
                                                className="form-control"
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="telephone">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>


                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label className="control-label"> Adresse </label>
                                            <Field type="text"
                                                name="adresse"
                                                className="form-control"
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="adresse">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4 offset-sm-4 text-center">
                                        <div className="form-group">
                                            <Button variant="contained" color="primary" className='m-3' type="submit"
                                                className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
                                                disabled={isValidating || isSubmitting || !isValid}>S'enregistrer
                                                    </Button>

                                            {status && status.message &&
                                                // <div className="alert alert-success mt-3" role="alert">
                                                //     {status.message}
                                                // </div>
                                                <AlertDialog message={status.message} redirect="/login"/>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-sm-4 offset-sm-4 text-center">
                                        <span className="font-weight-light">Vous avez déjà un compte? </span>
                                        <a href="/login" className="stretched-link"
                                        >Se connecter </a>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>
        );
    }
}