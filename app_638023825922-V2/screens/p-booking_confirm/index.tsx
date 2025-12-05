

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface SeatInfo {
  seatNumber: string;
  location: string;
  preferences: string[];
  floor: string;
}

interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
}

interface EnvironmentData {
  temperature: string;
  noise: string;
  humidity: string;
  occupancy: string;
}

const BookingConfirmScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('预约失败，请重试');
  const [seatInfo, setSeatInfo] = useState<SeatInfo>({
    seatNumber: 'A区-靠窗座位 A01',
    location: '一层阅览区 · 靠窗位置',
    preferences: ['靠窗', '有电源', '静音区', '阳光充足'],
    floor: '一层'
  });
  const [timeSlot, setTimeSlot] = useState<TimeSlot>({
    date: '2024年1月15日',
    startTime: '14:00',
    endTime: '18:00',
    duration: '4小时'
  });
  const [environmentData] = useState<EnvironmentData>({
    temperature: '24°C',
    noise: '45dB',
    humidity: '55%',
    occupancy: '68%'
  });

  const preferenceIcons: { [key: string]: string } = {
    '靠窗': 'window-maximize',
    '有电源': 'plug',
    '静音区': 'volume-mute',
    '讨论区': 'comments',
    '阳光充足': 'sun',
    '阴凉': 'cloud',
    '空调房': 'snowflake'
  };

  useEffect(() => {
    loadSeatInfoFromParams();
  }, [params]);

  const loadSeatInfoFromParams = () => {
    // 模拟从参数加载座位信息
    const seatId = params.seatId as string;
    const timeSlotId = params.timeSlotId as string;

    const mockSeats: { [key: string]: SeatInfo } = {
      'seat1': {
        seatNumber: 'A区-靠窗座位 A01',
        location: '一层阅览区 · 靠窗位置',
        preferences: ['靠窗', '有电源', '静音区', '阳光充足'],
        floor: '一层'
      },
      'seat2': {
        seatNumber: 'B区-研修间 B05',
        location: '二层研修区 · 独立空间',
        preferences: ['有电源', '讨论区', '空调房'],
        floor: '二层'
      },
      'seat3': {
        seatNumber: 'C区-静音区 C12',
        location: '三层静音区 · 中央位置',
        preferences: ['有电源', '静音区', '阴凉'],
        floor: '三层'
      }
    };

    const mockTimeSlots: { [key: string]: TimeSlot } = {
      'slot1': {
        date: '2024年1月15日',
        startTime: '14:00',
        endTime: '18:00',
        duration: '4小时'
      },
      'slot2': {
        date: '2024年1月15日',
        startTime: '09:00',
        endTime: '12:00',
        duration: '3小时'
      },
      'slot3': {
        date: '2024年1月16日',
        startTime: '10:00',
        endTime: '16:00',
        duration: '6小时'
      }
    };

    const selectedSeat = mockSeats[seatId] || mockSeats['seat1'];
    const selectedTimeSlot = mockTimeSlots[timeSlotId] || mockTimeSlots['slot1'];

    setSeatInfo(selectedSeat);
    setTimeSlot(selectedTimeSlot);
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/p-seat_map');
    }
  };

  const handleChangeTimePress = () => {
    router.push('/p-seat_map');
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    try {
      // 模拟预约提交过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟预约成功/失败
      const isSuccess = Math.random() > 0.1; // 90%成功率
      
      if (isSuccess) {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          router.push('/p-my_bookings');
        }, 1500);
      } else {
        setErrorMessage('座位已被他人预约，请选择其他座位');
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      }
    } catch (error) {
      setErrorMessage('网络错误，请重试');
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreferenceTag = (preference: string, index: number) => {
    const iconName = preferenceIcons[preference] || 'star';
    
    return (
      <LinearGradient
        key={index}
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.preferenceTag}
      >
        <FontAwesome6 name={iconName} size={10} color="#ffffff" style={styles.preferenceIcon} />
        <Text style={styles.preferenceText}>{preference}</Text>
      </LinearGradient>
    );
  };

  const renderEnvironmentStat = (value: string, label: string, index: number) => (
    <View key={index} style={styles.environmentStat}>
      <Text style={styles.environmentValue}>{value}</Text>
      <Text style={styles.environmentLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>确认预约</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 座位信息卡片 */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>座位信息</Text>
            
            <View style={styles.seatDetails}>
              <View style={styles.seatBasicInfo}>
                <View style={styles.seatInfoLeft}>
                  <Text style={styles.seatNumber}>{seatInfo.seatNumber}</Text>
                  <Text style={styles.seatLocation}>{seatInfo.location}</Text>
                </View>
                <View style={styles.seatStatusBadge}>
                  <Text style={styles.seatStatusText}>空闲</Text>
                </View>
              </View>
              
              <View style={styles.seatPreferences}>
                {seatInfo.preferences.map((preference, index) => 
                  renderPreferenceTag(preference, index)
                )}
              </View>
            </View>
          </View>
        </View>

        {/* 预约时间信息 */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>预约时间</Text>
            
            <View style={styles.timeDetails}>
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>预约日期</Text>
                <Text style={styles.timeValue}>{timeSlot.date}</Text>
              </View>
              
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>预约时段</Text>
                <View style={styles.timeValueRight}>
                  <Text style={styles.timeRange}>{timeSlot.startTime} - {timeSlot.endTime}</Text>
                  <Text style={styles.timeDuration}>共{timeSlot.duration}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.changeTimeButton} onPress={handleChangeTimePress}>
                <FontAwesome5 name="edit" size={14} color="#6b7280" />
                <Text style={styles.changeTimeText}>修改预约时间</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 预约规则提示 */}
        <View style={styles.section}>
          <View style={styles.rulesCard}>
            <View style={styles.rulesHeader}>
              <FontAwesome6 name="triangle-exclamation" size={18} color="#f59e0b" style={styles.rulesIcon} />
              <Text style={styles.sectionTitle}>预约规则</Text>
            </View>
            
            <View style={styles.rulesList}>
              <View style={styles.ruleItem}>
                <FontAwesome6 name="clock" size={12} color="#6b7280" style={styles.ruleIcon} />
                <Text style={styles.ruleText}>请在预约开始后15分钟内到场扫码签到，超时未签到系统将自动释放座位</Text>
              </View>
              <View style={styles.ruleItem}>
                <FontAwesome6 name="circle-xmark" size={12} color="#6b7280" style={styles.ruleIcon} />
                <Text style={styles.ruleText}>如需取消预约，请至少提前30分钟操作</Text>
              </View>
              <View style={styles.ruleItem}>
                <FontAwesome6 name="right-from-bracket" size={12} color="#6b7280" style={styles.ruleIcon} />
                <Text style={styles.ruleText}>临时离开可锁定座位30分钟，超时未归将自动释放</Text>
              </View>
              <View style={styles.ruleItem}>
                <FontAwesome6 name="flag" size={12} color="#6b7280" style={styles.ruleIcon} />
                <Text style={styles.ruleText}>如发现占座行为，可通过App进行举报</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 环境信息 */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>当前环境</Text>
            
            <View style={styles.environmentStats}>
              {renderEnvironmentStat(environmentData.temperature, '温度', 0)}
              {renderEnvironmentStat(environmentData.noise, '噪音', 1)}
              {renderEnvironmentStat(environmentData.humidity, '湿度', 2)}
              {renderEnvironmentStat(environmentData.occupancy, '区域占用率', 3)}
            </View>
          </View>
        </View>

        {/* 底部间距 */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* 底部确认按钮 */}
      <View style={styles.bottomAction}>
        <TouchableOpacity 
          style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]} 
          onPress={handleConfirmBooking}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmButtonGradient}
          >
            <Text style={styles.confirmButtonText}>
              {isLoading ? '提交中...' : '确认预约'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 加载遮罩层 */}
      <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingSpinner} />
            <Text style={styles.loadingText}>正在提交预约...</Text>
          </View>
        </View>
      </Modal>

      {/* 成功提示 */}
      {showSuccessToast && (
        <View style={styles.successToast}>
          <FontAwesome6 name="circle-check" size={16} color="#ffffff" />
          <Text style={styles.toastText}>预约成功！</Text>
        </View>
      )}

      {/* 失败提示 */}
      {showErrorToast && (
        <View style={styles.errorToast}>
          <FontAwesome6 name="circle-exclamation" size={16} color="#ffffff" />
          <Text style={styles.toastText}>{errorMessage}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingConfirmScreen;

