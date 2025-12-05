

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  searchHeaderContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInputIcon: {
    color: '#6b7280',
    fontSize: 16,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    padding: 0,
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchIcon: {
    color: '#6b7280',
    fontSize: 14,
  },
  searchActionButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  searchActionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  mainContentContainer: {
    flex: 1,
  },
  defaultStateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  searchHistorySection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  clearHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearHistoryIcon: {
    color: '#6b7280',
    fontSize: 12,
  },
  clearHistoryText: {
    color: '#6b7280',
    fontSize: 14,
  },
  historyItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
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
  historyItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    color: '#6b7280',
    fontSize: 16,
  },
  historyItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  historyDeleteButton: {
    padding: 8,
  },
  historyDeleteIcon: {
    color: '#6b7280',
    fontSize: 14,
  },
  hotSearchSection: {
    marginBottom: 24,
  },
  hotSearchTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  hotSearchTag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hotSearchTagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  searchingStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    borderWidth: 4,
    borderColor: '#6366f1',
    borderTopColor: 'transparent',
    borderRadius: 16,
    marginBottom: 16,
  },
  searchingStateText: {
    color: '#6b7280',
    fontSize: 16,
  },
  searchResultsStateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCountText: {
    color: '#6b7280',
    fontSize: 14,
  },
  bookResultItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  bookResultContent: {
    flexDirection: 'row',
    gap: 16,
  },
  bookCoverImage: {
    width: 64,
    height: 80,
    borderRadius: 8,
  },
  bookResultInfo: {
    flex: 1,
  },
  bookResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  bookResultAuthor: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  bookResultDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  bookResultDetailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bookResultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookStatusAvailable: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  bookStatusReservation: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  bookStatusUnavailable: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  bookStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookNavigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookNavigationButtonDisabled: {
    opacity: 0.5,
  },
  bookNavigationIcon: {
    color: '#6366f1',
    fontSize: 12,
  },
  bookNavigationText: {
    color: '#6366f1',
    fontSize: 14,
  },
  bookNavigationTextDisabled: {
    color: '#6b7280',
  },
  loadMoreSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  loadMoreButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  loadMoreButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
  noResultsStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 80,
  },
  noResultsIcon: {
    color: '#6b7280',
    fontSize: 64,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  noResultsDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  retrySearchButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retrySearchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

