import React, { Component } from "react";
import Etudiant from "../model/Etudiant";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import UserService from "../service/UserService";
import EtudiantService from "../service/EtudiantService";


const formSchema = Yup.object().shape({

    email: Yup.string()
        .required('Veuillez saisir un email valide')
        .email("Courriel inavalide"),

    password: Yup.string()
        .required("Veuillez saisir un password valide")
        .min(6, "doivent comprendre au moins 6 caractères."),

    nom: Yup.string().required('Veuillez saisir un nom valide'),

    prenom: Yup.string().required('Veuillez saisir un prenom valide'),

    matricule: Yup.string().required('Veuillez saisir votre matricule'),

    programme: Yup.string().required('Veuillez saisir un programme valide'),

    telephone: Yup.string().required('Veuillez saisir un telephone valide').min(10, "doit comprendre au moins 10 caractères."),

    adresse: Yup.string().required('Veuillez saisir un adresse valide')
})


export default class EtudiantRegister extends Component {

    constructor(props) {
        super(props);
        this.state = new Etudiant()
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (

            <div className="container">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Nouvel Étudiant</h5>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                nom: "",
                                prenom: "",
                                matricule: "",
                                programme: "",
                                telephone: "",
                                adresse: ""
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
                                                    EtudiantService.post(values);
                                                    actions.resetForm();
                                                    actions.setStatus({ message: "Utilisateur crée avec succès" });
                                                    setTimeout(() => {
                                                        actions.setStatus({ message: '' });
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
                            }}>
                            {({ status, isSubmitting, isValid, isValidating }) => (
                                <Form>
                                    <div className="container text-left justify-content-center">

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Nom</label>
                                                    <Field type="text"
                                                        name="nom"
                                                        className="form-control"
                                                        placeholder=""
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="nom">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Prenom</label>
                                                    <Field type="text"
                                                        name="prenom"
                                                        className="form-control"
                                                        placeholder=""
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="prenom">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Email</label>
                                                    <Field type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="example@email.com"
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="email">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Password</label>
                                                    <Field type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder=""
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
                                                    <label className="control-label">Matricule</label>
                                                    <Field type="text"
                                                        name="matricule"
                                                        className="form-control"
                                                        placeholder=""
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="matricule">{msg => <div
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
                                                        placeholder=""
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
                                                        placeholder=""
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
                                                    <label className="control-label">Programme</label>
                                                    <Field as="select"
                                                        name="programme"
                                                        className="form-control"
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
                                                        placeholder=""
                                                           maxLength="255"
                                                    />
                                                    <ErrorMessage name="programme">{msg => <div
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