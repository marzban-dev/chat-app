import {useEffect} from "react";
import {setTheme} from "store/slices/app.slice";
import {useDispatch} from "react-redux";

const useSetupTheme = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const currentTheme = localStorage.getItem("app-theme");
        if (currentTheme) dispatch(setTheme(currentTheme));
        else dispatch(setTheme("Theme2"));
    }, []);
}

export default useSetupTheme;