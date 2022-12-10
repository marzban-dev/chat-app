import React from "react";

const store = {
    sockets: [],
    setSockets: () => {}
};

const AppContext = React.createContext(store);

export default AppContext;