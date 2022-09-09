import React, {useState} from "react";


const AppContext = React.createContext({});

export const App = ({children}) => {
   

    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;