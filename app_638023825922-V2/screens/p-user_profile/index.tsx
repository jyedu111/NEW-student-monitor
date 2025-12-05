

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

const UserProfileScreen = () => {
  const router = useRouter();

  const handleMyBookingsPress = () => {
    router.push('/p-my_bookings');
  };

  const handleMyActivitiesPress = () => {
    router.push('/p-event_list?filter=myEvents');
  };

  const handleSettingsPress = () => {
    router.push('/p-settings');
  };

  const handleHelpCenterPress = () => {
    router.push('/p-intellectual_qna');
  };

  const handleAboutUsPress = () => {
    router.push('/p-about_us');
  };

  const handleFeedbackPress = () => {
    Alert.alert('意见反馈', '意见反馈功能待开发');
  };

  const handleLogoutPress = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            // 这里可以清除用户登录状态并跳转到登录页
            console.log('用户退出登录');
          },
        },
      ]
    );
  };

  const handleAvatarPress = () => {
    Alert.alert('头像编辑', '需要调用第三方接口实现头像编辑功能');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 用户信息头部 */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.userInfo}>
            <TouchableOpacity style={styles.userAvatarContainer} onPress={handleAvatarPress}>
              <Image
                source={{ uri: 'https://s.coze.cn/image/iEvk46y3lR4/' }}
                style={styles.userAvatar}
              />
              <View style={styles.avatarEditIndicator}>
                <FontAwesome6 name="camera" size={12} color="#6366f1" />
              </View>
            </TouchableOpacity>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>张同学</Text>
              <Text style={styles.userId}>学号：2021001234</Text>
              <View style={styles.userLevel}>
                <View style={styles.userLevelBadge}>
                  <Text style={styles.userLevelText}>普通用户</Text>
                </View>
                <Text style={styles.userPoints}>积分：120</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* 统计信息卡片 */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>总预约</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#8b5cf6' }]}>5</Text>
                <Text style={styles.statLabel}>参与活动</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#06b6d4' }]}>120</Text>
                <Text style={styles.statLabel}>积分</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 功能菜单 */}
        <View style={styles.menuSection}>
          {/* 我的服务 */}
          <View style={styles.menuCard}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>我的服务</Text>
            </View>
            
            <TouchableOpacity style={[styles.menuItem, styles.menuItemWithBorder]} onPress={handleMyBookingsPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                  <FontAwesome5 name="calendar-alt" size={16} color="#6366f1" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>我的预约</Text>
                  <Text style={styles.menuItemSubtitle}>查看和管理座位预约</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleMyActivitiesPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
                  <FontAwesome6 name="users" size={16} color="#8b5cf6" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>我的活动</Text>
                  <Text style={styles.menuItemSubtitle}>已报名和参与的活动</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* 设置与帮助 */}
          <View style={styles.menuCard}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>设置与帮助</Text>
            </View>
            
            <TouchableOpacity style={[styles.menuItem, styles.menuItemWithBorder]} onPress={handleSettingsPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                  <FontAwesome5 name="cog" size={16} color="#06b6d4" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>设置</Text>
                  <Text style={styles.menuItemSubtitle}>通知、隐私等设置</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.menuItem, styles.menuItemWithBorder]} onPress={handleHelpCenterPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                  <FontAwesome5 name="question-circle" size={16} color="#f59e0b" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>帮助中心</Text>
                  <Text style={styles.menuItemSubtitle}>智能问答和使用指南</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleAboutUsPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <FontAwesome5 name="info-circle" size={16} color="#3b82f6" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>关于我们</Text>
                  <Text style={styles.menuItemSubtitle}>版本信息和隐私政策</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* 其他功能 */}
          <View style={styles.menuCard}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>其他</Text>
            </View>
            
            <TouchableOpacity style={[styles.menuItem, styles.menuItemWithBorder]} onPress={handleFeedbackPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                  <FontAwesome6 name="comment-dots" size={16} color="#10b981" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>意见反馈</Text>
                  <Text style={styles.menuItemSubtitle}>帮助我们改进服务</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleLogoutPress}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <FontAwesome6 name="right-from-bracket" size={16} color="#ef4444" />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={[styles.menuItemTitle, { color: '#ef4444' }]}>退出登录</Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

