import React, { useRef } from 'react';
import {Dimensions, View} from 'react-native';
import { useTheme, Box } from '../../components/Theme';
import Underlay from './Underlay';
import {lerp} from './Scale';
import Animated, { divide, multiply, sub, Transition } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import {
  useTransition,
} from "react-native-redash/lib/module/v1";

const {width: wWidth} = Dimensions.get("window");
const aspectRatio = 195 / 305;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export interface Point {
  date: number;
  value: number;
  color: string;
  id: number;
}

interface GraphProps {
  data: Point[];
  minDate: number;
  maxDate: number;
};

const Graph: React.FC<GraphProps> = props => {
  const {data, maxDate, minDate} = props;
  const ref = useRef(null);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const transition = useTransition(isFocused, {duration: 650});

  const numberOfMonths = new Date(maxDate - minDate).getMonth();

  const canvansWidth = wWidth - theme.spacing.m * 2;
  const canvansHeight = canvansWidth * aspectRatio
  const width = canvansWidth - theme.spacing.xl;
  const height = canvansHeight - theme.spacing.xl;

  const values = data.map(p => p.value);

  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const step = width / numberOfMonths;

  return (
    <Box marginTop="xl" paddingBottom='xl' paddingLeft='xl'>
      <Underlay step={step} minX={minDate} maxX={maxDate} minY={minY} maxY={maxY} />
      <Animated.View 
        style={{ width, height, overflow: 'hidden' }}
      >
        {
          data.map((point, i) => {
            const left = new Date(point.date - minDate).getMonth();
            const h = lerp(0, height, point.value / maxY);
            const currentHeight = multiply(h, transition);
            const translateY = divide(sub(h, currentHeight), 2);
            return (
              <AnimatedBox 
                key={point.date}
                position={"absolute"}
                left={left*step}
                bottom={0}
                width={step}
                height={h}
                style={{
                  transform: [{
                    translateY
                  },
                  {
                    scaleY: transition
                  }]
                }}
              >
                <View style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: theme.spacing.m,
                  right: theme.spacing.m,
                  backgroundColor: point.color,
                  opacity: 0.1,
                  borderTopLeftRadius: theme.borderRadii.m,
                  borderTopRightRadius: theme.borderRadii.m
                }} />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  height: 32,
                  left: theme.spacing.m,
                  right: theme.spacing.m,
                  backgroundColor: point.color,
                  borderRadius: theme.borderRadii.m,
                }} />
              </AnimatedBox>
            )
          })
        }
      </Animated.View>
    </Box>
  )
};

export default Graph;
