import { Pressable, View } from 'react-native'
import * as React from 'react'
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useEffect } from "react";
import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
	PCFSoftShadowMap,
	DirectionalLight,
	Clock
} from "three";
import Animated, {
	useSharedValue,
	withTiming,
	withSpring
} from 'react-native-reanimated';
import GameContainer from './GameObjects/GameContainer.js';
import ObjectGenerator from './GameObjects/ObjectGenerator.js';
import Status from '../Status';

export default function App() {
  let timeout;
	const lane = useSharedValue(0)
	const carX = useSharedValue(0)
	const carR = useSharedValue(0)
	const clock = new Clock();
	const animate = React.useRef(null);

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    // Create a WebGLRenderer without a DOM element
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);
		// renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(0, 6,6);
    camera.lookAt(0,0,0);
    const scene = new Scene();

		// lighting
    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);
    let dLight = new DirectionalLight(0xffffff, 1);
		dLight.position.x += 20;
		dLight.position.y += 10;
		dLight.position.z += -10;
		dLight.castShadow=true;
		dLight.shadow.mapSize.width = 2048
		dLight.shadow.mapSize.height = 2048
		dLight.shadow.bias = -0.000035
		dLight.lookAt(0,0,0);
    scene.add(dLight);

		const plight = new PointLight(0xffffff, 0.5);
		plight.position.set(0,20,20);
		scene.add(plight);
		const plight2 = new PointLight(0xffffff, 0.5);
		plight2.position.set(0,2,20);
		scene.add(plight2);

		// Game preload
		const generator = new ObjectGenerator();	
		let game;
		
		let score = 0;
		// game logic here
		let isLoaded = false;
    function update(dt) {
			if (!isLoaded) {
				if (generator.isLoaded) {
					game = new GameContainer(scene, generator);
					isLoaded = true;
				}
			}
			if (game) game.update(dt);	

			// will clean up later
			const car = game ? game.car:null;
			if (car && car.obj && carX) car.obj.position.x = carX.value * 1.5
			if (car && car.obj) car.obj.rotation.y = carR.value * Math.PI / 9;
			if (car && car.collision(game.oc.obstacles)!=undefined) {
				restart();
			}
			if (car) {
				const b = car.collision(game.rc.rewards)
				if (b != undefined) {
					score += 100;
					addScore(score, 100);
					game.rc.remove(b)
				}
			}
    }

		function restart() {
			lane.value = 0;
			carX.value = 0;
			score = 0;
			animate.current(score, -1)
		}

		function addScore(score, add) {
			animate.current(score, add)
		}

    // Setup an animation loop
    const render = (now) => {
      timeout = requestAnimationFrame(render);
			const dt = clock.getDelta();
      update(dt);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
		render();
  };

	const [pressX] = React.useState({value: 0})

  return (
		<View style={{flex: 1}}>
			<Pressable style={{ flex: 1 }} 
			onPressIn={(e) => {pressX.value = e.nativeEvent.pageX}}
			onPressOut={(e) => {
				if (e.nativeEvent.pageX<pressX.value&&lane.value>-1) {
					// carX.value = withTiming(lane.value - 1, {duration: 500*(1-lane.value+carX.value)});
					carX.value = withSpring(lane.value - 1)
					lane.value = lane.value - 1;
					carR.value = withTiming(1, {duration:200}, () => carR.value = withTiming(0, {duration:200}))
				}
				else if (e.nativeEvent.pageX>pressX.value&&lane.value<1){
					// carX.value = withTiming(lane.value + 1, {duration: 500*(1+lane.value-carX.value)});
					carX.value = withSpring(lane.value + 1)
					lane.value = lane.value + 1;
					carR.value = withTiming(-1, {duration:200}, () => carR.value = withTiming(0, {duration:200}))
				}
			}}
			>
				<GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
			</Pressable>
			<Status animate={animate}></Status>
		</View>
	); 
}
