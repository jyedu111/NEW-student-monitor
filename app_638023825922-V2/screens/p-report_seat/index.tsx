

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

interface UploadedImage {
  uri: string;
  fileName?: string;
}

type ReportType = 'long-time' | 'item-occupied' | 'other' | '';

const ReportSeatScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 状态管理
  const [selectedSeatNumber, setSelectedSeatNumber] = useState('');
  const [reportType, setReportType] = useState<ReportType>('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 处理返回按钮
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  // 处理座位地图选择
  const handleSeatMapPress = () => {
    router.push('/p-seat_map?mode=select-seat');
  };

  // 处理座位号输入
  const handleSeatNumberChange = (text: string) => {
    setSelectedSeatNumber(text);
  };

  // 处理举报类型选择
  const handleReportTypeSelect = (type: ReportType) => {
    setReportType(type);
  };

  // 处理描述输入
  const handleDescriptionChange = (text: string) => {
    if (text.length <= 200) {
      setDescription(text);
    }
  };

  // 处理图片上传
  const handleImageUpload = async () => {
    if (uploadedImages.length >= 3) {
      Alert.alert('提示', '最多只能上传3张图片');
      return;
    }

    try {
      // 请求媒体库权限
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('权限不足', '需要访问相册权限才能上传图片');
        return;
      }

      // 选择图片
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 3 - uploadedImages.length,
      });

      if (!result.canceled && result.assets) {
        const newImages: UploadedImage[] = result.assets.map(asset => ({
          uri: asset.uri,
          fileName: asset.fileName,
        }));
        setUploadedImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      Alert.alert('错误', '上传图片失败，请重试');
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 表单验证
  const validateForm = (): boolean => {
    if (!selectedSeatNumber.trim()) {
      Alert.alert('提示', '请选择或输入座位号');
      return false;
    }

    if (!reportType) {
      Alert.alert('提示', '请选择举报类型');
      return false;
    }

    if (description.length > 200) {
      Alert.alert('提示', '描述内容不能超过200字');
      return false;
    }

    return true;
  };

  // 提交举报
  const handleSubmitReport = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟提交过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 显示成功模态框
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('错误', '提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理成功确认
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    if (router.canGoBack()) {
      router.back();
    }
  };

  // 初始化时处理URL参数
  React.useEffect(() => {
    if (params.seatId) {
      // 模拟根据座位ID获取座位号
      const mockSeatData: { [key: string]: string } = {
        'seat1': 'A区-A01',
        'seat2': 'B区-B05',
        'seat3': 'C区-C12'
      };
      
      const seatNumber = mockSeatData[params.seatId as string] || '未知座位';
      setSelectedSeatNumber(seatNumber);
    }
  }, [params.seatId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>举报占座</Text>
      </View>

      {/* 主要内容区域 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* 座位选择区域 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>选择座位</Text>
            
            {/* 座位地图选择 */}
            <TouchableOpacity style={styles.seatMapSelector} onPress={handleSeatMapPress}>
              <View style={styles.seatMapInfo}>
                <View style={styles.seatMapIcon}>
                  <FontAwesome6 name="location-dot" size={16} color="#6366f1" />
                </View>
                <View style={styles.seatMapText}>
                  <Text style={styles.seatMapMainText}>
                    {selectedSeatNumber ? selectedSeatNumber : '点击选择座位'}
                  </Text>
                  <Text style={styles.seatMapSubText}>
                    {selectedSeatNumber ? '已选择座位' : '通过地图选择被举报的座位'}
                  </Text>
                </View>
              </View>
              <FontAwesome6 name="chevron-right" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            {/* 手动输入座位号 */}
            <View style={styles.manualSeatInput}>
              <Text style={styles.inputLabel}>或手动输入座位号</Text>
              <TextInput
                style={styles.textInput}
                placeholder="如：A区-A01"
                value={selectedSeatNumber}
                onChangeText={handleSeatNumberChange}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* 举报类型选择 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>举报类型</Text>
            <View style={styles.reportTypeOptions}>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  reportType === 'long-time' && styles.radioOptionSelected
                ]}
                onPress={() => handleReportTypeSelect('long-time')}
              >
                <View style={styles.radioOptionContent}>
                  <View style={[
                    styles.radioButton,
                    reportType === 'long-time' && styles.radioButtonSelected
                  ]}>
                    {reportType === 'long-time' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.radioOptionText}>
                    <Text style={styles.radioOptionMainText}>长时间无人</Text>
                    <Text style={styles.radioOptionSubText}>座位上有物品但长时间无人</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  reportType === 'item-occupied' && styles.radioOptionSelected
                ]}
                onPress={() => handleReportTypeSelect('item-occupied')}
              >
                <View style={styles.radioOptionContent}>
                  <View style={[
                    styles.radioButton,
                    reportType === 'item-occupied' && styles.radioButtonSelected
                  ]}>
                    {reportType === 'item-occupied' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.radioOptionText}>
                    <Text style={styles.radioOptionMainText}>物品占位</Text>
                    <Text style={styles.radioOptionSubText}>用书本、书包等物品占位</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  reportType === 'other' && styles.radioOptionSelected
                ]}
                onPress={() => handleReportTypeSelect('other')}
              >
                <View style={styles.radioOptionContent}>
                  <View style={[
                    styles.radioButton,
                    reportType === 'other' && styles.radioButtonSelected
                  ]}>
                    {reportType === 'other' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.radioOptionText}>
                    <Text style={styles.radioOptionMainText}>其他</Text>
                    <Text style={styles.radioOptionSubText}>其他违规占座行为</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 描述输入 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>详细描述</Text>
            <TextInput
              style={styles.textArea}
              placeholder="请简要描述占座情况，如：该座位已空了30分钟，但有书本占位..."
              value={description}
              onChangeText={handleDescriptionChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
            <Text style={[
              styles.characterCounter,
              description.length > 200 && styles.characterCounterError
            ]}>
              {description.length}/200
            </Text>
          </View>

          {/* 图片上传 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              上传图片 <Text style={styles.optionalText}>(可选)</Text>
            </Text>
            
            <TouchableOpacity
              style={[
                styles.uploadArea,
                uploadedImages.length > 0 && styles.uploadAreaWithImages
              ]}
              onPress={handleImageUpload}
              disabled={uploadedImages.length >= 3}
            >
              {uploadedImages.length === 0 ? (
                <View style={styles.uploadPlaceholder}>
                  <View style={styles.uploadIcon}>
                    <FontAwesome6 name="camera" size={24} color="#6366f1" />
                  </View>
                  <View style={styles.uploadText}>
                    <Text style={styles.uploadMainText}>点击上传图片</Text>
                    <Text style={styles.uploadSubText}>支持拍照或从相册选择，最多3张</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagePreviewContainer}>
                  {uploadedImages.map((image, index) => (
                    <View key={index} style={styles.imagePreviewItem}>
                      <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => handleRemoveImage(index)}
                      >
                        <FontAwesome6 name="xmark" size={12} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {uploadedImages.length < 3 && (
                    <TouchableOpacity style={styles.addMoreImageButton} onPress={handleImageUpload}>
                      <FontAwesome6 name="plus" size={20} color="#6366f1" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 底部提交按钮 */}
      <View style={styles.submitSection}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled
          ]}
          onPress={handleSubmitReport}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '提交中...' : '提交举报'}
          </Text>
          {isSubmitting && (
            <FontAwesome6 name="spinner" size={16} color="#ffffff" style={styles.loadingIcon} />
          )}
        </TouchableOpacity>
      </View>

      {/* 成功提示模态框 */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <FontAwesome6 name="check" size={24} color="#10b981" />
            </View>
            <Text style={styles.modalTitle}>举报提交成功</Text>
            <Text style={styles.modalMessage}>感谢您的举报，我们将尽快处理</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSuccessConfirm}>
              <Text style={styles.modalButtonText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReportSeatScreen;

