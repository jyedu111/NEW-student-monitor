

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  seat: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  seatAvailable: {
    backgroundColor: '#10b981',
  },
  seatOccupied: {
    backgroundColor: '#ef4444',
  },
  seatTemporary: {
    backgroundColor: '#f59e0b',
  },
  seatBooked: {
    backgroundColor: '#6b7280',
  },
  seatText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#ffffff',
  },
});

