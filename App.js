import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from './src/navigation/RootNavigator';

// Import the specific font weights we need
import {
	useFonts,
	Quicksand_500Medium,
	Quicksand_600SemiBold,
	Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

// Keep the splash screen visible while we fetch the fonts
SplashScreen.preventAutoHideAsync();

export default function App() {
	// Load the fonts and map them to our custom names
	const [fontsLoaded, fontError] = useFonts({
		'Quicksand-Medium': Quicksand_500Medium,
		'Quicksand-SemiBold': Quicksand_600SemiBold,
		'Quicksand-Bold': Quicksand_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			// Hide the splash screen once fonts are ready
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	// Prevent rendering until the fonts are ready
	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar
					style='dark'
					translucent
					backgroundColor='transparent'
				/>
				<RootNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
