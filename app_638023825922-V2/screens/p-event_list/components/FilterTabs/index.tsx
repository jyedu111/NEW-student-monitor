

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';

type FilterType = 'all' | 'upcoming' | 'ongoing' | 'ended';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

interface FilterTab {
  key: FilterType;
  label: string;
}

const filterTabs: FilterTab[] = [
  { key: 'all', label: '全部' },
  { key: 'upcoming', label: '即将开始' },
  { key: 'ongoing', label: '进行中' },
  { key: 'ended', label: '已结束' },
];

const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onFilterChange }) => {
  const handleTabPress = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterTabsContainer}
    >
      {filterTabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.filterTab,
            currentFilter === tab.key ? styles.filterTabActive : styles.filterTabInactive,
          ]}
          onPress={() => handleTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterTabText,
              currentFilter === tab.key ? styles.filterTabTextActive : styles.filterTabTextInactive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterTabs;

