import * as React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import { CameraMode } from "expo-camera";
import { Colors } from "@/constants/Colors";
import CustomIcon from "./CustomIcon";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}
export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();

    // Recents album
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recentsd"),
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        inverted
        keyExtractor={(item) => item.id }
  
        renderItem={({ item, index }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{
              height: 40,
              width: 40,
              borderRadius: 5,
            }}
          />
        )}
        horizontal
        contentContainerStyle={{ gap: 6 }}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <CustomIcon name={'checkbox-blank-circle-outline'} lib="MaterialCommunity" size={80} color="white"/>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 4].map((item) => (
        <CustomIcon key={item} name={'smileo'} lib="Ant" size={30} color="white"/>

        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    bottom: 45,
  },
});