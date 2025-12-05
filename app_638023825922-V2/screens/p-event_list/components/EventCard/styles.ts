

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
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
  eventHeader: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventInfoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 4,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  eventStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  registrationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  registrationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  statusWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  statusSecondary: {
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextSuccess: {
    color: '#10b981',
  },
  statusTextWarning: {
    color: '#f59e0b',
  },
  statusTextSecondary: {
    color: '#6b7280',
  },
});

