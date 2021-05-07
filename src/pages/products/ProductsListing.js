import { Button, Drawer, PageHeader } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import ProductForm from './ProductForm'

const ProductsListing = (props) => {
    const [visible, setVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()

    const onSearch = (value) => {
        alert('making search')
    }

    const onClose = () => {
        setVisible(false)
        setSelectedProduct(null)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const addProductBtn = () => (
        <Button key={'add'} type={'primary'} onClick={() => showDrawer()}>
            <PlusOutlined/> Nuevo Producto
        </Button>
    )

    return (
        <PageHeader ghost={false} onBack={() => window.history.back()} title={'Productos'}
                    subTitle={'Lista de produtos'}
                    extra={[addProductBtn()]}>
            <Search placeholder={'Tipea para buscar'} onSearch={onSearch} enterButton/>

            <Drawer title={'Formulario Productos'} placement={'right'} closable={false} onClose={onClose}
                    visible={visible} width={450}>
                <ProductForm />
            </Drawer>

        </PageHeader>
    )
}

export default ProductsListing