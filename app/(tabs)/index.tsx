import { SafeAreaView, StyleSheet, View } from "react-native";

import * as WebBrowser from "expo-web-browser";
import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import { useRef, useState } from "react";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import QRCodeButton from "@/components/QRCodeButton";
import CameraTools from "@/components/CameraTools";
import PictureView from "@/components/PictureView";
export default function HomeScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cameraZoom, setCameraZoom] = useState<number>(1);
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");

  const [picture, setPicture] = useState<string>('');
  async function  handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  };

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }
  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (scanningResult.data) {
      setQrCodeDetected(scanningResult.data);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  };
  console.log(cameraTorch);
  if (isBrowsing) return <></>;
  if (picture) return <PictureView  picture={picture} setPicture={setPicture}/>
  return (
    <View style={{ flex: 1, backgroundColor: "yellow" }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        zoom={cameraZoom}
        facing={cameraFacing}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        onBarcodeScanned={handleBarcodeScanned}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{flex: 1}}>
          {qrCodeDetected ? (
            <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
          ) : null}
          <CameraTools
            cameraFlash={cameraFlash}
            cameraTorch={cameraTorch}
            cameraZoom={cameraZoom}
            setCameraFacing={setCameraFacing}
            setCameraFlash={setCameraFlash}
            setCameraTorch={setCameraTorch}
            setCameraZoom={setCameraZoom}
          />
          <MainRowActions
            cameraMode={cameraMode}
            isRecording={false}
            handleTakePicture={handleTakePicture}
          ></MainRowActions>
          <BottomRowTools
            cameraMode={cameraMode}
            setCameraMode={setCameraMode}
          />
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

