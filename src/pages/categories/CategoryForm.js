import { Button, Form, Input, PageHeader } from 'antd'

const CategoryForm = ({ category }) => {
    const onFinish = (values) => {
        if (category) {
            console.log('Updating category=', category.id, 'with name=', values.name)
        } else {
            console.log('Creating a new category with name=', values.name)
        }
    }
    const onFinishFailed = () => console.log('failed!')

    return (
            <Form
                name={'CategoryForm'}
                layout={'vertical'}
                initialValues={{ name: category && category.name ? category.name : '' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label={'Nome'} name={'name'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Por favor insira un nombre valido',
                               },
                               {
                                   min: 3,
                                   message: 'Es necessario tener al menor 3 caracteres',
                               },
                           ]}>
                    <Input placeholder={'Nombre de la Categoria...'}/>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>Salvar</Button>
                </Form.Item>
            </Form>
    )
}

export default CategoryForm