import React, { useRef } from "react";
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Animated, {divide, multiply, interpolateNode, Extrapolate} from "react-native-reanimated";
import {
  interpolateColor,
  useScrollHandler
} from "react-native-redash/lib/module/v1";

import Slide, {SLIDER_HEIGHT} from "./Slide";
import SubSlide from "./SubSlide";
import Dot from './Dot';
import {useTheme, makeStyles, Theme} from '../../components/Theme'

const {width} = Dimensions.get("window");

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl
  },
  footer: {
    flex: 1
  },
  footerContent: {
    flex: 1, 
    backgroundColor: 'white', 
    borderTopLeftRadius: theme.borderRadii.xl,
    flexDirection: 'row'
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: 'hidden',
  },
  pageination: {
    ...StyleSheet.absoluteFillObject, 
    height: theme.borderRadii.xl, 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const slides = [
  { 
    label: 'Relaxed', 
    subTitle: 'Find Your Outfits', 
    description: 'Confused about your outfit? Dont worry! Find the best outfit here!', 
    color: '#BFEAF5', 
    picture: {
      uri: require('../../assets/1.png'),
      width: 2513,
      height:3583
    }
  },
  { 
    label: 'Playful', 
    subTitle: 'Hear it Fisrt, Wear it First', 
    description: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ide',  
    color: '#BEECC4', 
    picture: {
      uri: require('../../assets/2.png'),
      width: 2791,
      height: 3744
    }
  },
  { 
    label: 'Excentric', 
    subTitle: 'Your Style, Your Way', 
    description: 'Create your individual & unique style and look amazing everyday',  
    color: '#FFE4D9', 
    picture: {
      uri: require('../../assets/3.png'),
      width: 2738,
      height: 3244
    }
  },
  { 
    label: 'Funky', 
    subTitle: 'Look Good, Feel Good', 
    description: 'Discover the latest trends in fashion and explore your personally',  
    color: '#FFDDDD', 
    picture: {
      uri: require('../../assets/4.png'),
      width: 1757,
      height: 2551,
    }
  },
]

const OnBoarding = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const { x, scrollHandler } = useScrollHandler();
  const scroll = useRef<Animated.ScrollView>(null);

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map(slider => slider.color),
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, i) => {
          const opacity = interpolateNode(x, {
            inputRange: [(i - 1) * width, i*width, (i + 1) * width],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP
          })
          return (
            <Animated.View style={[styles.underlay, {opacity}]} key={i}>
              <Image source={picture.uri} style={{
                width: width - theme.borderRadii.xl,
                height: ( width - theme.borderRadii.xl ) * picture.height / picture.width
              }} />
            </Animated.View>
          )
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal 
          snapToInterval={width} 
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({label, picture}, index) => (
            <Slide key={index} right={!!(index % 2)} {...{label, picture}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={{...StyleSheet.absoluteFillObject, backgroundColor }} />
        <View style={styles.footerContent}>
          <View style={styles.pageination}>
            {slides.map((_, index) => (<Dot key={index} currentIndex={divide(x, width)} {...{index}} />))}
          </View>
          <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            width: width * slides.length,
            transform: [{ translateX: multiply(x, -1) }]
          }}>
            {slides.map(({subTitle, description}, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else if (scroll.current) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      })
                    }
                  }}
                  key={index} 
                  {...{subTitle, description, x, last}}
                />
              )
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

export default OnBoarding;
