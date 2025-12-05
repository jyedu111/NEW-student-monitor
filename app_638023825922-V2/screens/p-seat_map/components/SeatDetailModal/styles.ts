

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoList: {
    gap: 4,
  },
  infoItem: {
    fontSize: 14,
    color: '#6b7280',
  },
  featuresSection: {
    marginBottom: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tagSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  tagInfo: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  tagSecondary: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  tagPrimary: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  tagWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  tagTertiary: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  bookButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
});

