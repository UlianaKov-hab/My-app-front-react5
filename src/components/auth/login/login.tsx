import * as React from 'react';
import { ILogin } from './types';
import { Formik, Form, useFormik, FormikProvider } from 'formik';
import { LoginSchema } from './validation';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import http from '../../../http_common'; 

export const LoginPage = () => {
    React.useEffect(() =>{
        // console.log(process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID)
        const start = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                scope: ''
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const responseGoogle=(response: GoogleLoginResponse | GoogleLoginResponseOffline)=> {        
        const model = {
            provider: "Google",
            token: (response as GoogleLoginResponse).tokenId
        };
        http.post("api/account/GoogleExternalLogin", model)
        .then(x=>{
            console.log("user iwt token", x)
        });
        // console.log("Google response", response);
    };
    
    return(
        <>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string}
          buttonText="Вхід через гугл"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // cookiePolicy={'http://localhost:3000'}
        />

        </>
    );
}
// export const LoginPage = () => {
   
//    const initialValues: ILogin = {       
//        email:"",       
//        password:""
//    }

//    const onHandleSubmit = async (values: ILogin) =>
//    {
//        console.log("Submit form", values);
       
//    }   

//    const formik = useFormik({
//        initialValues: initialValues,
//        validationSchema: LoginSchema,       
//        onSubmit: onHandleSubmit
//    })

//    const { errors, touched, handleSubmit, handleChange, isValid, dirty} = formik;

//    return (
//     <div className="row">
//       <div className="offset-md-3 col-md-6">
//         <h1 className="text-center">Вхід</h1>
//         <FormikProvider value={formik}>
//           <Form onSubmit={handleSubmit}>              
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Електронна адреса
//               </label>
//               <input type="email" 
//                   className= { classNames("form-control",
//                       {"is-invalid": touched.email && errors.email},
//                       {"is-valid": touched.email && !errors.email}
//                   )}
//                   id="email"
//                   name="email"
//                   onChange={handleChange}
//                   />
//                   {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
//             </div>
            
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Пароль
//               </label>
//               <input type="password" 
//                   className= { classNames("form-control",
//                       {"is-invalid": touched.password && errors.password},
//                       {"is-valid": touched.password && !errors.password}
//                   )}
//                   id="password"
//                   name="password"
//                   onChange={handleChange}
//                   />
//                   {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
//             </div>
            
//             <button type="submit" className="btn btn-primary" disabled={!(dirty && isValid)}>
//                 {/* <Link to="/">
//                 Увійти
//                 </Link> */}
//                 Увійти
//             </button>            
//           </Form>
//         </FormikProvider>
//       </div>
//     </div>
//   );
        
       
// }

// className="btn btn-primary"    className={ !isValid ? 'disabled_btn' : '' } className={dirty && isValid ? "" : "disabled-btn "}

//disabled={!(dirty && isValid)} aria-disabled="true"