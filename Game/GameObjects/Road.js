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
		const road = Asset.fromModule(require(`../../assets/Game/Road.glb`))
		await road.downloadAsync();
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,2);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj);
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-3);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj);
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-8);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj)
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-13);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj)
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-18);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj)
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-23);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj)
			scene.add(obj)
		})
		loadGLTF(road).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0,-28);
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.objs.push(obj)
			scene.add(obj)
		})
	}

	update(dt) {
		this.objs.forEach(obj => {
			obj.position.z += 8*dt
			if (obj.position.z > 8)
				obj.position.z -= 35;
		})
	}
}