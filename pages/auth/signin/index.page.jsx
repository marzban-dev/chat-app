import FormContainer from "pages/auth/components/form-container";
import FormInput from "pages/auth/components/form-input";
import * as Yup from "yup";
import {signin, fetchUser} from "api/auth.api";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "store/slices/auth.slice";
import {useRouter} from "next/router";

const Signin = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Username is too short')
            .max(20, 'Username must lower than 20 char')
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Password must bigger than 7 char')
            .required('Password is required'),
    });

    const onSubmit = async (values, {setSubmitting}) => {
        setError(null);
        setSubmitting(true);

        try {
            const res = await signin({
                username: values.username,
                password: values.password,
            });

            setSubmitting(false);

            const user = await fetchUser(res.access);
            dispatch(setUser(user));

            localStorage.setItem("USER_ACCESS_TOKEN", res.access);
            localStorage.setItem("USER_REFRESH_TOKEN", res.refresh);

            router.push("/");
        } catch (e) {
            const errs = e.response.data;
            setError(errs);
        }
    }

    const initialValue = {username: "", password: ""};

    return (
        <FormContainer schema={schema} onSubmit={onSubmit} initial={initialValue} title="Signin" serverErrors={error}>
            <FormInput id="username" name="username" placeholder="Name" autoComplete="false"/>
            <FormInput id="password" name="password" placeholder="Password" type="password" autoComplete="false"/>
        </FormContainer>
    )
}

export default Signin;