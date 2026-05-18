// src/screens/FavoritesScreen.js
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
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

export default function FavoritesScreen() {
	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: item.image }}
					style={styles.image}
				/>
				<View style={styles.starBadge}>
					<Ionicons
						name='star'
						size={16}
						color={COLORS.yellow}
					/>
				</View>
			</View>
			<View style={styles.cardContent}>
				<Text
					style={styles.title}
					numberOfLines={1}>
					{item.title}
				</Text>
				<View style={styles.meta}>
					<Ionicons
						name='time-outline'
						size={14}
						color={COLORS.onSurfaceVariant}
					/>
					<Text style={styles.metaText}>{item.duration} READ</Text>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView
			style={styles.container}
			edges={['top']}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					Your Stars{' '}
					<Ionicons
						name='star'
						size={32}
						color={COLORS.yellow}
					/>
				</Text>
				<Text style={styles.headerSubtitle}>
					The magical stories you've saved for later.
				</Text>
			</View>

			<FlatList
				data={[...STORIES, ...STORIES]} // Duplicate for grid display
				numColumns={2}
				renderItem={renderItem}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				contentContainerStyle={styles.grid}
				columnWrapperStyle={styles.row}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.background },
	header: { padding: SPACING.lg },
	headerTitle: { ...TYPOGRAPHY.displayLgMobile, color: COLORS.onSurface },
	headerSubtitle: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurfaceVariant,
		marginTop: SPACING.xs,
	},
	grid: { padding: SPACING.lg, paddingBottom: 100 },
	row: { justifyContent: 'space-between', marginBottom: SPACING.lg },
	card: {
		width: '48%',
		backgroundColor: COLORS.surface,
		borderRadius: RADIUS.lg,
		...SHADOWS.card,
		overflow: 'hidden',
	},
	imageContainer: { height: 180, width: '100%', position: 'relative' },
	image: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
	starBadge: {
		position: 'absolute',
		top: 12,
		right: 12,
		width: 32,
		height: 32,
		borderRadius: RADIUS.pill,
		backgroundColor: 'rgba(255,255,255,0.3)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContent: { padding: SPACING.md },
	title: {
		...TYPOGRAPHY.headlineSm,
		fontSize: 18,
		color: COLORS.onSurface,
		marginBottom: 4,
	},
	meta: { flexDirection: 'row', alignItems: 'center' },
	metaText: {
		...TYPOGRAPHY.labelCaps,
		color: COLORS.onSurfaceVariant,
		marginLeft: 4,
	},
});
