import { Pressable, View } from "react-native";
import { FlashMode } from "expo-camera";
import CustomIcon from "./CustomIcon";

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}
export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  const handleCameraTorch = () => {
    console.log(123);
    
    setCameraTorch((prevValue) => !prevValue)
  }
  return (
    <View
      style={{
        position: "absolute",
        right: 20,
        zIndex: 1,
        gap: 16,
        top: 50
      }}
    >
      <Pressable onPress={() => handleCameraTorch()}>
        <CustomIcon name={cameraTorch ? "flash": 'flash-off' } lib="Ionicons" size={16} />
      </Pressable>

      <Pressable
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
      >
        <CustomIcon name={"camera"} lib="Ionicons" size={16} />
      </Pressable>

      <Pressable
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
      >
        <CustomIcon name={"flash"} lib="Awesome" size={16} />
      </Pressable>

      <Pressable
        onPress={() => {
          // increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
          }
        }}
      >
        <CustomIcon name={"pluscircle"} lib="Ant" size={16} />
      </Pressable>

      <Pressable
        onPress={() => {
          // decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
          }
        }}
      >
        <CustomIcon name={"minuscircle"} lib="Ant" size={16} />
      </Pressable>
    </View>
  );
}
