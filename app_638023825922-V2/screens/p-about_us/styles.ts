

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
    padding: 8,
    marginLeft: -8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 32,
  },
  appLogo: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  card: {
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
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1f2937',
  },
  legalSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  legalItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legalItemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  legalItemSeparator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 0,
  },
  contactSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    lineHeight: 20,
  },
  copyrightSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  copyrightText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  copyrightDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
});

