

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, interpolate, } from 'react-native-reanimated';
import styles from './styles';

const { width: screenWidth } = Dimensions.get('window');

interface BannerItem {
  id: string;
  title: string;
  content: string;
  time: string;
  gradientColors: [string, string, ...string[]];
  targetScreen?: string;
  targetId?: string;
}

interface QuickFeature {
  id: string;
  title: string;
  icon: string;
  targetScreen: string;
}

interface RecommendationItem {
  id: string;
  type: 'location' | 'book' | 'event';
  title: string;
  subtitle?: string;
  description?: string;
  status?: string;
  statusColor?: string;
  icon: string;
  iconColor: string;
  targetScreen?: string;
  targetId?: string;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isTemporaryLeave, setIsTemporaryLeave] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(0);
  const [notificationCount] = useState(3);
  
  const countdownTimerRef = useRef<number | null>(null);
  const bannerTimerRef = useRef<number | null>(null);
  const bannerTranslateX = useSharedValue(0);

  const bannerData: BannerItem[] = [
    {
      id: '1',
      title: '图书馆开放时间调整通知',
      content: '为了更好地服务读者，图书馆将延长开放时间至22:00',
      time: '2小时前',
      gradientColors: ['#f093fb', '#f5576c'],
      targetScreen: '/p-announcement_detail',
      targetId: '789',
    },
    {
      id: '2',
      title: '学术论文写作讲座',
      content: '专业导师指导，提升论文写作技巧',
      time: '明天 19:00',
      gradientColors: ['#4facfe', '#00f2fe'],
      targetScreen: '/p-event_detail',
      targetId: '456',
    },
    {
      id: '3',
      title: '新书上架通知',
      content: '人工智能、机器学习等领域新书已上架',
      time: '1天前',
      gradientColors: ['#06b6d4', '#6366f1'],
      targetScreen: '/p-announcement_detail',
      targetId: '101112',
    },
  ];

  const quickFeatures: QuickFeature[] = [
    { id: '1', title: '座位预约', icon: 'chair', targetScreen: '/p-seat_map' },
    { id: '2', title: '图书搜索', icon: 'book', targetScreen: '/p-book_search' },
    { id: '3', title: '书架导航', icon: 'map-marker-alt', targetScreen: '/p-book_search' },
    { id: '4', title: '智能问答', icon: 'robot', targetScreen: '/p-intellectual_qna' },
  ];

  const recommendations: RecommendationItem[] = [
    {
      id: '1',
      type: 'location',
      title: '最优学习位置',
      subtitle: '三层静音区',
      description: '安静 · 温度适宜 · 有电源',
      status: '空闲',
      statusColor: '#10b981',
      icon: 'map-marker-alt',
      iconColor: '#6366f1',
      targetScreen: '/p-recommendation',
    },
    {
      id: '2',
      type: 'book',
      title: '人工智能简史',
      subtitle: '李开复 著',
      status: '可借阅',
      statusColor: '#10b981',
      icon: 'fire',
      iconColor: '#f59e0b',
      targetScreen: '/p-book_detail',
      targetId: '123',
    },
    {
      id: '3',
      type: 'event',
      title: '学术论文写作讲座',
      subtitle: '明天 19:00 - 21:00',
      description: '一层报告厅',
      icon: 'calendar-alt',
      iconColor: '#06b6d4',
      targetScreen: '/p-event_detail',
      targetId: '456',
    },
  ];

  useEffect(() => {
    startBannerTimer();
    return () => {
      if (bannerTimerRef.current) {
        clearInterval(bannerTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  const startBannerTimer = () => {
    bannerTimerRef.current = setInterval(() => {
      goToNextBanner();
    }, 5000) as unknown as number;
  };

  const goToNextBanner = () => {
    const nextIndex = (currentBannerIndex + 1) % bannerData.length;
    setCurrentBannerIndex(nextIndex);
    bannerTranslateX.value = withTiming(-nextIndex * screenWidth, { duration: 500 });
  };

  const goToBannerIndex = (index: number) => {
    setCurrentBannerIndex(index);
    bannerTranslateX.value = withTiming(-index * screenWidth, { duration: 500 });
    
    if (bannerTimerRef.current) {
      clearInterval(bannerTimerRef.current);
    }
    startBannerTimer();
  };

  const handleSearchPress = () => {
    router.push('/p-book_search');
  };

  const handleNotificationPress = () => {
    // 这里可以跳转到通知中心页面
    console.log('跳转到通知中心');
  };

  const handleBannerPress = (item: BannerItem) => {
    if (item.targetScreen) {
      router.push(`${item.targetScreen}${item.targetId ? `?id=${item.targetId}` : ''}`);
    }
  };

  const handleQuickFeaturePress = (feature: QuickFeature) => {
    router.push(feature.targetScreen);
  };

  const handleMyBookingPress = () => {
    router.push('/p-my_bookings');
  };

  const handleViewAllBookingsPress = () => {
    router.push('/p-my_bookings');
  };

  const handleTemporaryLeavePress = () => {
    if (isTemporaryLeave) {
      setIsTemporaryLeave(false);
      setLeaveCountdown(0);
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    } else {
      setIsTemporaryLeave(true);
      setLeaveCountdown(30 * 60); // 30分钟
      
      countdownTimerRef.current = setInterval(() => {
        setLeaveCountdown((prev) => {
          if (prev <= 1) {
            setIsTemporaryLeave(false);
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    }
  };

  const handleRecommendationPress = (item: RecommendationItem) => {
    if (item.targetScreen) {
      router.push(`${item.targetScreen}${item.targetId ? `?id=${item.targetId}` : ''}`);
    }
  };

  const handleViewMoreRecommendationsPress = () => {
    router.push('/p-recommendation');
  };

  const formatCountdown = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const bannerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: bannerTranslateX.value }],
    };
  });

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerCarousel}>
        <Animated.View style={[styles.bannerSlideContainer, bannerAnimatedStyle]}>
          {bannerData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.bannerSlide}
              onPress={() => handleBannerPress(item)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bannerGradient}
              >
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerContent}>{item.content}</Text>
                <Text style={styles.bannerTime}>{item.time}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
      
      <View style={styles.bannerIndicators}>
        {bannerData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.bannerIndicator,
              { opacity: index === currentBannerIndex ? 1 : 0.5 }
            ]}
            onPress={() => goToBannerIndex(index)}
            activeOpacity={0.7}
          />
        ))}
      </View>
    </View>
  );

  const renderQuickFeatures = () => (
    <View style={styles.quickFeaturesContainer}>
      <View style={styles.quickFeaturesGrid}>
        {quickFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.quickFeatureItem}
            onPress={() => handleQuickFeaturePress(feature)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureIcon}
            >
              <FontAwesome6 name={feature.icon} size={18} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.featureTitle}>{feature.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMyBooking = () => (
    <TouchableOpacity
      style={styles.myBookingContainer}
      onPress={handleMyBookingPress}
      activeOpacity={0.8}
    >
      <View style={styles.myBookingHeader}>
        <Text style={styles.myBookingTitle}>我的预约</Text>
        <TouchableOpacity onPress={handleViewAllBookingsPress} activeOpacity={0.7}>
          <Text style={styles.viewAllButton}>查看全部</Text>
        </TouchableOpacity>
      </View>
      
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.currentBooking}
      >
        <View style={styles.bookingInfo}>
          <View style={styles.bookingDetails}>
            <Text style={styles.bookingSeatNumber}>A区-靠窗座位 A01</Text>
            <Text style={styles.bookingTime}>今天 14:00 - 18:00</Text>
            <Text style={styles.bookingStatus}>已签到</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.temporaryLeaveButton,
              isTemporaryLeave && styles.temporaryLeaveButtonActive
            ]}
            onPress={handleTemporaryLeavePress}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.temporaryLeaveButtonText,
              isTemporaryLeave && styles.temporaryLeaveButtonTextActive
            ]}>
              {isTemporaryLeave 
                ? leaveCountdown > 0 
                  ? formatCountdown(leaveCountdown)
                  : '临时离开'
                : '临时离开'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSeatOverview = () => (
    <View style={styles.seatOverviewContainer}>
      <Text style={styles.seatOverviewTitle}>座位概览</Text>
      <View style={styles.seatStats}>
        <View style={styles.seatStatItem}>
          <Text style={styles.seatStatNumber}>286</Text>
          <Text style={styles.seatStatLabel}>总座位</Text>
        </View>
        <View style={styles.seatStatItem}>
          <Text style={[styles.seatStatNumber, { color: '#10b981' }]}>124</Text>
          <Text style={styles.seatStatLabel}>空闲</Text>
        </View>
        <View style={styles.seatStatItem}>
          <Text style={[styles.seatStatNumber, { color: '#f59e0b' }]}>162</Text>
          <Text style={styles.seatStatLabel}>已占用</Text>
        </View>
      </View>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.recommendationsContainer}>
      <View style={styles.recommendationsHeader}>
        <Text style={styles.recommendationsTitle}>为你推荐</Text>
        <TouchableOpacity onPress={handleViewMoreRecommendationsPress} activeOpacity={0.7}>
          <Text style={styles.viewMoreButton}>查看更多</Text>
        </TouchableOpacity>
      </View>
      
      {recommendations.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.recommendationItem, index < recommendations.length - 1 && styles.recommendationItemMargin]}
          onPress={() => handleRecommendationPress(item)}
          activeOpacity={0.8}
        >
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationTitle}>{item.title}</Text>
            <FontAwesome6 name={item.icon} size={16} color={item.iconColor} />
          </View>
          
          {item.type === 'location' && (
            <View style={styles.locationInfo}>
              <View style={styles.locationDetails}>
                <Text style={styles.locationName}>{item.subtitle}</Text>
                <Text style={styles.locationAdvantages}>{item.description}</Text>
              </View>
              <View style={styles.locationStatus}>
                <Text style={[styles.locationStatusText, { color: item.statusColor }]}>
                  {item.status}
                </Text>
                <Text style={styles.locationSeats}>23个座位</Text>
              </View>
            </View>
          )}
          
          {item.type === 'book' && (
            <View style={styles.bookInfo}>
              <Image
                source={{ uri: 'https://s.coze.cn/image/SkkZPVuvsjM/' }}
                style={styles.bookCover}
              />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.subtitle}</Text>
                <Text style={[styles.bookStatus, { color: item.statusColor }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          )}
          
          {item.type === 'event' && (
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.eventCard}
            >
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventTime}>{item.subtitle}</Text>
              <Text style={styles.eventLocation}>{item.description}</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 顶部搜索栏 */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchBox}
              onPress={handleSearchPress}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="search" size={16} color="#6b7280" />
              <Text style={styles.searchPlaceholder}>搜索图书、活动、公告...</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={handleNotificationPress}
              activeOpacity={0.7}
            >
              <FontAwesome6 name="bell" size={20} color="#6b7280" />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notificationCount > 99 ? '99+' : notificationCount.toString()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 轮播图区域 */}
        {renderBanner()}

        {/* 快捷功能区 */}
        {renderQuickFeatures()}

        {/* 我的预约卡片 */}
        {renderMyBooking()}

        {/* 座位概览 */}
        {renderSeatOverview()}

        {/* 推荐内容区 */}
        {renderRecommendations()}

        {/* 底部间距 */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

