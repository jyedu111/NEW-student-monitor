

import React from 'react';
import { View, Text } from 'react-native';
import { SeatStats as SeatStatsType } from '../../types';
import styles from './styles';

interface SeatStatsProps {
  stats: SeatStatsType;
}

const SeatStats: React.FC<SeatStatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>座位统计</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>总座位</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.statNumberSuccess]}>{stats.available}</Text>
          <Text style={styles.statLabel}>空闲</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.statNumberDanger]}>{stats.occupied}</Text>
          <Text style={styles.statLabel}>已占用</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.statNumberWarning]}>{stats.temporary}</Text>
          <Text style={styles.statLabel}>临时离开</Text>
        </View>
      </View>
    </View>
  );
};

export default SeatStats;

