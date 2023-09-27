import { StyleSheet } from 'react-native';
import { Colors } from '../../common/Colors';
import { Div } from '../../common/Div';
import { Fonts } from '../../common/Fonts';


const styles = StyleSheet.create({
  ContainerStyle: {
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
  },
  ContainerBox: {
    position: 'absolute',
    top: 30,
    right: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 30
  },
  LogoImgStyle: {
    alignSelf: 'center',
    marginTop: 40,
    height: 150,
    width: 250,
  },
  FormContainer: { padding: 20 },
  ButtonStyle: {
    marginTop: 15,
    marginBottom: 25,
    backgroundColor: Colors.primary,
  },
  error: {
    marginBottom: 15,
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.danger,
    borderRadius: 20,
    color: Colors.white,
    fontSize: 15,
    fontFamily: Fonts.regular,
  }
});

/* exports
============================================================================= */
export default styles;
