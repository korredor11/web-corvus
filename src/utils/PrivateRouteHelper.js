import { useContext } from 'react'
import { AuthenticationContext } from '../stores/AuthenticationStore'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    const [state] = useContext(AuthenticationContext)
    return (
        <Route
            {...rest}
            render={(props) => state.token
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
        />
    )
}