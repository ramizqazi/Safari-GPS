// @flow

import { StyleSheet, Platform } from 'react-native';

/*  styles
=========================================================================== */
const styles = StyleSheet.create({
  TooltipContainer: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        paddingBottom: 20,
        bottom: 0,
        left: -140,
      },
      android: {
        position: 'relative',
        paddingBottom: 20,
      },
    }),
  },
  TooltipInnerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  TooltipPin: {
    position: 'absolute',
    bottom: -7,
    left: '40%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 30,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    transform: [{ rotate: '180deg' }],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
  },
  Left: {
    width: 120,
  },
  Right: {
    width: 150,
  },
});

/* export
============================================================================= */
export default styles;
