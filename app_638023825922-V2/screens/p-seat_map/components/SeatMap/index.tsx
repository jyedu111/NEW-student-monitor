

import React from 'react';
import { View, Text } from 'react-native';
import { Seat, Zone } from '../../types';
import SeatItem from '../SeatItem';
import styles from './styles';

interface SeatMapProps {
  seats: Seat[];
  currentZone: Zone;
  onSeatSelect: (seat: Seat) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, currentZone, onSeatSelect }) => {
  return (
    <View style={styles.container}>
      {/* 区域标签 */}
      <View style={styles.zoneLabel}>
        <Text style={styles.zoneLabelText}>{currentZone}区</Text>
      </View>
      
      {/* 门口 */}
      <View style={styles.doorway} />
      
      {/* 座位网格 */}
      <View style={styles.seatsContainer}>
        {seats.map((seat) => (
          <SeatItem
            key={seat.id}
            seat={seat}
            onPress={() => onSeatSelect(seat)}
          />
        ))}
      </View>
    </View>
  );
};

export default SeatMap;

