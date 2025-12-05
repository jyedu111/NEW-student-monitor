

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Dimensions, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';
import { Seat, SeatStatus, FilterOption, Floor, Zone } from './types';
import SeatMap from './components/SeatMap';
import SeatStats from './components/SeatStats';
import FilterPanel from './components/FilterPanel';
import SeatDetailModal from './components/SeatDetailModal';

const { width: screenWidth } = Dimensions.get('window');

const SeatMapScreen: React.FC = () => {
  const router = useRouter();
  
  // 状态管理
  const [currentFloor, setCurrentFloor] = useState<Floor>('1');
  const [currentZone, setCurrentZone] = useState<Zone>('A');
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSeatModalVisible, setIsSeatModalVisible] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);

  // 生成座位数据
  const generateSeats = (count: number, prefix: string): Seat[] => {
    return Array.from({ length: count }, (_, index) => {
      const seatNumber = `${prefix}${String(index + 1).padStart(2, '0')}`;
      const statuses: SeatStatus[] = ['available', 'occupied', 'temporary', 'booked'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // 确保有一些空闲座位
      const finalStatus = index % 4 === 0 ? 'available' : status;
      
      return {
        id: seatNumber,
        number: seatNumber,
        status: finalStatus,
        features: getRandomFeatures(),
        position: calculateSeatPosition(index),
      };
    });
  };

  // 获取随机座位特点
  const getRandomFeatures = (): FilterOption[] => {
    const features: FilterOption[] = [];
    const possibleFeatures: FilterOption[] = [
      'window', 'aisle', 'corner', 
      'power', 'lamp', 'charger',
      'quiet', 'discussion', 'sunlight', 'shade'
    ];
    
    const featureCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < featureCount; i++) {
      const randomFeature = possibleFeatures[Math.floor(Math.random() * possibleFeatures.length)];
      if (!features.includes(randomFeature)) {
        features.push(randomFeature);
      }
    }
    
    return features;
  };

  // 计算座位位置
  const calculateSeatPosition = (index: number) => {
    const rows = 8;
    const cols = 6;
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      top: 60 + (row * 40),
      left: 40 + (col * 40)
    };
  };

  // 初始化座位数据
  useEffect(() => {
    const floorSeats = {
      '1': {
        'A': generateSeats(48, 'A'),
        'B': generateSeats(36, 'B'),
        'C': generateSeats(42, 'C')
      },
      '2': {
        'A': generateSeats(36, 'A'),
        'B': generateSeats(30, 'B'),
        'C': generateSeats(36, 'C')
      },
      '3': {
        'A': generateSeats(42, 'A'),
        'B': generateSeats(36, 'B'),
        'C': generateSeats(40, 'C')
      }
    };
    
    setSeats(floorSeats[currentFloor][currentZone]);
  }, [currentFloor, currentZone]);

  // 处理返回
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  // 处理筛选按钮
  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  // 处理楼层切换
  const handleFloorChange = (floor: Floor) => {
    setCurrentFloor(floor);
  };

  // 处理区域切换
  const handleZoneChange = (zone: Zone) => {
    setCurrentZone(zone);
  };

  // 处理座位选择
  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
    setIsSeatModalVisible(true);
  };

  // 处理预约座位
  const handleBookSeat = () => {
    if (selectedSeat) {
      const startTime = new Date();
      startTime.setHours(14, 0, 0); // 今天14:00
      const endTime = new Date(startTime);
      endTime.setHours(18, 0, 0); // 今天18:00
      
      router.push({
        pathname: '/p-booking_confirm',
        params: {
          seatId: selectedSeat.id,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          floor: currentFloor,
          zone: currentZone
        }
      });
    }
  };

  // 筛选座位
  const getFilteredSeats = (): Seat[] => {
    if (activeFilters.length === 0) return seats;
    return seats.filter(seat => 
      activeFilters.every(filter => seat.features.includes(filter))
    );
  };

  // 计算座位统计
  const getSeatStats = () => {
    const filteredSeats = getFilteredSeats();
    const total = filteredSeats.length;
    const available = filteredSeats.filter(seat => seat.status === 'available').length;
    const occupied = filteredSeats.filter(seat => seat.status === 'occupied').length;
    const temporary = filteredSeats.filter(seat => seat.status === 'temporary').length;
    
    return { total, available, occupied, temporary };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 顶部导航栏 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>座位地图</Text>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <FontAwesome6 name="filter" size={20} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* 楼层和区域选择器 */}
        <View style={styles.selectorContainer}>
          {/* 楼层选择 */}
          <View style={styles.tabsContainer}>
            {(['1', '2', '3'] as Floor[]).map((floor) => (
              <TouchableOpacity
                key={floor}
                style={[
                  styles.tab,
                  currentFloor === floor ? styles.tabActive : styles.tabInactive
                ]}
                onPress={() => handleFloorChange(floor)}
              >
                <Text style={[
                  styles.tabText,
                  currentFloor === floor ? styles.tabTextActive : styles.tabTextInactive
                ]}>
                  {floor}楼
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 区域选择 */}
          <View style={styles.tabsContainer}>
            {(['A', 'B', 'C'] as Zone[]).map((zone) => (
              <TouchableOpacity
                key={zone}
                style={[
                  styles.tab,
                  currentZone === zone ? styles.tabActive : styles.tabInactive
                ]}
                onPress={() => handleZoneChange(zone)}
              >
                <Text style={[
                  styles.tabText,
                  currentZone === zone ? styles.tabTextActive : styles.tabTextInactive
                ]}>
                  {zone}区
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 座位地图区域 */}
        <View style={styles.seatMapSection}>
          <SeatMap
            seats={getFilteredSeats()}
            currentZone={currentZone}
            onSeatSelect={handleSeatSelect}
          />
        </View>

        {/* 座位统计 */}
        <View style={styles.statsSection}>
          <SeatStats stats={getSeatStats()} />
        </View>
      </ScrollView>

      {/* 筛选面板 */}
      <FilterPanel
        visible={isFilterModalVisible}
        activeFilters={activeFilters}
        onClose={() => setIsFilterModalVisible(false)}
        onFiltersChange={setActiveFilters}
      />

      {/* 座位详情弹窗 */}
      <SeatDetailModal
        visible={isSeatModalVisible}
        seat={selectedSeat}
        currentFloor={currentFloor}
        currentZone={currentZone}
        onClose={() => setIsSeatModalVisible(false)}
        onBookSeat={handleBookSeat}
      />
    </SafeAreaView>
  );
};

export default SeatMapScreen;

