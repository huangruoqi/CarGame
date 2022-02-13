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
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import FinalScores from './FinalScores';

export default function Status({
	animate,
  color='white',
	toggle_pause
  // menu,
}) {

	const [loaded] = useFonts({
    Bomb: require('./bomb.ttf'),
  });
	const [score, setScore] = React.useState(0);
	const [animation_value, setAnimationValue] = React.useState(' ');
	const [paused, setPaused] = React.useState(false);

	// menu animation
	const progress = useSharedValue(0);
	const opacityProgress = useSharedValue(0);
	const rStyle_menu = useAnimatedStyle(() => (
		{
			opacity: opacityProgress.value,
			transform:[
				{ translateX: (1-progress.value)*500 },
				{ translateY: (1-progress.value)*-800 }
			]
		}	
	))

	// Score animation
	React.useEffect(() => {
		animate.current = (name, props) => {
			switch (name) {
				case 'score': {
					const {total, diff} = props;
					change_score(total, diff);
					break;
				}
				case 'coin': {

					break;
				}
			}	
		}
	}, [])

	function change_score(total, diff) {
		setAnimationValue((diff<=0?'':'+')+(diff==0?'':diff));
		setScore(total);
		score_animation_progress.value = withTiming(1, null, () => score_animation_progress.value = withTiming(0));
	}

	const score_animation_progress = useSharedValue(0);
	const rStyle_score = useAnimatedStyle(() => (
		{
			opacity: score_animation_progress.value,
			transform:[
				{ translateY: ((0.5-score_animation_progress.value)*10)**2 },
			]
		}	
	))

	if (!loaded) return null;
  return (
		<>
      <View style={styles.container}>
        <View style={styles.status}>
          <View style={{paddingTop: 4}}>
            <Text style={[styles.score, {color: color }]} >Score: {score}</Text>
						<Animated.View style={rStyle_score}>
							<Text style={[styles.score, {color: color }]}>          {animation_value}</Text>
						</Animated.View>
          </View>
          <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
								toggle_pause();
								setPaused(true);
							}}>
                <Ionicons name='pause' color={color} size={30} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
			{ paused &&
				<Pressable style={styles.pause_screen} onPress={() => {
					setPaused(false);
					toggle_pause();
				}}>
					<Text style={{fontSize: 50, color: color, fontFamily: 'Bomb'}}>Pause</Text>
					<Text style={{fontSize: 20, color: color, fontFamily: 'Bomb'}}>(Tap anywhere to continue)</Text>
				</Pressable>
			}
			</>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
		top:0,
		left: 0,
    width: "100%",
    height: 100,
    paddingTop: 30,
  },
	container2: {
    position: "absolute",
		top:0,
		left: 0,
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  status: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: "space-between",
  },
  score: {
    color: 'white',
    fontFamily: 'Bomb',
    fontSize: 30,
  },
  pause_screen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
		backgroundColor: "#000a",
		justifyContent: 'center',
		alignItems: 'center'
	}
});