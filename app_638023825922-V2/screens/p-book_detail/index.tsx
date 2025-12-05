

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface BookData {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  isbn: string;
  subject: string;
  keywords: string;
  description: string;
  coverImage: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}

const BookDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id, bookId } = useLocalSearchParams<{ id?: string; bookId?: string }>();
  
  const [isLoading, setIsLoading] = useState(true);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  // 模拟图书数据
  const mockBooks: Record<string, BookData> = {
    '123': {
      id: '123',
      title: '人工智能简史',
      author: '李开复 著',
      publisher: '中信出版社',
      publicationYear: '2017年',
      isbn: '9787508678163',
      subject: '计算机科学',
      keywords: '人工智能,机器学习',
      description: '本书系统地梳理了人工智能的发展历程，从早期的专家系统到现代的深度学习，全面介绍了人工智能的技术原理、应用领域和未来趋势。作者李开复博士结合自己在AI领域30年的经验，深入浅出地解读了这一革命性技术对人类社会的影响。',
      coverImage: 'https://s.coze.cn/image/sqxRztRLoj8/',
      totalCopies: 5,
      availableCopies: 3,
      shelfLocation: 'TP18/123'
    },
    '456': {
      id: '456',
      title: '深度学习入门',
      author: '斋藤康毅 著',
      publisher: '人民邮电出版社',
      publicationYear: '2018年',
      isbn: '9787115428028',
      subject: '计算机科学',
      keywords: '深度学习,神经网络',
      description: '这是一本深度学习的入门书籍，以通俗易懂的方式讲解了深度学习的基本概念和实际应用。书中包含大量的图示和代码示例，适合初学者阅读。',
      coverImage: 'https://s.coze.cn/image/Sizr9T_uGTg/',
      totalCopies: 3,
      availableCopies: 0,
      shelfLocation: 'TP18/456'
    },
    '789': {
      id: '789',
      title: 'Python编程：从入门到实践',
      author: '埃里克·马瑟斯 著',
      publisher: '人民邮电出版社',
      publicationYear: '2016年',
      isbn: '9787115428028',
      subject: '计算机科学',
      keywords: 'Python,编程',
      description: '本书是一本Python编程入门书籍，通过实际项目案例来教授Python编程技巧。内容涵盖了基本语法、数据结构、函数、面向对象编程等核心概念。',
      coverImage: 'https://s.coze.cn/image/kZdZGqzzdN8/',
      totalCopies: 8,
      availableCopies: 5,
      shelfLocation: 'TP312/789'
    }
  };

  useEffect(() => {
    loadBookDetails();
  }, [id, bookId]);

  const loadBookDetails = async () => {
    setIsLoading(true);
    setShowOutOfStock(false);
    
    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentBookId = id || bookId || '123';
      const book = mockBooks[currentBookId];
      
      if (book) {
        setBookData(book);
        if (book.availableCopies === 0) {
          setShowOutOfStock(true);
        }
      } else {
        setShowOutOfStock(true);
      }
    } catch (error) {
      setShowOutOfStock(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/p-book_search');
    }
  };

  const handleNavigationPress = () => {
    if (bookData) {
      router.push(`/p-book_navigation?bookId=${bookData.id}&shelfLocation=${encodeURIComponent(bookData.shelfLocation)}`);
    }
  };

  const handleAddToWishlist = () => {
    Alert.alert('成功', '已加入心愿单！');
  };

  const handleNotifyMe = () => {
    Alert.alert('成功', '到货时将通知您！');
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6366f1" style={styles.loadingSpinner} />
      <Text style={styles.loadingText}>正在加载图书信息...</Text>
    </View>
  );

  const renderOutOfStockState = () => (
    <View style={styles.outOfStockContainer}>
      <FontAwesome6 name="bookmark" size={64} color="#d1d5db" style={styles.outOfStockIcon} />
      <Text style={styles.outOfStockTitle}>
        {bookData ? '暂无库存' : '图书不存在'}
      </Text>
      <Text style={styles.outOfStockDescription}>
        {bookData 
          ? '抱歉，目前该图书暂时没有可借阅的副本。您可以：'
          : '抱歉，没有找到您要查看的图书信息。'
        }
      </Text>
      {bookData && (
        <View style={styles.outOfStockActions}>
          <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishlist}>
            <FontAwesome6 name="heart" size={16} color="#1f2937" style={styles.buttonIcon} />
            <Text style={styles.wishlistButtonText}>加入心愿单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notifyButton} onPress={handleNotifyMe}>
            <FontAwesome6 name="bell" size={16} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.notifyButtonText}>到货通知我</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderBookDetailContent = () => {
    if (!bookData) return null;

    return (
      <View style={styles.bookDetailContent}>
        {/* 图书封面和基本信息 */}
        <View style={styles.bookInfoSection}>
          <View style={styles.bookHeader}>
            {/* 图书封面 */}
            <View style={styles.bookCoverContainer}>
              <Image 
                source={{ uri: bookData.coverImage }} 
                style={styles.bookCover}
                resizeMode="cover"
              />
            </View>
            
            {/* 图书基本信息 */}
            <View style={styles.bookBasicInfo}>
              <Text style={styles.bookTitle}>{bookData.title}</Text>
              <Text style={styles.bookAuthor}>{bookData.author}</Text>
              <View style={styles.bookMetaRow}>
                <FontAwesome6 name="building" size={12} color="#6b7280" style={styles.metaIcon} />
                <Text style={styles.bookMetaText}>{bookData.publisher}</Text>
              </View>
              <View style={styles.bookMetaRow}>
                <FontAwesome6 name="calendar" size={12} color="#6b7280" style={styles.metaIcon} />
                <Text style={styles.bookMetaText}>{bookData.publicationYear}</Text>
              </View>
              <View style={styles.bookMetaRow}>
                <FontAwesome6 name="barcode" size={12} color="#6b7280" style={styles.metaIcon} />
                <Text style={styles.bookMetaText}>{bookData.isbn}</Text>
              </View>
              
              {/* 可借阅状态 */}
              <View style={styles.availabilityStatus}>
                <FontAwesome5 name="check-circle" size={14} color="#ffffff" style={styles.availabilityIcon} />
                <Text style={styles.availabilityText}>{bookData.availableCopies}本可借阅</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 图书详细信息 */}
        <View style={styles.bookDetailsSection}>
          {/* 图书简介 */}
          <View style={styles.bookDescriptionCard}>
            <View style={styles.sectionHeader}>
              <FontAwesome6 name="align-left" size={16} color="#6366f1" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>图书简介</Text>
            </View>
            <Text style={styles.bookDescription}>{bookData.description}</Text>
          </View>

          {/* 图书信息卡片 */}
          <View style={styles.bookMetaInfoCard}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="info-circle" size={16} color="#6366f1" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>图书信息</Text>
            </View>
            <View style={styles.metaInfoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardLabel}>主题分类</Text>
                <Text style={styles.infoCardValue}>{bookData.subject}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardLabel}>关键词</Text>
                <Text style={styles.infoCardValue}>{bookData.keywords}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardLabel}>总藏书量</Text>
                <Text style={styles.infoCardValue}>{bookData.totalCopies}本</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardLabel}>书架位置</Text>
                <Text style={styles.infoCardValue}>{bookData.shelfLocation}</Text>
              </View>
            </View>
          </View>

          {/* 书架导航按钮 */}
          <View style={styles.navigationSection}>
            <TouchableOpacity style={styles.navigationButton} onPress={handleNavigationPress}>
              <FontAwesome5 name="map-marker-alt" size={20} color="#ffffff" style={styles.navigationIcon} />
              <Text style={styles.navigationButtonText}>导航到书架</Text>
            </TouchableOpacity>
            <Text style={styles.navigationHint}>
              点击按钮获取到目标书架的导航路线
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <FontAwesome6 name="arrow-left" size={16} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>图书详情</Text>
        </View>
      </View>

      {/* 主要内容区域 */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {isLoading && renderLoadingState()}
        {!isLoading && showOutOfStock && renderOutOfStockState()}
        {!isLoading && !showOutOfStock && renderBookDetailContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

