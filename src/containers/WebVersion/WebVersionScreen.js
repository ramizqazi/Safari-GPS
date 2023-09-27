// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import Container from '../../common/Container';
import Header from '../../common/Header';

import { translator } from '../../languages';

/* Flow types
============================================================================= */
type Props = {
  token: string,
  server_url: string,
  language: string,
  navigation: any,
};

/* =============================================================================
<WebVersionScreen />
============================================================================= */
const WebVersionScreen = (props): Props => {
  const { token, language, navigation, server_url } = props;

  return (
    <Container>
      <Header
        title={translator.INVOIVES}
        leftIconOnPress={() => navigation.navigate("GeneralSettings")}
        leftIcon='arrow-back'
      />
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${server_url}/mobile/?src=app&token=${token}&lan=${language}`,
        }}
      />
    </Container>
  );
};

/* Map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting }) => ({
  token: Auth.user.token,
  server_url: Auth.user.server_url,
  language: Setting.language,
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(WebVersionScreen);
