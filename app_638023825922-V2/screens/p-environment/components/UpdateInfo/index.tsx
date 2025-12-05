

import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface UpdateInfoProps {
  lastUpdateTime: Date;
}

const UpdateInfo: React.FC<UpdateInfoProps> = ({ lastUpdateTime }) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesome6 name="arrows-rotate" size={18} color="#6366f1" style={styles.icon} />
        <Text style={styles.lastUpdateText}>最后更新：{formatDate(lastUpdateTime)}</Text>
        <Text style={styles.refreshIntervalText}>数据每30秒自动刷新一次</Text>
      </View>
    </View>
  );
};

export default UpdateInfo;

