// src/components/cards/StoryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
	COLORS,
	TYPOGRAPHY,
	RADIUS,
	SHADOWS,
	SPACING,
} from '../../constants/theme';

export const StoryCard = ({ item, onPress, isHero = false }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			style={[styles.container, isHero && styles.heroContainer]}>
			<Image
				source={{ uri: item.image }}
				style={styles.image}
			/>
			<LinearGradient
				colors={['transparent', 'rgba(84, 64, 225, 0.8)', COLORS.primary]}
				style={styles.gradient}
			/>
			<View style={styles.content}>
				{item.tag && (
					<View style={styles.tag}>
						<Text style={styles.tagText}>{item.tag}</Text>
					</View>
				)}
				<Text
					style={[
						styles.title,
						isHero ? TYPOGRAPHY.displayLgMobile : TYPOGRAPHY.headlineMd,
					]}
					numberOfLines={2}>
					{item.title}
				</Text>
				<View style={styles.meta}>
					<Ionicons
						name='time-outline'
						size={16}
						color={COLORS.onPrimary}
					/>
					<Text style={styles.metaText}>{item.duration}</Text>
					<Ionicons
						name='book-outline'
						size={16}
						color={COLORS.onPrimary}
						style={{ marginLeft: SPACING.sm }}
					/>
					<Text style={styles.metaText}>{item.category}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 220,
		height: 280,
		borderRadius: RADIUS.lg,
		overflow: 'hidden',
		...SHADOWS.card,
		marginRight: SPACING.md,
	},
	heroContainer: {
		width: '100%',
		height: 400,
		marginRight: 0,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
		top: '40%',
	},
	content: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: SPACING.lg,
	},
	tag: {
		backgroundColor: COLORS.yellow,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: RADIUS.pill,
		alignSelf: 'flex-start',
		marginBottom: SPACING.sm,
	},
	tagText: {
		...TYPOGRAPHY.labelCaps,
		color: COLORS.onSurface,
	},
	title: {
		color: COLORS.onPrimary,
		marginBottom: SPACING.sm,
	},
	meta: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	metaText: {
		color: COLORS.onPrimary,
		...TYPOGRAPHY.bodyMd,
		marginLeft: SPACING.xs,
	},
});
