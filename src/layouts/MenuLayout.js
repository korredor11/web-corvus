import { Button, Layout, Menu } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BarcodeOutlined, RightOutlined, TagsOutlined } from '@ant-design/icons'
import { FaCog, IoCogOutline } from 'react-icons/all'

const { Sider, Content } = Layout

const MenuLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => setCollapsed(!collapsed)

    return (
        <Layout style={{ height: '100%' }}>

            <Sider collapsible collapsed={collapsed} trigger={null} theme={'light'}>
                <Button
                    type=""
                    shape="circle"
                    icon={<RightOutlined rotate={collapsed ? 0 : 180}/>}
                    size={'small'}
                    style={{
                        postition: 'relative',
                        float: 'right',
                        right: -15,
                        top: 18,
                        zIndex: 888,
                        backgroundColor: 'grey',
                        borderColor: '#cccccc',
                        color: 'white',
                    }}
                    onClick={toggle}
                />

                <div style={{ height: '32px', margin: '16px' }}>
                    Corvus
                </div>

                <Menu theme="light" mode="inline" defaultSelectedKeys={['categories']}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'space-between',
                    }}>

                            <Menu.Item key={'categories'} icon={<TagsOutlined/>}>
                                <NavLink to={'/categories'} className={'nav-text'}>Categorias</NavLink>
                            </Menu.Item>
                            <Menu.Item key={'products'} icon={<BarcodeOutlined/>}>
                                <NavLink to={'/products'} className={'nav-text'}>Productos</NavLink>
                            </Menu.Item>


                            <Menu.Item key={'configurations'} icon={<FaCog/>}>
                                <NavLink to={'/configuration'} className={'nav-text'}>Configuraciones</NavLink>
                            </Menu.Item>

                    </div>


                </Menu>

                <Menu theme={'light'} mode={'inline'} style={{ position: 'relative', bottom: 0 }}>

                </Menu>

            </Sider>

            <Layout className="site-layout" style={{ height: '100%' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: '100%',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MenuLayout

