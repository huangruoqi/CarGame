import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Asset } from 'expo-asset';
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

export default class Road {
	constructor(name, scene) {
		this.name = name;
		this.obj = null;
		this.load(scene);
	}
	
	async load(scene){
		const car = Asset.fromModule(require(`../../assets/Game/Road.glb`))
		await car.downloadAsync();
		const loader = new GLTFLoader();
		loader.load(car.localUri, (gltf) => {
			const obj = gltf.scene;
			obj.position.set(0,0,0);
			obj.scale.setScalar(0.5);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.obj = obj;
			scene.add(obj)
		})
	}
}