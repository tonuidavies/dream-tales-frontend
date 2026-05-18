// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
	const navigation = useNavigation();
	const floatAnim = useSharedValue(0);

	useEffect(() => {
		floatAnim.value = withRepeat(
			withSequence(
				withTiming(15, { duration: 2000 }),
				withTiming(0, { duration: 2000 }),
			),
			-1,
			true,
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: floatAnim.value }],
	}));

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#ffffff', COLORS.background]}
				style={StyleSheet.absoluteFill}
			/>

			<View style={styles.content}>
				<Animated.View style={[styles.imageContainer, animatedStyle]}>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop',
						}}
						style={styles.image}
					/>
					<View style={styles.glow} />
				</Animated.View>

				<Text style={styles.title}>DreamTales</Text>
				<Text style={styles.subtitle}>
					Where magical adventures begin before the stars come out.
				</Text>

				<PrimaryButton
					title='Start Journey'
					icon='arrow-forward'
					onPress={() => navigation.replace('MainTabs')}
					style={styles.button}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	content: { alignItems: 'center', padding: SPACING.xl, width: '100%' },
	imageContainer: {
		width: 200,
		height: 200,
		marginBottom: SPACING.xxl,
		borderRadius: RADIUS.xl,
		shadowColor: COLORS.yellow,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		shadowRadius: 30,
		elevation: 10,
	},
	image: { width: '100%', height: '100%', borderRadius: RADIUS.xl },
	title: {
		...TYPOGRAPHY.displayLg,
		color: COLORS.primary,
		marginBottom: SPACING.md,
	},
	subtitle: {
		...TYPOGRAPHY.bodyLg,
		color: COLORS.onSurfaceVariant,
		textAlign: 'center',
		marginBottom: SPACING.xxl,
	},
	button: { width: '100%', marginTop: SPACING.xl },
});
