import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CustomButton from '@components/ui/CustomButton';

const OTPInput = ({ otp, setOTP, handleVerifyOTP, loading }: any) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleInputChange = (text: string, index: number) => {
    const otpArray = [...otp];
    otpArray[index] = text;
    setOTP(otpArray);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus next input
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const otpArray = [...otp];
      otpArray[index - 1] = '';
      setOTP(otpArray);
      inputRefs.current[index - 1]?.focus(); // Focus previous input
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit: string, index: number) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleInputChange(text.slice(-1), index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <CustomButton
        title="Verify OTP"
        onPress={handleVerifyOTP}
        disabled={otp.join('').length !== otp.length}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputBox: {
    width: 45,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 10,
  },
});

export default OTPInput;
