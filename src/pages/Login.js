import { Card, Input, Form, Checkbox, Button, message } from 'antd'
import { AuthenticationContext } from '../stores/AuthenticationStore'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { api } from '../utils/api'

const Login = () => {
    const [authentication, setAuthentication] = useContext(AuthenticationContext)
    const history = useHistory()

    const hasRememberOption = () => localStorage.getItem('login-remember') === 'true'
    const storedUsername = () => localStorage.getItem('login-username')

    const saveUsername = (username) => {
        localStorage.setItem('login-remember', 'true')
        localStorage.setItem('login-username', username)
    }

    const clearUsername = () => {
        localStorage.removeItem('login-remember')
        localStorage.removeItem('login-username')
    }

    const enterApp = (token) => {
        setAuthentication({ ...authentication, token: token })
        history.push('/home')
    }


    const onFinish = (values) => {
        api.post('/login', { name: values.username, password: values.password })
            .then(response => {
                if (!response.token) return
                if (values.remember) saveUsername(values.username)
                else clearUsername()
                localStorage.setItem('token', response.token)
                enterApp(response.token)
            })
            .catch(err => message.error(err.message))
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (storedUsername() && token) {
            enterApp(token)
        }
    })

    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 888,
            backgroundColor: 'white',
            top: 0,
            left: 0,
        }}>
            <Card title="Login" style={{ width: '400px', margin: 'auto', marginTop: '128px' }}>
                <Form name="login"
                      onFinish={onFinish}
                      initialValues={{
                          remember: hasRememberOption(),
                          username: storedUsername(),
                      }}
                >
                    <Form.Item name="username" rules={[{ required: true, message: 'Por favor tipea tu usuario.' }]}>
                        <Input prefix={<UserOutlined/>} placeholder={'Usuario'}/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Porfavor tipea tu contraseña.' }]}>
                        <Input.Password prefix={<LockOutlined/>} placeholder={'Contraseña'}/>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Guardar usuário?</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Entrar</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    )
}

export default Login