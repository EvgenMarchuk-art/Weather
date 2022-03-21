import React, {useMemo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {getCelsius} from "../../utils/celsius";

import TimeIcon from '../../assets/icons/svg/TimeIcon.svg';
import Celsius from '../../assets/icons/svg/Celsius.svg';
import Pressure from '../../assets/icons/svg/Pressure.svg';
import Wind from '../../assets/icons/svg/Wind.svg';



const SheetSectionList = ({startDate}: any) => {
  const data = useSelector(storeState => storeState.weather.data);




  const sections = useMemo(() => {
    if (!data?.list || !startDate) {
      return [];
    }

    const sectionsMap = new Map();

    const start = startDate.format('YYYY-MM-DD');
    startDate.add(4, 'days');
    const end = startDate.format('YYYY-MM-DD');

    const sectionsListItems = data.list
      .reduce((arr: any[], item: any, index: number, originalArr: any[]) => {
        const convertedDate = moment(item.dt_txt);
        const ddmmYYYY = convertedDate.format('YYYY-MM-DD');
        const updatedItem = {
          ...item,
          // date: ddmmYYYY,
          time: convertedDate.format('HH:mm'),
        };
        const sectionItemData = {
          id: item.dt,
          name: data.city.name,
          date: convertedDate,
          title: convertedDate.format('MMMM DD Y'),
          data: [[updatedItem]],

        };
        const prevMapItem = sectionsMap.get(ddmmYYYY);

        if (!prevMapItem) {
          sectionsMap.set(ddmmYYYY, sectionItemData);
        } else {
          prevMapItem.data[0].push(updatedItem);
        }

        if (originalArr.length - 1 === index) {
          return [...sectionsMap.values()];
        }
        return arr;
      }, [])
      .filter((item: any) => {
        if (!item) {
          return false;
        }

        const actualDate = item.date.format('YYYY-MM-DD');

        return actualDate >= start || actualDate <= end;
      });
    return sectionsListItems;
  }, [data, startDate]);

  const keyExtractor = (item: any,i) => {
    return i;
  };


  const SectionHeader = useCallback(
    ({section}) => (
      <View style={styles.sectionHeaderContainer}>
        <Text style={{fontFamily: 'SourceSansPro-Bold'}}>{section.title}{' '}{section.name}</Text>
      </View>
    ),
    [],
  );




  const Item = useCallback(
    ({item}) =>
      {return <FlatList
          horizontal={true}
          data={item}
          renderItem={(nestedItem) =>
            {return (
              <View style={{ paddingRight:50, paddingLeft:25,paddingTop:25, flexGrow:1, borderWidth:1}}>
                <View style={{flexDirection:'row', alignItems:'flex-end', borderBottomWidth:1, paddingTop:5}}>
                  <View>
                    <Text  style={{fontFamily: 'SourceSansPro-Bold'}}>{nestedItem.item.time}</Text>
                  </View>
                  <View>
                    <TimeIcon/>
                  </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'flex-end', borderBottomWidth:1, paddingTop:5}}>
                  <View style={{}}>
                    <Text  style={{fontFamily: 'SourceSansPro-Bold'}}> {getCelsius(nestedItem.item.main?.temp)}</Text>
                  </View>
                  <View>
                    <Celsius/>
                  </View>
                </View>


                <View style={{flexDirection:'row', alignItems:'flex-end', borderBottomWidth:1, paddingTop:5}}>
                  <View style={{}}>
                    <Text  style={{fontFamily: 'SourceSansPro-Bold'}}>{nestedItem.item.main?.pressure}mm</Text>
                  </View>
                  <View>
                    <Pressure/>
                  </View>
                </View>


                <View style={{flexDirection:'row', alignItems:'flex-end', paddingTop:5}}>
                  <View style={{}}>
                    <Text  style={{fontFamily: 'SourceSansPro-Bold'}}>{nestedItem.item.wind?.speed}м/с </Text>
                  </View>
                  <View>
                    <Wind/>
                  </View>
                </View>



                </View>
                )
            }
      }
        />
      }

    ,
    [],
  );

  return (
    <View style={styles.container}>
      <BottomSheetSectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderSectionHeader={SectionHeader}
        renderItem={Item}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default SheetSectionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // backgroundColor: 'white',
  },
  sectionHeaderContainer: {
    backgroundColor: 'white',
    padding: 6,
    borderTopWidth: 1,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    // backgroundColor: '#eee',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
