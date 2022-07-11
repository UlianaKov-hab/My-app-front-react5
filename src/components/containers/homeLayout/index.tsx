import * as React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Outlet } from "react-router-dom";
import Navbar from './NavBar';

export const HomeLayout = () => {
    return(
        <>
        <GoogleReCaptchaProvider reCaptchaKey="6LcaWLcgAAAAABNsoonBzumwkSTI_1t1RPRs2BNR">
        <Navbar/>
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
        </GoogleReCaptchaProvider>
        
        </>
    )
        
       
}