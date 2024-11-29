/* eslint-disable react/react-in-jsx-scope */
import { adData, categories } from '@utils/dummyData';
import { StyleSheet, View } from 'react-native';
import AdCarousel from './AdCarousel';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
    return (
        <View style={styles.container}>
            <AdCarousel adData={adData}/>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                Grocery & Kitchen
            </CustomText>
            <CategoryContainer data={categories}/>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                Best Sellers
            </CustomText>
            <CategoryContainer data={categories}/>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                Snacks & Beverages
            </CustomText>
            <CategoryContainer data={categories}/>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                Home & Cleaning
            </CustomText>
            <CategoryContainer data={categories}/>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
                Personal Care
            </CustomText>
            <CategoryContainer data={categories}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});

export default Content;
