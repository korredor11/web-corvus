import { Button, Checkbox, Form, Input } from 'antd'

const ProductForm = (props) => {

    const onFinish = () => {
        // TODO handle successfull submit
    }

    return (
        <Form name={'ProductForm'} layout={'vertical'} onFinish={onFinish}>
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

            <Form.Item label={'Descripción'} name={'description'}>
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