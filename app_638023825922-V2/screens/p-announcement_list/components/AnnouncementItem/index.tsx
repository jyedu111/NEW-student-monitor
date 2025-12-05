

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface Announcement {
  id: number;
  title: string;
  summary: string;
  time: string;
  author: string;
  pinned: boolean;
}

interface AnnouncementItemProps {
  announcement: Announcement;
  onPress: () => void;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
  announcement,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title} numberOfLines={1}>
            {announcement.title}
          </Text>
          <Text style={styles.summary} numberOfLines={2}>
            {announcement.summary}
          </Text>
          <View style={styles.metaContainer}>
            <Text style={styles.time}>{announcement.time}</Text>
            <Text style={styles.author}>{announcement.author}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          {announcement.pinned && (
            <View style={styles.pinnedBadge}>
              <Text style={styles.pinnedText}>置顶</Text>
            </View>
          )}
          <FontAwesome6 name="chevron-right" size={16} color="#6b7280" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnnouncementItem;

