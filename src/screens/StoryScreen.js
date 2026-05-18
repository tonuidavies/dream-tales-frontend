// src/screens/StoryScreen.js
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {
	COLORS,
	TYPOGRAPHY,
	SPACING,
	RADIUS,
	SHADOWS,
} from '../constants/theme';
import { STORIES } from '../constants/mockData';

export default function StoryScreen({ route, navigation }) {
	const { story } = route.params;

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			<View style={styles.heroContainer}>
				<Image
					source={{ uri: story.image }}
					style={styles.heroImage}
				/>

				<View style={styles.headerRow}>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={() => navigation.goBack()}>
						<Ionicons
							name='chevron-back'
							size={28}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity style={styles.iconButton}>
							<Ionicons
								name='heart-outline'
								size={24}
								color={COLORS.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
							<Ionicons
								name='download-outline'
								size={24}
								color={COLORS.primary}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					style={styles.playButton}
					onPress={() => navigation.navigate('VideoPlayer', { story })}>
					<BlurView
						intensity={80}
						style={styles.playBlur}>
						<Ionicons
							name='play'
							size={40}
							color={COLORS.onPrimary}
							style={{ marginLeft: 4 }}
						/>
					</BlurView>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<Text style={styles.title}>{story.title}</Text>
				<View style={styles.badgeRow}>
					<View style={styles.badge}>
						<Text style={styles.badgeText}>AGES {story.age || '3-5'}</Text>
					</View>
					<View style={styles.ratingBadge}>
						<Ionicons
							name='star'
							size={16}
							color={COLORS.yellow}
						/>
						<Text style={styles.ratingText}>
							{story.rating || '4.9 (1.2k)'}
						</Text>
					</View>
				</View>

				<View style={styles.descriptionCard}>
					<Text style={styles.description}>
						{story.description ||
							'A beautiful bedtime story to help little ones drift off to sleep.'}
					</Text>
					<View style={styles.metaRow}>
						<View style={styles.metaItem}>
							<Ionicons
								name='time-outline'
								size={20}
								color={COLORS.primary}
							/>
							<Text style={styles.metaText}>{story.duration} READ</Text>
						</View>
						<View style={styles.metaItem}>
							<Ionicons
								name='book-outline'
								size={20}
								color={COLORS.primary}
							/>
							<Text style={styles.metaText}>CALM PACING</Text>
						</View>
					</View>
				</View>

				<Text style={styles.sectionTitle}>Suggested for you</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{ marginBottom: 40 }}>
					{STORIES.map((s) => (
						<View
							key={s.id}
							style={styles.suggestedCard}>
							<Image
								source={{ uri: s.image }}
								style={styles.suggestedImage}
							/>
							<Text
								style={styles.suggestedTitle}
								numberOfLines={1}>
								{s.title}
							</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.background },
	heroContainer: {
		height: 450,
		borderBottomLeftRadius: RADIUS.xl,
		borderBottomRightRadius: RADIUS.xl,
		overflow: 'hidden',
	},
	heroImage: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: SPACING.lg,
		paddingTop: 50,
	},
	iconButton: {
		width: 44,
		height: 44,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.surface,
		alignItems: 'center',
		justifyContent: 'center',
		...SHADOWS.card,
	},
	playButton: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -40 }, { translateY: -40 }],
		width: 80,
		height: 80,
		borderRadius: RADIUS.pill,
		overflow: 'hidden',
	},
	playBlur: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(84, 64, 225, 0.6)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: { padding: SPACING.lg },
	title: {
		...TYPOGRAPHY.displayLgMobile,
		color: COLORS.onSurface,
		marginBottom: SPACING.sm,
	},
	badgeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	badge: {
		backgroundColor: '#ffe3b0',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: RADIUS.pill,
		marginRight: SPACING.md,
	},
	badgeText: { ...TYPOGRAPHY.labelCaps, color: COLORS.tertiary },
	ratingBadge: { flexDirection: 'row', alignItems: 'center' },
	ratingText: {
		...TYPOGRAPHY.labelCaps,
		color: COLORS.onSurfaceVariant,
		marginLeft: 4,
	},
	descriptionCard: {
		backgroundColor: COLORS.surface,
		padding: SPACING.lg,
		borderRadius: RADIUS.lg,
		...SHADOWS.card,
		marginBottom: SPACING.xl,
	},
	description: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurfaceVariant,
		marginBottom: SPACING.lg,
	},
	metaRow: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: COLORS.surfaceVariant,
		paddingTop: SPACING.md,
	},
	metaItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: SPACING.lg,
	},
	metaText: {
		...TYPOGRAPHY.labelCaps,
		color: COLORS.primaryContainer,
		marginLeft: 8,
	},
	sectionTitle: {
		...TYPOGRAPHY.headlineSm,
		color: COLORS.onSurface,
		marginBottom: SPACING.md,
	},
	suggestedCard: { width: 160, marginRight: SPACING.md },
	suggestedImage: {
		width: 160,
		height: 160,
		borderRadius: RADIUS.lg,
		marginBottom: 8,
	},
	suggestedTitle: { ...TYPOGRAPHY.bodyMd, color: COLORS.onSurface },
});
