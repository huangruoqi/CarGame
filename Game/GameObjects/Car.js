import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Asset } from 'expo-asset';

export default class Car {
	constructor(name, scene) {
		this.name = name;
		this.obj = null;
		this.load(scene);
	}
	
	async load(scene){
		const car = Asset.fromModule(require(`../../assets/Game/car.glb`))
		await car.downloadAsync();
		const loader = new GLTFLoader();
		loader.load(car.localUri, (gltf) => {
			const obj = gltf.scene;
			obj.position.set(0,0.7,2);
			obj.scale.setScalar(0.35);
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