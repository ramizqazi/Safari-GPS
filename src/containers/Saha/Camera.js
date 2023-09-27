import React, { useState, useEffect, useRef } from "react";
import { Alert, Dimensions, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const CameraScreen = ({ type, setRuhsat, onClose }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(
    () => {
      if (hasPermission === false) {
        Toast.show({
          type: "error",
          text1: "Lütfen Kamera Erişimi İçin İzin Verin!",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    },
    [hasPermission]
  );

  const takePicture = async () => {
    if (!cameraRef) return;
    const { base64 } = await cameraRef.current.takePictureAsync({
      quality: 0.5,
      base64: true,
    });

    let base64Data = base64.toString().replace(" ", "+");
    console.log(base64Data.length)
    base64Data = `data:image/jpg;base64,${base64Data}`;

    //console.log(base64Data);

    if (type === "ruhsat") {
      setRuhsat(base64Data);
    } else {
      Alert.alert("Hata", "Kamera Tipi Belirlenemedi!");
    }
    onClose();
  };

  if (hasPermission === null) {
    return <Div />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <Div
        style={{
          position: "absolute",
          bottom: 0,
          top: 0,
          right: 0,
          width,
          height,
          backgroundColor: Colors.danger,
        }}
      >
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flexGrow: 1, width, height }}
          ref={cameraRef}
          ratio="16:9"
        />
      </Div>
      <Div
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
          activeOpacity={0.6}
          style={{
            width: 70,
            height: 70,
            bottom: 30,
            borderRadius: 50,
            backgroundColor: "#fff",
            zIndex: 50,
          }}
        />
      </Div>
    </>
  );
};

export default CameraScreen;
