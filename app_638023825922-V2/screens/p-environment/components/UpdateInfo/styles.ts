

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    marginBottom: 8,
  },
  lastUpdateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  refreshIntervalText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

