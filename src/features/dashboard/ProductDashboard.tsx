/* eslint-disable react-native/no-inline-styles */
import {Platform, Animated as RNAnimated, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import NoticeAnimation from './NoticeAnimation';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import Visuals from './Visuals';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon  from 'react-native-vector-icons/Ionicons';
import withCart from '@features/cart/WithCart';

const NOTICE_HEIGHT = -(NoticeHeight + 14);

const ProductDashboard:FC = () => {

  const {scrollY, expand} = useCollapsibleContext();
  const previosScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previosScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previosScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const noticePossition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePossition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePossition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoticeAnimation noticePossition={noticePossition}>
      <>
        <Visuals/>
        <SafeAreaView/>

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
           style={{flexDirection:'row', alignItems:'center', gap:6}}>
            <Icon name="arrow-up-circle-outline" size={RFValue(12)} color="white" />
            <CustomText variant= "h9" style={{color: 'white'}} fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={[styles.panelContainer]}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}/>

          <StickySearchBar/>
        </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content/>

            <View style={styles.customView}>
              <CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{opacity:0.2}}>
                India's Last Minute APP 🍋
              </CustomText>
              <CustomText style={{marginTop:10,paddingBottom:100, opacity:0.2}}>
                Developed in your city ❤️
              </CustomText>
            </View>

          </CollapsibleScrollView>

        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  customView: {
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top:Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCart(withCollapsibleContext(ProductDashboard));
