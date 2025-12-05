

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Seat } from '../../types';
import styles from './styles';

interface SeatItemProps {
  seat: Seat;
  onPress: () => void;
}

const SeatItem: React.FC<SeatItemProps> = ({ seat, onPress }) => {
  const getSeatStyle = () => {
    const baseStyle = [styles.seat];
    
    switch (seat.status) {
      case 'available':
        baseStyle.push(styles.seatAvailable);
        break;
      case 'occupied':
        baseStyle.push(styles.seatOccupied);
        break;
      case 'temporary':
        baseStyle.push(styles.seatTemporary);
        break;
      case 'booked':
        baseStyle.push(styles.seatBooked);
        break;
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[
        getSeatStyle(),
        {
          top: seat.position.top,
          left: seat.position.left,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.seatText}>
        {seat.number.slice(-2)}
      </Text>
    </TouchableOpacity>
  );
};

export default SeatItem;

