// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* FLow Types 
============================================================================= */
type Props = {
  icon: string,
  message?: string,
  desc?: string,
  retryBtn?: boolean,
  retryBtnName?: string,
  retryBtnPress?: Function,
};

/* =============================================================================
<MessageView />
============================================================================= */
const MessageView = ({
  icon,
  message,
  desc,
  retryBtn,
  retryBtnName,
  retryBtnPress,
}: Props) => (
  <View
    style={{
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icon
      name={icon}
      size={80}
      color="#9C9C9C"
      style={{ marginVertical: 10 }}
    />
    <View style={{ alignItems: 'center', paddingHorizontal: 60 }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 19,
          fontWeight: 'bold',
          marginVertical: 2,
          textAlign: 'center',
          color: '#656565',
        }}
      >
        {message}
      </Text>
      <Text style={{ textAlign: 'center', color: '#9C9C9C' }}>{desc}</Text>
    </View>
    {retryBtn && (
      <TouchableOpacity
        onPress={retryBtnPress}
        activeOpacity={0.5}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
          borderWidth: 0.5,
          borderColor: '#656565',
          marginVertical: 10,
        }}
      >
        <Text style={{ color: '#656565' }}>{retryBtnName}</Text>
      </TouchableOpacity>
    )}
  </View>
);

/* Default props
============================================================================= */
MessageView.defaultProps = {
  message: '',
  desc: '',
  retryBtn: null,
  retryBtnName: '',
  retryBtnPress: () => {},
};

/* Export
============================================================================= */
export default MessageView;
