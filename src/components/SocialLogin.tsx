import React from 'react';

import Svg, { Path } from "react-native-svg"
import {Box, useTheme} from './Theme';


function GoogleSVG() {
  return (
    <Svg height={20} viewBox="0 0 512 512" width={20}>
      <Path
        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
        fill="#fbbd00"
      />
      <Path
        d="M256 392l-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
        fill="#0f9d58"
      />
      <Path
        d="M139.131 325.477l-86.308 86.308a260.085 260.085 0 0022.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
        fill="#31aa52"
      />
      <Path
        d="M512 256a258.24 258.24 0 00-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 01-51.884 55.638l86.216 86.216a260.085 260.085 0 0025.235-22.158C485.371 388.667 512 324.38 512 256z"
        fill="#3c79e6"
      />
      <Path
        d="M352.167 159.833l10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
        fill="#cf2d48"
      />
      <Path
        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 00-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
        fill="#eb4132"
      />
    </Svg>
  )
}

function FaceBookSVG() {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24}>
    <Path
      d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0 8.064 0 9.95 7.85 9.674 9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877c.188-2.824-.761-5.016 2.051-5.016z"
      fill="#3b5999"
    />
  </Svg>
  )
}

const SocialIcon = ({children}) => {
  const theme = useTheme();
  const SIZE = theme.borderRadii.l * 2;

  return (
    <Box backgroundColor="background" width={SIZE} height={SIZE} borderRadius="l" justifyContent="center" alignItems="center" marginHorizontal="s">
      {children}
    </Box>
  )
}

const SocialLogin = () => {
  return (
    <Box flexDirection="row" justifyContent="center" marginHorizontal="s">
      <SocialIcon>
        <FaceBookSVG />
      </SocialIcon>
      <SocialIcon>
        <GoogleSVG />
      </SocialIcon>
      <SocialIcon>
        <FaceBookSVG />
      </SocialIcon>
    </Box>
  );
}

export default SocialLogin;
