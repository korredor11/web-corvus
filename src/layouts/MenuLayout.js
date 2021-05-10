import { Layout, Menu } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BarcodeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TagsOutlined } from '@ant-design/icons'
import { DiDigitalOcean, FaCog } from 'react-icons/all'
import MenuItem from 'antd/es/menu/MenuItem'
import { AuthenticationContext } from '../stores/AuthenticationStore'

const { Sider, Content } = Layout

const routesTop = [
    { key: '1', label: 'Categorias', path: '/categories', icon: <TagsOutlined/> },
    { key: '2', label: 'Productos', path: '/products', icon: <BarcodeOutlined/> },
]

const routesBottom = [
    { key: '1', label: 'Configuraciones', path: '/configurations', icon: <FaCog/> },
]

const MenuLayout = ({ children }) => {
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState(location.pathname)
    const [collapsed, setCollapsed] = useState(false)
    const [, setAuthentication] = useContext(AuthenticationContext)

    const toggle = () => setCollapsed(!collapsed)

    const logout = () => {
        localStorage.removeItem('authToken')
        setAuthentication(null)
    }


    useEffect(() => {
        setSelectedKey(location.pathname)
    }, [location])


    return (
        <Layout style={{ height: '100%' }}>

            <Sider collapsible collapsed={collapsed} trigger={null} theme={'light'}>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    margin: 0,
                }}>

                    <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>

                        <MenuItem key={'logo'} icon={<DiDigitalOcean/>}>
                            <span style={{ fontSize: 18 }}>Corvus</span>
                        </MenuItem>

                        {routesTop.map(route => (
                            <MenuItem key={route.path} icon={route.icon}>
                                <NavLink to={route.path} className={'nav-text'}>{route.label}</NavLink>
                            </MenuItem>
                        ))}
                    </Menu>

                    <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
                        {routesBottom.map(route => (
                            <MenuItem key={route.path} icon={route.icon}>
                                <NavLink to={route.path} className={'nav-text'}>{route.label}</NavLink>
                            </MenuItem>
                        ))}

                        <MenuItem key={'logout-menu'} icon={<LogoutOutlined/>} onClick={logout}>
                            <NavLink to={'/login'} className={'nav-text'}>Salir</NavLink>
                        </MenuItem>

                        <MenuItem key={'toggle-menu'}
                                  icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                  onClick={toggle}
                        />

                    </Menu>
                </div>


            </Sider>

            <Layout className="site-layout" style={{ height: '100%' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '0px 16px',
                        padding: 24,
                        height: '100%',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MenuLayout

