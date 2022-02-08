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

export default class Obstacle {
	constructor(name, scene, p) {
		this.name = name;
		this.obj = null;
		this.load(scene,p);
	}
	
	async load(scene,p){
		const asset = Asset.fromModule(require(`../../assets/Game/Tree00.glb`))
		await asset.downloadAsync();
		const loader = new GLTFLoader();
		loadGLTF(asset).then( gltf => {
				const obj = gltf.scene;
				obj.position.set(p[0], p[1], p[2]);
				obj.rotation.y = Math.random()*2*Math.PI
				obj.traverse(t => {
					if (t.isMesh){
						t.receiveShadow = true;
						t.castShadow = true;
					}
				})
				this.obj = obj;
				scene.add(obj);
			})
	}

	update(dt) {
		const oo = this.obj;
		if (oo) {
			oo.position.z+=8*dt;
		}
		else {
			return false;
		}
		return oo.position.z>7;
	}
}