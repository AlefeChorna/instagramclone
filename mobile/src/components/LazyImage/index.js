import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  smallSource,
  source,
  aspectRatio = 1,
  shouldLoad
}) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (shouldLoad) {
      handleAnimate();
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }

  return (
    <Small 
      source={smallSource} 
      ratio={aspectRatio} 
      resizeMode="contain"
      blurRadius={0.7}
    >
      <OriginalAnimated 
        style={{ opacity }}
        source={source}
        ratio={aspectRatio}
        resizeMode="contain" />
    </Small>
  );
}
