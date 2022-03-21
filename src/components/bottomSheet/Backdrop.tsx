import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const CustomBackdrop = ({style, index}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (index === -1) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [index, opacity]);

  // styles
  const containerStyle = [
    style,
    {
      backgroundColor: 'black',
      opacity,
      transform: [
        {
          scale: index === -1 ? 0 : 1,
        },
      ],
    },
  ];

  return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
