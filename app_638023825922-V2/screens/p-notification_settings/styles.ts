

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
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
  backButton: {
    marginRight: 16,
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  masterSwitchSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
  masterSwitchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterSwitchInfo: {
    flex: 1,
    marginRight: 16,
  },
  masterSwitchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  masterSwitchDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  notificationTypesSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
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
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  notificationItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationItemLast: {
    borderBottomWidth: 0,
  },
  notificationItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  notificationItemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  notificationTips: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  tipsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipsIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  tipsTextContainer: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  tipsDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});

