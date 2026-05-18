// src/navigation/BottomTabs.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => (
	<View style={{ flex: 1, backgroundColor: COLORS.background }} />
);

export const BottomTabs = () => {
	const insets = useSafeAreaInsets();

	// Float the bar above the system navigation
	const bottomMargin =
		Platform.OS === 'android'
			? Math.max(insets.bottom + 16, 24)
			: insets.bottom || 24;

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: [styles.tabBar, { bottom: bottomMargin }],
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.onSurfaceVariant,
				tabBarShowLabel: false, // Hide labels for a cleaner, icon-only floating pill look
				tabBarBackground: () => (
					<View style={styles.blurContainer}>
						<BlurView
							intensity={90}
							tint='light'
							style={StyleSheet.absoluteFill}
						/>
					</View>
				),
			}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View style={[styles.iconContainer, focused && styles.activeIcon]}>
							<Ionicons
								name={focused ? 'home' : 'home-outline'}
								size={24}
								color={color}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={EmptyScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View style={[styles.iconContainer, focused && styles.activeIcon]}>
							<Ionicons
								name={focused ? 'search' : 'search-outline'}
								size={24}
								color={color}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Stars'
				component={FavoritesScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View style={[styles.iconContainer, focused && styles.activeIcon]}>
							<Ionicons
								name={focused ? 'star' : 'star-outline'}
								size={24}
								color={color}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Me'
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View style={[styles.iconContainer, focused && styles.activeIcon]}>
							<Ionicons
								name={focused ? 'person' : 'person-outline'}
								size={24}
								color={color}
							/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		left: SPACING.lg,
		right: SPACING.lg,
		height: 70,
		borderTopWidth: 0,
		elevation: 0,
		backgroundColor: 'transparent',
	},
	blurContainer: {
		...StyleSheet.absoluteFillObject,
		borderRadius: RADIUS.pill,
		overflow: 'hidden',
		backgroundColor:
			Platform.OS === 'android'
				? 'rgba(255, 255, 255, 0.95)'
				: 'rgba(255, 255, 255, 0.7)',
		...SHADOWS.card,
	},
	iconContainer: {
		padding: 10,
		borderRadius: RADIUS.pill,
		marginTop: 12, // Centers the icon since we hid the text label
	},
	activeIcon: {
		backgroundColor: 'rgba(84, 64, 225, 0.15)',
	},
});
