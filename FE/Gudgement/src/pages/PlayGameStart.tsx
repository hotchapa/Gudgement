import VolcanoMap from "../assets/images/volcanomap.png";
import Snake from "../assets/images/snake.png";
import PingPing from "../assets/images/pingping.png";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ImageSourcePropType,
  StatusBar,
} from "react-native";
import { CommonType } from "../types/CommonType";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import Reactotron from "reactotron-react-native";
import { queryClient } from "../../queryClient";
import Config from "react-native-config";

type PlayGameStartRouteProp = RouteProp<
  CommonType.RootStackParamList,
  "PlayGameStart"
>;

export default function PlayGameStart({
  route,
}: {
  route: PlayGameStartRouteProp;
}) {
  const { roomNumber } = route.params; // 추가

  // 가비지 컬렉션 방지를 위한 스테이트 변환처리
  const [enemyInfoState, setEnemyInfoState] = useState(null);
  const [myInfoState, setMyInfoState] = useState([null]);
  const [myCharacterState, setMyCharacterState] = useState(null);
  const [enemyCharacterState, setEnemyCharacterState] = useState(null);

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // 애니메이션 관련 변수
  const image1PositionX = useSharedValue(0);
  const image2PositionX = useSharedValue(0);
  const vsOpacity = useSharedValue(0);
  useEffect(() => {
    const fetchInfo = async () => {
      const enemyData = await queryClient.getQueryData(["enemyGameinfo"]);
      const myData = await queryClient.getQueryData(["myGameinfo"]);
      const myCharacter = await queryClient.getQueryData(["myCharacter"]);
      const enemyCharacter = await queryClient.getQueryData(["enemyCharacter"]);

      if (enemyData) {
        setEnemyInfoState(enemyData);
      }

      if (myData) {
        setMyInfoState(myData);
      }

      if (enemyCharacter) {
        setEnemyCharacterState(enemyCharacter);
      }

      if (myCharacter) {
        setMyCharacterState(myCharacter);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    StatusBar.setHidden(true);
    // 애니메이션 시작
    setTimeout(() => {
      image1PositionX.value = withTiming(-490, { duration: 3000 });
      vsOpacity.value = withTiming(1, { duration: 3000 });
      image2PositionX.value = withTiming(490, { duration: 3000 }, () => {
        runOnJS(setIsAnimationFinished)(true);
      });
    }, 100);

    // Navigate to another screen after animation finishes
    if (isAnimationFinished) {
      setTimeout(() => {
        navigation.navigate("PlayGameProgress", {
          roomNumber: roomNumber,
          nickName: myInfoState.nickname,
          myInfoState: myInfoState,
          enemyInfoState: enemyInfoState,
        });
      }, 5000);
    }
  }, [isAnimationFinished]);

  const animatedEnemyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: image1PositionX.value }],
  }));
  const animatedMyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: image2PositionX.value }],
  }));
  const animatedVsStyle = useAnimatedStyle(() => ({
    opacity: vsOpacity.value,
  }));

  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={volcanoMap}
        resizeMode="cover"
        className="flex-1"
      >
        {/* vs */}
        <Animated.Image
          style={[styles.vs, animatedVsStyle]}
          source={{ uri: `${Config.IMAGE_URL}/game/vs.png` }}
        />
        {/* 내 캐릭터 박스 */}
        <Animated.Image
          style={[styles.mycharacterbox, animatedMyStyle]}
          source={{ uri: `${Config.IMAGE_URL}/game/mybox.png` }}
        />
        <Animated.Image
          style={[styles.boxinmycharacter, animatedMyStyle]}
          source={{ uri: `${Config.IMAGE_URL}/character/${myCharacterState}` }}
        />
        {/* 내 칭호 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[24px] font-PretendardBold"
          style={[styles.mycharacterboxinaward, animatedMyStyle]}
        >
          첫걸음
        </Animated.Text>
        {/* 내 닉네임 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[36px] font-PretendardBold"
          style={[styles.mycharacterboxinname, animatedMyStyle]}
        >
          {myInfoState?.nickname}
        </Animated.Text>

        {/* 적 캐릭터 박스 */}
        <Animated.Image
          style={[styles.enemybox, animatedEnemyStyle]}
          source={{ uri: `${Config.IMAGE_URL}/game/enemybox.png` }}
        />
        <Animated.Image
          style={[styles.boxinenemy, animatedEnemyStyle]}
          source={{
            uri: `${Config.IMAGE_URL}/character/${enemyCharacterState}`,
          }}
        />
        {/* 적 칭호 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[24px] font-PretendardBold"
          style={[styles.enemyboxinaward, animatedEnemyStyle]}
        >
          어어어어
        </Animated.Text>
        {/* 적 닉네임 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[36px] font-PretendardBold"
          style={[styles.enemyboxinname, animatedEnemyStyle]}
        >
          {enemyInfoState?.nickname}
        </Animated.Text>
        <Image
          style={styles.mycharacter}
          source={{
            uri: `${Config.IMAGE_URL}/character/${myCharacterState}`,
          }}
        />
        <Image
          style={styles.enemy}
          source={{
            uri: `${Config.IMAGE_URL}/character/${enemyCharacterState}`,
          }}
        />
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
