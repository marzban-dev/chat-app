import useSetupTheme from "hooks/useSetupTheme";
import AppContext from "context/app.context";
import {useState} from "react";
import useCheckUser from "hooks/useCheckUser";

const AppWrapper = ({children}) => {
    useCheckUser();
    useSetupTheme();
    const [sockets, setSockets] = useState([]);

    return (
        <AppContext.Provider value={{sockets, setSockets}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppWrapper;