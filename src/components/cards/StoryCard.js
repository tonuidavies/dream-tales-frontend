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
	// 1. BULLETPROOF IMAGE HANDLER
	// Safely handles remote URLs (strings), local assets (requires), or missing images
	const getImageSource = () => {
		if (!item?.image) {
			// Fallback image if your database/mapping doesn't provide one
			return {
				uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
			};
		}
		if (typeof item.image === 'string') {
			return { uri: item.image };
		}
		// If it's a local require() number, return it directly without the {uri} wrapper
		return item.image;
	};

	// 2. DURATION FORMATTER
	// Handles raw database seconds (e.g., 300) or pre-formatted strings (e.g., "5 min")
	const formatDuration = (duration) => {
		if (typeof duration === 'number') {
			return `${Math.floor(duration / 60)} min`;
		}
		return duration || '5 min';
	};

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			style={[styles.container, isHero && styles.heroContainer]}>
			<Image
				source={getImageSource()}
				style={styles.image}
				resizeMode='cover'
			/>

			{/* Tweaked the gradient slightly so white text pops better on light images */}
			<LinearGradient
				colors={['transparent', 'rgba(0, 0, 0, 0.4)', COLORS.primary]}
				style={styles.gradient}
			/>

			<View style={styles.content}>
				{/* Dynamically show a tag or a Premium/Free badge based on database fields */}
				{(item?.tag || item?.isPremium !== undefined) && (
					<View style={styles.tag}>
						<Text style={styles.tagText}>
							{item?.tag || (item?.isPremium ? 'PREMIUM' : 'FREE')}
						</Text>
					</View>
				)}

				<Text
					style={[
						styles.title,
						isHero ? TYPOGRAPHY.displayLgMobile : TYPOGRAPHY.headlineMd,
					]}
					numberOfLines={2}>
					{item?.title || 'Untitled Story'}
				</Text>

				<View style={styles.meta}>
					<Ionicons
						name='time-outline'
						size={16}
						color={COLORS.onPrimary}
					/>
					<Text style={styles.metaText}>{formatDuration(item?.duration)}</Text>

					<Ionicons
						name='book-outline'
						size={16}
						color={COLORS.onPrimary}
						style={{ marginLeft: SPACING.md }}
					/>
					<Text style={styles.metaText}>{item?.category || 'Adventure'}</Text>
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
		top: '30%', // Shifted gradient up slightly for better text readability
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
		color: COLORS.background,
		fontWeight: 'bold',
	},
	title: {
		color: COLORS.onPrimary,
		marginBottom: SPACING.sm,
		fontWeight: 'bold',
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
