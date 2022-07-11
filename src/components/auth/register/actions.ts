import axios from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { AuthActionTypes } from '../store/types';
import { IRegister, IRegisterRequest, RegisterSuccessAction } from './types';

export const RegisterUser = (data: IRegisterRequest) => {
    return async (dispatch: Dispatch<RegisterSuccessAction>) =>{
        try{
            console.log("Server request")
            const response = await http.post("api/account/register", data);
            const token = await response.data.token;
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
                payload: token,
            });
            return Promise.resolve(token);
        }catch(err: any){
            if(axios.isAxiosError(err))
            {
                
            }
            return Promise.reject();
        }
    }
}