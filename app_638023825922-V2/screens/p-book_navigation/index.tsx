

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, interpolate, } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import styles from './styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BookInfo {
  title: string;
  author: string;
  shelfLocation: string;
  coverImage: string;
  status: string;
}

interface NavigationHint {
  icon: string;
  instruction: string;
  distance: string;
}

const BookNavigationScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 状态管理
  const [currentScale, setCurrentScale] = useState(0.8);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isVoiceNavActive, setIsVoiceNavActive] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  
  // 动画值
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);
  const dashOffset = useSharedValue(0);
  
  // 图书信息
  const [bookInfo] = useState<BookInfo>({
    title: '人工智能简史',
    author: '李开复 著',
    shelfLocation: 'TP18/LKF',
    coverImage: 'https://s.coze.cn/image/N9j3tVWg6vo/',
    status: '可借阅'
  });
  
  // 导航提示
  const navigationHints: NavigationHint[] = [
    {
      icon: 'arrow-up',
      instruction: '向前走 15 米',
      distance: '距离目标：约 30 米'
    },
    {
      icon: 'arrow-left',
      instruction: '左转，前往 A-F 类书架',
      distance: '距离目标：约 15 米'
    },
    {
      icon: 'magnifying-glass',
      instruction: '查找索书号 TP18/LKF',
      distance: '距离目标：已到达'
    }
  ];
  
  // 初始化动画
  React.useEffect(() => {
    // 脉冲动画
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      false
    );
    
    // 发光动画
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    );
    
    // 路径动画
    dashOffset.value = withRepeat(
      withTiming(-15, { duration: 2000 }),
      -1,
      false
    );
    
    // 导航提示更新
    const hintInterval = setInterval(() => {
      setCurrentHintIndex((prevIndex) => 
        (prevIndex + 1) % navigationHints.length
      );
    }, 8000);
    
    return () => clearInterval(hintInterval);
  }, []);
  
  // 动画样式
  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));
  
  const glowAnimatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
  }));
  
  const dashAnimatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: dashOffset.value,
  }));
  
  // 事件处理函数
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  
  const handleLocationPress = () => {
    Alert.alert('定位功能', '需要调用第三方接口实现GPS定位功能');
  };
  
  const handleZoomIn = () => {
    if (currentScale < 1.5) {
      setCurrentScale(prevScale => prevScale + 0.1);
    }
  };
  
  const handleZoomOut = () => {
    if (currentScale > 0.5) {
      setCurrentScale(prevScale => prevScale - 0.1);
    }
  };
  
  const handleRelocate = () => {
    Alert.alert('重新定位', '需要调用第三方接口实现重新定位功能');
  };
  
  const handleVoiceNavToggle = () => {
    setIsVoiceNavActive(prevState => !prevState);
    Alert.alert('语音导航', isVoiceNavActive ? '停止语音导航' : '开始语音导航');
  };
  
  // 拖拽手势
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const maxX = screenWidth / 2;
      const maxY = screenHeight / 2;
      setCurrentX(prevX => Math.max(-maxX, Math.min(maxX, prevX + event.translationX)));
      setCurrentY(prevY => Math.max(-maxY, Math.min(maxY, prevY + event.translationY)));
    });
  
  const currentHint = navigationHints[currentHintIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={18} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>书架导航</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleLocationPress}>
          <FontAwesome6 name="location-arrow" size={18} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 图书信息卡片 */}
        <View style={styles.bookInfoSection}>
          <View style={styles.bookInfoCard}>
            <Image source={{ uri: bookInfo.coverImage }} style={styles.bookCover} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle}>{bookInfo.title}</Text>
              <Text style={styles.bookAuthor}>{bookInfo.author}</Text>
              <Text style={styles.shelfLocation}>索书号：{bookInfo.shelfLocation}</Text>
            </View>
            <View style={styles.bookStatus}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{bookInfo.status}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* 图书馆地图区域 */}
        <View style={styles.mapSection}>
          <GestureDetector gesture={panGesture}>
            <View style={styles.mapContainer}>
              <Animated.View 
                style={[
                  styles.libraryMap,
                  {
                    transform: [
                      { scale: currentScale },
                      { translateX: currentX },
                      { translateY: currentY }
                    ]
                  }
                ]}
              >
                {/* 墙壁和区域标记 */}
                <View style={styles.walls}>
                  {/* 楼层区域划分 */}
                  <View style={styles.floorMarker}>
                    <Text style={styles.floorMarkerText}>一层阅览区</Text>
                  </View>
                  
                  {/* 书架区域 */}
                  <View style={[styles.bookshelfArea, styles.bookshelfArea1]}>
                    <Text style={styles.bookshelfText}>A-F类书架</Text>
                  </View>
                  
                  <View style={[styles.bookshelfArea, styles.bookshelfArea2]}>
                    <Text style={styles.bookshelfText}>G-L类书架</Text>
                  </View>
                  
                  <View style={[styles.bookshelfArea, styles.bookshelfArea3]}>
                    <Text style={styles.bookshelfText}>M-R类书架</Text>
                  </View>
                  
                  <View style={[styles.bookshelfArea, styles.bookshelfArea4]}>
                    <Text style={styles.bookshelfText}>S-Z类书架</Text>
                  </View>
                  
                  {/* 入口 */}
                  <View style={styles.entrance}>
                    <Text style={styles.entranceText}>入口</Text>
                  </View>
                  
                  {/* 用户当前位置 */}
                  <Animated.View style={[styles.userPosition, pulseAnimatedStyle]}>
                    <FontAwesome6 name="user" size={12} color="#ffffff" />
                  </Animated.View>
                  
                  {/* 目标书架位置 */}
                  <Animated.View style={[styles.targetPosition, glowAnimatedStyle]}>
                    <FontAwesome6 name="book" size={14} color="#ffffff" />
                  </Animated.View>
                  
                  {/* 导航路径 */}
                  <Svg style={styles.navigationPath} width="800" height="600">
                    <AnimatedComponent
                      component={Path}
                      style={dashAnimatedStyle}
                      d="M 400 550 Q 400 400 240 300 Q 180 250 240 200"
                      stroke="#6366f1"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                    />
                  </Svg>
                  
                  {/* 路径标记点 */}
                  <View style={styles.pathMarker1}>
                    <FontAwesome6 name="arrow-up" size={8} color="#ffffff" />
                  </View>
                  
                  <View style={styles.pathMarker2}>
                    <FontAwesome6 name="arrow-left" size={8} color="#ffffff" />
                  </View>
                </View>
              </Animated.View>
              
              {/* 缩放控制按钮 */}
              <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
                  <FontAwesome6 name="plus" size={16} color="#1f2937" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
                  <FontAwesome6 name="minus" size={16} color="#1f2937" />
                </TouchableOpacity>
              </View>
              
              {/* 重新定位按钮 */}
              <TouchableOpacity style={styles.relocateButton} onPress={handleRelocate}>
                <FontAwesome6 name="crosshairs" size={16} color="#1f2937" />
              </TouchableOpacity>
            </View>
          </GestureDetector>
        </View>
        
        {/* 导航提示区域 */}
        <View style={styles.navigationHints}>
          <View style={styles.hintHeader}>
            <Text style={styles.hintTitle}>导航指引</Text>
            <TouchableOpacity 
              style={[styles.voiceNavButton, isVoiceNavActive && styles.voiceNavButtonActive]} 
              onPress={handleVoiceNavToggle}
            >
              <FontAwesome6 
                name={isVoiceNavActive ? "volume-xmark" : "volume-high"} 
                size={14} 
                color="#ffffff" 
              />
              <Text style={styles.voiceNavText}>
                {isVoiceNavActive ? '停止语音' : '语音导航'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.currentHint}>
            <View style={styles.hintContent}>
              <View style={styles.hintIcon}>
                <FontAwesome6 name={currentHint.icon} size={18} color="#ffffff" />
              </View>
              <View style={styles.hintText}>
                <Text style={styles.hintInstruction}>{currentHint.instruction}</Text>
                <Text style={styles.hintDistance}>{currentHint.distance}</Text>
              </View>
              <View style={styles.hintDistanceIcon}>
                <FontAwesome6 name="route" size={18} color="#6366f1" />
              </View>
            </View>
          </View>
          
          <View style={styles.nextHints}>
            <View style={styles.nextHint}>
              <View style={styles.nextHintIcon}>
                <FontAwesome6 name="arrow-left" size={10} color="#6b7280" />
              </View>
              <Text style={styles.nextHintText}>左转，前往 A-F 类书架区域</Text>
            </View>
            <View style={styles.nextHint}>
              <View style={styles.nextHintIcon}>
                <FontAwesome6 name="magnifying-glass" size={10} color="#6b7280" />
              </View>
              <Text style={styles.nextHintText}>查找索书号 TP18/LKF</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 动画SVG组件
const AnimatedComponent = Animated.createAnimatedComponent(Svg);

export default BookNavigationScreen;

