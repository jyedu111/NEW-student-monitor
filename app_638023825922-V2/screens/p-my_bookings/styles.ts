

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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  currentBookingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  currentBookingCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  bookingHeaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  currentSeatNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  currentBookingTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  bookingStatusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  bookingDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonWarning: {
    backgroundColor: '#f59e0b',
  },
  actionButtonIcon: {
    fontSize: 14,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  leaveCountdown: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  countdownText: {
    fontSize: 14,
    color: 'white',
  },
  countdownTimer: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  upcomingBookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  upcomingBookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  upcomingSeatNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  upcomingBookingTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  upcomingStatusBadge: {
    backgroundColor: 'rgba(59,130,246,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  upcomingStatusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
  },
  upcomingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonIcon: {
    fontSize: 14,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonIcon: {
    fontSize: 14,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  historySection: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: 'white',
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
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
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historySeatNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyStatusCompleted: {
    color: '#10b981',
  },
  historyStatusCancelled: {
    color: '#f59e0b',
  },
  historyItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDateTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  historyLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
});

