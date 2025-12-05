

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

const SettingsScreen = () => {
  const router = useRouter();
  const [isClearCacheModalVisible, setIsClearCacheModalVisible] = useState(false);
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(false);
  const [cacheSize, setCacheSize] = useState('12.5 MB');

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleNotificationSettingsPress = () => {
    router.push('/p-notification_settings');
  };

  const handleClearCachePress = () => {
    setIsClearCacheModalVisible(true);
  };

  const handlePrivacyPolicyPress = () => {
    Alert.alert('隐私政策', '即将打开隐私政策页面');
  };

  const handleUserAgreementPress = () => {
    Alert.alert('用户协议', '即将打开用户协议页面');
  };

  const handleCancelClearCache = () => {
    setIsClearCacheModalVisible(false);
  };

  const handleConfirmClearCache = () => {
    setIsClearCacheModalVisible(false);
    setCacheSize('0 MB');
    setIsSuccessToastVisible(true);
    
    setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, 3000);
  };

  const handleModalOverlayPress = () => {
    setIsClearCacheModalVisible(false);
  };

  const renderSettingItem = (
    icon: string,
    iconColor: string,
    iconBgColor: string,
    title: string,
    subtitle: string,
    onPress: () => void,
    rightContent?: React.ReactNode
  ) => (
    <TouchableOpacity style={styles.settingItemContainer} onPress={onPress}>
      <View style={styles.settingItem}>
        <View style={styles.settingItemLeft}>
          <View style={[styles.settingItemIcon, { backgroundColor: iconBgColor }]}>
            <FontAwesome6 name={icon} style={[styles.settingItemIconText, { color: iconColor }]} />
          </View>
          <View style={styles.settingItemTextContainer}>
            <Text style={styles.settingItemTitle}>{title}</Text>
            <Text style={styles.settingItemSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.settingItemRight}>
          {rightContent}
          <FontAwesome6 name="chevron-right" style={styles.settingItemChevron} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
      </View>

      {/* 主要内容区域 */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsList}>
          {/* 通知设置 */}
          {renderSettingItem(
            'bell',
            '#6366f1',
            'rgba(99, 102, 241, 0.1)',
            '通知设置',
            '管理推送通知偏好',
            handleNotificationSettingsPress
          )}

          {/* 清除缓存 */}
          {renderSettingItem(
            'trash-alt',
            '#f59e0b',
            'rgba(245, 158, 11, 0.1)',
            '清除缓存',
            '释放存储空间',
            handleClearCachePress,
            <Text style={styles.cacheSize}>{cacheSize}</Text>
          )}

          {/* 隐私政策 */}
          {renderSettingItem(
            'shield-alt',
            '#3b82f6',
            'rgba(59, 130, 246, 0.1)',
            '隐私政策',
            '了解我们如何保护您的隐私',
            handlePrivacyPolicyPress
          )}

          {/* 用户协议 */}
          {renderSettingItem(
            'file-contract',
            '#06b6d4',
            'rgba(6, 182, 212, 0.1)',
            '用户协议',
            '查看服务条款',
            handleUserAgreementPress
          )}
        </View>

        {/* 版本信息 */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionAppName}>图书馆智能助手</Text>
          <Text style={styles.versionNumber}>版本 1.0.0</Text>
        </View>
      </ScrollView>

      {/* 清除缓存确认弹窗 */}
      <Modal
        visible={isClearCacheModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelClearCache}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleModalOverlayPress}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              <View style={styles.modalBody}>
                <View style={styles.modalIconContainer}>
                  <FontAwesome5 name="trash-alt" style={styles.modalIcon} />
                </View>
                <Text style={styles.modalTitle}>清除缓存</Text>
                <Text style={styles.modalSubtitle}>
                  确定要清除所有缓存数据吗？这将释放 {cacheSize === '0 MB' ? '12.5 MB' : cacheSize} 存储空间。
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancelClearCache}>
                  <Text style={styles.modalCancelButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalConfirmButton} onPress={handleConfirmClearCache}>
                  <Text style={styles.modalConfirmButtonText}>清除</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 成功提示Toast */}
      {isSuccessToastVisible && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <FontAwesome5 name="check-circle" style={styles.toastIcon} />
            <Text style={styles.toastText}>缓存清除成功</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;

