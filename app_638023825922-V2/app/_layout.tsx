import React, { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, usePathname, useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "TurboModuleRegistry.getEnforcing(...): 'RNMapsAirModule' could not be found",
  // 添加其它想暂时忽略的错误或警告信息
]);

export default function RootLayout() {
  const pathname = usePathname();
  const searchParams = useGlobalSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    let searchString = '';
    if (Object.keys(searchParams).length > 0) {
      const queryString = Object.keys(searchParams)
        .map(key => {
          const value = searchParams[key];
          if (typeof value === 'string') {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
          return '';
        }).filter(Boolean).join('&');

      searchString = '?' + queryString;
    }

    const pageId = pathname.replace('/', '').toUpperCase();
    console.log('当前pageId:', pageId, ', pathname:', pathname, ', search:', searchString);
    if (typeof window === 'object' && window.parent && window.parent.postMessage) {
      window.parent.postMessage({
        type: 'chux-path-change',
        pageId: pageId,
        pathname: pathname,
        search: searchString,
      }, '*');
    }
  }, [pathname, searchParams])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark"></StatusBar>
      <Stack screenOptions={{
        // 设置所有页面的切换动画为从右侧滑入，适用于iOS 和 Android
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // 隐藏自带的头部
        headerShown: false 
      }}>
        <Stack.Screen name="(tabs)" options={{ title: "底部导航栏" }} />
        <Stack.Screen name="p-booking_confirm" options={{ title: "预约确认页" }} />
        <Stack.Screen name="p-my_bookings" options={{ title: "我的预约页" }} />
        <Stack.Screen name="p-report_seat" options={{ title: "举报占座页" }} />
        <Stack.Screen name="p-book_detail" options={{ title: "图书详情页" }} />
        <Stack.Screen name="p-book_navigation" options={{ title: "书架导航页" }} />
        <Stack.Screen name="p-environment" options={{ title: "环境监测页" }} />
        <Stack.Screen name="p-recommendation" options={{ title: "最优位置推荐页" }} />
        <Stack.Screen name="p-announcement_list" options={{ title: "公告列表页" }} />
        <Stack.Screen name="p-announcement_detail" options={{ title: "公告详情页" }} />
        <Stack.Screen name="p-event_list" options={{ title: "活动列表页" }} />
        <Stack.Screen name="p-event_detail" options={{ title: "活动详情页" }} />
        <Stack.Screen name="p-intellectual_qna" options={{ title: "智能问答页" }} />
        <Stack.Screen name="p-settings" options={{ title: "设置页" }} />
        <Stack.Screen name="p-notification_settings" options={{ title: "通知设置页" }} />
        <Stack.Screen name="p-about_us" options={{ title: "关于我们页" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
