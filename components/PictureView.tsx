import { Image } from "expo-image";
import { Alert, Pressable, View } from "react-native";
import { shareAsync } from "expo-sharing";
import { saveToLibraryAsync } from "expo-media-library";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CustomIcon from "./CustomIcon";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}
export default function PictureView({ picture, setPicture }: PictureViewProps) {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={{
          position: "absolute",
          right: 6,
          zIndex: 1,
          paddingTop: 50,
          gap: 16,
        }}
      >
        <Pressable
          onPress={async () => {
            saveToLibraryAsync(picture);
            Alert.alert("✅ Picture saved!");
          }}
          
        >
            <CustomIcon name={"save"} lib="Ant" size={16} />
  
        </Pressable>
        <Pressable
          onPress={() => setPicture("")}
        >
            <CustomIcon name={"trash"} lib="Ant" size={16} />
        </Pressable>
        <Pressable
          onPress={() => setPicture("")}
        >
            <CustomIcon name={"trash"} lib="Ant" size={16} />
        </Pressable>
        <Pressable
          onPress={() => setPicture("")}
        >
            <CustomIcon name={"trash"} lib="Ant" size={16} />
        </Pressable>
        <Pressable
          onPress={async () => await shareAsync(picture)}
        >
            <CustomIcon name={"share"} lib="Ant" size={16} />
        </Pressable>
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 50,
          left: 6,
        }}
      >
        <Pressable
          onPress={() => setPicture("")}
        >
            <CustomIcon name={"camera-reverse"} lib="MaterialCommunity" size={32} />
        </Pressable>
      </View>
      <Image
        source={picture}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      />
    </Animated.View>
  );
}