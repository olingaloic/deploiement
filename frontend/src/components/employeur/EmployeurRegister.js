import React, {Component} from 'react';
import '../../App.css';
import '../../css/Register.css';
import EmployeurService from "../../service/EmployeurService";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import UserService from "../../service/UserService";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{2,4}?[ \\-]*[0-9]{2,4}?$/;

const formSchema = Yup.object().shape({
    nomEntreprise: Yup.string().required('Veuillez saisir un nom valide'),
    email: Yup.string()
        .required('Veuillez saisir un email valide')
        .email("Courriel inavalide"),
    password: Yup.string()
        .required("Veuillez saisir un password valide")
        .min(6, "doivent comprendre au moins 6 caractères."),
    telephone: Yup.string().required('Veuillez saisir un telephone valide')
        .min(8, "doivent comprendre au moins 8 caractères.")
        .max(14, 'Numéro de téléphone invalide')
        .matches(phoneRegExp, 'Numéro de téléphone invalide'),
    adresse: Yup.string().required('Veuillez saisir un adresse valide'),

});


export default class EmployeurRegister extends Component {

    render() {

        return (

            <div className="container ">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Nouvel
                            employeur</h5>
                        <Formik
                            initialValues={{
                                nomEntreprise: "",
                                email: "",
                                password: "",
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
                                                } else {
                                                    EmployeurService.post(values);
                                                    actions.resetForm();
                                                    actions.setStatus({message: "Utilisateur crée avec succès"});

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
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Nom de l'entreprise</label>
                                                    <Field type="text"
                                                           name="nomEntreprise"
                                                           className="form-control"
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="nomEntreprise">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Email </label>
                                                    <Field type="email"
                                                           name="email"
                                                           className="form-control"
                                                           placeholder="example@email.com"
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="email">{msg => <div
                                                        className="badge alert-danger"> {msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Password </label>
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
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Téléphone </label>
                                                    <Field type="text"
                                                           name="telephone"
                                                           className="form-control"
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="telephone">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> adresse </label>
                                                    <Field type="text"
                                                           name="adresse"
                                                           className="form-control"
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="adresse">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
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
                </div>
            </div>
        );
    }
}