

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface Attachment {
  name: string;
  url: string;
  size: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  publishTime: string;
  publisherName: string;
  type: string;
  attachments: Attachment[];
}

type LoadingState = 'loading' | 'loaded' | 'error';

const AnnouncementDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // 模拟公告数据
  const mockAnnouncements: Record<string, Announcement> = {
    '1': {
      id: '1',
      title: '图书馆开放时间调整通知',
      content: `亲爱的读者：

为了更好地满足广大读者的学习和研究需求，提供更加优质的服务，图书馆决定自2024年2月1日起调整开放时间。具体调整如下：

新开放时间安排：
• 周一至周五：07:00 - 22:00
• 周六至周日：08:00 - 22:00
• 法定节假日：09:00 - 18:00

此次调整旨在为大家提供更长的学习时间，特别是延长了晚间开放时间，方便同学们进行晚间学习和研究。

注意事项：
• 闭馆前30分钟停止入馆
• 请读者合理安排时间，按时离馆
• 如有特殊情况需要延长使用时间，请提前与值班管理员联系

感谢大家对图书馆工作的理解和支持！我们将继续努力，为大家提供更好的学习环境和服务。

如有任何疑问，请联系图书馆服务台：
联系电话：010-12345678
邮箱：library@university.edu.cn

图书馆
2024年1月15日`,
      publishTime: '2024年1月15日 10:30',
      publisherName: '图书馆管理员',
      type: '重要通知',
      attachments: [],
    },
    '2': {
      id: '2',
      title: '期末考试期间座位预约规则调整',
      content: `各位同学：

期末考试即将来临，为了给大家提供更好的复习环境，图书馆将在考试期间调整座位预约规则，具体如下：

调整时间：
2024年1月20日 - 2024年2月5日

调整内容：
• 预约时长限制：单次预约最长4小时
• 每日预约次数：最多2次
• 签到时间：预约开始后15分钟内必须签到
• 临时离开：每次最长30分钟，每日不超过2次

请大家合理安排学习时间，共同维护良好的学习秩序。祝各位同学考试顺利！

图书馆
2024年1月18日`,
      publishTime: '2024年1月18日 14:20',
      publisherName: '图书馆管理处',
      type: '规则通知',
      attachments: [
        {
          name: '考试期间座位预约规则细则.pdf',
          url: '/attachments/exam_seat_rules.pdf',
          size: '1.2MB',
        },
      ],
    },
    '789': {
      id: '789',
      title: '图书馆新功能上线通知',
      content: `亲爱的读者：

为了提升大家的使用体验，图书馆智能助手App将推出以下新功能：

新增功能：
• 智能座位推荐：根据你的学习偏好和实时环境数据，为你推荐最适合的座位
• 图书智能检索：支持更精准的图书搜索，包括模糊查询和语义理解
• 环境监测：实时查看各区域的温湿度、噪音等环境数据
• 学术助手：与知网等学术数据库联动，帮助追踪研究前沿

新功能将于2024年1月25日正式上线，欢迎大家体验并提出宝贵意见！

图书馆技术部
2024年1月22日`,
      publishTime: '2024年1月22日 09:15',
      publisherName: '图书馆技术部',
      type: '功能通知',
      attachments: [],
    },
  };

  const loadAnnouncementDetail = async () => {
    try {
      setLoadingState('loading');
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const announcementData = mockAnnouncements[id || '1'];
      if (announcementData) {
        setAnnouncement(announcementData);
        setLoadingState('loaded');
      } else {
        setLoadingState('error');
      }
    } catch (error) {
      setLoadingState('error');
    }
  };

  useEffect(() => {
    loadAnnouncementDetail();
  }, [id]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/p-announcement_list');
    }
  };

  const handleSharePress = () => {
    Alert.alert('分享', '分享功能需要调用系统分享API');
  };

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
  };

  const handleRetryPress = () => {
    loadAnnouncementDetail();
  };

  const handleAttachmentDownload = (attachment: Attachment) => {
    Alert.alert('下载', `开始下载 ${attachment.name}`);
  };

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#6366f1" style={styles.loadingSpinner} />
      <Text style={styles.loadingText}>正在加载公告详情...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <FontAwesome6 name="triangle-exclamation" size={48} color="#f59e0b" style={styles.errorIcon} />
      <Text style={styles.errorTitle}>加载失败</Text>
      <Text style={styles.errorMessage}>抱歉，无法加载公告详情，请稍后重试</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetryPress}>
        <Text style={styles.retryButtonText}>重试</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAnnouncementContent = () => {
    if (!announcement) return null;

    return (
      <View style={styles.announcementContainer}>
        {/* 公告标题 */}
        <View style={styles.announcementHeader}>
          <Text style={styles.announcementTitle}>{announcement.title}</Text>
          
          {/* 发布信息 */}
          <View style={styles.publishInfo}>
            <View style={styles.publishInfoLeft}>
              <View style={styles.publishInfoItem}>
                <FontAwesome6 name="circle-user" size={14} color="#6b7280" />
                <Text style={styles.publishInfoText}>{announcement.publisherName}</Text>
              </View>
              <View style={styles.publishInfoItem}>
                <FontAwesome6 name="clock" size={14} color="#6b7280" />
                <Text style={styles.publishInfoText}>{announcement.publishTime}</Text>
              </View>
            </View>
            <View style={styles.announcementType}>
              <Text style={styles.announcementTypeText}>{announcement.type}</Text>
            </View>
          </View>
        </View>

        {/* 公告正文 */}
        <View style={styles.announcementBody}>
          <Text style={styles.announcementText}>{announcement.content}</Text>
        </View>

        {/* 相关附件 */}
        {announcement.attachments && announcement.attachments.length > 0 && (
          <View style={styles.attachmentsSection}>
            <Text style={styles.attachmentsTitle}>相关附件</Text>
            <View style={styles.attachmentsList}>
              {announcement.attachments.map((attachment, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.attachmentItem}
                  onPress={() => handleAttachmentDownload(attachment)}
                >
                  <View style={styles.attachmentInfo}>
                    <FontAwesome6 name="file-pdf" size={20} color="#ef4444" />
                    <View style={styles.attachmentDetails}>
                      <Text style={styles.attachmentName}>{attachment.name}</Text>
                      <Text style={styles.attachmentSize}>{attachment.size}</Text>
                    </View>
                  </View>
                  <Text style={styles.downloadText}>下载</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 操作按钮 */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
            <FontAwesome6 name="share-nodes" size={16} color="#1f2937" />
            <Text style={styles.shareButtonText}>分享公告</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorited && styles.favoriteButtonActive]}
            onPress={handleFavoritePress}
          >
            <FontAwesome6
              name="star"
              size={16}
              color="#ffffff"
              solid={isFavorited}
            />
            <Text style={styles.favoriteButtonText}>
              {isFavorited ? '已收藏' : '收藏'}
            </Text>
          </TouchableOpacity>
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
          <Text style={styles.pageTitle}>公告详情</Text>
        </View>
      </View>

      {/* 主要内容区域 */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'loaded' && renderAnnouncementContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnnouncementDetailScreen;

