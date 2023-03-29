import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, onChange }:any) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedDate: any) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button title="Select Date" onPress={showPicker} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 16,
  },
});

export default DatePicker;
