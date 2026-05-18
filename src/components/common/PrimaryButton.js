// src/components/common/PrimaryButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
	COLORS,
	TYPOGRAPHY,
	RADIUS,
	SHADOWS,
	SPACING,
} from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const PrimaryButton = ({ title, onPress, icon, style }) => {
	return (
		<TouchableOpacity
			style={[styles.button, style]}
			onPress={onPress}
			activeOpacity={0.8}>
			<Text style={styles.text}>{title}</Text>
			{icon && (
				<Ionicons
					name={icon}
					size={20}
					color={COLORS.onPrimary}
					style={styles.icon}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.xl,
		borderRadius: RADIUS.pill,
		...SHADOWS.soft,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255,255,255,0.2)',
	},
	text: {
		color: COLORS.onPrimary,
		...TYPOGRAPHY.headlineSm,
	},
	icon: {
		marginLeft: SPACING.sm,
	},
});
