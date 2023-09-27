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
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
};

/* =============================================================================
<Span />
============================================================================= */
const Span = ({
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
  style,
  children,
}: Props) => (
  <View
    style={[
      {
        flex,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: center ? 'center' : alignItems,
        justifyContent: center ? 'center' : justifyContent,
        padding,
        paddingVertical,
        paddingHorizontal,
        margin,
        marginVertical,
        marginHorizontal,
        backgroundColor,
      },
      style,
    ]}
  >
    {children}
  </View>
);

/* Default Props
============================================================================= */
Span.defaultProps = {
  flex: 0,
  center: false,
  alignItems: 'center',
  justifyContent: undefined,
  padding: null,
  paddingVertical: null,
  paddingHorizontal: null,
  margin: null,
  marginVertical: null,
  marginHorizontal: null,
  backgroundColor: 'transparent',
  style: {},
};

/* Exports
============================================================================= */
export default Span;
