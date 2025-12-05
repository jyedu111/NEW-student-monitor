

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
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
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  headerAIAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 12,
  },
  userMessageBubble: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    borderTopRightRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiMessageBubble: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    borderTopLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  aiMessageText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  typingIndicatorBubble: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    borderTopLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  typingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6b7280',
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 1,
  },
  faqSection: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  faqHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  faqToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  faqToggleIcon: {
    marginLeft: 4,
  },
  faqList: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  faqItemQuestion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  faqItemDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  inputSection: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInputWrapper: {
    flex: 1,
    position: 'relative',
  },
  messageInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 14,
    color: '#1f2937',
    maxHeight: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  charCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  charCountHint: {
    fontSize: 12,
    color: '#6b7280',
  },
  charCounter: {
    fontSize: 12,
    color: '#6b7280',
  },
});

