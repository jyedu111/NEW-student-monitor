

import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './styles';

interface WebViewModalProps {
  visible: boolean;
  title: string;
  url: string;
  onClose: () => void;
}

const WebViewModal: React.FC<WebViewModalProps> = ({
  visible,
  title,
  url,
  onClose,
}) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsContentLoaded(false);
      // 模拟加载Web内容
      const timer = setTimeout(() => {
        setIsContentLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleBackdropPress = () => {
    onClose();
  };

  const handleModalContentPress = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleModalContentPress}>
            <View style={styles.modalContainer}>
              {/* 模态框头部 */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <FontAwesome6 name="xmark" size={18} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* 模态框内容 */}
              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                {!isContentLoaded ? (
                  <View style={styles.loadingContainer}>
                    <FontAwesome6 name="spinner" size={24} color="#6366f1" />
                    <Text style={styles.loadingText}>正在加载{title}...</Text>
                  </View>
                ) : (
                  <View style={styles.webContent}>
                    <Text style={styles.webContentTitle}>{title}</Text>
                    <Text style={styles.webContentText}>
                      这里是{title}的内容。在实际应用中，这里会加载真实的Web页面内容。
                      我们致力于保护您的隐私和权益，详细条款请查看完整的{title}文档。
                    </Text>
                    <View style={styles.webContentNote}>
                      <Text style={styles.webContentNoteText}>
                        <Text style={styles.webContentNoteBold}>注意：</Text>
                        这是一个演示版本，实际内容请以官方发布的正式文档为准。
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WebViewModal;

