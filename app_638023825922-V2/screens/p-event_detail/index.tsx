

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  speaker: string;
  speakerPosition: string;
  speakerBio: string;
  capacity: number;
  registeredCount: number;
  isRegistered: boolean;
}

const EventDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);

  // 模拟活动数据
  const mockEvents: Record<string, EventData> = {
    '1': {
      id: '1',
      title: '学术论文写作讲座',
      description: '本次讲座将详细介绍学术论文的写作规范和技巧，包括选题、文献综述、研究方法、结果分析等各个环节。适合正在准备毕业论文的本科生和研究生参加。',
      startTime: '2024-03-15T19:00:00',
      endTime: '2024-03-15T21:00:00',
      location: '一层报告厅',
      speaker: '张教授',
      speakerPosition: '文学院 教授',
      speakerBio: '从事学术研究和教学工作20余年，发表学术论文50余篇，出版专著3部。在学术写作指导方面经验丰富，曾指导多名学生获得优秀毕业论文奖。',
      capacity: 60,
      registeredCount: 45,
      isRegistered: false,
    },
    '2': {
      id: '2',
      title: '数字阅读技巧培训',
      description: '随着数字化时代的到来，掌握数字阅读技巧变得越来越重要。本次培训将介绍如何高效利用电子资源进行学习和研究。',
      startTime: '2024-03-18T14:00:00',
      endTime: '2024-03-18T16:00:00',
      location: '二层培训室',
      speaker: '李老师',
      speakerPosition: '图书馆 技术部主任',
      speakerBio: '图书馆数字化建设专家，在数字资源管理和用户培训方面有丰富经验。',
      capacity: 30,
      registeredCount: 28,
      isRegistered: true,
    },
    '3': {
      id: '3',
      title: '古典文学欣赏讲座',
      description: '深入探讨中国古典文学的魅力，从诗词歌赋到小说戏曲，带你领略中华传统文化的博大精深。',
      startTime: '2024-03-20T19:30:00',
      endTime: '2024-03-20T21:30:00',
      location: '一层报告厅',
      speaker: '王教授',
      speakerPosition: '历史学院 教授',
      speakerBio: '古典文学研究专家，在传统文化领域有深厚造诣。',
      capacity: 80,
      registeredCount: 32,
      isRegistered: false,
    },
  };

  useEffect(() => {
    loadEventDetails();
  }, [id]);

  const loadEventDetails = () => {
    const eventId = id || '1';
    const event = mockEvents[eventId];
    if (event) {
      setEventData(event);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const getTimeDisplay = () => {
    if (!eventData) return '';
    const startTimeFormatted = formatDateTime(eventData.startTime);
    const endTimeFormatted = formatDateTime(eventData.endTime);
    return `${startTimeFormatted} - ${endTimeFormatted.split(' ')[1]}`;
  };

  const getCapacityPercentage = () => {
    if (!eventData) return 0;
    return (eventData.registeredCount / eventData.capacity) * 100;
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleRegisterPress = async () => {
    if (!eventData || eventData.isRegistered || eventData.registeredCount >= eventData.capacity || isLoadingRegistration) {
      return;
    }

    setIsLoadingRegistration(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 更新活动状态
      setEventData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          isRegistered: true,
          registeredCount: prevData.registeredCount + 1,
        };
      });

      Alert.alert('报名成功！', '', [{ text: '确定' }]);
    } catch (error) {
      Alert.alert('报名失败', '请稍后重试', [{ text: '确定' }]);
    } finally {
      setIsLoadingRegistration(false);
    }
  };

  const getRegistrationButtonText = () => {
    if (isLoadingRegistration) return '报名中...';
    if (!eventData) return '立即报名';
    if (eventData.isRegistered) return '已报名';
    if (eventData.registeredCount >= eventData.capacity) return '名额已满';
    return '立即报名';
  };

  const getRegistrationButtonStyle = () => {
    if (!eventData) return styles.registerButton;
    if (eventData.isRegistered) return styles.registeredButton;
    if (eventData.registeredCount >= eventData.capacity) return styles.disabledButton;
    return styles.registerButton;
  };

  const getStatusBadgeText = () => {
    if (!eventData) return '报名中';
    if (eventData.isRegistered) return '已报名';
    if (eventData.registeredCount >= eventData.capacity) return '已满';
    return '报名中';
  };

  const getStatusBadgeStyle = () => {
    if (!eventData) return styles.statusBadgeWarning;
    if (eventData.isRegistered) return styles.statusBadgeSuccess;
    if (eventData.registeredCount >= eventData.capacity) return styles.statusBadgeFull;
    return styles.statusBadgeWarning;
  };

  if (!eventData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>活动详情</Text>
      </View>

      {/* 主要内容区域 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* 活动标题和基本信息 */}
          <View style={styles.eventHeaderSection}>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.eventHeaderCard}
            >
              <Text style={styles.eventTitle}>{eventData.title}</Text>
              <View style={styles.eventMeta}>
                <View style={styles.eventMetaRow}>
                  <FontAwesome5 name="calendar-alt" size={14} color="#ffffff" />
                  <Text style={styles.eventMetaText}>{getTimeDisplay()}</Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <FontAwesome5 name="map-marker-alt" size={14} color="#ffffff" />
                  <Text style={styles.eventMetaText}>{eventData.location}</Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <FontAwesome6 name="user-tie" size={14} color="#ffffff" />
                  <Text style={styles.eventMetaText}>主讲人：{eventData.speaker}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* 报名状态 */}
          <View style={styles.registrationStatusSection}>
            <View style={styles.registrationStatusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>报名状态</Text>
                <View style={[styles.statusBadge, getStatusBadgeStyle()]}>
                  <Text style={styles.statusBadgeText}>{getStatusBadgeText()}</Text>
                </View>
              </View>
              <View style={styles.capacityInfo}>
                <Text style={styles.capacityText}>
                  已报名 <Text style={styles.capacityNumbers}>{eventData.registeredCount}</Text> / <Text style={styles.capacityNumbers}>{eventData.capacity}</Text> 人
                </Text>
                <View style={styles.capacityBarContainer}>
                  <View style={styles.capacityBarBg}>
                    <View style={[styles.capacityBarFill, { width: `${getCapacityPercentage()}%` }]} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 活动详情 */}
          <View style={styles.eventDetailsSection}>
            <View style={styles.eventDetailsCard}>
              <Text style={styles.sectionTitle}>活动详情</Text>
              <Text style={styles.eventDescription}>{eventData.description}</Text>
            </View>
          </View>

          {/* 主讲人介绍 */}
          <View style={styles.speakerSection}>
            <View style={styles.speakerCard}>
              <Text style={styles.sectionTitle}>主讲人介绍</Text>
              <View style={styles.speakerInfo}>
                <Image
                  source={{ uri: 'https://s.coze.cn/image/Oc4iKdTtxEw/' }}
                  style={styles.speakerAvatar}
                />
                <View style={styles.speakerDetails}>
                  <Text style={styles.speakerName}>{eventData.speaker}</Text>
                  <Text style={styles.speakerPosition}>{eventData.speakerPosition}</Text>
                  <Text style={styles.speakerBio}>{eventData.speakerBio}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 注意事项 */}
          <View style={styles.notesSection}>
            <View style={styles.notesCard}>
              <Text style={styles.sectionTitle}>注意事项</Text>
              <View style={styles.notesList}>
                <View style={styles.noteItem}>
                  <FontAwesome6 name="circle" size={6} color="#6b7280" style={styles.noteBullet} />
                  <Text style={styles.noteText}>请提前15分钟到场签到</Text>
                </View>
                <View style={styles.noteItem}>
                  <FontAwesome6 name="circle" size={6} color="#6b7280" style={styles.noteBullet} />
                  <Text style={styles.noteText}>建议携带笔记本和笔</Text>
                </View>
                <View style={styles.noteItem}>
                  <FontAwesome6 name="circle" size={6} color="#6b7280" style={styles.noteBullet} />
                  <Text style={styles.noteText}>如需取消报名，请提前2小时操作</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 底部间距 */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* 底部报名按钮 */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[styles.registerButtonContainer, getRegistrationButtonStyle()]}
          onPress={handleRegisterPress}
          disabled={eventData.isRegistered || eventData.registeredCount >= eventData.capacity || isLoadingRegistration}
        >
          <Text style={styles.registerButtonText}>{getRegistrationButtonText()}</Text>
          {isLoadingRegistration && (
            <View style={styles.loadingSpinner} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EventDetailScreen;

