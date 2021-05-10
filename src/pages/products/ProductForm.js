import { Button, Checkbox, Form, Input, message } from 'antd'
import { api } from '../../utils/api'
import { useEffect, useState } from 'react'

const ProductForm = ({ product, onSuccess }) => {
    const [productForm] = Form.useForm()
    const [pristine, setPristine] = useState(true)

    const onFinish = (values) => {
        const body = { ...values, id: product ? product.id : 0 }
        const req = product ? api.put('/products', body) : api.post('/products', body)
        req
            .then(response => {
                message.success('El producto fue salvo con suceso!')
                productForm.resetFields()
                if (onSuccess) onSuccess()
            })
            .catch(err => message.error(err.message))
    }

    useEffect(() => {
        if (product) {
            productForm.setFieldsValue({
                barcode: product.barcode,
                name: product.name,
                description: product.description,
                hasBatch: product.hasBatch,
            })
            setPristine(false)
        } else if (!pristine) {
            productForm.resetFields()
            setPristine(true)
        }
    }, [product, pristine, productForm])


    return (
        <Form form={productForm} name={'ProductForm'} layout={'vertical'} onFinish={onFinish}>
            <Form.Item label={'Codigo de Barras'} name={'barcode'}
                       rules={[{ required: true, message: 'Por favor insira un codigo de barras.' }]}>
                <Input placeholder={'1234...'}/>
            </Form.Item>

            <Form.Item label={'Nombre'} name={'name'} rules={[
                { required: true, message: 'Por favor insira un nombre valido' },
                { min: 3, message: 'Es necessario tener al menor 3 caracteres' },
            ]}>
                <Input placeholder={'Nombre del producto...'}/>
            </Form.Item>

            <Form.Item label={'Descripción'} name={'description'}
                       rules={[{ required: true, message: 'Por favor insira una descripción valida' }]}>
                <Input/>
            </Form.Item>

            <Form.Item name="hasBatch" valuePropName="checked">
                <Checkbox>Controla Lotes?</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>Salvar</Button>
            </Form.Item>
        </Form>
    )
}

export default ProductForm