import { Button, View } from 'react-native'
import * as React from 'react'
import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Asset } from 'expo-asset';
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
	DirectionalLight
} from "three";
import Car from './GameObjects/Car.js'
import Obstacle from './GameObjects/Obstacle.js';
import Road from './GameObjects/Road.js'

export default function App() {
  let timeout;
	const [lane, setLane] = React.useState({value: 0})

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
    camera.position.set(0, 5,5);
    camera.lookAt(0,0,0);
    const scene = new Scene();

		// lighting
    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);
    let dLight = new DirectionalLight(0xffffff, 1);
		dLight.position.x += 0;
		dLight.position.y += 10;
		dLight.position.z += 20;
		dLight.castShadow=true;
		dLight.shadow.mapSize.width = 2048
		dLight.shadow.mapSize.height = 2048
		dLight.shadow.bias = -0.000035
		dLight.lookAt(0,0,0);
    scene.add(dLight);

		// floor initialization
    const cube = new IconMesh();
    scene.add(cube);
		cube.position.set(0,-0.5,0);
		cube.receiveShadow = true;
    // const road = new Road('pavement', scene)

		// car and tree
		// const o1  = new Obstacle('Tree', scene, [1,0,-7]);
		// const	o2  = new Obstacle('Tree', scene, [-1,0,-4]);
		// const obstacles = [o1, o2]
		const car = new Car('car', scene);

		// game logic here
    function update(dt) {
			// for (let i = obstacles.length - 1; i >= 0; i--) {
			// 	if (obstacles[i].update(dt)) {
			// 		scene.remove(obstacles[i].obj)
			// 		obstacles.splice(i, 1);
			// 	};
			// }
			// if (obstacles.length < 3) {
			// 	const new_o = new Obstacle('Tree', scene, [Math.floor(Math.random()*3-1),0,-7])
			// 	obstacles.push(new_o)
			// }
			if (car.obj && lane) car.obj.position.x = lane.value * 1.5
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
			const dt = 0;
      update(dt);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
		<View style={{ flex: 1 }} >
			<GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
			<View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 20}}>
				<Button title="left" onPress={() => {if (lane.value>-1) lane.value = lane.value - 1}} />
				<Button title="right" onPress={() => {if (lane.value<1) lane.value = lane.value + 1}} />
			</View>
		</View>
	); 
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(10, 1.0, 100),
      new MeshStandardMaterial({})
    );
  }
}
