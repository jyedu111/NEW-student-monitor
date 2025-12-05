

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface BookingItem {
  id: string;
  seatNumber: string;
  date: string;
  time: string;
  location: string;
  status: 'completed' | 'cancelled';
  hasPower?: boolean;
  isWindowSide?: boolean;
}

type HistoryTabType = 'all' | 'completed' | 'cancelled';

const MyBookingsScreen = () => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnTemporaryLeave, setIsOnTemporaryLeave] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(1800); // 30分钟
  const [activeHistoryTab, setActiveHistoryTab] = useState<HistoryTabType>('all');
  const [showUpcomingBooking, setShowUpcomingBooking] = useState(true);
  
  const countdownIntervalRef = useRef<number | null>(null);

  const historyBookings: BookingItem[] = [
    {
      id: '1',
      seatNumber: 'C区研修间 C01',
      date: '2024-01-15',
      time: '10:00 - 16:00',
      location: '一层研修区',
      status: 'completed',
    },
    {
      id: '2',
      seatNumber: 'A区靠窗座位 A05',
      date: '2024-01-14',
      time: '14:00 - 18:00',
      location: '一层阅览区',
      status: 'cancelled',
    },
    {
      id: '3',
      seatNumber: 'D区讨论区 D08',
      date: '2024-01-13',
      time: '19:00 - 21:00',
      location: '二层讨论区',
      status: 'completed',
    },
    {
      id: '4',
      seatNumber: 'B区静音座位 B03',
      date: '2024-01-12',
      time: '09:00 - 17:00',
      location: '一层静音区',
      status: 'completed',
    },
  ];

  const filteredHistoryBookings = historyBookings.filter(booking => {
    if (activeHistoryTab === 'all') return true;
    return booking.status === activeHistoryTab;
  });

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleTemporaryLeavePress = () => {
    if (isOnTemporaryLeave) {
      // 返回座位
      setIsOnTemporaryLeave(false);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    } else {
      // 开始临时离开
      setIsOnTemporaryLeave(true);
      setLeaveCountdown(1800); // 重置为30分钟
      
      countdownIntervalRef.current = setInterval(() => {
        setLeaveCountdown(prev => {
          if (prev <= 1) {
            // 倒计时结束
            setIsOnTemporaryLeave(false);
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleReportSeatPress = () => {
    router.push('/p-report_seat?seatId=A01');
  };

  const handleScanCheckinPress = () => {
    Alert.alert('扫码签到', '此功能需要调用设备相机API，在原型阶段仅做UI展示');
  };

  const handleCancelBookingPress = () => {
    Alert.alert(
      '取消预约',
      '确定要取消这个预约吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            setShowUpcomingBooking(false);
            Alert.alert('预约已取消');
          },
        },
      ]
    );
  };

  const handleHistoryTabPress = (tab: HistoryTabType) => {
    setActiveHistoryTab(tab);
  };

  const handleHistoryItemPress = (booking: BookingItem) => {
    console.log('查看预约详情:', booking.id);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // 模拟刷新数据
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={18} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>我的预约</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* 当前预约区域 */}
        <View style={styles.currentBookingSection}>
          <Text style={styles.sectionTitle}>当前预约</Text>
          
          {/* 当前有效的预约 */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.currentBookingCard}
          >
            <View style={styles.bookingHeaderInfo}>
              <View>
                <Text style={styles.currentSeatNumber}>A区-靠窗座位 A01</Text>
                <Text style={styles.currentBookingTime}>今天 14:00 - 18:00</Text>
              </View>
              <View style={styles.bookingStatusBadge}>
                <Text style={styles.statusBadgeText}>已签到</Text>
              </View>
            </View>
            
            <View style={styles.bookingDetails}>
              <View style={styles.detailItem}>
                <FontAwesome6 name="location-dot" size={12} color="rgba(255,255,255,0.9)" />
                <Text style={styles.detailText}>一层阅览区</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome6 name="plug" size={12} color="rgba(255,255,255,0.9)" />
                <Text style={styles.detailText}>有电源</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome6 name="sun" size={12} color="rgba(255,255,255,0.9)" />
                <Text style={styles.detailText}>靠窗</Text>
              </View>
            </View>
            
            <View style={styles.bookingActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isOnTemporaryLeave && styles.actionButtonWarning
                ]}
                onPress={handleTemporaryLeavePress}
              >
                <FontAwesome6
                  name={isOnTemporaryLeave ? "arrow-left" : "clock"}
                  size={14}
                  color="white"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.actionButtonText}>
                  {isOnTemporaryLeave ? '返回座位' : '临时离开'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleReportSeatPress}>
                <FontAwesome6 name="flag" size={14} color="white" style={styles.actionButtonIcon} />
                <Text style={styles.actionButtonText}>举报占座</Text>
              </TouchableOpacity>
            </View>
            
            {/* 临时离开倒计时 */}
            {isOnTemporaryLeave && (
              <View style={styles.leaveCountdown}>
                <FontAwesome6 name="clock" size={14} color="#f59e0b" />
                <Text style={styles.countdownText}>临时离开中</Text>
                <Text style={styles.countdownTimer}>{formatCountdown(leaveCountdown)}</Text>
              </View>
            )}
          </LinearGradient>
          
          {/* 即将开始的预约 */}
          {showUpcomingBooking && (
            <View style={styles.upcomingBookingCard}>
              <View style={styles.upcomingBookingHeader}>
                <View>
                  <Text style={styles.upcomingSeatNumber}>B区静音座位 B12</Text>
                  <Text style={styles.upcomingBookingTime}>明天 09:00 - 12:00</Text>
                </View>
                <View style={styles.upcomingStatusBadge}>
                  <Text style={styles.upcomingStatusText}>待签到</Text>
                </View>
              </View>
              <View style={styles.upcomingActions}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleScanCheckinPress}>
                  <FontAwesome6 name="qrcode" size={14} color="white" style={styles.primaryButtonIcon} />
                  <Text style={styles.primaryButtonText}>扫码签到</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelBookingPress}>
                  <FontAwesome6 name="xmark" size={14} color="#6b7280" style={styles.secondaryButtonIcon} />
                  <Text style={styles.secondaryButtonText}>取消预约</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* 历史预约区域 */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>历史预约</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeHistoryTab === 'all' && styles.tabActive]}
                onPress={() => handleHistoryTabPress('all')}
              >
                <Text style={[styles.tabText, activeHistoryTab === 'all' && styles.tabTextActive]}>
                  全部
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeHistoryTab === 'completed' && styles.tabActive]}
                onPress={() => handleHistoryTabPress('completed')}
              >
                <Text style={[styles.tabText, activeHistoryTab === 'completed' && styles.tabTextActive]}>
                  已完成
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeHistoryTab === 'cancelled' && styles.tabActive]}
                onPress={() => handleHistoryTabPress('cancelled')}
              >
                <Text style={[styles.tabText, activeHistoryTab === 'cancelled' && styles.tabTextActive]}>
                  已取消
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.historyList}>
            {filteredHistoryBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(booking)}
              >
                <View style={styles.historyItemHeader}>
                  <Text style={styles.historySeatNumber}>{booking.seatNumber}</Text>
                  <Text style={[
                    styles.historyStatus,
                    booking.status === 'completed' ? styles.historyStatusCompleted : styles.historyStatusCancelled
                  ]}>
                    {booking.status === 'completed' ? '已完成' : '已取消'}
                  </Text>
                </View>
                <View style={styles.historyItemDetails}>
                  <Text style={styles.historyDateTime}>{booking.date} {booking.time}</Text>
                  <Text style={styles.historyLocation}>{booking.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookingsScreen;

