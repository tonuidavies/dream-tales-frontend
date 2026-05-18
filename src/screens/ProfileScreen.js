// src/screens/ProfileScreen.js
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Switch,
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

export default function ProfileScreen() {
	const OptionCard = ({ icon, title, subtitle, rightElement }) => (
		<TouchableOpacity style={styles.optionCard}>
			<View style={styles.optionIconContainer}>
				<Ionicons
					name={icon}
					size={24}
					color={COLORS.primary}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={styles.optionTitle}>{title}</Text>
				<Text style={styles.optionSubtitle}>{subtitle}</Text>
			</View>
			{rightElement || (
				<Ionicons
					name='chevron-forward'
					size={20}
					color={COLORS.outline}
				/>
			)}
		</TouchableOpacity>
	);

	return (
		<SafeAreaView
			style={styles.container}
			edges={['top']}>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}>
				<Text style={styles.sectionTitle}>Who is dreaming?</Text>
				<View style={styles.profilesRow}>
					<View style={styles.profileItem}>
						<View style={[styles.profileAvatar, styles.activeAvatar]}>
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=200&auto=format&fit=crop',
								}}
								style={styles.avatarImage}
							/>
						</View>
						<Text style={styles.activeProfileText}>Mia</Text>
					</View>
					<View style={styles.profileItem}>
						<View style={styles.profileAvatar}>
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1544281679-05db4fa3ce66?q=80&w=200&auto=format&fit=crop',
								}}
								style={styles.avatarImage}
							/>
						</View>
						<Text style={styles.profileText}>Leo</Text>
					</View>
					<View style={styles.profileItem}>
						<View style={[styles.profileAvatar, styles.addAvatar]}>
							<Ionicons
								name='add'
								size={32}
								color={COLORS.onSurfaceVariant}
							/>
						</View>
						<Text style={styles.profileText}>Add</Text>
					</View>
				</View>

				<View style={styles.premiumCard}>
					<View style={styles.premiumBadge}>
						<Ionicons
							name='star'
							size={14}
							color={COLORS.onSurface}
							style={{ marginRight: 4 }}
						/>
						<Text style={styles.premiumBadgeText}>DREAMTALES PREMIUM</Text>
					</View>
					<Text style={styles.premiumTitle}>Unlock Magical Adventures</Text>
					<Text style={styles.premiumSubtitle}>
						Unlimited access to 500+ stories, offline mode, and personalized
						narrations.
					</Text>
					<TouchableOpacity style={styles.upgradeBtn}>
						<Text style={styles.upgradeBtnText}>Upgrade Now</Text>
					</TouchableOpacity>
				</View>

				<OptionCard
					icon='download-outline'
					title='Downloads'
					subtitle='12 stories saved'
				/>
				<OptionCard
					icon='time-outline'
					title='Watch History'
					subtitle='Continue where you left off'
				/>
				<OptionCard
					icon='moon-outline'
					title='Dark Mode'
					subtitle='Softer for bedtime'
					rightElement={<Switch value={false} />}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.background },
	content: { padding: SPACING.lg, paddingBottom: 100 },
	sectionTitle: {
		...TYPOGRAPHY.headlineMd,
		color: COLORS.onSurface,
		marginBottom: SPACING.md,
	},
	profilesRow: { flexDirection: 'row', marginBottom: SPACING.xl },
	profileItem: { alignItems: 'center', marginRight: SPACING.lg },
	profileAvatar: {
		width: 80,
		height: 80,
		borderRadius: RADIUS.pill,
		overflow: 'hidden',
		...SHADOWS.card,
		backgroundColor: COLORS.surfaceContainer,
	},
	avatarImage: { width: '100%', height: '100%' },
	activeAvatar: { borderWidth: 4, borderColor: COLORS.primary },
	addAvatar: {
		borderWidth: 2,
		borderColor: COLORS.outlineVariant,
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeProfileText: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.primary,
		marginTop: 8,
		fontFamily: 'Quicksand-Bold',
	},
	profileText: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurfaceVariant,
		marginTop: 8,
	},
	premiumCard: {
		backgroundColor: '#ffd485',
		padding: SPACING.xl,
		borderRadius: RADIUS.lg,
		marginBottom: SPACING.xl,
	},
	premiumBadge: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255,255,255,0.5)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: RADIUS.pill,
		alignSelf: 'flex-start',
		marginBottom: SPACING.md,
		alignItems: 'center',
	},
	premiumBadgeText: { ...TYPOGRAPHY.labelCaps, color: COLORS.onSurface },
	premiumTitle: {
		...TYPOGRAPHY.headlineMd,
		color: COLORS.tertiary,
		marginBottom: 8,
	},
	premiumSubtitle: {
		...TYPOGRAPHY.bodyMd,
		color: COLORS.onTertiaryFixedVariant,
		marginBottom: SPACING.lg,
	},
	upgradeBtn: {
		backgroundColor: COLORS.onSurface,
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: RADIUS.pill,
		alignSelf: 'flex-start',
	},
	upgradeBtnText: {
		...TYPOGRAPHY.headlineSm,
		color: COLORS.onPrimary,
		fontSize: 16,
	},
	optionCard: {
		flexDirection: 'row',
		backgroundColor: COLORS.surface,
		padding: SPACING.lg,
		borderRadius: RADIUS.md,
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	optionIconContainer: {
		width: 48,
		height: 48,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.primaryFixed,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: SPACING.md,
	},
	optionTitle: {
		...TYPOGRAPHY.headlineSm,
		fontSize: 18,
		color: COLORS.onSurface,
	},
	optionSubtitle: { ...TYPOGRAPHY.bodyMd, color: COLORS.onSurfaceVariant },
});
