

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    height: 384,
  },
  zoneLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    zIndex: 5,
  },
  zoneLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  doorway: {
    position: 'absolute',
    top: 40,
    left: 140,
    width: 40,
    height: 20,
    backgroundColor: '#9ca3af',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6b7280',
    zIndex: 3,
  },
  seatsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

