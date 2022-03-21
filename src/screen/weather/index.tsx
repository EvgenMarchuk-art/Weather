import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchWeather} from '../../store/action/weather';
import Calendar from '../../components/calendar/Calendar';
import BottomSheet from '../../components/bottomSheet';

const WeatherScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather({city: 'Kyiv', countryCode: 'ua'}));
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Calendar />
      <BottomSheet />
    </SafeAreaView>
  );
};

export default WeatherScreen;
