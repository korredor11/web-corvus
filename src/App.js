import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import Login from './pages/Login'
import CategoriesListing from './pages/categories/CategoriesListing'
import AuthenticationStore from './stores/AuthenticationStore'
import MenuLayout from './layouts/MenuLayout'
import { PrivateRoute } from './utils/PrivateRouteHelper'
import ProductsListing from './pages/products/ProductsListing'
import './styles/index.css'
import ProductDetail from './pages/products/ProductDetail'

const App = () => {
    return (
        <AuthenticationStore>
            <BrowserRouter>
                <MenuLayout>
                    <Route path="/" render={() => <Redirect to="/login"/>}/>
                    <Route path="/login" exact component={Login}/>
                    <PrivateRoute path={'/categories'} exact component={CategoriesListing}/>
                    <PrivateRoute path={'/products'} exact component={ProductsListing}/>
                    <PrivateRoute path={'/products/:id'} exact component={ProductDetail}/>
                </MenuLayout>
            </BrowserRouter>
        </AuthenticationStore>
    )
}

export default App
