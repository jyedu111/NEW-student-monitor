

import React from 'react';
import { View, Text, TouchableOpacity, Modal, } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Seat, Floor, Zone } from '../../types';
import styles from './styles';

interface SeatDetailModalProps {
  visible: boolean;
  seat: Seat | null;
  currentFloor: Floor;
  currentZone: Zone;
  onClose: () => void;
  onBookSeat: () => void;
}

const SeatDetailModal: React.FC<SeatDetailModalProps> = ({
  visible,
  seat,
  currentFloor,
  currentZone,
  onClose,
  onBookSeat,
}) => {
  if (!seat) return null;

  const getStatusText = (status: string): string => {
    const statusMap = {
      available: '空闲',
      occupied: '已占用',
      temporary: '临时离开',
      booked: '已预约',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getFeatureTag = (feature: string) => {
    const featureMap = {
      window: { text: '靠窗', style: styles.tagSuccess },
      aisle: { text: '靠过道', style: styles.tagInfo },
      corner: { text: '角落', style: styles.tagSecondary },
      power: { text: '有电源', style: styles.tagPrimary },
      lamp: { text: '台灯', style: styles.tagWarning },
      charger: { text: '无线充电', style: styles.tagTertiary },
      quiet: { text: '静音区', style: styles.tagSuccess },
      discussion: { text: '讨论区', style: styles.tagInfo },
      sunlight: { text: '阳光充足', style: styles.tagWarning },
      shade: { text: '阴凉', style: styles.tagTertiary },
    };
    return featureMap[feature as keyof typeof featureMap];
  };

  const isBookable = seat.status === 'available';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        
        <View style={styles.modal}>
          {/* 头部 */}
          <View style={styles.header}>
            <Text style={styles.title}>座位详情</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesome6 name="xmark" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* 座位信息 */}
          <View style={styles.content}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>座位信息</Text>
              <View style={styles.infoList}>
                <Text style={styles.infoItem}>座位号：{seat.number}</Text>
                <Text style={styles.infoItem}>区域：{currentZone}区</Text>
                <Text style={styles.infoItem}>楼层：{currentFloor}楼</Text>
                <Text style={styles.infoItem}>状态：{getStatusText(seat.status)}</Text>
              </View>
            </View>

            {/* 座位特点 */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>座位特点</Text>
              <View style={styles.tagsContainer}>
                {seat.features.map((feature) => {
                  const tag = getFeatureTag(feature);
                  if (!tag) return null;
                  
                  return (
                    <View key={feature} style={[styles.tag, tag.style]}>
                      <Text style={styles.tagText}>{tag.text}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 操作按钮 */}
          <View style={styles.actions}>
            {isBookable && (
              <TouchableOpacity style={styles.bookButton} onPress={onBookSeat}>
                <Text style={styles.bookButtonText}>预约座位</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SeatDetailModal;

