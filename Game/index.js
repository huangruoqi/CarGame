import { Pressable } from 'react-native'
import * as React from 'react'
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useEffect } from "react";
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
	PCFSoftShadowMap,
	DirectionalLight,
	Clock
} from "three";
import Car from './GameObjects/Car.js'
import Obstacle from './GameObjects/Obstacle.js';
import Road from './GameObjects/Road.js'
import Animated, {
	useSharedValue,
	withTiming,
	withSpring
} from 'react-native-reanimated';
import MBox from './GameObjects/MeeseekBox.js';

export default function App() {
  let timeout;
	// const [lane, setLane] = React.useState({value: 0})
	const lane = useSharedValue(0)
	const carX = useSharedValue(0)
	const carR = useSharedValue(0)
	const clock = new Clock();

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
		renderer.shadowMap.enabled = true;
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

		// floor initialization
    const road = new Road('pavement', scene)

		// car and tree
		const o1  = new MBox('Tree', scene, [1.5,0.5,-7]);
		const	o2  = new MBox('Tree', scene, [-1.5,0.5,-4]);
		const obstacles = [o1, o2]
		const car = new Car('car', scene);

		// game logic here
    function update(dt) {
			for (let i = obstacles.length - 1; i >= 0; i--) {
				if (obstacles[i].update(dt)) {
					scene.remove(obstacles[i].obj)
					obstacles.splice(i, 1);
				};
			}
			if (obstacles.length < 3) {
				const new_o = new MBox('Tree', scene, [1.5*Math.floor(Math.random()*3-1),0.5,-30])
				obstacles.push(new_o)
			}
			if (car.obj && carX) car.obj.position.x = carX.value * 1.5
			if (car.obj) car.obj.rotation.y = carR.value * Math.PI / 9;
			road.update(dt);
			if (car.collision(obstacles)) {
				restart();
			}
    }

		function restart() {
			lane.value = 0;
			carX.value = 0;
			const a1 = new MBox('Tree', scene, [1.5,0.5,-28]);
			const a2 = new MBox('Tree', scene, [-1.5,0.5,-20]);
			const a3 = new MBox('Box', scene, [0,0.5,-10]);
			for (let i = obstacles.length - 1; i >= 0; i--) {
				scene.remove(obstacles[i].obj)
				obstacles.splice(i, 1)
			}
			obstacles.push(a1)
			obstacles.push(a2)
			obstacles.push(a3)
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
	); 
}
