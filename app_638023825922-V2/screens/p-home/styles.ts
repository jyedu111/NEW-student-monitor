

import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  
  // 顶部搜索栏
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#6b7280',
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // 轮播图
  bannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  bannerCarousel: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    height: 120,
  },
  bannerSlideContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  bannerSlide: {
    width: screenWidth - 32,
    height: '100%',
  },
  bannerGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  bannerContent: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
  },
  bannerTime: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.75,
  },
  bannerIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  bannerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },

  // 快捷功能区
  quickFeaturesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickFeaturesGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  quickFeatureItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
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
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '500',
    textAlign: 'center',
  },

  // 我的预约
  myBookingContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
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
  myBookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  myBookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  currentBooking: {
    borderRadius: 12,
    padding: 16,
  },
  bookingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetails: {
    flex: 1,
  },
  bookingSeatNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  bookingTime: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  bookingStatus: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.75,
  },
  temporaryLeaveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  temporaryLeaveButtonActive: {
    backgroundColor: '#f59e0b',
  },
  temporaryLeaveButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  temporaryLeaveButtonTextActive: {
    color: '#ffffff',
  },

  // 座位概览
  seatOverviewContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 8,
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
  seatOverviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  seatStats: {
    flexDirection: 'row',
    gap: 16,
  },
  seatStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  seatStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  seatStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  // 推荐内容
  recommendationsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewMoreButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  recommendationItem: {
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
  recommendationItemMargin: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },

  // 位置推荐
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  locationAdvantages: {
    fontSize: 12,
    color: '#6b7280',
  },
  locationStatus: {
    alignItems: 'flex-end',
  },
  locationStatusText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  locationSeats: {
    fontSize: 12,
    color: '#6b7280',
  },

  // 图书推荐
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookCover: {
    width: 48,
    height: 64,
    borderRadius: 8,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  bookStatus: {
    fontSize: 12,
    fontWeight: '500',
  },

  // 活动推荐
  eventCard: {
    borderRadius: 12,
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.75,
  },

  // 底部间距
  bottomSpacing: {
    height: 100,
  },
});

