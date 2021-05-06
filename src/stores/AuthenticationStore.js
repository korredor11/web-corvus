import { useState, createContext } from 'react'

export const AuthenticationContext = createContext([])

const AuthenticationStore = ({ children }) => {
    const [authentication, setAuthentication] = useState({ token: null })
    return (
        <AuthenticationContext.Provider value={[authentication, setAuthentication]}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationStore