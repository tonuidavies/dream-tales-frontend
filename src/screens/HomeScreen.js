// src/screens/HomeScreen.js
import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';
import { STORIES, CATEGORIES } from '../constants/mockData';
import { StoryCard } from '../components/cards/StoryCard';

export default function HomeScreen({ navigation }) {
	const heroStory = STORIES[0];
	const trendingStories = STORIES.slice(1);

	return (
		<SafeAreaView
			style={styles.container}
			edges={['top']}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Good evening, Leo!</Text>
						<Text style={styles.subGreeting}>
							Ready for a magical story journey?
						</Text>
					</View>
					<TouchableOpacity style={styles.settingsBtn}>
						<Ionicons
							name='settings-outline'
							size={24}
							color={COLORS.onSurface}
						/>
					</TouchableOpacity>
				</View>

				{/* Hero Section */}
				<View style={styles.section}>
					<StoryCard
						item={heroStory}
						isHero
						onPress={() => navigation.navigate('Story', { story: heroStory })}
					/>
				</View>

				{/* Categories */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Explore Stories</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.categoryScroll}>
						{CATEGORIES.map((cat) => (
							<View
								key={cat.id}
								style={styles.categoryItem}>
								<View
									style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
									<Ionicons
										name={cat.icon}
										size={28}
										color={COLORS.primary}
									/>
								</View>
								<Text style={styles.categoryText}>{cat.title}</Text>
							</View>
						))}
					</ScrollView>
				</View>

				{/* Continue Reading */}
				<View style={styles.section}>
					<View style={styles.continueCard}>
						<View style={styles.continuePlayBtn}>
							<Ionicons
								name='play'
								size={20}
								color={COLORS.onPrimary}
							/>
						</View>
						<View style={{ flex: 1, marginLeft: SPACING.md }}>
							<Text style={styles.continueLabel}>CONTINUE READING</Text>
							<Text style={styles.continueTitle}>The Brave Little Toaster</Text>
							<View style={styles.progressBar}>
								<View style={[styles.progressFill, { width: '60%' }]} />
							</View>
						</View>
					</View>
				</View>

				{/* Trending Now */}
				<View style={[styles.section, { marginBottom: 100 }]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Trending Now</Text>
						<Text style={styles.seeAll}>See All</Text>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.categoryScroll}>
						{trendingStories.map((story) => (
							<StoryCard
								key={story.id}
								item={story}
								onPress={() => navigation.navigate('Story', { story })}
							/>
						))}
					</ScrollView>
				</View>
			</ScrollView>

			{/* FAB */}
			<TouchableOpacity
				style={styles.fab}
				onPress={() => {}}>
				<Ionicons
					name='sparkles'
					size={24}
					color={COLORS.onPrimary}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.background },
	scrollContent: { padding: SPACING.lg },
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.xl,
	},
	greeting: { ...TYPOGRAPHY.headlineMd, color: COLORS.onSurface },
	subGreeting: {
		...TYPOGRAPHY.bodyMd,
		color: COLORS.onSurfaceVariant,
		marginTop: 4,
	},
	settingsBtn: { padding: 8 },
	section: { marginBottom: SPACING.xl },
	sectionTitle: {
		...TYPOGRAPHY.headlineSm,
		color: COLORS.onSurface,
		marginBottom: SPACING.md,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	seeAll: { ...TYPOGRAPHY.labelCaps, color: COLORS.primary },
	categoryScroll: { paddingRight: SPACING.lg },
	categoryItem: { alignItems: 'center', marginRight: SPACING.lg },
	categoryIcon: {
		width: 70,
		height: 70,
		borderRadius: RADIUS.pill,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.sm,
	},
	categoryText: { ...TYPOGRAPHY.labelCaps, color: COLORS.onSurfaceVariant },
	continueCard: {
		flexDirection: 'row',
		backgroundColor: COLORS.surface,
		padding: SPACING.md,
		borderRadius: RADIUS.lg,
		alignItems: 'center',
	},
	continuePlayBtn: {
		width: 60,
		height: 60,
		borderRadius: RADIUS.md,
		backgroundColor: COLORS.tertiary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	continueLabel: { ...TYPOGRAPHY.labelCaps, color: COLORS.primary },
	continueTitle: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurface,
		marginVertical: SPACING.xs,
	},
	progressBar: {
		height: 6,
		backgroundColor: COLORS.surfaceVariant,
		borderRadius: RADIUS.pill,
		marginTop: SPACING.xs,
	},
	progressFill: {
		height: '100%',
		backgroundColor: COLORS.yellow,
		borderRadius: RADIUS.pill,
	},
	fab: {
		position: 'absolute',
		right: SPACING.xl,
		bottom: 100,
		width: 64,
		height: 64,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 8,
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
});
