import { Button, Drawer, PageHeader, Space, Table, Tag } from 'antd'
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { api } from '../../utils/api'
import { useHistory } from 'react-router-dom'


const ProductsListing = (props) => {
    const [visible, setVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    const history = useHistory()

    const onClose = () => {
        setVisible(false)
        setSelectedProduct(null)
    }

    const showDrawer = (product) => {
        setSelectedProduct(product)
        setVisible(true)
    }

    const onFormSuccess = () => {
        onClose()
        fetchData()
    }

    const fetchData = () => {
        api.get('/products')
            .then(response => setProducts(response))
            .catch(api.handleError)
    }

    const filteredProducts = products.filter(product => product.name.includes(search))

    useEffect(() => {
        if (!products || products.length < 1) fetchData()
    })

    const columns = [
        { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
        { title: 'Codigo Barras', dataIndex: 'barcode', sorter: (a, b) => a.id - b.id },
        { title: 'Nombre', dataIndex: 'name', sorter: (a, b) => a.id - b.id },
        {
            title: 'Categorias', dataIndex: 'categories', render: (text, record) => record.categories.length > 0 ? (
                <>
                    {record.categories.map(category => (
                        <Tag key={category.id}>{category.name}</Tag>
                    ))}
                </>
            ) : <span>No tiene categorias.</span>,
        },
        { title: 'Lotes', dataIndex: 'hasBatch', render: (_, row) => row.hasBatch === true ? <span>Sí</span> : <span>No</span> },
        {
            title: 'Acciones', dataIndex: 'id', fixed: 'right', width: 100, render: (text, record) => (
                <Space>
                    <Button onClick={() => showDrawer(record)}><EditOutlined/> Editar</Button>
                    <Button onClick={() => history.push('/products/' + record.id)}>
                        <EyeOutlined/> Detalles
                    </Button>
                </Space>
            ),
        },
    ]

    const addProductBtn = () => (
        <Button key={'add'} type={'primary'} onClick={() => showDrawer()}>
            <PlusOutlined/> Nuevo Producto
        </Button>
    )

    return (
        <PageHeader ghost={false} onBack={() => window.history.back()} title={'Productos'}
                    subTitle={'Lista de produtos'}
                    extra={[addProductBtn()]}>
            <Search placeholder={'Tipea para buscar'} onSearch={(value) => setSearch(value)} enterButton/>
            <Table columns={columns} dataSource={filteredProducts} style={{ marginTop: 10 }} rowKey={'id'}/>
            <Drawer title={'Formulario Productos'} placement={'right'} closable={false} onClose={onClose}
                    visible={visible} width={450}>
                <ProductForm product={selectedProduct} onSuccess={onFormSuccess}/>
            </Drawer>

        </PageHeader>
    )
}

export default ProductsListing