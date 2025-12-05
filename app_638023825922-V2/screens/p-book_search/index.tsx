

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './styles';

interface SearchHistoryItem {
  id: string;
  query: string;
}

interface BookSearchResult {
  id: string;
  title: string;
  author: string;
  isbn: string;
  shelfNumber: string;
  coverUrl: string;
  availableCount: number;
  totalCount: number;
  status: 'available' | 'reservation' | 'unavailable';
}

type SearchState = 'default' | 'searching' | 'results' | 'no-results';

const BookSearchScreen = () => {
  const router = useRouter();
  const searchInputRef = useRef<TextInput>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearchState, setCurrentSearchState] = useState<SearchState>('default');
  const [searchHistoryList, setSearchHistoryList] = useState<SearchHistoryItem[]>([
    { id: '1', query: '人工智能简史' },
    { id: '2', query: '深度学习' },
    { id: '3', query: '9787115428028' },
  ]);
  const [searchResultsList, setSearchResultsList] = useState<BookSearchResult[]>([]);
  const [isLoadingMoreResults, setIsLoadingMoreResults] = useState(false);

  const hotSearchTags = [
    '机器学习',
    'Python编程', 
    '算法导论',
    '数据结构',
    'Java核心技术',
    '计算机网络',
  ];

  const mockSearchResults: BookSearchResult[] = [
    {
      id: 'book1',
      title: '人工智能简史',
      author: '李开复 著',
      isbn: '9787115428028',
      shelfNumber: 'TP18/123',
      coverUrl: 'https://s.coze.cn/image/O0FFN6Q5-aA/',
      availableCount: 3,
      totalCount: 5,
      status: 'available',
    },
    {
      id: 'book2',
      title: '深度学习',
      author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville 著',
      isbn: '9787115474810',
      shelfNumber: 'TP181/456',
      coverUrl: 'https://s.coze.cn/image/zRlDzGxju6o/',
      availableCount: 0,
      totalCount: 2,
      status: 'reservation',
    },
    {
      id: 'book3',
      title: '机器学习',
      author: '周志华 著',
      isbn: '9787111423774',
      shelfNumber: 'TP181/789',
      coverUrl: 'https://s.coze.cn/image/Bsp_QTFCo20/',
      availableCount: 1,
      totalCount: 3,
      status: 'available',
    },
    {
      id: 'book4',
      title: 'Python编程：从入门到实践',
      author: 'Eric Matthes 著',
      isbn: '9787115428028',
      shelfNumber: 'TP312/101',
      coverUrl: 'https://s.coze.cn/image/bUKQ98oyXQ8/',
      availableCount: 2,
      totalCount: 4,
      status: 'available',
    },
    {
      id: 'book5',
      title: '算法导论（第三版）',
      author: 'Thomas H. Cormen 等 著',
      isbn: '9787111407010',
      shelfNumber: 'TP301.6/234',
      coverUrl: 'https://s.coze.cn/image/vhkN6sfc5VE/',
      availableCount: 0,
      totalCount: 1,
      status: 'unavailable',
    },
  ];

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearchInput = () => {
    setSearchQuery('');
    setCurrentSearchState('default');
    searchInputRef.current?.focus();
  };

  const handlePerformSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    // 添加到搜索历史
    handleAddToSearchHistory(trimmedQuery);
    
    // 显示搜索中状态
    setCurrentSearchState('searching');
    
    // 模拟搜索延迟
    setTimeout(() => {
      // 模拟搜索结果
      if (Math.random() > 0.2) { // 80% 概率有结果
        setSearchResultsList(mockSearchResults);
        setCurrentSearchState('results');
      } else {
        setCurrentSearchState('no-results');
      }
    }, 1000);
  };

  const handleAddToSearchHistory = (query: string) => {
    const existingIndex = searchHistoryList.findIndex(item => item.query === query);
    
    if (existingIndex !== -1) {
      // 如果已存在，移到最前面
      const updatedHistory = [...searchHistoryList];
      const [existingItem] = updatedHistory.splice(existingIndex, 1);
      updatedHistory.unshift(existingItem);
      setSearchHistoryList(updatedHistory);
    } else {
      // 添加新项到最前面
      const newItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query,
      };
      setSearchHistoryList([newItem, ...searchHistoryList]);
    }
  };

  const handleHistoryItemPress = (query: string) => {
    setSearchQuery(query);
    setCurrentSearchState('searching');
    
    setTimeout(() => {
      setSearchResultsList(mockSearchResults);
      setCurrentSearchState('results');
    }, 1000);
  };

  const handleDeleteHistoryItem = (itemId: string) => {
    setSearchHistoryList(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearAllHistory = () => {
    Alert.alert(
      '清空搜索历史',
      '确定要清空所有搜索历史吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '确定', 
          onPress: () => setSearchHistoryList([])
        },
      ]
    );
  };

  const handleHotTagPress = (tag: string) => {
    setSearchQuery(tag);
    handleAddToSearchHistory(tag);
    setCurrentSearchState('searching');
    
    setTimeout(() => {
      setSearchResultsList(mockSearchResults);
      setCurrentSearchState('results');
    }, 1000);
  };

  const handleBookResultPress = (bookId: string) => {
    router.push(`/p-book_detail?bookId=${bookId}`);
  };

  const handleBookNavigationPress = (bookId: string) => {
    router.push(`/p-book_detail?bookId=${bookId}&action=navigate`);
  };

  const handleRetrySearch = () => {
    setCurrentSearchState('default');
    searchInputRef.current?.focus();
  };

  const handleLoadMoreResults = async () => {
    setIsLoadingMoreResults(true);
    
    setTimeout(() => {
      setIsLoadingMoreResults(false);
      // 这里应该加载更多搜索结果
    }, 1000);
  };

  const getBookStatusText = (book: BookSearchResult) => {
    switch (book.status) {
      case 'available':
        return `可借阅 (${book.availableCount}/${book.totalCount})`;
      case 'reservation':
        return `可预约 (${book.availableCount}/${book.totalCount})`;
      case 'unavailable':
        return `暂无库存 (${book.availableCount}/${book.totalCount})`;
      default:
        return '';
    }
  };

  const getBookStatusStyle = (status: string) => {
    switch (status) {
      case 'available':
        return styles.bookStatusAvailable;
      case 'reservation':
        return styles.bookStatusReservation;
      case 'unavailable':
        return styles.bookStatusUnavailable;
      default:
        return styles.bookStatusAvailable;
    }
  };

  const renderSearchHistoryItem = ({ item }: { item: SearchHistoryItem }) => (
    <View style={styles.historyItemContainer}>
      <TouchableOpacity 
        style={styles.historyItemContent}
        onPress={() => handleHistoryItemPress(item.query)}
        activeOpacity={0.7}
      >
        <FontAwesome6 name="clock-rotate-left" style={styles.historyIcon} />
        <Text style={styles.historyItemText}>{item.query}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.historyDeleteButton}
        onPress={() => handleDeleteHistoryItem(item.id)}
        activeOpacity={0.7}
      >
        <FontAwesome6 name="xmark" style={styles.historyDeleteIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderBookSearchResult = ({ item }: { item: BookSearchResult }) => (
    <TouchableOpacity 
      style={styles.bookResultItem}
      onPress={() => handleBookResultPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.bookResultContent}>
        <Image source={{ uri: item.coverUrl }} style={styles.bookCoverImage} />
        <View style={styles.bookResultInfo}>
          <Text style={styles.bookResultTitle}>{item.title}</Text>
          <Text style={styles.bookResultAuthor}>{item.author}</Text>
          <View style={styles.bookResultDetails}>
            <Text style={styles.bookResultDetailText}>ISBN: {item.isbn}</Text>
            <Text style={styles.bookResultDetailText}>索书号: {item.shelfNumber}</Text>
          </View>
          <View style={styles.bookResultFooter}>
            <View style={[styles.bookStatusBadge, getBookStatusStyle(item.status)]}>
              <Text style={styles.bookStatusText}>{getBookStatusText(item)}</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.bookNavigationButton,
                item.status === 'unavailable' && styles.bookNavigationButtonDisabled
              ]}
              onPress={() => handleBookNavigationPress(item.id)}
              disabled={item.status === 'unavailable'}
              activeOpacity={0.7}
            >
              <FontAwesome6 name="location-dot" style={styles.bookNavigationIcon} />
              <Text style={[
                styles.bookNavigationText,
                item.status === 'unavailable' && styles.bookNavigationTextDisabled
              ]}>
                导航
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDefaultState = () => (
    <View style={styles.defaultStateContainer}>
      {/* 搜索历史 */}
      {searchHistoryList.length > 0 && (
        <View style={styles.searchHistorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>搜索历史</Text>
            <TouchableOpacity 
              style={styles.clearHistoryButton}
              onPress={handleClearAllHistory}
              activeOpacity={0.7}
            >
              <FontAwesome6 name="trash-can" style={styles.clearHistoryIcon} />
              <Text style={styles.clearHistoryText}>清空</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchHistoryList}
            renderItem={renderSearchHistoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* 热门搜索 */}
      <View style={styles.hotSearchSection}>
        <Text style={styles.sectionTitle}>热门搜索</Text>
        <View style={styles.hotSearchTagsContainer}>
          {hotSearchTags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.hotSearchTag}
              onPress={() => handleHotTagPress(tag)}
              activeOpacity={0.8}
            >
              <Text style={styles.hotSearchTagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSearchingState = () => (
    <View style={styles.searchingStateContainer}>
      <View style={styles.loadingSpinner} />
      <Text style={styles.searchingStateText}>搜索中...</Text>
    </View>
  );

  const renderSearchResultsState = () => (
    <View style={styles.searchResultsStateContainer}>
      <View style={styles.resultsHeader}>
        <Text style={styles.sectionTitle}>搜索结果</Text>
        <Text style={styles.resultsCountText}>找到 {searchResultsList.length} 本相关图书</Text>
      </View>
      
      <FlatList
        data={searchResultsList}
        renderItem={renderBookSearchResult}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      {/* 加载更多 */}
      <View style={styles.loadMoreSection}>
        <TouchableOpacity 
          style={styles.loadMoreButton}
          onPress={handleLoadMoreResults}
          disabled={isLoadingMoreResults}
          activeOpacity={0.7}
        >
          <Text style={styles.loadMoreButtonText}>
            {isLoadingMoreResults ? '加载中...' : '加载更多'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNoResultsState = () => (
    <View style={styles.noResultsStateContainer}>
      <FontAwesome6 name="magnifying-glass" style={styles.noResultsIcon} />
      <Text style={styles.noResultsTitle}>未找到相关图书</Text>
      <Text style={styles.noResultsDescription}>请尝试其他关键词或检查输入是否正确</Text>
      <TouchableOpacity 
        style={styles.retrySearchButton}
        onPress={handleRetrySearch}
        activeOpacity={0.7}
      >
        <Text style={styles.retrySearchButtonText}>重新搜索</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentState = () => {
    switch (currentSearchState) {
      case 'default':
        return renderDefaultState();
      case 'searching':
        return renderSearchingState();
      case 'results':
        return renderSearchResultsState();
      case 'no-results':
        return renderNoResultsState();
      default:
        return renderDefaultState();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 顶部搜索栏 */}
        <View style={styles.searchHeaderContainer}>
          <View style={styles.searchInputContainer}>
            <FontAwesome6 name="magnifying-glass" style={styles.searchInputIcon} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchTextInput}
              placeholder="搜索书名、作者、关键词、ISBN..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              onSubmitEditing={handlePerformSearch}
              returnKeyType="search"
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={handleClearSearchInput}
                activeOpacity={0.7}
              >
                <FontAwesome6 name="xmark" style={styles.clearSearchIcon} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.searchActionButton}
            onPress={handlePerformSearch}
            activeOpacity={0.8}
          >
            <Text style={styles.searchActionButtonText}>搜索</Text>
          </TouchableOpacity>
        </View>

        {/* 主要内容区域 */}
        <ScrollView 
          style={styles.mainContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderCurrentState()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookSearchScreen;

