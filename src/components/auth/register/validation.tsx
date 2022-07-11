import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const RegisterSchema = yup.object({
    firstName: yup
        .string() 
        .min(3)
        .max(255)       
        .required("Ім'я є обов'язкови полeм"),
    secondName: yup
        .string() 
        .min(3)
        .max(255)       
        .required("Прізвище є обов'язкови полeм"),    
    email: yup
        .string()
        .email("Вкажіть праивльно пошту")
        .required("Пошта є обов'язкови полeм"),
    phone: yup
        .string() 
        .min(10, "to short")
        .max(10, "to long")      
        .matches(phoneRegExp, 'Номер телефона не вірний'),
    password: yup.string()
        .required()
        .min(7)
        .max(255)
        .required("Пароль є обов'язкови полeм"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password does not match')
        .required("Підтвердження обов'язкове"),
    photo: yup.string().required("Оберіть фото"),
});


// firstName: string,
//     secondName: string,
//     email: string,
//     photo: string,
//     phone: string,
//     password: string,
//     confirmPassword: string