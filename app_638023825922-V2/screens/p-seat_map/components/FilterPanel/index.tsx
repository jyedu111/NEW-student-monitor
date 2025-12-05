

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { FilterOption, FilterCategory } from '../../types';
import styles from './styles';

interface FilterPanelProps {
  visible: boolean;
  activeFilters: FilterOption[];
  onClose: () => void;
  onFiltersChange: (filters: FilterOption[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  visible,
  activeFilters,
  onClose,
  onFiltersChange,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(activeFilters);

  const filterCategories: FilterCategory[] = [
    {
      title: '位置偏好',
      options: ['window', 'aisle', 'corner'],
    },
    {
      title: '设施需求',
      options: ['power', 'lamp', 'charger'],
    },
    {
      title: '环境偏好',
      options: ['quiet', 'discussion', 'sunlight', 'shade'],
    },
  ];

  const getFilterLabel = (filter: FilterOption): string => {
    const labels = {
      window: '靠窗',
      aisle: '靠过道',
      corner: '角落',
      power: '有电源',
      lamp: '台灯',
      charger: '无线充电',
      quiet: '静音区',
      discussion: '讨论区',
      sunlight: '阳光充足',
      shade: '阴凉',
    };
    return labels[filter];
  };

  const handleFilterToggle = (filter: FilterOption) => {
    const newFilters = localFilters.includes(filter)
      ? localFilters.filter(f => f !== filter)
      : [...localFilters, filter];
    setLocalFilters(newFilters);
  };

  const handleReset = () => {
    setLocalFilters([]);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClose = () => {
    setLocalFilters(activeFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={handleClose} />
        
        <View style={styles.panel}>
          {/* 头部 */}
          <View style={styles.header}>
            <Text style={styles.title}>筛选条件</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <FontAwesome6 name="xmark" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* 筛选选项 */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {filterCategories.map((category) => (
              <View key={category.title} style={styles.category}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <View style={styles.optionsContainer}>
                  {category.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.option,
                        localFilters.includes(option) && styles.optionActive
                      ]}
                      onPress={() => handleFilterToggle(option)}
                    >
                      <Text style={[
                        styles.optionText,
                        localFilters.includes(option) && styles.optionTextActive
                      ]}>
                        {getFilterLabel(option)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* 操作按钮 */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>应用筛选</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterPanel;

