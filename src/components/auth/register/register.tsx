import * as React from 'react';
import { IRegister, IRegisterRequest } from './types';
import { Formik, Form, useFormik, FormikProvider } from 'formik';
import { RegisterSchema } from './validation';
import classNames from 'classnames';
import { TextField } from './textField';
import { Link, useNavigate } from 'react-router-dom';
import { CropperDialog } from '../../common/cropperDialog';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from './actions';
import { useActions } from '../../../hooks/useActions';
 
export const RegisterPage = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [bot, setBot] = useState<boolean>(false);
    const navigate = useNavigate();
    const {RegisterUser} = useActions();
   
   const initialValues: IRegister = {
       firstName:"",
       secondName:"",
       email:"",
       phone:"",
       photo:"",
       password:"",
       confirmPassword:""

   };
   const dispatch = useDispatch();

   const onHandleSubmit = async (values: IRegister) =>
   {
       try{
           console.log("submit form", values);           
           if(!executeRecaptcha)
           {
               setBot(true);
               return;
           }
           const recaptchaToken = await executeRecaptcha();
           const model : IRegisterRequest = {
               ...values,
               RecaptchaToken: recaptchaToken
            };            
            await RegisterUser(model);
            navigate('/');                
       }catch(error){
           console.error("problem submit", error)
          }
    }

   

   const formik = useFormik({
       initialValues: initialValues,
       validationSchema: RegisterSchema,       
       onSubmit: onHandleSubmit
   })

   const { errors, touched, handleSubmit, handleChange, isValid, dirty, setFieldValue} = formik;

   return (
    <div className="row">
      <div className="offset-md-3 col-md-6">
        <h1 className="text-center">Реєстрація</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
              {/* <div className="mb-3">
              <TextField name="firstName" type="text" placeholder="Jane" label="First Name" onChange={handleChange} />
              </div> */}
              <CropperDialog
              onChanged={setFieldValue}
              field="photo"
              error={errors.photo}
              touched={touched.photo}
              aspectRation={1/1}/>

          <div className="mb-3">              
              <label htmlFor="firstName" className="form-label">
                Ім'я
              </label>
              <input type="text" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.firstName && errors.firstName},
                      {"is-valid": touched.firstName && !errors.firstName}
                  )}
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  />
                  {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
          <div className="mb-3">
              <label htmlFor="secondName" className="form-label">
                Прізвище
              </label>
              <input type="text" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.secondName && errors.secondName},
                      {"is-valid": touched.secondName && !errors.secondName}
                  )}
                  id="secondName"
                  name="secondName"
                  onChange={handleChange}
                  />
                  {touched.secondName && errors.secondName && <div className="invalid-feedback">{errors.secondName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Електронна адреса
              </label>
              <input type="email" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.email && errors.email},
                      {"is-valid": touched.email && !errors.email}
                  )}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  />
                  {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Номер телефона
              </label>
              <input type="text" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.phone && errors.phone},
                      {"is-valid": touched.phone && !errors.phone}
                  )}
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  />
                  {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input type="password" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.password && errors.password},
                      {"is-valid": touched.password && !errors.password}
                  )}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  />
                  {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Підтвердження пароля
              </label>
              <input type="password" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.confirmPassword && errors.confirmPassword},
                      {"is-valid": touched.confirmPassword && !errors.confirmPassword}
                  )}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  />
                  {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
            <button type="submit" className="btn btn-primary" >
              Реєструватися
            </button>
            {/* <Link type="submit" className={dirty && isValid ? "" : "disabled-btn "} to="">
                <button className="btn btn-primary">
                    Реєструватися
                </button>
                </Link> */}
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
        
//   disabled={!(dirty && isValid)}
}

// className="btn btn-primary"    className={ !isValid ? 'disabled_btn' : '' } className={dirty && isValid ? "" : "disabled-btn "}

//disabled={!(dirty && isValid)}