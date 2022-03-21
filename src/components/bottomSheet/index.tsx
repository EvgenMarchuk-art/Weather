import React, {useMemo, useState, useRef, useEffect} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetEmitter from '../../services/BottomSheetEmitter';
import IconCalendar from '../../assets/icons/svg/IconCalendar.svg';
import BackgroundFon from '../../assets/icons/backgroundImage/BackgroundFon.png';

import Backdrop from './Backdrop';

import SheetSectionList from './SheetSectionList';

const Index = () => {
  const [index, setIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);
  const [startDate,setStartDate]=useState(null)


  useEffect(() => {
    const toggleModal = (dates) => {
      setStartDate(dates.startDate);
      setIndex(prevIndex => {
        return prevIndex === 1 ? -1 : 1;
      });
    };

    BottomSheetEmitter.on('toggleModal', toggleModal);

    return () => {
      BottomSheetEmitter.off('toggleModal', toggleModal);
    };
  }, []);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => {
    if (!isVisible) {
      return ['100%', '100%'];
    } else {
      return ['95%', '95%'];
    }
  }, [isVisible]);

  const onChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  const CustomBackDrop = ({style}: any) => {
    return <Backdrop style={style} index={index} />;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={onChange}
      backdropComponent={CustomBackDrop}
      enablePanDownToClose={true}
    >
      <ImageBackground source={BackgroundFon} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View>
              <IconCalendar />
            </View>
            <View>
              <Text style={{fontFamily: 'SourceSansPro-Bold'}}>
                Прогноз погоды на 5 дней
              </Text>
            </View>
          </View>
          <SheetSectionList  startDate={startDate}/>
        </View>
      </ImageBackground>
    </BottomSheet>
  );
};

export default Index;
