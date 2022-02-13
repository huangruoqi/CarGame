import { Pressable, View } from 'react-native'
import * as React from 'react'
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Scene,
	PCFSoftShadowMap,
	DirectionalLight,
	Clock
} from "three";
import {
	useSharedValue,
	withTiming,
	withSpring
} from 'react-native-reanimated';
import GameContainer from './GameObjects/GameContainer.js';
import ObjectGenerator from './GameObjects/ObjectGenerator.js';
import Status from '../Status';

export default function App() {
  let timeout;
	const [g, setG] = React.useState(null);
	const lane = useSharedValue(0)
	const carX = useSharedValue(0)
	const carR = useSharedValue(0)
	const clock = new Clock();
	const animate = React.useRef(null);

  React.useEffect(() => clearTimeout(timeout), []);

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
		dLight.shadow.camera.left = -5;
		dLight.shadow.camera.right = 25;
		dLight.shadow.camera.top = 5;
		dLight.shadow.camera.bototm = -5;
		dLight.lookAt(0,0,0);
    scene.add(dLight);

		const plight = new PointLight(0xffffff, 0.5);
		plight.position.set(0,20,20);
		scene.add(plight);
		const plight2 = new PointLight(0xffffff, 0.5);
		plight2.position.set(0,2,20);
		scene.add(plight2);
		
		const game = new GameContainer(scene, new ObjectGenerator(), solve_collision)
		setG(game)

		function solve_collision(object) {
			game.score += object.score;
			game.score = Math.max(game.score, 0);
			switch (object.name) {
				case 'mbox': 
					animate.current('score', {total: game.score, diff: object.score})
					break;
				case 'tree': 
					animate.current('score', {total: game.score, diff: object.score})
					break;
			}
		}

    function update(dt) {
			if (!game.isPaused) {
				game.update(dt);	
			}
			game.setCarPosition(carX.value * 1.6);
			game.setCarRotation(carR.value * Math.PI / 9);
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
			const dt = clock.getDelta();
      update(dt);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
		render();
  };

	// user input logic
	const [pressX] = React.useState({value: 0})
  return (
		<View style={{flex: 1}}>
			<Pressable style={{ flex: 1 }} 
			onPressIn={(e) => {pressX.value = e.nativeEvent.pageX}}
			onPressOut={(e) => {
				if (e.nativeEvent.pageX<pressX.value&&lane.value>-1) {
					carX.value = withSpring(lane.value - 1)
					carR.value = withTiming(1, {duration:200}, () => carR.value = withTiming(0, {duration:200}))
					lane.value = lane.value - 1;
				}
				else if (e.nativeEvent.pageX>pressX.value&&lane.value<1){
					carX.value = withSpring(lane.value + 1)
					carR.value = withTiming(-1, {duration:200}, () => carR.value = withTiming(0, {duration:200}))
					lane.value = lane.value + 1;
				}
			}}
			>
				<GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
			</Pressable>
			<Status animate={animate} toggle_pause={_=>{if(g)g.isPaused=!g.isPaused}}></Status>
		</View>
	); 
}
