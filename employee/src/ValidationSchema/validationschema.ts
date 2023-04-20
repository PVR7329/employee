import * as Yup from 'yup'
export const Validationscheme = Yup.object().shape({
    uname:Yup.string().min(2,"Please your name more 2 char").required("Please enter your name"),
})