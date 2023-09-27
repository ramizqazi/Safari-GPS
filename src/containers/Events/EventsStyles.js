// @flow

import { StyleSheet } from 'react-native';
import { Fonts } from '../../common/Fonts';
import { Colors } from '../../common/Colors';

/* list item styles
=========================================================================== */
const ListItemStyle = StyleSheet.create({
  ListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#efefef',
    marginVertical: 3,
    marginHorizontal: 5,
    borderRadius: 7
  },
  ListIcon: {
    fontSize: 40,
    color: Colors.primary
  },
  ListTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  TextStyle1: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
  },
  textStatus:{
    fontSize: 14,
    color: Colors.grey,
    fontFamily: Fonts.regular,
  },
  text:{
    fontSize: 16,
    color: Colors.darkGrey,
    fontFamily: Fonts.regular,
  }
});

/* export
============================================================================= */
export default ListItemStyle;
