

import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  // 图书信息卡片
  bookInfoSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
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
  
  bookInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  bookCover: {
    width: 64,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  
  bookDetails: {
    flex: 1,
  },
  
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  
  bookAuthor: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  
  shelfLocation: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  
  bookStatus: {
    alignItems: 'flex-end',
  },
  
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  statusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  
  // 地图区域
  mapSection: {
    flex: 1,
    minHeight: 400,
    position: 'relative',
  },
  
  mapContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  
  libraryMap: {
    width: 800,
    height: 600,
    backgroundColor: '#f0f9ff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -300,
    marginLeft: -400,
  },
  
  walls: {
    flex: 1,
    borderWidth: 4,
    borderColor: '#9ca3af',
    borderRadius: 8,
    position: 'relative',
  },
  
  floorMarker: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  
  floorMarkerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  
  // 书架区域
  bookshelfArea: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bookshelfArea1: {
    top: 80,
    left: 80,
    width: 160,
    height: 240,
    backgroundColor: '#dbeafe',
    borderColor: '#60a5fa',
  },
  
  bookshelfArea2: {
    top: 80,
    right: 80,
    width: 160,
    height: 240,
    backgroundColor: '#dcfce7',
    borderColor: '#4ade80',
  },
  
  bookshelfArea3: {
    bottom: 80,
    left: 80,
    width: 160,
    height: 160,
    backgroundColor: '#f3e8ff',
    borderColor: '#a78bfa',
  },
  
  bookshelfArea4: {
    bottom: 80,
    right: 80,
    width: 160,
    height: 160,
    backgroundColor: '#fed7aa',
    borderColor: '#fb923c',
  },
  
  bookshelfText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563eb',
  },
  
  entrance: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    marginLeft: -32,
    width: 64,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#9ca3af',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  entranceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  
  // 用户位置
  userPosition: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 24,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  // 目标位置
  targetPosition: {
    position: 'absolute',
    top: 160,
    left: 160,
    width: 32,
    height: 32,
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  
  navigationPath: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  
  // 路径标记点
  pathMarker1: {
    position: 'absolute',
    top: '33%',
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  pathMarker2: {
    position: 'absolute',
    top: '25%',
    left: '33%',
    marginLeft: -8,
    width: 16,
    height: 16,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  // 缩放控制
  zoomControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  zoomButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  
  relocateButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
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
        elevation: 4,
      },
    }),
  },
  
  // 导航提示
  navigationHints: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  hintTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  
  voiceNavButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  voiceNavButtonActive: {
    backgroundColor: '#764ba2',
  },
  
  voiceNavText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
    fontWeight: '500',
  },
  
  currentHint: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  
  hintContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  hintIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#6366f1',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  hintText: {
    flex: 1,
  },
  
  hintInstruction: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  
  hintDistance: {
    fontSize: 14,
    color: '#6b7280',
  },
  
  hintDistanceIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  nextHints: {
    gap: 8,
  },
  
  nextHint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  nextHintIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  nextHintText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
});

