import { Link } from 'react-router-dom'
import { Button, Drawer, message, Table, Input, PageHeader } from 'antd'
import { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { BiPencil } from 'react-icons/all'

const { Search } = Input

const data = [
    { key: 1, id: 1, name: 'Categoria 1', registerDate: '01/01/2021' },
    { key: 2, id: 2, name: 'Categoria 2', registerDate: '02/01/2021' },
    { key: 3, id: 3, name: 'Categoria 3', registerDate: '03/01/2021' },
    { key: 4, id: 4, name: 'Categoria 4', registerDate: '04/01/2021' },
    { key: 5, id: 5, name: 'Categoria 5', registerDate: '05/01/2021' },
]

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

    const fetchData = filter => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => setCategories(result))
    }

    const filteredCategories = categories.filter(category => category.title.includes(search))

    useEffect(() => {
        fetchData('')
    })


    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Usuário', dataIndex: 'userId' },
        { title: 'Titulo', dataIndex: 'title' },
        { title: 'Estado', dataIndex: 'completed' },
        {
            title: 'Acciones',
            dataIndex: 'id',
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
                    <CategoryForm category={selected}/>
                </Drawer>
            </PageHeader>
    )
}

export default CategoriesListing