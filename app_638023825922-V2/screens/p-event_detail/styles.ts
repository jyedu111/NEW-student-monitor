

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
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
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventHeaderSection: {
    marginBottom: 24,
  },
  eventHeaderCard: {
    borderRadius: 16,
    padding: 24,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  eventMeta: {
    gap: 8,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventMetaText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  registrationStatusSection: {
    marginBottom: 24,
  },
  registrationStatusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  statusBadgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  statusBadgeFull: {
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f59e0b',
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  capacityText: {
    fontSize: 14,
    color: '#6b7280',
  },
  capacityNumbers: {
    fontWeight: '600',
    color: '#1f2937',
  },
  capacityBarContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  capacityBarBg: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    height: 8,
  },
  capacityBarFill: {
    backgroundColor: '#6366f1',
    height: 8,
    borderRadius: 10,
  },
  eventDetailsSection: {
    marginBottom: 24,
  },
  eventDetailsCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  speakerSection: {
    marginBottom: 24,
  },
  speakerCard: {
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
  speakerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  speakerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  speakerDetails: {
    flex: 1,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  speakerPosition: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  speakerBio: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesCard: {
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
  notesList: {
    gap: 8,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  noteBullet: {
    marginTop: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
    paddingBottom: Platform.select({
      ios: 34,
      android: 16,
    }),
  },
  registerButtonContainer: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  registerButton: {
    backgroundColor: '#667eea',
  },
  registeredButton: {
    backgroundColor: '#10b981',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: 10,
    marginTop: 8,
  },
});

