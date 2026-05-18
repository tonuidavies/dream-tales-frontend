// src/screens/VideoPlayerScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';

export default function VideoPlayerScreen({ route, navigation }) {
	const { story } = route.params;

	return (
		<View style={styles.container}>
			{/* Fake Video Player Background */}
			<Image
				source={{ uri: story.image }}
				style={styles.videoBackground}
				blurRadius={2}
			/>
			<View style={styles.overlay} />

			<View style={styles.header}>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => navigation.goBack()}>
					<Ionicons
						name='arrow-back'
						size={28}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>
				<View style={{ flex: 1, marginLeft: SPACING.md }}>
					<Text style={styles.title}>{story.title}</Text>
					<Text style={styles.subtitle}>STORYTIME • CHAPTER 2</Text>
				</View>
				<TouchableOpacity style={styles.subtitleBtn}>
					<Ionicons
						name='card-outline'
						size={20}
						color={COLORS.onPrimary}
						style={{ marginRight: 8 }}
					/>
					<Text style={styles.subtitleText}>SUBTITLES</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.centerControls}>
				<TouchableOpacity style={styles.seekBtn}>
					<Ionicons
						name='play-back'
						size={32}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.playPauseBtn}>
					<Ionicons
						name='pause'
						size={48}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.seekBtn}>
					<Ionicons
						name='play-forward'
						size={32}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.bottomControls}>
				<View style={styles.timeRow}>
					<Text style={styles.timeText}>04:20</Text>
					<Text style={styles.timeText}>12:45</Text>
				</View>
				<View style={styles.progressTrack}>
					<View style={[styles.progressFill, { width: '35%' }]} />
					<View style={styles.progressThumb}>
						<Ionicons
							name='star'
							size={12}
							color={COLORS.tertiary}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#000' },
	videoBackground: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
		opacity: 0.8,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: SPACING.lg,
		paddingTop: 60,
		position: 'absolute',
		top: 0,
		width: '100%',
	},
	iconButton: {
		width: 44,
		height: 44,
		borderRadius: RADIUS.pill,
		backgroundColor: 'rgba(255,255,255,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: { ...TYPOGRAPHY.headlineSm, color: COLORS.onPrimary },
	subtitle: { ...TYPOGRAPHY.labelCaps, color: 'rgba(255,255,255,0.7)' },
	subtitleBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: RADIUS.pill,
	},
	subtitleText: { ...TYPOGRAPHY.labelCaps, color: COLORS.onPrimary },
	centerControls: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 40,
	},
	seekBtn: {
		width: 64,
		height: 64,
		borderRadius: RADIUS.pill,
		backgroundColor: 'rgba(255,255,255,0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	playPauseBtn: {
		width: 100,
		height: 100,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
	},
	bottomControls: {
		position: 'absolute',
		bottom: 60,
		width: '100%',
		paddingHorizontal: SPACING.xl,
	},
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: SPACING.sm,
	},
	timeText: { ...TYPOGRAPHY.labelCaps, color: COLORS.onPrimary },
	progressTrack: {
		height: 8,
		backgroundColor: 'rgba(255,255,255,0.3)',
		borderRadius: RADIUS.pill,
		flexDirection: 'row',
		alignItems: 'center',
	},
	progressFill: {
		height: '100%',
		backgroundColor: COLORS.primaryContainer,
		borderRadius: RADIUS.pill,
	},
	progressThumb: {
		width: 24,
		height: 24,
		borderRadius: RADIUS.pill,
		backgroundColor: COLORS.yellow,
		position: 'absolute',
		left: '35%',
		transform: [{ translateX: -12 }],
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: '#fff',
	},
});
