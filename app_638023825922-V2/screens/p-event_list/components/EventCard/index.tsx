

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface EventData {
  id: string;
  title: string;
  time: string;
  location: string;
  registered: number;
  capacity: number;
  status: string;
  statusClass: 'success' | 'warning' | 'text-secondary';
  isOngoing: boolean;
  isEnded: boolean;
  gradientColors: [string, string, ...string[]];
}

interface EventCardProps {
  event: EventData;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const getStatusStyle = (statusClass: string) => {
    switch (statusClass) {
      case 'success':
        return styles.statusSuccess;
      case 'warning':
        return styles.statusWarning;
      case 'text-secondary':
        return styles.statusSecondary;
      default:
        return styles.statusSuccess;
    }
  };

  const getStatusTextStyle = (statusClass: string) => {
    switch (statusClass) {
      case 'success':
        return styles.statusTextSuccess;
      case 'warning':
        return styles.statusTextWarning;
      case 'text-secondary':
        return styles.statusTextSecondary;
      default:
        return styles.statusTextSuccess;
    }
  };

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={event.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.eventHeader}
      >
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventInfo}>
          <View style={styles.eventInfoItem}>
            <FontAwesome6 name="calendar-days" size={12} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.eventInfoText}>{event.time}</Text>
          </View>
          <View style={styles.eventInfoItem}>
            <FontAwesome6 name="location-dot" size={12} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.eventInfoText}>{event.location}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.eventFooter}>
        <View style={styles.eventStats}>
          <View style={styles.registrationInfo}>
            <FontAwesome6 name="users" size={12} color="#6b7280" />
            <Text style={styles.registrationText}>
              已报名 {event.registered}/{event.capacity}人
            </Text>
          </View>
          <View style={[styles.statusBadge, getStatusStyle(event.statusClass)]}>
            <Text style={[styles.statusText, getStatusTextStyle(event.statusClass)]}>
              {event.status}
            </Text>
          </View>
        </View>
        <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

