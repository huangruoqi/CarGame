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
import loadGLTF from "../utils";

export default class Road {
	constructor(name, scene) {
		this.name = name;
		this.objs = [];
		this.load(scene);
	}
	
	async load(scene){
		const roads = [];
		const road = Asset.fromModule(require(`../../assets/Game/Road.glb`))
		await road.downloadAsync();
		for(let i = 0; i < 10; i++){
			const gltf = await loadGLTF(road);
			const obj = gltf.scene;
			obj.position.set(0,0,2-i*5);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			roads.push(obj);
		}
		for(let i = 0 ; i <10 ; i++){
			this.objs.push(roads[i]);
			scene.add(roads[i])
		}
	}

	update(dt) {
		this.objs.forEach(obj => {
			obj.position.z += 8*dt
			if (obj.position.z > 8)
				obj.position.z -= 40;
		})
	}
}