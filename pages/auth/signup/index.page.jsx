import FormContainer from "pages/auth/components/form-container";
import FormInput from "pages/auth/components/form-input";
import * as Yup from "yup";
import {signup} from "api/auth.api";
import {useState} from "react";

const Signup = () => {
    const [error, setError] = useState(null);

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Username is too short')
            .max(20, 'Username must lower than 20 char')
            .required('Username is required'),
        email: Yup.string()
            .email("Email is not valid")
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must bigger than 7 char')
            .required('Password is required'),
    });

    const onSubmit = async (values, {setSubmitting}) => {
        setError(null);
        setSubmitting(true);

        try {
            const res = await signup({
                username: values.username,
                email: values.email,
                password: values.password,
            });

            console.log(res);

            // if (res.url) router.push(res.url); *

            setSubmitting(false);

            // setTimeout(() => { *
            //
            // }, 500);
        } catch (e) {
            const errs = e.response.data;
            setError(errs);
        }
    }

    const initialValue = {username: "", password: "", email: ""};

    return (
        <FormContainer schema={schema} onSubmit={onSubmit} initial={initialValue} title="Signup" serverErrors={error}>
            <FormInput id="username" name="username" placeholder="Name" autoComplete="false"/>
            <FormInput id="email" name="email" placeholder="Email" autoComplete="false"/>
            <FormInput id="password" type="password" name="password" placeholder="Password" autoComplete="false"/>
        </FormContainer>
    )
}

export default Signup;