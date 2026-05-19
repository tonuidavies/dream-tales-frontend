// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator, // Added for loading state
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';
import { CATEGORIES } from '../constants/mockData'; // Removed STORIES mock data
import { StoryCard } from '../components/cards/StoryCard';

// Backend & Auth Imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import apiClient from '../api/client';

export default function HomeScreen({ navigation }) {
	// 1. Setup State for real data
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);

	// 2. Fetch Data on Screen Load
	useEffect(() => {
		const fetchRealData = async () => {
			try {
				await signInWithEmailAndPassword(
					auth,
					'test@dreamtales.com',
					'password123',
				);
				console.log('1. Firebase login successful!');

				const response = await apiClient.get('/stories');
				console.log('2. Backend Data:', response.data);

				const rawDbStories = response.data.body;

				// 🔥 THE MAGIC TRICK:
				// We merge your real database text with placeholder visual data
				// so your StoryCard component doesn't break and stays beautiful!
				const beautifulStories = rawDbStories.map((story, index) => ({
					...story, // Keeps your real DB ID, Title, and HLS URL

					// Add fallback visual properties your DB doesn't have yet:
					// Use a fallback network image so it renders perfectly
					image: {
						uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
					},
					author: 'DreamTales Studio',
					// Convert seconds to minutes for the UI
					readTime: `${Math.floor(story.duration / 60)} min`,
				}));

				setStories(beautifulStories);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRealData();
	}, []);

	// 3. Show Loading Spinner while waiting for backend
	if (loading) {
		return (
			<SafeAreaView
				style={[
					styles.container,
					{ justifyContent: 'center', alignItems: 'center' },
				]}>
				<ActivityIndicator
					size='large'
					color={COLORS.primary}
				/>
				<Text style={{ marginTop: SPACING.md, color: COLORS.onSurfaceVariant }}>
					Loading your magical stories...
				</Text>
			</SafeAreaView>
		);
	}

	// 4. Safely handle if the database is empty
	if (!stories || stories.length === 0) {
		return (
			<SafeAreaView
				style={[
					styles.container,
					{ justifyContent: 'center', alignItems: 'center' },
				]}>
				<Text style={styles.greeting}>No stories found!</Text>
				<Text style={styles.subGreeting}>Add some to your database.</Text>
			</SafeAreaView>
		);
	}

	// 5. Assign real data to your UI variables
	const heroStory = stories[0];
	const trendingStories = stories.slice(1);

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

				{/* Categories (Still using mock data for now, which is fine) */}
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
				{trendingStories.length > 0 && (
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
				)}
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

// ... Keep your exact styles down here ...
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
