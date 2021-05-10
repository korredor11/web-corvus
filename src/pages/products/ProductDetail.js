import { Button, Descriptions, Input, PageHeader, Select, Space, Tabs, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { PlusOutlined } from '@ant-design/icons'
import ProductPrice from './details/ProductPrice'

const { Option } = Select

const { TabPane } = Tabs

const ProductDetail = (props) => {
    let { id } = useParams()

    const [product, setProduct] = useState({
        id: 0,
        barcode: '',
        name: '',
        description: '',
        hasBatch: false,
        categories: [],
    })
    const [showCategoryInput, setShowCategoryInput] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [allCategories, setAllCategories] = useState([])


    const avaliableCategories = allCategories.filter(category => !product.categories.find(c => c.id === category.id))

    const onAddTag = () => {
        if (selectedCategory) {
            api.put('/product-categories', {
                productId: id,
                categoryId: selectedCategory,
            })
                .then(response => fetchProduct())
                .catch(api.handleError)
        }
        setSelectedCategory(null)
        setShowCategoryInput(false)
    }

    const onCloseTag = (e, removedCategory) => {
        e.preventDefault()
        if (removedCategory) {
            api.delete('/product-categories', {
                productId: id,
                categoryId: removedCategory.id,
            })
                .then(response => fetchProduct())
                .catch(api.handleError)
        }
    }

    const onSelectCategoryChange = (value) => {
        if (value) {
            setSelectedCategory(value)
        } else {
            setSelectedCategory(null)
            setShowCategoryInput(false)
        }
    }

    const AddInput = () => (
        <>
            <Select
                autoFocus
                showSearch
                allowClear
                size={'small'}
                placeholder={'Selecione una categoria'}
                optionFilterProp={'children'}
                onChange={onSelectCategoryChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{
                    width: 188,
                    verticalAlign: 'top',
                }}
                addonAfter={<Button>OK</Button>}
            >
                {avaliableCategories.map(category => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
            </Select>
            <Button type="primary" htmlType="submit" size={'small'} disabled={!selectedCategory}
                    onClick={onAddTag}>OK</Button>
        </>
    )

    const AddTag = () => (
        <Tag key={'add-tag'} style={{ background: '#ffffff', borderStyle: 'dashed' }}
             onClick={() => setShowCategoryInput(true)}>
            <PlusOutlined/> Add categoria
        </Tag>
    )

    const LastTag = () => showCategoryInput ? AddInput() : AddTag()


    const tags = () => {
        const normalTags = categories.map(category => (
            <Tag key={category.id} onClose={(e) => onCloseTag(e, category)} closable>{category.name}</Tag>
        ))

        return [...normalTags, LastTag()]
    }

    const fetchProduct = () => {
        api.get('/products/' + id)
            .then(response => {
                console.log('fetching product....')
                setProduct(response)
                setCategories(response.categories)
                console.log('product=', response)
                console.log('categories...', categories)

            })
            .catch(api.handleError)
    }


    useEffect(() => {
        fetchProduct()
        api.get('/categories')
            .then(response => setAllCategories(response))
            .catch(api.handleError)
        // eslint-disable-next-line
    }, [])

    return (
        <PageHeader ghost={false}
                    onBack={() => window.history.back()}
                    title={product.name}
                    subTitle={'Detalhes del Producto'}
                    tags={tags()}
        >
            <Descriptions bordered>
                <Descriptions.Item label={'Nombre'}>{product.name}</Descriptions.Item>
                <Descriptions.Item label={'Código de Barras'}>{product.barcode}</Descriptions.Item>

                <Descriptions.Item label={'Control de Lotes'}>
                    {product.hasBatch === true ? 'Si' : 'NO'}
                </Descriptions.Item>
                <Descriptions.Item label={'Descripción'} span={2}>
                    {product.description}
                </Descriptions.Item>
            </Descriptions>

            <Tabs defaultActiveKey={'price'} style={{ marginTop: 16 }}>
                <TabPane tab={'Precios'} key={'price'}>
                    <ProductPrice product={product} onUpdateNeeded={fetchProduct}/>
                </TabPane>

                <TabPane tab={'Inventario'} key={'inventory'}>
                    <h1>Inventario</h1>
                </TabPane>
            </Tabs>


        </PageHeader>
    )
}

export default ProductDetail