

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';
import ZoneSelector from './components/ZoneSelector';
import EnvironmentOverview from './components/EnvironmentOverview';
import ZoneDetails from './components/ZoneDetails';
import UpdateInfo from './components/UpdateInfo';

type ZoneType = 'all' | 'first-floor' | 'second-floor' | 'third-floor';

interface EnvironmentData {
  temperature: number;
  humidity: number;
  noise: number;
  occupancy: number;
  temperatureTrend: 'up' | 'down' | 'stable';
  humidityTrend: 'up' | 'down' | 'stable';
  noiseTrend: 'up' | 'down' | 'stable';
  occupancyTrend: 'up' | 'down' | 'stable';
}

const EnvironmentScreen: React.FC = () => {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState<ZoneType>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [environmentData, setEnvironmentData] = useState<EnvironmentData>({
    temperature: 24.5,
    humidity: 58,
    noise: 42,
    occupancy: 162,
    temperatureTrend: 'up',
    humidityTrend: 'stable',
    noiseTrend: 'down',
    occupancyTrend: 'up',
  });
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleZoneChange = (zone: ZoneType) => {
    setSelectedZone(zone);
    // 模拟数据更新
    updateEnvironmentData();
  };

  const updateEnvironmentData = () => {
    // 模拟数据更新
    setEnvironmentData(prevData => ({
      ...prevData,
      temperature: Number((prevData.temperature + (Math.random() - 0.5) * 0.4).toFixed(1)),
      humidity: Math.floor(prevData.humidity + (Math.random() - 0.5) * 4),
      noise: Math.floor(prevData.noise + (Math.random() - 0.5) * 6),
      occupancy: Math.floor(prevData.occupancy + (Math.random() - 0.5) * 24),
    }));
    setLastUpdateTime(new Date());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateEnvironmentData();
    } finally {
      setIsRefreshing(false);
    }
  };

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      updateEnvironmentData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>环境监测</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* 区域选择器 */}
        <ZoneSelector selectedZone={selectedZone} onZoneChange={handleZoneChange} />

        {/* 实时环境数据概览 */}
        <EnvironmentOverview data={environmentData} />

        {/* 各区域详细数据 */}
        <ZoneDetails selectedZone={selectedZone} />

        {/* 数据更新时间 */}
        <UpdateInfo lastUpdateTime={lastUpdateTime} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnvironmentScreen;

