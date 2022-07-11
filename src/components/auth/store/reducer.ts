import { AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
    isAuth: false,
    // user:{
    //     email: "ulana.kov@gmail.com",
    //     image: "https://i.pinimg.com/550x/31/23/2f/31232fe4b51b47763282524f008d9081.jpg",
    //     roles: "admin"
    // }
}

export const authReducer = (state=initialState, action: any) : AuthState => {
    switch(action.type)
    {
        case AuthActionTypes.LOGIN_AUTH:
            return{
                ...state,
                isAuth: true,
                user: {...action.payload}
            }
    }
    return state;
}