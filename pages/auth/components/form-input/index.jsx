import {ErrorMessage, useField} from "formik";
import classNames from "classnames";

const FormInput = ({...props}) => {
    const [field, meta] = useField(props);

    const inputContainerClasses = classNames({
        "w-full group px-4 py-2 flex justify-between items-center border-[2px] transition-colors duration-300 bg-secondary-10 hover:bg-secondary-20 focus-within:bg-secondary-20 rounded-full border-transparent shadow-md": 1,
        "border-[#ef3434]": !!meta.error && meta.touched,
    });

    const inputClasses = classNames({
        "bg-transparent outline-none w-full text-[18px] placeholder:text-[#7a7a7a] text-[#ffffff]": 1
    });

    return (
        <div className="flex flex-col justify-start items-start">
            <div className={inputContainerClasses}>
                <input className={inputClasses} {...field} {...props} autoComplete="off"/>
            </div>
            <ErrorMessage component="div" name={props.name}>
                {errMsg => (
                    <div className="text-[#F15B5B] text-[16px] font-medium flex justify-start items-center gap-2 px-3 sm:px-4 mt-2">
                        <span>{errMsg}</span>
                    </div>
                )}
            </ErrorMessage>
        </div>
    )
}

export default FormInput;