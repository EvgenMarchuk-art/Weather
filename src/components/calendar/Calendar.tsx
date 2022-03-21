import React,{useState} from 'react';
// @ts-ignore
import DateRangePicker from 'react-native-daterange-picker';
import CalendarStyle from './calendar-style';
import moment from 'moment';
import {View} from 'react-native';
import BottomSheetEmitter from '../../services/BottomSheetEmitter';

const Calendar = () => {
  const styles = CalendarStyle();
  const [date, setDate]= useState(moment())



  const satDay = (dates) => {
    BottomSheetEmitter.emit('toggleModal', dates);
  };

  return (
    <View style={styles.container}>
      <DateRangePicker
        open={true}
        onChange={satDay}
        displayedDate={moment()}
        startDate={date}
        range
      />
    </View>
  );
};

export default Calendar;
