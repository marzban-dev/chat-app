import classNames from "classnames";

const FormButton = ({disabled, children}) => {

    const classes = classNames({
        "w-full text-center transition-colors duration-300 rounded-full py-3 mt-4 shadow-md": 1,
        "bg-primary hover:bg-form-button-hover": !disabled,
        "bg-form-button-disabled": disabled
    });

    return (
        <button type="submit" className={classes} disabled={disabled}>
            {children}
        </button>
    )
}

export default FormButton;