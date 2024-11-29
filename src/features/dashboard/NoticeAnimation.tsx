import {View, StyleSheet, Animated as RNAnimated } from 'react-native';
import React, { FC } from 'react';
import { NoticeHeight } from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NOTICE_HEIGHT = -(NoticeHeight + 14);

const NoticeAnimation:FC<{noticePossition:any; children:React.ReactElement}>
    = ({noticePossition, children}) => {
    return (
        <View style={styles.container}>
            <RNAnimated.View style={[styles.noticeConatiner, {transform:[{translateY: noticePossition}]}]}>
                <Notice/>
            </RNAnimated.View>
            <RNAnimated.View style={[styles.contentContainer,{
                paddingTop:noticePossition.interpolate({
                    inputRange:[NOTICE_HEIGHT, 0],
                    outputRange:[0, NoticeHeight + 20],
                }),
            }]}>
                {children}
            </RNAnimated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    noticeConatiner:{
        width:'100%',
        zIndex:999,
        position:'absolute',
    },
    contentContainer:{
        flex:1,
        width:'100%',
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
});

export default NoticeAnimation;
