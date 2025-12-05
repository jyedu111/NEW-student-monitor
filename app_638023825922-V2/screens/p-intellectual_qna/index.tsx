

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface FAQItem {
  id: string;
  question: string;
  description: string;
}

const IntellectualQnAScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  const [messageInputText, setMessageInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [isFAQExpanded, setIsFAQExpanded] = useState(false);

  const faqItems: FAQItem[] = [
    {
      id: 'opening-hours',
      question: '图书馆开放时间是什么时候？',
      description: '了解图书馆的日常开放时间和节假日安排',
    },
    {
      id: 'borrowing-rules',
      question: '图书借阅规则是什么？',
      description: '了解借阅期限、续借政策等相关规定',
    },
    {
      id: 'seat-booking',
      question: '如何预约座位？',
      description: '学习座位预约的具体流程和注意事项',
    },
    {
      id: 'book-search',
      question: '如何查找图书？',
      description: '使用图书馆目录和搜索功能的方法',
    },
    {
      id: 'lost-books',
      question: '图书丢失了怎么办？',
      description: '了解图书丢失后的处理流程和赔偿规定',
    },
  ];

  const aiResponses: Record<string, string> = {
    '图书馆开放时间': '图书馆开放时间为：周一至周五 08:00-22:00，周六至周日 09:00-21:00。节假日开放时间请关注公告。',
    '借阅规则': '图书借阅期限为30天，可续借1次，续借期限为15天。逾期未还将收取滞纳金。',
    '预约座位': '您可以通过座位预约功能选择心仪的座位，预约成功后请在15分钟内签到。如需临时离开，可使用临时离开功能。',
    '查找图书': '您可以使用图书搜索功能，输入书名、作者、ISBN等信息进行搜索。找到图书后，还可以使用书架导航功能找到具体位置。',
    '图书丢失': '如果图书丢失，请及时到服务台办理赔偿手续。赔偿金额将根据图书价格和使用情况确定。',
    '默认': '感谢您的提问。我已经记录了您的问题，正在为您查询相关信息。如果您有其他问题，请随时告诉我。',
  };

  const handleBackButtonPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes('开放') || message.includes('时间')) {
      return aiResponses['图书馆开放时间'];
    } else if (message.includes('借阅') || message.includes('规则') || message.includes('期限')) {
      return aiResponses['借阅规则'];
    } else if (message.includes('预约') || message.includes('座位')) {
      return aiResponses['预约座位'];
    } else if (message.includes('查找') || message.includes('搜索') || message.includes('图书')) {
      return aiResponses['查找图书'];
    } else if (message.includes('丢失') || message.includes('赔偿')) {
      return aiResponses['图书丢失'];
    } else {
      return aiResponses['默认'];
    }
  };

  const addUserMessage = (messageContent: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date(),
    };
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const addAIMessage = (messageContent: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: messageContent,
      timestamp: new Date(),
    };
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendMessage = () => {
    const trimmedMessage = messageInputText.trim();
    if (!trimmedMessage) return;

    addUserMessage(trimmedMessage);
    setMessageInputText('');
    textInputRef.current?.blur();

    setIsAITyping(true);

    setTimeout(() => {
      setIsAITyping(false);
      addAIMessage(getAIResponse(trimmedMessage));
    }, 1500);
  };

  const handleFAQToggle = () => {
    setIsFAQExpanded(!isFAQExpanded);
  };

  const handleFAQItemPress = (faqItem: FAQItem) => {
    setIsFAQExpanded(false);
    setMessageInputText(faqItem.question);
    handleSendMessage();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAITyping]);

  const renderMessage = (message: Message) => {
    if (message.type === 'user') {
      return (
        <View key={message.id} style={styles.userMessageContainer}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.userMessageText}>{message.content}</Text>
          </View>
          <View style={styles.userAvatar}>
            <FontAwesome6 name="user" size={12} color="#6b7280" />
          </View>
        </View>
      );
    } else {
      return (
        <View key={message.id} style={styles.aiMessageContainer}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.aiAvatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome6 name="robot" size={12} color="#ffffff" />
          </LinearGradient>
          <View style={styles.aiMessageBubble}>
            <Text style={styles.aiMessageText}>{message.content}</Text>
          </View>
        </View>
      );
    }
  };

  const renderTypingIndicator = () => {
    if (!isAITyping) return null;

    return (
      <View style={styles.aiMessageContainer}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.aiAvatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <FontAwesome6 name="robot" size={12} color="#ffffff" />
        </LinearGradient>
        <View style={styles.typingIndicatorBubble}>
          <View style={styles.typingDotsContainer}>
            <View style={[styles.typingDot, styles.typingDot1]} />
            <View style={[styles.typingDot, styles.typingDot2]} />
            <View style={[styles.typingDot, styles.typingDot3]} />
          </View>
        </View>
      </View>
    );
  };

  const renderWelcomeMessage = () => {
    if (chatMessages.length > 0) return null;

    return (
      <View style={styles.aiMessageContainer}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.aiAvatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <FontAwesome6 name="robot" size={12} color="#ffffff" />
        </LinearGradient>
        <View style={styles.aiMessageBubble}>
          <Text style={styles.aiMessageText}>
            您好！我是图书馆智能助手，很高兴为您服务。请问有什么可以帮助您的吗？
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 顶部导航栏 */}
        <View style={styles.header}>
          <View style={styles.navContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
              <FontAwesome6 name="arrow-left" size={16} color="#1f2937" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>智能问答</Text>
              <Text style={styles.headerSubtitle}>7x24小时为您服务</Text>
            </View>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.headerAIAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <FontAwesome6 name="robot" size={14} color="#ffffff" />
            </LinearGradient>
          </View>
        </View>

        {/* 聊天消息区域 */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderWelcomeMessage()}
          
          {chatMessages.map(renderMessage)}
          
          {renderTypingIndicator()}
        </ScrollView>

        {/* 常见问题区域 */}
        <View style={styles.faqSection}>
          <View style={styles.faqHeader}>
            <Text style={styles.faqHeaderTitle}>常见问题</Text>
            <TouchableOpacity style={styles.faqToggleButton} onPress={handleFAQToggle}>
              <Text style={styles.faqToggleText}>
                {isFAQExpanded ? '收起' : '展开'}
              </Text>
              <FontAwesome6
                name={isFAQExpanded ? 'chevron-up' : 'chevron-down'}
                size={12}
                color="#6366f1"
                style={styles.faqToggleIcon}
              />
            </TouchableOpacity>
          </View>

          {isFAQExpanded && (
            <View style={styles.faqList}>
              {faqItems.map((faqItem) => (
                <TouchableOpacity
                  key={faqItem.id}
                  style={styles.faqItem}
                  onPress={() => handleFAQItemPress(faqItem)}
                >
                  <Text style={styles.faqItemQuestion}>{faqItem.question}</Text>
                  <Text style={styles.faqItemDescription}>{faqItem.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 底部输入区域 */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <View style={styles.textInputWrapper}>
              <TextInput
                ref={textInputRef}
                style={styles.messageInput}
                placeholder="请输入您的问题..."
                placeholderTextColor="#9ca3af"
                value={messageInputText}
                onChangeText={setMessageInputText}
                multiline
                maxLength={500}
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <FontAwesome6 name="paper-plane" size={12} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.charCountContainer}>
            <Text style={styles.charCountHint}>按 Enter 发送，Shift + Enter 换行</Text>
            <Text style={styles.charCounter}>
              {messageInputText.length}/500
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IntellectualQnAScreen;

