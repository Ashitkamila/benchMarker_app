import {Route, Redirect } from "react-router-dom"

const ProtectedRoute=({children, ...rest})=>{
    return(
        <Route
            {...rest}
            render={()=>
                localStorage.getItem("User")?(
                    children
                ):(
                    <Redirect
                        to={{pathname:"/"} }
                    />
                )
            }
        />
    )
}

export default ProtectedRoute;