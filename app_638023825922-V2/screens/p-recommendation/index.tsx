

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface RecommendationItem {
  id: string;
  title: string;
  rank: string;
  rankColor: string;
  status: string;
  statusColor: string;
  availableSeats: string;
  advantages: string[];
  environment: {
    temperature: string;
    humidity: string;
    noise: string;
    brightness: string;
  };
  gradientColors: [string, string, ...string[]];
  iconName: string;
  buttonColor: string;
}

const RecommendationScreen: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [recommendationsData] = useState<RecommendationItem[]>([
    {
      id: '1',
      title: '三层静音区',
      rank: '推荐度 #1',
      rankColor: '#6366f1',
      status: '空闲',
      statusColor: '#10b981',
      availableSeats: '23个座位',
      advantages: ['超安静', '温度适宜', '充足电源', '靠窗座位'],
      environment: {
        temperature: '24°C',
        humidity: '45%',
        noise: '35dB',
        brightness: '75%',
      },
      gradientColors: ['#667eea', '#764ba2'],
      iconName: 'map-marker-alt',
      buttonColor: '#6366f1',
    },
    {
      id: '2',
      title: '二层阅览区',
      rank: '推荐度 #2',
      rankColor: '#8b5cf6',
      status: '空闲',
      statusColor: '#10b981',
      availableSeats: '18个座位',
      advantages: ['安静', '宽敞明亮', '靠近书架', '团队学习'],
      environment: {
        temperature: '25°C',
        humidity: '48%',
        noise: '42dB',
        brightness: '80%',
      },
      gradientColors: ['#4facfe', '#00f2fe'],
      iconName: 'book-open',
      buttonColor: '#8b5cf6',
    },
    {
      id: '3',
      title: '研修间',
      rank: '推荐度 #3',
      rankColor: '#f59e0b',
      status: '紧张',
      statusColor: '#f59e0b',
      availableSeats: '3个座位',
      advantages: ['私密空间', '讨论友好', '设备齐全', '网络稳定'],
      environment: {
        temperature: '23°C',
        humidity: '42%',
        noise: '48dB',
        brightness: '70%',
      },
      gradientColors: ['#f59e0b', '#ef4444'],
      iconName: 'users',
      buttonColor: '#f59e0b',
    },
  ]);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const handleRefreshPress = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('刷新完成', '推荐数据已更新');
    }, 1500);
  }, []);

  const handleNavigateToRecommendation = useCallback((recommendation: RecommendationItem) => {
    Alert.alert(
      '导航功能',
      `正在为您规划前往${recommendation.title}的路线...`,
      [{ text: '确定', style: 'default' }]
    );
  }, []);

  const handleRecommendationCardPress = useCallback((recommendation: RecommendationItem) => {
    Alert.alert(
      '区域详情',
      `查看${recommendation.title}的详细环境数据`,
      [{ text: '确定', style: 'default' }]
    );
  }, []);

  const handleViewEnvironmentDataPress = useCallback(() => {
    router.push('/p-environment');
  }, [router]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const renderRecommendationCard = useCallback((item: RecommendationItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.recommendationCard}
      onPress={() => handleRecommendationCardPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.recommendationHeader}>
        <View style={styles.recommendationInfo}>
          <LinearGradient
            colors={item.gradientColors}
            style={styles.recommendationIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome6 name={item.iconName} size={18} color="#ffffff" />
          </LinearGradient>
          <View style={styles.recommendationDetails}>
            <Text style={styles.recommendationTitle}>{item.title}</Text>
            <Text style={[styles.recommendationRank, { color: item.rankColor }]}>
              {item.rank}
            </Text>
          </View>
        </View>
        <View style={styles.recommendationStatus}>
          <Text style={[styles.statusText, { color: item.statusColor }]}>
            {item.status}
          </Text>
          <Text style={styles.seatsText}>{item.availableSeats}</Text>
        </View>
      </View>

      <View style={styles.advantagesContainer}>
        {item.advantages.map((advantage, index) => (
          <View key={index} style={styles.advantageTag}>
            <Text style={styles.advantageText}>{advantage}</Text>
          </View>
        ))}
      </View>

      <View style={styles.environmentContainer}>
        <View style={styles.environmentItem}>
          <Text style={styles.environmentValue}>{item.environment.temperature}</Text>
          <Text style={styles.environmentLabel}>温度</Text>
        </View>
        <View style={styles.environmentItem}>
          <Text style={styles.environmentValue}>{item.environment.humidity}</Text>
          <Text style={styles.environmentLabel}>湿度</Text>
        </View>
        <View style={styles.environmentItem}>
          <Text style={styles.environmentValue}>{item.environment.noise}</Text>
          <Text style={styles.environmentLabel}>噪音</Text>
        </View>
        <View style={styles.environmentItem}>
          <Text style={styles.environmentValue}>{item.environment.brightness}</Text>
          <Text style={styles.environmentLabel}>亮度</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.navigateButton, { backgroundColor: item.buttonColor }]}
        onPress={() => handleNavigateToRecommendation(item)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name="directions" size={14} color="#ffffff" />
        <Text style={styles.navigateButtonText}>导航到该区域</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ), [handleRecommendationCardPress, handleNavigateToRecommendation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>最优位置推荐</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefreshPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.refreshButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <FontAwesome5 name="sync-alt" size={14} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* 主要内容区域 */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#6366f1']}
            tintColor="#6366f1"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 加载状态 */}
        {isLoading && (
          <View style={styles.loadingState}>
            <View style={styles.loadingSpinner} />
            <Text style={styles.loadingText}>正在为您分析最优位置...</Text>
          </View>
        )}

        {/* 推荐区域列表 */}
        {!isLoading && (
          <View style={styles.recommendationsSection}>
            {recommendationsData.map(renderRecommendationCard)}
          </View>
        )}

        {/* 查看环境数据按钮 */}
        {!isLoading && (
          <TouchableOpacity
            style={styles.environmentButton}
            onPress={handleViewEnvironmentDataPress}
            activeOpacity={0.8}
          >
            <View style={styles.environmentButtonContent}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.environmentButtonIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <FontAwesome6 name="chart-line" size={18} color="#ffffff" />
              </LinearGradient>
              <View style={styles.environmentButtonTextContainer}>
                <Text style={styles.environmentButtonTitle}>查看详细环境数据</Text>
                <Text style={styles.environmentButtonSubtitle}>实时监测各区域环境状况</Text>
              </View>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color="#6b7280" />
          </TouchableOpacity>
        )}

        {/* 推荐说明 */}
        {!isLoading && (
          <View style={styles.explanationSection}>
            <View style={styles.explanationHeader}>
              <FontAwesome5 name="info-circle" size={16} color="#3b82f6" />
              <Text style={styles.explanationTitle}>推荐说明</Text>
            </View>
            <View style={styles.explanationContent}>
              <Text style={styles.explanationText}>• 基于您的偏好设置和实时环境数据生成推荐</Text>
              <Text style={styles.explanationText}>• 综合考虑噪音、温度、湿度、光照等因素</Text>
              <Text style={styles.explanationText}>• 数据每5分钟更新一次，确保准确性</Text>
              <Text style={styles.explanationText}>• 点击"导航"可直接前往推荐区域</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommendationScreen;

