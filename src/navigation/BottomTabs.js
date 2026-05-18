// src/navigation/BottomTabs.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => (
	<View style={{ flex: 1, backgroundColor: COLORS.background }} />
);

export const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.tabBar,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.onSurfaceVariant,
				tabBarShowLabel: true,
				tabBarLabelStyle: {
					fontFamily: 'Quicksand-Bold',
					fontSize: 10,
					marginTop: -4,
				},
				tabBarBackground: () => (
					<BlurView
						intensity={80}
						tint='light'
						style={StyleSheet.absoluteFill}
					/>
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
		borderTopWidth: 0,
		elevation: 0,
		height: 80,
		backgroundColor: 'rgba(251, 249, 245, 0.85)',
		borderTopLeftRadius: RADIUS.lg,
		borderTopRightRadius: RADIUS.lg,
	},
	iconContainer: {
		padding: SPACING.sm,
		borderRadius: RADIUS.pill,
	},
	activeIcon: {
		backgroundColor: 'rgba(84, 64, 225, 0.1)',
	},
});
