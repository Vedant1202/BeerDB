import React from 'react';
import axios from 'axios';

import './homepage.styles.scss';
import ProductList from '../../components/product-list/product-list.component';

import { Pagination, Input } from 'antd';

const { Search } = Input;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actualProducts: null,
            products: null,
            productImages: null,
            currentPage: 1,
            nPages: null,
            totalProducts: null,
            resultantProducts: null,
        };
    }

    componentDidMount = async () => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
        };

        const responseProducts = await axios.get(
            'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json',
            { headers }
        );
        const products = responseProducts.data;

        const responseProductImages = await axios.get(
            'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json',
            { headers }
        );
        const productImages = responseProductImages.data;

        const nPages = Math.ceil(products.length / 20);
        const totalProducts = products.length;

        const resultantProducts = products.slice(0, 20);

        this.setState({
            actualProducts: products,
            products,
            productImages,
            nPages,
            totalProducts,
            resultantProducts,
        });
    };

    handlePageChange = (page) => {
        const { products } = this.state;

        const start = (page - 1) * 20;
        const end = start + 20;

        const resultantProducts = products.slice(start, end);

        this.setState({
            resultantProducts,
            currentPage: page,
        });
    };

    handleSearch = (value) => {
        const { actualProducts } = this.state;

        const searchedProducts = actualProducts.filter((product) => {
            return product.name.toLowerCase().includes(value.toLowerCase());
        });

        this.setState(
            {
                products: searchedProducts,
                totalProducts: searchedProducts.length,
            },
            () => {
                this.handlePageChange(1);
            }
        );
    };

    render() {
        const { currentPage, totalProducts, productImages, resultantProducts } = this.state;

        return (
            <div className="homepage">
                <Search
                    placeholder="Search beers by name"
                    allowClear
                    enterButton="Search"
                    onSearch={this.handleSearch}
                    className="search-box"
                />

                <div className="products-div">
                    <ProductList products={resultantProducts} productImages={productImages} />
                </div>

                <div className="pages-list">
                    <Pagination
                        defaultCurrent={1}
                        onChange={this.handlePageChange}
                        pageSize={20}
                        showSizeChanger={false}
                        current={currentPage}
                        total={totalProducts}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage;
