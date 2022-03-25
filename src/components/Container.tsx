import React from "react";
import { Dimensions, Image, StyleSheet, StatusBar, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box, useTheme} from './Theme';
import Constants from 'expo-constants';

const {width, height: wHeight} = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

export const assets = [
  require("../assets/pattern1.png"),
]

const Container = ({
  children,
  footer,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <Box height={wHeight + (Platform.OS === 'android' ? Constants.statusBarHeight : 0)} backgroundColor="secondary">
        <StatusBar barStyle="light-content" />
        <Box backgroundColor="white">
          <Box borderBottomLeftRadius="xl" overflow="hidden" height={height*0.61}>
            <Image source={assets[0]} style={{ width, height, borderBottomLeftRadius: theme.borderRadii.xl }} />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image 
            source={assets[0]} 
            style={{ 
              ...StyleSheet.absoluteFillObject,
              width, 
              height,
              top: -height*0.61,
            }}
          />
          <Box flex={1} borderRadius="xl" borderTopLeftRadius={"zero"} backgroundColor='white'>
            {children}
          </Box>
          <Box backgroundColor="secondary" paddingTop="m">
            {footer}
            <Box height={insets.bottom} />
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
}

export default Container;