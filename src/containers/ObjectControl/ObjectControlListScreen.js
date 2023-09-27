import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '../../common/Container';
import Content from '../../common/Content';
import Div from '../../common/Div';
import Header from '../../common/Header';
import FlatList from '../../common/FlatList';
import Fab from '../../common/Fab';
import { translator } from '../../languages';
import { getSentCommands } from '../../actions/object_control_actions';
import ObjectControlListItem from './ObjectControlListItem';

const ObjectControlListScreen = props => {

  const { navigation } = props;

  useEffect(() => {
    _getData();
  }, []);

  const _getData = () => {
    const { token, language, getCommands } = props;
    getCommands(token, language);
  };

  const { loader, commandList } = props;

  const _moveToAdd = () => {
    navigation.navigate('ObjectControlForm');
  };

  return (
   <Container>
     <Header
        title={translator.OBJECT_CONTROL}
        leftIconOnPress={() => navigation.navigate("GeneralSettings")}
        leftIcon="arrow-back"
        rightIcon="add"
        rightIconOnPress={_moveToAdd}
      />
      
    
        <FlatList
          data={commandList}
          keyExtractor="cmd_id"
          style={{ padding: 10 }}
          refreshing={loader}
          onRefresh={_getData}
          renderItem={item => <ObjectControlListItem data={item} />}
        />

   </Container>
  );
};

const mapStateToProps = ({ Auth, Setting, ObjectControl }) => ({
  token: Auth.user.token,
  language: Setting.language,
  loader: ObjectControl.loader,
  commandList: ObjectControl.sentCommandsList,
});

const mapDispatchToProps = { getCommands: getSentCommands };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectControlListScreen);
