import { CommonActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
