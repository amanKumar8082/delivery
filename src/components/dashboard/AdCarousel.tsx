/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import ScalePress from '@components/ui/ScalePress';
import { screenWidth } from '@utils/Scaling';
import { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const AdCarousel:FC<{adData:any}> = ({adData}) => {
    const [carouselData, setCarouselData] = useState([]);

    useEffect(() => {
        setCarouselData(adData);
    }, [adData]);

    const baseOptions = {
        vertical: false as false,
        width: screenWidth,
        height: screenWidth * 0.5,
    };

    return (
        <View style={{left: -20, marginVertical:20}}>
            <Carousel
                {...baseOptions}
                loop
                data={carouselData}
                snapEnabled
                autoPlay
                autoPlayInterval={3000}
                modeConfig={{
                    parallaxScrollingOffset: 0,
                    parallaxScrollingScale: 0.94,
                }}
                renderItem={({item}:any) => {
                    return (
                        <ScalePress style={styles.imageContainer}>
                            <Image
                                source={item}
                                style={styles.img}
                            />
                        </ScalePress>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height:'100%',
        width:'100%',
    },
    img:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
        borderRadius:20,
    },
});

export default AdCarousel;
