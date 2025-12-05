

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  // 顶部导航栏
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
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },

  // 主要内容区域
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  // 加载状态
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingSpinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },

  // 图书详情内容
  bookDetailContent: {
    gap: 24,
  },

  // 图书信息部分
  bookInfoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
  bookHeader: {
    flexDirection: 'row',
    gap: 24,
  },
  bookCoverContainer: {
    flexShrink: 0,
  },
  bookCover: {
    width: 128,
    height: 176,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bookBasicInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  bookMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaIcon: {
    marginRight: 4,
  },
  bookMetaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  availabilityStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  availabilityIcon: {
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },

  // 图书详细信息部分
  bookDetailsSection: {
    gap: 24,
  },

  // 图书简介卡片
  bookDescriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },

  // 图书信息卡片
  bookMetaInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
  metaInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    width: '47%',
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },

  // 导航部分
  navigationSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
  navigationButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  navigationIcon: {
    marginRight: 12,
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  navigationHint: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // 无库存状态
  outOfStockContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
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
  outOfStockIcon: {
    marginBottom: 16,
  },
  outOfStockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  outOfStockDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  outOfStockActions: {
    gap: 12,
    width: '100%',
  },
  wishlistButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  wishlistButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  notifyButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});

