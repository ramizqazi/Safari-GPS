import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from './Fonts';

type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;
type Props = {
  visible: boolean,
  animationType: string,
  headerBorder?: boolean,
  headerBackgroundColor?: string,
  headerFontColor?: string,
  paddingHorizontal?: number,
  paddingVertical?: number,
  title: string,
  onClose: Function,
  children: ReactNodeWithoutString,
};

const Dialog = ({
  visible,
  animationType,
  headerBorder,
  headerBackgroundColor,
  headerFontColor,
  paddingHorizontal,
  paddingVertical,
  title,
  onClose,
  children,
}: Props) => (
  <Modal
    visible={visible}
    animationType={animationType}
    transparent
    onRequestClose={() => null}
  >
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 22 : 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 20,
        paddingVertical: 50,
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          borderTopLeftRadius: headerBorder ? 10 : 0,
          borderTopRightRadius: headerBorder ? 10 : 0,
          alignItems: 'center',
          backgroundColor: headerBackgroundColor,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 15,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{ color: headerFontColor, fontFamily: Fonts.semiBold, fontSize: 15 }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 10,
            paddingVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="close"
            style={{
              color: headerFontColor,
              fontSize: 22,
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={[{ backgroundColor: '#FFFFFF' }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal,
              paddingVertical,
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

Dialog.defaultProps = {
  headerBorder: true,
  headerBackgroundColor: '#0e59f7',
  headerFontColor: '#FFFFFF',
  paddingHorizontal: 10,
  paddingVertical: 15
};

export default Dialog;
