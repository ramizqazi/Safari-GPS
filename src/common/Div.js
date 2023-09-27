// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* @flow
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;

type Props = {
  flex?: number,
  center?: boolean,
  alignItems?: string,
  justifyContent?: string,
  padding?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  margin?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  backgroundColor?: string,
  shadow?: boolean,
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
};

/* Constant Shadow properties
============================================================================= */
const shadowObj = {
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.8,
  elevation: 3,
};

/* =============================================================================
<Div />
============================================================================= */
const Div = ({
  flex,
  center,
  alignItems,
  justifyContent,
  padding,
  paddingVertical,
  paddingHorizontal,
  margin,
  marginVertical,
  marginHorizontal,
  backgroundColor,
  shadow,
  style,
  children,
}: Props) => (
  <View
    style={[
      {
        flex,
        padding,
        paddingVertical,
        paddingHorizontal,
        margin,
        marginVertical,
        marginHorizontal,
        backgroundColor,
        alignItems: center ? 'center' : alignItems,
        justifyContent: center ? 'center' : justifyContent,
      },
      shadow && shadowObj,
      style,
    ]}
  >
    {children}
  </View>
);

/* Default Props
============================================================================= */
Div.defaultProps = {
  flex: 0,
  center: false,
  justifyContent: undefined,
  alignItems: undefined,
  padding: null,
  paddingVertical: null,
  paddingHorizontal: null,
  margin: null,
  marginVertical: null,
  marginHorizontal: null,
  backgroundColor: 'transparent',
  shadow: false,
  style: {},
};

/* Exports
============================================================================= */
export default Div;
