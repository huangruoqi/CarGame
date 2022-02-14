import { Asset } from 'expo-asset';
import { alignMesh } from 'expo-three/build/utils';
import loadGLTF from '../utils';

const object_list = [
	{name: 'tree', path: require('../../assets/Game/Tree00.glb')},
	{name: 'car', path: require('../../assets/Game/car.glb')},
	{name: 'road', path: require('../../assets/Game/Road.glb')},
	{name: 'mbox', path: require('../../assets/Game/Mbox.glb')},
	{name: 'coin', path: require('../../assets/Game/coin.glb')},
	{name: 'cone', path: require('../../assets/Game/cone.glb')}
]

export default class ObjectGenerator {
	constructor() {
		this.table = {};
		this.isLoaded = false;
	}

	async preload() {
		for (let i = 0; i < object_list.length; i++) {
			const asset = Asset.fromModule(object_list[i].path)
			await asset.downloadAsync();
			const gltf = await loadGLTF(asset)	
			const obj = gltf.scene;
			obj.traverse(t => {
				if (t.isMesh){
					t.receiveShadow = true;
					t.castShadow = true;
				}
			})
			this.table[object_list[i].name] = obj;
		}
		this.isLoaded = true;
	}

	get(name) {
		if (!this.isLoaded) return null;
		return this.table[name].clone();
	}
}