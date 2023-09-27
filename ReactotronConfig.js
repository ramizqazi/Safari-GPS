/** @format */
import Reactotron, { trackGlobalErrors, openInEditor } from "reactotron-react-native";

Reactotron.configure({ name: "Gps" });

Reactotron.useReactNative({
  asyncStorage: {
    ignore: ["secret"],
  },
});

Reactotron.use(openInEditor())
  .use(
    trackGlobalErrors({
      veto: frame => frame.fileName.indexOf("/node_modules/react-native/") >= 0,
    })
  );

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
