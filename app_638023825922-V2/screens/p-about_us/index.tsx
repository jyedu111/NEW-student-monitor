

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import WebViewModal from './components/WebViewModal';

const AboutUsScreen = () => {
  const router = useRouter();
  const [isWebViewModalVisible, setIsWebViewModalVisible] = useState(false);
  const [webViewTitle, setWebViewTitle] = useState('');
  const [webViewUrl, setWebViewUrl] = useState('');

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handlePrivacyPolicyPress = () => {
    setWebViewTitle('隐私政策');
    setWebViewUrl('https://example.com/privacy-policy');
    setIsWebViewModalVisible(true);
  };

  const handleTermsPress = () => {
    setWebViewTitle('用户协议');
    setWebViewUrl('https://example.com/terms-of-service');
    setIsWebViewModalVisible(true);
  };

  const handleCloseWebView = () => {
    setIsWebViewModalVisible(false);
  };

  const featuresList = [
    { icon: 'chair', title: '智能座位管理' },
    { icon: 'magnifying-glass', title: '图书精准查找' },
    { icon: 'location-dot', title: '书架智能导航' },
    { icon: 'leaf', title: '环境优化推荐' },
    { icon: 'robot', title: '智能问答服务' },
  ];

  const contactInfo = [
    { icon: 'envelope', text: 'support@libassistant.com' },
    { icon: 'phone', text: '400-123-4567' },
    { icon: 'location-dot', text: '北京市海淀区图书馆技术部' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>关于我们</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 应用Logo和基本信息 */}
        <View style={styles.appInfoSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.appLogo}
          >
            <FontAwesome6 name="book-open" size={32} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.appName}>图书馆智能助手</Text>
          <Text style={styles.appVersion}>版本 1.0.0</Text>
          <Text style={styles.appDescription}>让图书馆学习更高效、更便捷</Text>
        </View>

        {/* 功能信息 */}
        <View style={styles.featuresSection}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>核心功能</Text>
            <View style={styles.featuresList}>
              {featuresList.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <FontAwesome6 name={feature.icon} size={18} color="#6366f1" />
                  <Text style={styles.featureText}>{feature.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 法律条款 */}
        <View style={styles.legalSection}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.legalItem} onPress={handlePrivacyPolicyPress}>
              <View style={styles.legalItemContent}>
                <FontAwesome6 name="shield-halved" size={18} color="#3b82f6" />
                <Text style={styles.legalItemText}>隐私政策</Text>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            <View style={styles.legalItemSeparator} />
            <TouchableOpacity style={styles.legalItem} onPress={handleTermsPress}>
              <View style={styles.legalItemContent}>
                <FontAwesome6 name="file-contract" size={18} color="#3b82f6" />
                <Text style={styles.legalItemText}>用户协议</Text>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 联系信息 */}
        <View style={styles.contactSection}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>联系我们</Text>
            <View style={styles.contactInfo}>
              {contactInfo.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                  <FontAwesome6 name={contact.icon} size={16} color="#6b7280" />
                  <Text style={styles.contactText}>{contact.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 版权信息 */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>© 2024 图书馆智能助手团队</Text>
          <Text style={styles.copyrightDesc}>保留所有权利</Text>
        </View>
      </ScrollView>

      {/* WebView模态框 */}
      <WebViewModal
        visible={isWebViewModalVisible}
        title={webViewTitle}
        url={webViewUrl}
        onClose={handleCloseWebView}
      />
    </SafeAreaView>
  );
};

export default AboutUsScreen;

