import { Button, Drawer, PageHeader, Space, Table } from 'antd'
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ProductPriceForm from './ProductPriceForm'

const data = [
    { id: 1, value: 30.00, type: 'PER', from: '01/05/2021' },
    { id: 2, value: 15.00, type: 'PER', from: '01/05/2021' },
    { id: 3, value: 15000, type: 'FIX', from: '01/05/2021' },
]

const ProductPrice = ({ product, onUpdateNeeded }) => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState()

    const showDrawer = price => {
        setSelectedPrice(price)
        setDrawerVisible(true)
    }

    const onCloseDrawer = () => {
        setSelectedPrice(null)
        setDrawerVisible(false)
    }


    const columns = [
        { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
        {
            title: 'Tipo',
            dataIndex: 'type',
            render: (_, record) => record.type === 'PER' ? 'Porcentaje' : 'Valor Fijo',
        },
        { title: 'Valor', dataIndex: 'value' },
        { title: 'Desde', dataIndex: 'from' },
        {
            title: 'Acciones', dataIndex: 'id', fixed: 'right', width: 100, render: (_, price) => (
                <Space>
                    <Button onClick={() => showDrawer(price)}><EditOutlined/> Editar</Button>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Button type={'primary'} style={{ float: 'right', marginBottom: 8 }} onClick={() => showDrawer(null)}>
                <PlusOutlined/> Adicionar
            </Button>
            <Table dataSource={data} columns={columns} rowKey={'id'} style={{ marginTop: 8 }}/>
            <Drawer title={'Formulario Precio'} placement={'right'} closable={false} onClose={onCloseDrawer}
                    visible={drawerVisible} width={450}>
                <ProductPriceForm product={product} price={selectedPrice} onSuccess={onUpdateNeeded}/>
            </Drawer>
        </>
    )
}


export default ProductPrice