// @flow

import * as React from 'react';
import { Text } from 'react-native';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* FLow Types
============================================================================= */

type ChildrenTypes = string | React.ChildrenArray<React.Element<typeof Text>>;

type Props = {
  numberOfLines?: ?number,
  bold?: boolean,
  italic?: boolean,
  color?: string,
  fontSize?: number,
  style: TextStyleProp,
  children: ChildrenTypes,
};

/* =============================================================================
<CText />
============================================================================= */
const CText = ({
  numberOfLines,
  bold,
  italic,
  color,
  fontSize,
  style,
  children,
}: Props) => (
  <Text
    numberOfLines={numberOfLines}
    style={[
      {
        color,
        fontSize,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
      },
      style,
    ]}
  >
    {children}
  </Text>
);

/* Default Props
============================================================================= */
CText.defaultProps = {
  numberOfLines: null,
  color: '#1E1E1E',
  bold: false,
  italic: false,
  fontSize: null,
};

/* Exports
============================================================================= */
export default CText;
