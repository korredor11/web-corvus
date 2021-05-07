import { Button, Form, Input, message, PageHeader } from 'antd'
import { api } from '../../utils/api'
import { useEffect, useState } from 'react'

const CategoryForm = ({ category, onSuccess }) => {
    const [categoryForm] = Form.useForm()

    const onFinish = (values) => {
        const formCategory = { id: category && category.id ? category.id : 0, name: values.name }
        const method = category ? 'PUT' : 'POST'

        api(method, '/categories', formCategory)
            .then(response => {
                message.success('La categoria fue salva con suceso!')
                categoryForm.resetFields()
                if (onSuccess) onSuccess()
            })
            .catch(err => message.error(err.message))
    }

    useEffect(() => {
        categoryForm.setFieldsValue({ name: category && category.name ? category.name : '' })
    }, [category, categoryForm])


    const onFinishFailed = () => message.error('No fue possible salvar la categoria!')

    return (
        <Form
            form={categoryForm}
            name={'CategoryForm'}
            layout={'vertical'}
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