// src/screens/StoryDetailsScreen.js
import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
	COLORS,
	TYPOGRAPHY,
	SPACING,
	RADIUS,
	SHADOWS,
} from '../constants/theme';
import { STORIES } from '../constants/mockData';

export default function StoryDetailsScreen({ route, navigation }) {
	const { story } = route?.params || { story: null };

	const getImageSource = (imageProp) => {
		if (!imageProp)
			return {
				uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
			};
		if (typeof imageProp === 'string') return { uri: imageProp };
		return imageProp;
	};

	const formatDuration = (duration) => {
		if (typeof duration === 'number')
			return `${Math.floor(duration / 60)} MIN READ`;
		return duration ? `${duration}`.toUpperCase() : '5 MIN READ';
	};

	if (!story) {
		return (
			<SafeAreaView
				style={[
					styles.container,
					{ justifyContent: 'center', alignItems: 'center' },
				]}>
				<Text style={TYPOGRAPHY.headlineMd}>Story not found!</Text>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{ marginTop: SPACING.md }}>
					<Text style={{ color: COLORS.primary }}>Go Back</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={styles.container}
			edges={['top']}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.headerBtn}>
					<Ionicons
						name='chevron-back'
						size={28}
						color={COLORS.primary}
					/>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>DreamTales</Text>
				<View style={styles.headerRight}>
					<TouchableOpacity style={styles.headerIconBtn}>
						<Ionicons
							name='settings-outline'
							size={24}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
					<View style={styles.avatar}>
						<Image
							source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
							style={StyleSheet.absoluteFillObject}
						/>
					</View>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				<View style={styles.heroSection}>
					<Image
						source={getImageSource(story.image)}
						style={styles.heroImage}
						resizeMode='cover'
					/>

					{/* 👇 PLAY BUTTON 👇 */}
					<TouchableOpacity
						style={styles.playButton}
						activeOpacity={0.8}
						onPress={() => {
							// This routes to the Video Player and passes the story data!
							navigation.navigate('VideoPlayer', { story: story });
						}}>
						<Ionicons
							name='play'
							size={32}
							color={COLORS.onPrimary}
							style={{ marginLeft: 4 }}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.titleRow}>
					<Text
						style={styles.titleText}
						numberOfLines={2}>
						{story.title || 'Untitled Story'}
					</Text>
					<View style={styles.actionButtons}>
						<TouchableOpacity style={styles.circleBtn}>
							<Ionicons
								name='heart-outline'
								size={24}
								color={COLORS.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.circleBtn}>
							<Ionicons
								name='download-outline'
								size={24}
								color={COLORS.primary}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.metaRow}>
					<View
						style={[styles.pill, { backgroundColor: COLORS.tertiaryFixed }]}>
						<Text
							style={[
								styles.pillText,
								{ color: COLORS.onTertiaryFixedVariant },
							]}>
							{story.tag || 'AGES 3-5'}
						</Text>
					</View>
					<View style={styles.ratingContainer}>
						<Ionicons
							name='star-outline'
							size={16}
							color={COLORS.tertiaryContainer}
						/>
						<Text style={styles.ratingText}>4.9 (1.2k)</Text>
					</View>
				</View>

				<View style={styles.descriptionCard}>
					<Text style={styles.descriptionText}>
						{story.description || 'A gentle tale about faith and courage...'}
					</Text>
					<View style={styles.cardBottomMeta}>
						<View style={styles.metaItem}>
							<Ionicons
								name='time-outline'
								size={20}
								color={COLORS.primary}
							/>
							<Text style={styles.metaItemText}>
								{formatDuration(story.duration)}
							</Text>
						</View>
						<View style={styles.metaItem}>
							<Ionicons
								name='book-outline'
								size={20}
								color={COLORS.primary}
							/>
							<Text style={styles.metaItemText}>
								{story.category
									? `${story.category} PACING`.toUpperCase()
									: 'CALM PACING'}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

// ... Use the exact same styles you pasted above here! ...
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.background },
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
	},
	headerBtn: {
		width: 40,
		height: 40,
		backgroundColor: COLORS.surfaceContainer,
		borderRadius: RADIUS.pill,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		...TYPOGRAPHY.headlineMd,
		color: COLORS.primary,
		fontWeight: 'bold',
	},
	headerRight: { flexDirection: 'row', alignItems: 'center' },
	headerIconBtn: { marginRight: SPACING.sm },
	avatar: {
		width: 36,
		height: 36,
		borderRadius: RADIUS.pill,
		overflow: 'hidden',
		backgroundColor: COLORS.surfaceVariant,
	},
	scrollContent: { padding: SPACING.lg, paddingBottom: 100 },
	heroSection: {
		width: '100%',
		height: 340,
		borderRadius: 32,
		overflow: 'hidden',
		marginBottom: SPACING.xl,
		justifyContent: 'center',
		alignItems: 'center',
		...SHADOWS.card,
	},
	heroImage: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
	},
	playButton: {
		width: 80,
		height: 80,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: SPACING.sm,
	},
	titleText: {
		flex: 1,
		...TYPOGRAPHY.displayLgMobile,
		color: COLORS.onSurface,
		marginRight: SPACING.md,
	},
	actionButtons: { flexDirection: 'row', gap: SPACING.sm },
	circleBtn: {
		width: 44,
		height: 44,
		borderRadius: RADIUS.pill,
		borderWidth: 1,
		borderColor: COLORS.outlineVariant,
		alignItems: 'center',
		justifyContent: 'center',
	},
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	pill: {
		paddingHorizontal: SPACING.sm,
		paddingVertical: 4,
		borderRadius: RADIUS.pill,
		marginRight: SPACING.md,
	},
	pillText: { ...TYPOGRAPHY.labelCaps, fontWeight: 'bold' },
	ratingContainer: { flexDirection: 'row', alignItems: 'center' },
	ratingText: {
		...TYPOGRAPHY.bodyMd,
		color: COLORS.onSurfaceVariant,
		marginLeft: 4,
		fontWeight: 'bold',
	},
	descriptionCard: {
		backgroundColor: COLORS.surfaceContainerLow,
		padding: SPACING.xl,
		borderRadius: 24,
		marginBottom: SPACING.xl,
	},
	descriptionText: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurfaceVariant,
		lineHeight: 28,
		marginBottom: SPACING.lg,
	},
	cardBottomMeta: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.xl,
	},
	metaItem: { flexDirection: 'row', alignItems: 'center' },
	metaItemText: {
		...TYPOGRAPHY.labelCaps,
		color: COLORS.onSurfaceVariant,
		marginLeft: 6,
	},
});
