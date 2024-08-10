import { StyleSheet, View } from "react-native";


import * as WebBrowser from "expo-web-browser";
import { BarcodeScanningResult, CameraMode, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import QRCodeButton from "@/components/QRCodeButton";
export default function HomeScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>('picture');
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
 const [isBrowsing, setIsBrowsing] = useState<boolean>(false)
  const handleTakePicture = () => {

  }

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
  }
  return (
    <View style={{ flex: 1 }}>
      <CameraView
       ref={cameraRef}
       mode={cameraMode}
       barcodeScannerSettings={{
        barcodeTypes: ['qr']
       }}
       onBarcodeScanned={handleBarcodeScanned}
        style={{flex: 1}} 
     
     >
      {qrCodeDetected ? <QRCodeButton handleOpenQRCode={handleOpenQRCode}/>: null}
        <MainRowActions cameraMode={cameraMode} isRecording={false} handleTakePicture={handleTakePicture}></MainRowActions>
        <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} />
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

