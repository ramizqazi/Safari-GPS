import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Container from "../../common/Container";
import Div from "../../common/Div";
import Header from "../../common/Header";
import Span from "../../common/Span";
import InputText from "../../common/InputText";
import style from "./Style";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "../../common/Fonts";
import SearchSelect from "../../common/SearchSelect";
import axios from "axios";
import { translator } from "../../languages";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const SahaEkle = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanImei, setScanImei] = useState(true);
  const [imei, setImei] = useState("");
  const [ticket, setTicket] = useState("");
  const [sim, setSim] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [model, setModel] = useState(null);
  const [sims, setSims] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [models, setModels] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    getSims();
    getCustomers();
    getModels();
  }, []);

  const handleTicket = useCallback(
    (e) => {
      if (e.length <= 4) {
        setTicket(e);
      } else {
        Toast.show({
          type: "error",
          text1: "Ticket max 4 karakter olmalıdır.",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    },
    [setTicket]
  );

  const getSims = useCallback(
    async () => {
      const { data } = await axios.get(
        "https://tr1.safari-gps.live/saha/saha.php?op=getSIM"
      );
      setSims(data);
    },
    [setSims]
  );

  const getCustomers = useCallback(
    async () => {
      const { data } = await axios.get(
        "https://tr1.safari-gps.live/saha/saha.php?op=getCustomers"
      );
      setCustomers(data);
    },
    [setCustomers]
  );

  const getModels = useCallback(
    async () => {
      const { data } = await axios.get(
        "https://tr1.safari-gps.live/saha/saha.php?op=getModels"
      );
      setModels(data);
    },
    [setModels]
  );

  const handleImeiScanned = useCallback(
    ({ type, data }) => {
      setScanImei(true);
      setImei(data);
    },
    [setImei, setScanImei]
  );

  if (hasPermission === null) {
    return <Text>Kamera erişimine izin ver</Text>;
  }
  if (hasPermission === false) {
    return <Text>kamera erişimin yok. ayarlara git aç.</Text>;
  }

  const send = async () => {
    if (imei === "") {
      Toast.show({
        type: "error",
        text1: "IMEI alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (!model) {
      Toast.show({
        type: "error",
        text1: "Model alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (ticket === "") {
      Toast.show({
        type: "error",
        text1: "Ticket alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }

    try {
      const t_number = `T ${ticket}`;

      const { data } = await axios.post(
        `https://tr1.safari-gps.live/saha/saha.php?op=addDevice`,
        {
          imei,
          model_id: model.ID,
          t_number,
          sim_id: sim?.ID || 0,
          customer_id: customer?.ID || 0,
        }
      );

      if (data.status === "OK") {
        Toast.show({
          type: "success",
          text1: "Başarılı!",
          visibilityTime: 2000,
          autoHide: true,
        });

        navigation.goBack();
      } else if (data.status === "FAILED") {
        Toast.show({
          type: "error",
          text1: "Bir Hata Meydana Geldi!",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Bir Hata Meydana Geldi!",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <Container>
      <Header
        leftIconOnPress={() => navigation.navigate("GeneralSettings")}
        leftIcon="arrow-back"
      />

      <Div style={{ zIndex: 5 }}>
        <Toast />
      </Div>

      {!scanImei && (
        <TouchableOpacity
          style={style.closeBtn}
          onPress={() => {
            setScanImei(true);
          }}
        >
          <Ionicons name="close-outline" size={30} color="#000" />
        </TouchableOpacity>
      )}

      {!scanImei && (
        <BarCodeScanner
          onBarCodeScanned={scanImei ? undefined : handleImeiScanned}
          style={{ zIndex: 2, height, width }}
        />
      )}

      <Div padding={15}>
        <Div>
          <InputText
            placeholder="1234"
            label="T Numarası Giriniz"
            borderRadius={10}
            value={ticket}
            onChangeText={handleTicket}
            iconText="T"
            iconName=" "
          />
        </Div>

        <Div>
          <InputText
            placeholder="IMEI Numarası"
            label="IMEI Numarası Giriniz"
            value={imei}
            onChangeText={(e) => setImei(e)}
            borderRadius={10}
          />
        </Div>

        <Div marginVertical={10}>
          <SearchSelect data={sims} title="Sim Seç" selectedItem={setSim} />
        </Div>

        <Div marginVertical={10}>
          <SearchSelect
            data={customers}
            title="Müşteri Seç"
            selectedItem={setCustomer}
          />
        </Div>

        <Div marginVertical={10}>
          <SearchSelect
            data={models}
            title="Model Seç"
            selectedItem={setModel}
          />
        </Div>

        <Div marginVertical={10}>
          <TouchableOpacity
            style={style.button}
            activeOpacity={0.6}
            onPress={() => setScanImei(false)}
          >
            <Text style={style.buttonText}>IMEI Okut</Text>
          </TouchableOpacity>
        </Div>

        <Div marginVertical={10}>
          <TouchableOpacity
            style={[style.button, style.buttonSave]}
            activeOpacity={0.6}
            onPress={send}
          >
            <Text style={[style.buttonText, { color: "#fff" }]}>Kaydet</Text>
            <Ionicons name="save-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

export default SahaEkle;
