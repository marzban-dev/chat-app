import {Form, Formik} from "formik";
import FormButton from "pages/auth/components/form-button";

const FormContainer = ({initial, schema, onSubmit, title, children, serverErrors}) => {

    const renderErrors = () => {
        if (serverErrors) {
            return Object.values(serverErrors).map((errors, index) => {
                return (
                    <div className="text-[#F15B5B] text-[16px] font-medium flex justify-start items-center px-4" key={index}>
                        {errors[0]}
                    </div>
                )
            })
        }

        return null;
    }

    return (
        <div className="fixed top-0 left-0 z-[50] bg-secondary w-full h-screen flex justify-center items-center">
            <Formik
                initialValues={initial}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({errors, isSubmitting}) => (
                    <Form className="flex flex-col gap-[25px] w-[400px] bg-form-container-bg px-8 py-8 rounded-2xl" autoComplete="off">
                        <>
                            <div className="flex justify-center items-center gap-3 mb-4 sm:mb-10">
                                <h1 className="text-white text-[60px]">{title}</h1>
                            </div>
                            {children}
                            <div>
                                {renderErrors()}
                            </div>
                            <FormButton disabled={Object.keys(errors).length !== 0 || isSubmitting}>
                                {!isSubmitting ? "Submit" : "Loading"}
                            </FormButton>
                            {/*<Link href="/auth/signup.page">*/}
                            {/*    <a className="underline text-white w-full text-center">Forget password ?</a>*/}
                            {/*</Link>*/}
                        </>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormContainer;