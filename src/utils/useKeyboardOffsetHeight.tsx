import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';


export default function useKeyboardOffsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardOffsetHeight(event.endCoordinates.height);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffsetHeight(0);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return keyboardOffsetHeight;
}
