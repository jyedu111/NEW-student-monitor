

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type ZoneType = 'all' | 'first-floor' | 'second-floor' | 'third-floor';

interface ZoneSelectorProps {
  selectedZone: ZoneType;
  onZoneChange: (zone: ZoneType) => void;
}

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ selectedZone, onZoneChange }) => {
  const zones = [
    { key: 'all' as ZoneType, label: '全部区域' },
    { key: 'first-floor' as ZoneType, label: '一层' },
    { key: 'second-floor' as ZoneType, label: '二层' },
    { key: 'third-floor' as ZoneType, label: '三层' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone.key}
            style={[
              styles.tab,
              selectedZone === zone.key ? styles.tabActive : styles.tabInactive,
            ]}
            onPress={() => onZoneChange(zone.key)}
          >
            <Text
              style={[
                styles.tabText,
                selectedZone === zone.key ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {zone.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ZoneSelector;

