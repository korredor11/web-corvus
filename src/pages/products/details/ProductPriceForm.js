import { Button, Form, InputNumber, message, Select } from 'antd'
import { useEffect, useState } from 'react'
import { api } from '../../../utils/api'

const { Option } = Select

const ProductPriceForm = ({ product, price, onSuccess }) => {
    const [pristine, setPristine] = useState(true)
    const [priceForm] = Form.useForm()

    const onFinish = values => {
        api.req(price ? 'PUT' : 'POST', '/products/'+product.id+'/prices', {
            ...values,
            id: price ? price.id : 0,
            productId: product.id,
        })
            .then(response => {
                priceForm.resetFields()
                onSuccess()
            })
            .catch(api.handleError)
    }

    useEffect(() => {
        if (price) {
            priceForm.setFieldsValue({
                type: price.type,
                value: price.value,
            })
            setPristine(false)
        } else if (!pristine) {
            priceForm.resetFields()
            setPristine(true)
        }
    }, [price])


    return (
        <Form form={priceForm} name={'priceForm'} layout={'vertical'} onFinish={onFinish}>
            <Form.Item label={'Tipo'} name={'type'} rules={[{ required: true }]}>
                <Select placeholder={'Seleciona el tipo'} allowClear>
                    <Option value={'PER'}>Porcentaje</Option>
                    <Option value={'FIX'}>Fijo</Option>
                </Select>
            </Form.Item>
            <Form.Item label={'Valor'} name={'value'} rules={[{ required: true }]}>
                <InputNumber defaultValue={0} min={0} step={'0.1'} stringMode style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>Salvar</Button>
            </Form.Item>
        </Form>
    )
}

export default ProductPriceForm