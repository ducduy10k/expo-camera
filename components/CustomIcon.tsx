
import {default as IconAD} from '@expo/vector-icons/AntDesign';
import {default as IconFA} from '@expo/vector-icons/FontAwesome';
import {default as IconFA6} from '@expo/vector-icons/FontAwesome6';
import {default as IconMCI} from '@expo/vector-icons/MaterialCommunityIcons';
import {default as IconF} from '@expo/vector-icons/Fontisto';
import {default as IconO} from '@expo/vector-icons/Octicons';
import {default as IconI} from '@expo/vector-icons/Ionicons';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type LibCustomIconType =  'Ant' | 'Awesome' | 'Awesome6' | 'MaterialCommunity' | 'Octicons' | 'Fontisto' | 'Ionicons' ;

interface IconProps {
  color: string,
  name: any,
  size: number,
  style: any,
}

type CustomIconProps = Partial<IconProps> & {
  lib?: LibCustomIconType;
};


export const getIcon = ({
  lib,
  color,
  name,
  size,
  style,
}: Partial<IconProps> & {
  lib?: LibCustomIconType;
}): React.ReactNode => {
  switch (lib) {
    case 'Ant':
      return <IconAD name={name} size={size} color={color} style={style} />;
    case 'Awesome': {
      return <IconFA name={name} size={size} color={color} style={style} />;
    }
    case 'Awesome6': {
      return <IconFA6 name={name} size={size} color={color} style={style} />;
    }
    case 'MaterialCommunity': {
      return <IconMCI name={name} size={size} color={color} style={style} />;
    }
    case 'Octicons': {
      return <IconO name={name} size={size} color={color} style={style} />;
    }
    case 'Fontisto': {
      return <IconF name={name} size={size} color={color} style={style} />;
    }
    case 'Ionicons': {
      return <IconI name={name} size={size} color={color} style={style} />;
    }
    default:
      return <IconI name={name} size={size} color={color} style={style} />;
  }
};

export const CustomIcon = (props: CustomIconProps): React.ReactNode => {
  return  getIcon(props)
};

export default CustomIcon;
