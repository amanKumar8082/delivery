import { Colors } from '@utils/Constants';
import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

const ProductList: FC<{ data: any[] }> = ({ data }) => {

    const renderItem = ({ item, index }: any) => {
        return <ProductItem item={item} index={index} />;
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()} // Fallback to index if id is missing
            contentContainerStyle={styles.content}
            style={styles.container}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.backgroundSecondary,
    },
    content: {
        paddingVertical: 10,
        paddingBottom: 100,
        paddingHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Distributes space between columns
        marginBottom: 10, // Adds space between rows
    },
});

export default ProductList;
