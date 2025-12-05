

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface NotificationSettings {
  masterEnabled: boolean;
  bookingReminder: boolean;
  activityNotification: boolean;
  systemMessage: boolean;
  seatGovernance: boolean;
  bookDue: boolean;
  environmentReminder: boolean;
}

const NotificationSettingsScreen = () => {
  const router = useRouter();
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    masterEnabled: true,
    bookingReminder: true,
    activityNotification: true,
    systemMessage: true,
    seatGovernance: true,
    bookDue: true,
    environmentReminder: true,
  });

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleMasterSwitchChange = (value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      masterEnabled: value,
      bookingReminder: value,
      activityNotification: value,
      systemMessage: value,
      seatGovernance: value,
      bookDue: value,
      environmentReminder: value,
    }));
    showSaveSuccess();
  };

  const handleNotificationTypeChange = (key: keyof NotificationSettings, value: boolean) => {
    if (notificationSettings.masterEnabled) {
      setNotificationSettings(prev => ({
        ...prev,
        [key]: value,
      }));
      showSaveSuccess();
    }
  };

  const showSaveSuccess = () => {
    Alert.alert('设置已保存', '', [{ text: '确定' }]);
  };

  const renderNotificationItem = (
    key: keyof NotificationSettings,
    title: string,
    description: string,
    isLast: boolean = false
  ) => (
    <View style={[styles.notificationItem, isLast && styles.notificationItemLast]}>
      <View style={styles.notificationItemInfo}>
        <Text style={styles.notificationItemTitle}>{title}</Text>
        <Text style={styles.notificationItemDescription}>{description}</Text>
      </View>
      <Switch
        value={notificationSettings[key]}
        onValueChange={(value) => handleNotificationTypeChange(key, value)}
        disabled={!notificationSettings.masterEnabled}
        trackColor={{ false: '#ccc', true: '#6366f1' }}
        thumbColor={notificationSettings.masterEnabled ? '#ffffff' : '#ffffff'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>通知设置</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 总开关 */}
        <View style={styles.masterSwitchSection}>
          <View style={styles.masterSwitchHeader}>
            <View style={styles.masterSwitchInfo}>
              <Text style={styles.masterSwitchTitle}>允许通知</Text>
              <Text style={styles.masterSwitchDescription}>关闭后将不会收到任何通知</Text>
            </View>
            <Switch
              value={notificationSettings.masterEnabled}
              onValueChange={handleMasterSwitchChange}
              trackColor={{ false: '#ccc', true: '#6366f1' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* 通知类型列表 */}
        <View style={styles.notificationTypesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>通知类型</Text>
          </View>
          
          {renderNotificationItem(
            'bookingReminder',
            '预约提醒',
            '座位预约开始、结束提醒'
          )}
          
          {renderNotificationItem(
            'activityNotification',
            '活动通知',
            '图书馆活动、讲座信息'
          )}
          
          {renderNotificationItem(
            'systemMessage',
            '系统消息',
            '系统更新、维护通知'
          )}
          
          {renderNotificationItem(
            'seatGovernance',
            '占座治理',
            '占座举报处理结果通知'
          )}
          
          {renderNotificationItem(
            'bookDue',
            '图书到期提醒',
            '借阅图书到期前提醒'
          )}
          
          {renderNotificationItem(
            'environmentReminder',
            '环境提醒',
            '学习环境变化提醒',
            true
          )}
        </View>

        {/* 说明文字 */}
        <View style={styles.notificationTips}>
          <View style={styles.tipsContent}>
            <FontAwesome6 name="circle-info" size={16} color="#3b82f6" style={styles.tipsIcon} />
            <View style={styles.tipsTextContainer}>
              <Text style={styles.tipsTitle}>关于通知</Text>
              <Text style={styles.tipsDescription}>
                您可以随时在此页面调整通知偏好。部分重要系统消息可能无法关闭，以确保您能及时了解图书馆服务变化。
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;

