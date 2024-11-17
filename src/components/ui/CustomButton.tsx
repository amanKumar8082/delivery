import { Colors, Fonts } from '@utils/Constants';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';


interface CustomButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, disabled, loading }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <CustomText variant="h6" style={styles.text} fontFamily={Fonts.SemiBold}>
                    {title}
                </CustomText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        width: '100%',
    },
    text: {
        color: '#fff',
    },
});

export default CustomButton;
