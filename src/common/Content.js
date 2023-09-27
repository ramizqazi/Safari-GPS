// @flow

import * as React from 'react';
import { View, ScrollView } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* Flow Types
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;

type Props = {
  ScrollViewStyle?: Object,
  padding?: number,
  paddingHorizontal?: ?number,
  paddingVertical?: ?number,
  backgroundColor?: string,
  justifyContent?: ?string,
  alignItems?: ?string,
  center?: boolean,
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
};

/* =============================================================================
<Content />
============================================================================= */
const Content = ({
  ScrollViewStyle,
  padding,
  paddingHorizontal,
  paddingVertical,
  justifyContent,
  alignItems,
  backgroundColor,
  center,
  style,
  children,
}: Props) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={ScrollViewStyle}>
      <View
        style={[
          {
            flex: 1,
            padding,
            paddingHorizontal,
            paddingVertical,
            backgroundColor,
            justifyContent: center ? 'center' : justifyContent,
            alignItems: center ? 'center' : alignItems,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  </View>
);

/* Default Props
============================================================================= */
Content.defaultProps = {
  ScrollViewStyle: {},
  padding: 0,
  paddingHorizontal: null,
  paddingVertical: null,
  justifyContent: undefined,
  alignItems: undefined,
  center: false,
  backgroundColor: '#FFF',
  style: {},
};

/* Exports
============================================================================= */
export default Content;
