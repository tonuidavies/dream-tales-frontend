import React, { useRef, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';

export default function VideoPlayerScreen({ route, navigation }) {
	const { story } = route.params;
	const videoRef = useRef(null);
	const [status, setStatus] = useState({});

	// Formatting milliseconds into MM:SS for your UI
	const formatTime = (millis) => {
		if (!millis) return '00:00';
		const totalSeconds = Math.floor(millis / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	// Video Controls
	const handlePlayPause = () => {
		if (status.isPlaying) {
			videoRef.current.pauseAsync();
		} else {
			videoRef.current.playAsync();
		}
	};

	const handleSeek = (direction) => {
		if (status.positionMillis !== undefined) {
			// Seek forward or backward by 10 seconds
			const seekAmount = 10000;
			const newPosition =
				direction === 'forward'
					? status.positionMillis + seekAmount
					: Math.max(0, status.positionMillis - seekAmount);
			videoRef.current.setPositionAsync(newPosition);
		}
	};

	// Calculate progress bar percentage
	const progressPercent = status.durationMillis
		? (status.positionMillis / status.durationMillis) * 100
		: 0;

	return (
		<View style={styles.container}>
			{/* REAL VIDEO PLAYER (Local Machine File) */}
			<Video
				ref={videoRef}
				style={styles.videoBackground}
				// 👇 THIS LOADS THE VIDEO FROM YOUR LOCAL COMPUTER 👇
				source={require('../../assets/david_story.mp4')}
				useNativeControls={false}
				resizeMode={ResizeMode.COVER}
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
				shouldPlay // Auto-play when screen opens
			/>

			{/* Dark gradient overlay so controlrs are visible */}
			<View style={styles.overlay} />

			{/* Top Header */}
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
					<Text style={styles.title}>
						{story?.title || 'The Brave Shepherd'}
					</Text>
					<Text style={styles.subtitle}>STORYTIME • BIBLE STORIES</Text>
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

			{/* Center Play/Pause & Seek Controls */}
			<View style={styles.centerControls}>
				<TouchableOpacity
					style={styles.seekBtn}
					onPress={() => handleSeek('backward')}>
					<Ionicons
						name='play-back'
						size={32}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.playPauseBtn}
					onPress={handlePlayPause}>
					<Ionicons
						name={status.isPlaying ? 'pause' : 'play'}
						size={48}
						color={COLORS.onPrimary}
						style={!status.isPlaying ? { marginLeft: 6 } : {}} // visually center the play icon
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.seekBtn}
					onPress={() => handleSeek('forward')}>
					<Ionicons
						name='play-forward'
						size={32}
						color={COLORS.onPrimary}
					/>
				</TouchableOpacity>
			</View>

			{/* Bottom Progress Bar */}
			<View style={styles.bottomControls}>
				<View style={styles.timeRow}>
					<Text style={styles.timeText}>
						{formatTime(status.positionMillis)}
					</Text>
					<Text style={styles.timeText}>
						{formatTime(status.durationMillis)}
					</Text>
				</View>
				<View style={styles.progressTrack}>
					{/* Dynamic Width based on video progress */}
					<View
						style={[styles.progressFill, { width: `${progressPercent}%` }]}
					/>

					{/* Dynamic Thumb Position */}
					<View style={[styles.progressThumb, { left: `${progressPercent}%` }]}>
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
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darkened for beautiful contrast
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
		backgroundColor: 'rgba(255,255,255,0.2)',
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
		transform: [{ translateX: -12 }], // Keeps the star centered on the line tip
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: '#fff',
	},
});
