import * as React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Pressable 
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import Animated, { 
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function FinalScores({list, close}) {
	const progress = useSharedValue(0);
	const [blinkShown, setBlinkShown] = React.useState(false)
	const rStyle_left = useAnimatedStyle(() => (
		{
			transform: [
				{translateX: (1-progress.value) * -200}
			]
		}
	))
	const rStyle_right = useAnimatedStyle(() => (
		{
			transform: [
				{translateX: (1-progress.value) * 200}
			]
		}
	))
	const rStyle_title = useAnimatedStyle(() => (
		{
			transform: [
				{scale: progress.value * 1.2}
			]
		}
	))

	React.useEffect(() => {
		progress.value = withTiming(1, {duration: 1000})
	}, [])

	return (
		<Pressable 
		style={styles.container}
		onPress={close}
		>
			{
				list.map((e, i) => 
					<Animated.View key={i} style={i == 0 ? rStyle_title : (Math.random() < 0.5 ? rStyle_left : rStyle_right)}>
						<Display str={e} />
					</Animated.View>
				)
			}
			<Blink text='Tap anywhere to continue'></Blink>
		</Pressable>
	)
}

function Display({str}) {
	if (str === "/") {
		return (
			<View style={styles.line}/>
		)
	}
	if(str.slice(0,3) === "INT") {
		const a = str.split('/');
		return (
			<View style={styles.integer_container}>
				<Text style={styles.regular_text}>{a[1]}</Text>
				<Text style={styles.regular_text}>{a[2]}</Text>
			</View>
		)
	}
	if (str.slice(0,5) === "TITLE") {
		return (
			<View style={{alignItems: 'center', margin: 20}}>
				<Text style={styles.title_text}>{str.slice(5)}</Text>
			</View>
		)
	}
	return (
		<Text style={styles.regular_text}>{str}</Text>
	)
}

function Blink({text}) {
	const progress = useSharedValue(0.4);
	React.useEffect(() => {
		progress.value = withRepeat(withTiming(1), -1, true);
	}, [])
	const rStyle = useAnimatedStyle(() => (
		{
			opacity: progress.value,
			transform: [
				{translateY: (0.5 - progress.value) * 8}
			]
		}
	))
	return(
		<Animated.View style={[{flex: 1, justifyContent:'center', alignItems: 'center'}, rStyle]}>
			<Text style={styles.tiny_text}>{text}</Text>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: '#fffffff8',
		padding: 20,
    paddingTop: 30,
	},
	line: {
		width: "100%",
		height: 5,
		backgroundColor: '#000'
	},
	title_text: {
    color: 'black',
    fontFamily: 'Bomb',
    fontSize: 40
  },
  regular_text: {
    color: 'black',
    fontFamily: 'Bomb',
    fontSize: 30
  },
	tiny_text: {
    color: 'black',
    fontFamily: 'Bomb',
    fontSize: 20
	},
	integer_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	},
});