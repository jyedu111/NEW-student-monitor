

import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

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

interface EnvironmentOverviewProps {
  data: EnvironmentData;
}

const EnvironmentOverview: React.FC<EnvironmentOverviewProps> = ({ data }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'arrow-up';
      case 'down':
        return 'arrow-down';
      default:
        return 'minus';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '#10b981';
      case 'down':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTrendText = (value: number, trend: 'up' | 'down' | 'stable', unit: string) => {
    if (trend === 'stable') {
      return '稳定';
    }
    const change = Math.abs(value * 0.05); // 模拟变化值
    return `${trend === 'up' ? '+' : '-'}${change.toFixed(1)}${unit}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>实时环境概览</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statItem, styles.temperatureStat]}>
            <FontAwesome5 name="thermometer-half" size={24} color="#3b82f6" />
            <Text style={styles.statValue}>{data.temperature}°C</Text>
            <Text style={styles.statLabel}>温度</Text>
            <View style={styles.trendContainer}>
              <FontAwesome6
                name={getTrendIcon(data.temperatureTrend)}
                size={10}
                color={getTrendColor(data.temperatureTrend)}
              />
              <Text style={[styles.trendText, { color: getTrendColor(data.temperatureTrend) }]}>
                {getTrendText(data.temperature, data.temperatureTrend, '°C')}
              </Text>
            </View>
          </View>

          <View style={[styles.statItem, styles.humidityStat]}>
            <FontAwesome6 name="droplet" size={24} color="#10b981" />
            <Text style={styles.statValue}>{data.humidity}%</Text>
            <Text style={styles.statLabel}>湿度</Text>
            <View style={styles.trendContainer}>
              <FontAwesome6
                name={getTrendIcon(data.humidityTrend)}
                size={10}
                color={getTrendColor(data.humidityTrend)}
              />
              <Text style={[styles.trendText, { color: getTrendColor(data.humidityTrend) }]}>
                {getTrendText(data.humidity, data.humidityTrend, '%')}
              </Text>
            </View>
          </View>

          <View style={[styles.statItem, styles.noiseStat]}>
            <FontAwesome6 name="volume-high" size={24} color="#8b5cf6" />
            <Text style={styles.statValue}>{data.noise}dB</Text>
            <Text style={styles.statLabel}>噪音</Text>
            <View style={styles.trendContainer}>
              <FontAwesome6
                name={getTrendIcon(data.noiseTrend)}
                size={10}
                color={getTrendColor(data.noiseTrend)}
              />
              <Text style={[styles.trendText, { color: getTrendColor(data.noiseTrend) }]}>
                {getTrendText(data.noise, data.noiseTrend, 'dB')}
              </Text>
            </View>
          </View>

          <View style={[styles.statItem, styles.occupancyStat]}>
            <FontAwesome6 name="users" size={24} color="#f59e0b" />
            <Text style={styles.statValue}>{data.occupancy}人</Text>
            <Text style={styles.statLabel}>人流量</Text>
            <View style={styles.trendContainer}>
              <FontAwesome6
                name={getTrendIcon(data.occupancyTrend)}
                size={10}
                color={getTrendColor(data.occupancyTrend)}
              />
              <Text style={[styles.trendText, { color: getTrendColor(data.occupancyTrend) }]}>
                {getTrendText(data.occupancy, data.occupancyTrend, '人')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EnvironmentOverview;

