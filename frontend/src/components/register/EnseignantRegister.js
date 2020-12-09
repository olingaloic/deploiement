import Button from '@material-ui/core/Button';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from 'yup';
import EnseignantService from "../../service/EnseignantService";
import UserService from "../../service/UserService";
import AlertDialog from '../utils/ModalMessage'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{2,4}?[ \\-]*[0-9]{2,4}?$/;
const formSchema = Yup.object().shape({

    email: Yup.string()
        .required('Veuillez saisir un email valide')
        .email("Courriel invalide"),
    password: Yup.string()
        .required("Veuillez saisir un password valide")
        .min(6, "Doit comprendre au moins 6 caractères."),
    confimerPassword: Yup.string()
        .required("Veuillez confirmer votre mot de passe ")
        .min(6, "Doit comprendre au moins 6 caractères."),
    nom: Yup.string().required('Veuillez saisir un nom valide'),
    prenom: Yup.string().required('Veuillez saisir un prenom valide'),
    telephone: Yup.string().required('Veuillez saisir un telephone valide').min(10, "doit comprendre au moins 10 caractères.")
    .matches(phoneRegExp, 'Numéro de téléphone invalide'),

    //numeroEmploye: Yup.string().required('Veuillez saisir votre numero d\'employe'),
    programme: Yup.string().required('Veuillez saisir un programme valide'),

})

const initialValues = {
    email: "",
    password: "",
    nom: "",
    prenom: "",
    programme: "",
}
export default class EnseignantRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enseignant: [],
        };

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="container">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        confimerPassword: "",
                        nom: "",
                        telephone:"",
                        prenom: "",
                        programme: "",
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values, actions) => {
                        var response = UserService.getByEmail(values.email);
                        return new Promise(function (resolve) {
                            setTimeout(() => {
                                resolve(UserService.getByEmail(values.email)
                                    .then((val) => {
                                        if (val.email === values.email) {
                                            actions.setFieldError('email', "Adresse électronique déjà utilisée")
                                        } else if (values.password !== values.confimerPassword) {
                                            actions.setFieldError('confimerPassword', "Les mots de passe ne sont pas les mêmes")
                                        } else {
                                            EnseignantService.post(values);
                                            actions.resetForm();
                                            actions.setStatus({ message: "Votre compte a été créé avec succès" });
                                            actions.setSubmitting(false);
                                        }
                                    }));

                                actions.setSubmitting(false);
                            }, 1000);

                        })
                    }}>
                    {({ status, isSubmitting, isValid, isValidating }) => (
                        <Form>
                            <div className="container text-left justify-content-center ">
                                <h5 className="card-title text-center " /*style={{ background: '#E3F9F0 ' }}*/><strong>Inscription enseignant</strong></h5>

                                <div className="row justify-content-center">
                                    <div className="col-sm-5  ">
                                        <div className="form-group">
                                            <label className="control-label">Nom</label>
                                            <Field type="text"
                                                name="nom"
                                                className="form-control"
                                                placeholder=""
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="nom">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>

                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label">Prenom</label>
                                            <Field type="text"
                                                name="prenom"
                                                className="form-control"
                                                placeholder=""
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="prenom">{msg => <div
                                                className="text-danger">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-sm-5 ">
                                        <div className="form-group">
                                            <label className="control-label">Email</label>
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

                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label className="control-label"> Téléphone </label>
                                            <Field type="text"
                                                name="telephone"
                                                className="form-control"
                                                placeholder=""
                                                maxLength="255"
                                            />
                                            <ErrorMessage name="telephone">{msg => <div
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
                                                placeholder=""
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
                                    <div className="col-sm-10 ">
                                        <div className="form-group">
                                            <label className="control-label">Programme</label>
                                            <Field as="select"
                                                name="programme"
                                                className="form-control"
                                            >
                                                <option value="" disabled>Choisir un programme</option>
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
                                            </Field >


                                            <ErrorMessage name="programme">{msg => <div
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
