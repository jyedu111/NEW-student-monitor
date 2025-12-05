

import React from 'react';
import { View, Text } from 'react-native';
import GaugeChart from '../GaugeChart';
import styles from './styles';

type ZoneType = 'all' | 'first-floor' | 'second-floor' | 'third-floor';

interface ZoneDetailsProps {
  selectedZone: ZoneType;
}

interface ZoneMetric {
  temperature: { value: number; percentage: number; color: string };
  humidity: { value: number; percentage: number; color: string };
  noise: { value: number; percentage: number; color: string };
  occupancy: { value: number; percentage: number; color: string };
  updateTime: string;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ selectedZone }) => {
  const zoneData: Record<ZoneType, ZoneMetric> = {
    'all': {
      temperature: { value: 24.5, percentage: 75, color: '#10b981' },
      humidity: { value: 58, percentage: 58, color: '#3b82f6' },
      noise: { value: 42, percentage: 42, color: '#f59e0b' },
      occupancy: { value: 162, percentage: 70, color: '#ef4444' },
      updateTime: '2分钟前',
    },
    'first-floor': {
      temperature: { value: 24.2, percentage: 75, color: '#10b981' },
      humidity: { value: 56, percentage: 56, color: '#3b82f6' },
      noise: { value: 45, percentage: 45, color: '#f59e0b' },
      occupancy: { value: 78, percentage: 70, color: '#ef4444' },
      updateTime: '2分钟前',
    },
    'second-floor': {
      temperature: { value: 23.8, percentage: 70, color: '#10b981' },
      humidity: { value: 60, percentage: 60, color: '#3b82f6' },
      noise: { value: 32, percentage: 25, color: '#10b981' },
      occupancy: { value: 45, percentage: 45, color: '#f59e0b' },
      updateTime: '1分钟前',
    },
    'third-floor': {
      temperature: { value: 24.8, percentage: 72, color: '#10b981' },
      humidity: { value: 55, percentage: 55, color: '#3b82f6' },
      noise: { value: 28, percentage: 20, color: '#10b981' },
      occupancy: { value: 39, percentage: 35, color: '#f59e0b' },
      updateTime: '3分钟前',
    },
  };

  const getZoneTitle = (zone: ZoneType) => {
    switch (zone) {
      case 'all':
        return '全馆平均数据';
      case 'first-floor':
        return '一层阅览区';
      case 'second-floor':
        return '二层静音区';
      case 'third-floor':
        return '三层研修区';
      default:
        return '环境数据';
    }
  };

  const shouldShowAllZones = selectedZone === 'all';

  const renderZoneCard = (zone: ZoneType, title: string) => {
    const data = zoneData[zone];
    return (
      <View key={zone} style={styles.zoneCard}>
        <View style={styles.zoneHeader}>
          <Text style={styles.zoneTitle}>{title}</Text>
          <Text style={styles.updateTime}>更新于 {data.updateTime}</Text>
        </View>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <GaugeChart
              percentage={data.temperature.percentage}
              color={data.temperature.color}
              size={80}
            />
            <Text style={styles.metricValue}>{data.temperature.value}°C</Text>
            <Text style={styles.metricLabel}>温度</Text>
          </View>
          <View style={styles.metricItem}>
            <GaugeChart
              percentage={data.humidity.percentage}
              color={data.humidity.color}
              size={80}
            />
            <Text style={styles.metricValue}>{data.humidity.value}%</Text>
            <Text style={styles.metricLabel}>湿度</Text>
          </View>
          <View style={styles.metricItem}>
            <GaugeChart
              percentage={data.noise.percentage}
              color={data.noise.color}
              size={80}
            />
            <Text style={styles.metricValue}>{data.noise.value}dB</Text>
            <Text style={styles.metricLabel}>噪音</Text>
          </View>
          <View style={styles.metricItem}>
            <GaugeChart
              percentage={data.occupancy.percentage}
              color={data.occupancy.color}
              size={80}
            />
            <Text style={styles.metricValue}>{data.occupancy.value}人</Text>
            <Text style={styles.metricLabel}>人数</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {shouldShowAllZones ? '各区域详细数据' : '区域详细数据'}
      </Text>
      
      {shouldShowAllZones ? (
        <>
          {renderZoneCard('first-floor', '一层阅览区')}
          {renderZoneCard('second-floor', '二层静音区')}
          {renderZoneCard('third-floor', '三层研修区')}
        </>
      ) : (
        renderZoneCard(selectedZone, getZoneTitle(selectedZone))
      )}
    </View>
  );
};

export default ZoneDetails;

