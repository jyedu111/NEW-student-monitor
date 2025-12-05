

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, RefreshControl, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';
import AnnouncementItem from './components/AnnouncementItem';

interface Announcement {
  id: number;
  title: string;
  summary: string;
  time: string;
  author: string;
  pinned: boolean;
}

const AnnouncementListScreen = () => {
  const router = useRouter();
  
  // 模拟公告数据
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: '图书馆开放时间调整通知',
      summary: '为了更好地服务广大读者，满足大家的学习需求，图书馆决定从下周一开始延长开放时间至22:00，具体安排如下：周一至周五 08:00-22:00，周六至周日 09:00-21:00。',
      time: '2024年1月15日 14:30',
      author: '图书馆管理员',
      pinned: true
    },
    {
      id: 2,
      title: '新书上架通知 - 人工智能专题',
      summary: '本周新增一批人工智能相关的优质图书，包括机器学习、深度学习、AI伦理等多个方向，共计156册。欢迎读者前来借阅。',
      time: '2024年1月14日 09:15',
      author: '采购部',
      pinned: false
    },
    {
      id: 3,
      title: '关于加强占座治理的通知',
      summary: '为了维护良好的学习秩序，保障每位读者公平使用图书馆资源的权利，现对占座行为治理措施进行调整，具体规定如下...',
      time: '2024年1月13日 16:45',
      author: '管理部',
      pinned: false
    },
    {
      id: 4,
      title: '图书馆系统维护通知',
      summary: '为了提升系统性能和用户体验，图书馆将于本周末（1月20-21日）进行系统维护升级，期间部分功能可能受到影响。',
      time: '2024年1月12日 11:20',
      author: '技术部',
      pinned: false
    },
    {
      id: 5,
      title: '学术数据库使用培训通知',
      summary: '为了帮助读者更好地利用图书馆的学术数据库资源，我们将于下周举办系列培训讲座，内容包括CNKI、Web of Science等数据库的使用技巧。',
      time: '2024年1月11日 13:30',
      author: '读者服务部',
      pinned: false
    },
    {
      id: 6,
      title: '寒假开放安排通知',
      summary: '根据学校寒假安排，图书馆将调整开放时间，具体安排如下：1月25日-2月28日期间，开放时间为09:00-17:00，每周一闭馆。',
      time: '2024年1月10日 15:00',
      author: '办公室',
      pinned: false
    }
  ]);

  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>(announcements);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const handleSearchToggle = useCallback(() => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchText('');
      setFilteredAnnouncements(announcements);
    }
  }, [isSearchVisible, announcements]);

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setFilteredAnnouncements(announcements);
    } else {
      const filtered = announcements.filter(announcement => 
        announcement.title.toLowerCase().includes(text.toLowerCase()) ||
        announcement.summary.toLowerCase().includes(text.toLowerCase()) ||
        announcement.author.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    }
  }, [announcements]);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
    setFilteredAnnouncements(announcements);
  }, [announcements]);

  const handleAnnouncementPress = useCallback((announcementId: number) => {
    router.push(`/p-announcement_detail?id=${announcementId}`);
  }, [router]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // 模拟刷新数据
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMoreData) return;
    
    setIsLoadingMore(true);
    // 模拟加载更多数据
    setTimeout(() => {
      setIsLoadingMore(false);
      setHasMoreData(false); // 模拟没有更多数据
    }, 1000);
  }, [isLoadingMore, hasMoreData]);

  const renderAnnouncementItem = useCallback(({ item }: { item: Announcement }) => (
    <AnnouncementItem
      announcement={item}
      onPress={() => handleAnnouncementPress(item.id)}
    />
  ), [handleAnnouncementPress]);

  const renderHeader = useCallback(() => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>公告</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchToggle}>
          <FontAwesome6 
            name={isSearchVisible ? "xmark" : "magnifying-glass"} 
            size={20} 
            color="#6b7280" 
          />
        </TouchableOpacity>
      </View>
      
      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <FontAwesome6 name="magnifying-glass" size={16} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索公告..."
              placeholderTextColor="#6b7280"
              value={searchText}
              onChangeText={handleSearchTextChange}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                <FontAwesome6 name="xmark" size={16} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  ), [
    isSearchVisible,
    searchText,
    handleBackPress,
    handleSearchToggle,
    handleSearchTextChange,
    handleClearSearch
  ]);

  const renderFooter = useCallback(() => {
    if (filteredAnnouncements.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <FontAwesome6 name="magnifying-glass" size={48} color="#6b7280" />
          <Text style={styles.noResultsText}>未找到相关公告</Text>
        </View>
      );
    }

    if (!hasMoreData) {
      return (
        <View style={styles.noMoreDataContainer}>
          <Text style={styles.noMoreDataText}>没有更多公告了</Text>
        </View>
      );
    }

    return (
      <View style={styles.loadMoreContainer}>
        <TouchableOpacity onPress={handleLoadMore} disabled={isLoadingMore}>
          <Text style={styles.loadMoreText}>
            {isLoadingMore ? '加载中...' : '加载更多公告'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [filteredAnnouncements.length, hasMoreData, isLoadingMore, handleLoadMore]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredAnnouncements}
        renderItem={renderAnnouncementItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
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

export default AnnouncementListScreen;

