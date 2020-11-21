import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col } from 'antd';

import './product-list.styles.scss';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { products, productImages } = this.props;

        return (
            <div className="product-list">
                {products
                    ? products.map(({ id, name, style, ibu, abv, ounces }, index) => {
                          return (
                              <Card className="product-card" key={id} title={name} style={{ width: '25vw' }}>
                                  <Row>
                                      <Col span={8}>
                                          <img src={productImages[index % 5].image} alt={name} className="product-image" />
                                      </Col>
                                      <Col span={16}>
                                          <p>Style : {style}</p>
                                          <p>IBU : {ibu ? ibu : 'Not provided'}</p>
                                          <p>ABV : {abv ? abv : 'Not provided'} </p>
                                          <p>Ounces : {ounces} oz. </p>
                                      </Col>
                                  </Row>
                              </Card>
                          );
                      })
                    : null}
            </div>
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.array,
    productImages: PropTypes.array,
};

export default ProductList;
