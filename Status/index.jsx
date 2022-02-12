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
  // replay,
  // menu,
}) {
  
  // const [open, setOpen] = React.useState(false);
	const [score, setScore] = React.useState(0);
	const [animation_value, setAnimationValue] = React.useState(' ');
	// const [closeButton, setCloseButton] = React.useState(false);
	const [loaded] = useFonts({
    Bomb: require('./bomb.ttf'),
  });

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
          <View>
            <Text style={[styles.score, {color: color }]} >Score: {score}</Text>
						<Animated.View style={rStyle_score}>
							<Text style={[styles.score, {color: color }]}>          {animation_value}</Text>
						</Animated.View>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            {replay && 
              <TouchableOpacity onPress={replay}>
                <Ionicons name='reload' style={styles.replay} color={color} size={30} />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => { 
							progress.value = withSpring(1); 
							opacityProgress.value = withTiming(1); 
							setOpen(true);
							setCloseButton(true);
						}} >
              <Ionicons name='list' style={styles.menu_icon} color={color} size={30} />
            </TouchableOpacity>
          </View> */}
        </View>
        
      </View>
				{/* {open && (
						<View style={styles.fullscreen} >
							<View style={styles.outter}>
								<Animated.View style={[styles.menu_container, rStyle_menu]}>
									{menu}
								</Animated.View>
								{ closeButton &&
									<TouchableOpacity style={styles.close_icon} onPress={() => { 
										progress.value = 0;
										opacityProgress.value = 0;
										setOpen(false)
										setCloseButton(false);
									}}>
										<Text style={{color: color, fontFamily: 'Bomb', fontSize: 38}}>x</Text>
									</TouchableOpacity>
								}
							</View>
						</View>
					)} */}
				
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
  replay: {
    paddingRight:10
  },
  menu_icon: {
    fontFamily: 'Bomb',
  },
  fullscreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
		backgroundColor: "#000a"
  },
  outter: {
    flex: 1,
  },
  menu_container: {
    flex: 1,
    marginTop: 120,
    marginBottom: 90,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    overflow: 'hidden'
  },
  close_icon: {
    position: 'absolute',
    top: 130,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});