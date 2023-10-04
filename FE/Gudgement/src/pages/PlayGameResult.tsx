import VolcanoMap from "../assets/images/volcanomap.png";
import Snake from "../assets/images/snake.png";
import PingPing from "../assets/images/pingping.png";
import React, { useEffect, useRef, useState } from "react";
import GameUi from "../components/GameUi";
import GameBettingSyetem from "../components/GameBettingSyetem";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ImageSourcePropType,
  StatusBar,
} from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { queryClient } from "../../queryClient";

export default function PlayGameResult({ route }) {
  const { roomNumber, rounds, result } = route.params;

  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;
  const snake: ImageSourcePropType = Snake as ImageSourcePropType;
  const pingping: ImageSourcePropType = PingPing as ImageSourcePropType;
  const myData = queryClient.getQueryData(["myGameinfo"]);
  const enemyData = queryClient.getQueryData(["enemyGameinfo"]);

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={volcanoMap}
        resizeMode="cover"
        className="flex-1"
      >
        <GameUi />

        <Image style={styles.mycharacter} source={pingping} />
        <Image style={styles.enemy} source={snake} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  buttonwrapper: {
    flex: 1,
    top: "60%",
    left: "50.5%",
  },
  infomessage: {
    bottom: "100%",
    zIndex: 20,
  },
  mycharacterbox: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "50%",
    left: "-123%",
    bottom: 100,
    zIndex: 12,
  },
  vs: {
    position: "absolute",
    width: 200,
    height: 148,
    top: "38%",
    left: "30%",
    zIndex: 15,
  },
  mycharacterboxinname: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "60%",
    left: "-118%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  mycharacterboxinaward: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "56%",
    left: "-118%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  boxinmycharacter: {
    position: "absolute",
    width: 120,
    height: 100,
    top: "55%",
    left: "-123%",
    bottom: 100,
    zIndex: 13,
  },
  enemybox: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "10%",
    right: "-123%",
    bottom: 100,
    zIndex: 12,
  },

  boxinenemy: {
    position: "absolute",
    width: 130,
    height: 130,
    top: "12%",
    right: "-123%",
    bottom: 100,
    zIndex: 13,
  },
  enemyboxinname: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "20%",
    right: "-115%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  enemyboxinaward: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "16%",
    right: "-115%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  mycharacter: {
    position: "absolute",
    width: 92,
    height: 67,
    top: "80%",
    right: "30%",
    bottom: 100,
    zIndex: 10,
  },
  loadingtext: {
    position: "absolute",
    top: "40%",
    right: "10%",
  },
  loadingtextkr: {
    position: "absolute",
    top: "48%",
    right: "12.5%",
  },
  enemy: {
    position: "absolute",
    width: 79,
    height: 79,
    bottom: "89%",
    right: "40%",
    zIndex: 10,
  },

  bluecard: {
    flex: 1,
    top: 140,
    position: "absolute",
    justifyContent: "center",
    width: 306,
    height: 343,
    right: 0,
    left: "13%",
  },
  queuebox: {
    flex: 1,
    bottom: 140,
    position: "absolute",
    justifyContent: "center",
    width: 180,
    height: 66,
    alignItems: "center",
    left: "20%",
  },
  bluFin: {
    position: "absolute",
    bottom: 200,
    right: 0,
    width: 200,
    height: 200,
  },
  elapsedTimeText: {
    top: "73%",
    zIndex: 9,
    left: "6%",
  },
  closebutton: {
    position: "absolute",
    width: "5%",
    height: "5%",
    right: "15%",
    top: "70%",
    zIndex: 13,
  },
});
