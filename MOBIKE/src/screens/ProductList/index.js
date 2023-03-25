import React from 'react';
import { Text, View } from 'react-native';
import ProductListComponent from '../../components/ProductListComponent';
import store from '../../redux/store';

const ProductList = ({
    params,
}) => {
    return (
        <ProductListComponent />
    )
};

export default ProductList;
