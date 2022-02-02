import * as React from 'react'
import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Asset } from 'expo-asset';
import { useEffect } from "react";
import OrbitControlsView from 'expo-three-orbit-controls';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
	PCFSoftShadowMap,
	BasicShadowMap,
	VSMShadowMap,
	PCFShadowMap,
	DirectionalLight
} from "three";

export default function App() {
	const [c, setC] = React.useState(null);
  let timeout;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

		

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(0, 3.7,3.7);
		setC(camera)

    const scene = new Scene();
		let tree1,tree2;
		async function loadGLB() {
			const asset = Asset.fromModule(require('./Tree00.glb'))
			const car = Asset.fromModule(require('./car.glb'))
			await asset.downloadAsync();
			await car.downloadAsync();
			const loader = new GLTFLoader();
			loader.load(asset.localUri, (gltf) => {
				const obj = gltf.scene;
				obj.position.set(-1,0,-4);
				obj.scale.setScalar(1);
				obj.traverse(t => {
					if (t.isMesh){
						t.receiveShadow = true;
						t.castShadow = true;
					}
				})
				scene.add(obj);
				tree1 = obj;
			})
			loader.load(asset.localUri, (gltf) => {
				const obj = gltf.scene;
				obj.position.set(1,0,-7);
				obj.scale.setScalar(1);
				obj.traverse(t => {
					if (t.isMesh){
						t.receiveShadow = true;
						t.castShadow = true;
					}
				})
				scene.add(obj);
				tree2 = obj;
			})

			loader.load(car.localUri, (gltf) => {
				const obj = gltf.scene;
				obj.position.set(0,0.7,0);
				obj.scale.setScalar(0.35);
				obj.traverse(t => {
					if (t.isMesh){
						t.receiveShadow = true;
						t.castShadow = true;
					}
				})
				scene.add(obj);
			})
		}
		loadGLB();
		
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

	
    scene.add(dLight);

    

    const cube = new IconMesh();
    scene.add(cube);
		cube.position.set(0,-0.5,0);
		cube.receiveShadow = true;

    camera.lookAt(cube.position);
		dLight.lookAt(cube.position);

    function update() {
			if (tree1) {
				tree1.position.z+=0.08;
				if (tree1.position.z > 7) {
					tree1.position.z = -7;
					tree1.rotation.y = Math.PI * 2 * Math.random();
				}
			}

			if (tree2) {
				tree2.position.z+=0.08;
				if (tree2.position.z > 7) {
					tree2.position.z = -7;
					tree2.rotation.y = Math.PI * 2 * Math.random();
				}
			}
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
		<OrbitControlsView style={{ flex: 1 }} camera={c}>
			<GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
		</OrbitControlsView>
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
