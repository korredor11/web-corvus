import { Button, Drawer, Input, message, PageHeader, Table } from 'antd'
import { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { api } from '../../utils/api'

const { Search } = Input

const CategoriesListing = (props) => {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')

    const showDrawer = category => {
        setSelected(category)
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
        setSelected(undefined)
    }

    const onSearch = value => {
        setSearch(value)
    }

    const onFormSuccess = () => {
        fetchData()
        onClose()
    }

    const fetchData = () => {
        console.log('fetching categories...')
        console.log('categories=', categories)
        console.log('filterdCategories=', filteredCategories)
        api.get('/categories')
            .then(response => setCategories(response))
            .catch(err => message.error(err.message))
    }

    const filteredCategories = categories.filter(category => category.name.includes(search))

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])


    const columns = [
        { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
        { title: 'Nombre', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        {
            title: 'Acciones',
            dataIndex: 'id',
            fixed: 'right',
            width: 100,
            render: (text, record) => (
                <Button onClick={() => showDrawer(record)}><EditOutlined/> Editar</Button>),
        },
    ]

    return (
        <PageHeader ghost={false} onBack={() => window.history.back()} title={'Categorias'}
                    subTitle={'Lista de categorias'} extra={[
            <Button key={'add'} type={'primary'} onClick={() => showDrawer(null)}>
                <PlusOutlined/>Nueva Categoria
            </Button>,
        ]}>
            <Search placeholder="Tipea para buscar" onSearch={onSearch} enterButton/>
            <Table columns={columns} dataSource={filteredCategories} style={{ marginTop: 10 }}/>

            <Drawer title={'Formulário Categoria'} placement={'right'} closable={false} onClose={onClose}
                    visible={visible} width={450}>
                <CategoryForm category={selected} onSuccess={onFormSuccess}/>
            </Drawer>
        </PageHeader>
    )
}

export default CategoriesListing