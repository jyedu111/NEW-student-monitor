

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, RefreshControl, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import EventCard from './components/EventCard';
import FilterTabs from './components/FilterTabs';

interface EventData {
  id: string;
  title: string;
  time: string;
  location: string;
  registered: number;
  capacity: number;
  status: string;
  statusClass: 'success' | 'warning' | 'text-secondary';
  isOngoing: boolean;
  isEnded: boolean;
  gradientColors: [string, string, ...string[]];
}

type FilterType = 'all' | 'upcoming' | 'ongoing' | 'ended';

const EventListScreen: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

  // 模拟活动数据
  const allEventsData: EventData[] = [
    {
      id: 'event1',
      title: '学术论文写作讲座',
      time: '明天 19:00 - 21:00',
      location: '一层报告厅',
      registered: 45,
      capacity: 50,
      status: '报名中',
      statusClass: 'success',
      isOngoing: false,
      isEnded: false,
      gradientColors: ['#4facfe', '#00f2fe'],
    },
    {
      id: 'event2',
      title: '数字资源使用培训',
      time: '12月15日 14:00 - 16:00',
      location: '二层电子阅览室',
      registered: 28,
      capacity: 30,
      status: '名额紧张',
      statusClass: 'warning',
      isOngoing: false,
      isEnded: false,
      gradientColors: ['#8b5cf6', '#06b6d4'],
    },
    {
      id: 'event3',
      title: '读书会：人工智能伦理',
      time: '12月18日 15:00 - 17:00',
      location: '三层研讨室A',
      registered: 12,
      capacity: 15,
      status: '报名中',
      statusClass: 'success',
      isOngoing: false,
      isEnded: false,
      gradientColors: ['#f59e0b', '#ef4444'],
    },
    {
      id: 'event4',
      title: '信息素养讲座',
      time: '12月10日 19:00 - 21:00',
      location: '一层报告厅',
      registered: 60,
      capacity: 60,
      status: '已结束',
      statusClass: 'text-secondary',
      isOngoing: false,
      isEnded: true,
      gradientColors: ['#9ca3af', '#6b7280'],
    },
    {
      id: 'event5',
      title: '科研方法研讨会',
      time: '12月20日 10:00 - 12:00',
      location: '四层会议室',
      registered: 8,
      capacity: 20,
      status: '报名中',
      statusClass: 'success',
      isOngoing: false,
      isEnded: false,
      gradientColors: ['#06b6d4', '#6366f1'],
    },
  ];

  useEffect(() => {
    loadEventsData();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [eventsData, searchText, currentFilter]);

  const loadEventsData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 500));
      setEventsData(allEventsData);
    } catch (error) {
      Alert.alert('错误', '加载活动数据失败，请重试');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadEventsData();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadEventsData]);

  const filterEvents = useCallback(() => {
    let filtered = [...eventsData];

    // 搜索筛选
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    // 状态筛选
    switch (currentFilter) {
      case 'upcoming':
        filtered = filtered.filter(event => !event.isOngoing && !event.isEnded);
        break;
      case 'ongoing':
        filtered = filtered.filter(event => event.isOngoing);
        break;
      case 'ended':
        filtered = filtered.filter(event => event.isEnded);
        break;
      default:
        // 全部显示
        break;
    }

    setFilteredEvents(filtered);
  }, [eventsData, searchText, currentFilter]);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  const handleFilterChange = useCallback((filter: FilterType) => {
    setCurrentFilter(filter);
  }, []);

  const handleEventPress = useCallback((eventId: string) => {
    router.push(`/p-event_detail?eventId=${eventId}`);
  }, [router]);

  const renderEventItem = useCallback(({ item }: { item: EventData }) => (
    <EventCard
      event={item}
      onPress={() => handleEventPress(item.id)}
    />
  ), [handleEventPress]);

  const renderEmptyState = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner} />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyStateContainer}>
        <FontAwesome6 name="calendar-xmark" size={48} color="#6b7280" />
        <Text style={styles.emptyStateTitle}>暂无活动</Text>
        <Text style={styles.emptyStateDescription}>
          当前筛选条件下没有找到相关活动
        </Text>
      </View>
    );
  }, [isLoading]);

  const renderListHeader = useCallback(() => (
    <View>
      {/* 搜索栏 */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <FontAwesome6 name="magnifying-glass" size={16} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索活动..."
              placeholderTextColor="#6b7280"
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.searchClearButton}
                onPress={handleClearSearch}
              >
                <FontAwesome6 name="xmark" size={14} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* 筛选标签 */}
      <View style={styles.filterSection}>
        <FilterTabs
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />
      </View>
    </View>
  ), [searchText, currentFilter, handleSearchTextChange, handleClearSearch, handleFilterChange]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>活动</Text>
        </View>
      </View>

      {/* 活动列表 */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#6366f1']}
            tintColor="#6366f1"
          />
        }
      />
    </SafeAreaView>
  );
};

export default EventListScreen;

