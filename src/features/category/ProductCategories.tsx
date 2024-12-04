import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { FC, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import { getAllCategories, getProductsByCategoryType } from '@service/productService';
import SideBar from './SideBar';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';

const ProductCategories: FC = () => {

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getAllCategories();
      setCategories(data);
      if(data && data.length > 0) {
        setSelectedCategory(data[0]);
      }
    } catch (error) {
      console.log('Error fetching categories', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryType: string) => {
    try {
      setProductsLoading(true);
      const data = await getProductsByCategoryType(categoryType);
      setProducts(data);
    } catch (error) {
      console.log('Error fetching products', error);
    } finally {
      setProductsLoading(false);
    }
  };

  React.useEffect(() => {
    if(selectedCategory?.CategoryName) {
      fetchProducts(selectedCategory.CategoryName);
    }
  }, [selectedCategory]);

  return (
    <View style = {styles.mainContainer}>
      <CustomHeader title = {selectedCategory?.CategoryName || 'Categories'} search />
      <View style = {styles.subContainer}>
        {categoriesLoading ? (<ActivityIndicator size = "small" color = {Colors.border} />) :
          (
            <SideBar
              categories = {categories}
              selectedCategory = {selectedCategory}
              onCategoryPress = {(category:any) => setSelectedCategory(category)}
            />
          )
        }
        {productsLoading ?
          (<ActivityIndicator size = "large" color = {Colors.border} style={styles.centre} />) :
          (<ProductList data = {products || []} />)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withCart( ProductCategories);
