// src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import StoryScreen from '../screens/StoryScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import { BottomTabs } from './BottomTabs';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
			<Stack.Screen
				name='Splash'
				component={SplashScreen}
			/>
			<Stack.Screen
				name='MainTabs'
				component={BottomTabs}
			/>
			<Stack.Screen
				name='Story'
				component={StoryScreen}
				options={{ presentation: 'modal' }}
			/>
			<Stack.Screen
				name='VideoPlayer'
				component={VideoPlayerScreen}
				options={{ headerShown: false, presentation: 'fullScreenModal' }}
			/>
		</Stack.Navigator>
	);
};
