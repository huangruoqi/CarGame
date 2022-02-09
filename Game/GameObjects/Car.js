import { Asset } from 'expo-asset';
import loadGLTF from "../utils.js";
export default class Car {
	constructor(name, scene) {
		this.name = name;
		this.obj = null;
		this.load(scene);
	}
	
	async load(scene){
		const car = Asset.fromModule(require(`../../assets/Game/car.glb`))
		await car.downloadAsync();
		loadGLTF(car).then(gltf => {
			const obj = gltf.scene;
			obj.position.set(0,0.7,2);
			obj.scale.setScalar(0.3);
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

	collision(obstacles) {
		if (!this.obj) return false;
		carBoundL = this.obj.position.x - 0.5;
		carBoundR = this.obj.position.x + 0.5;
		for(let i = 0 ; i < obstacles.length; i++){
			if (!obstacles[i].obj) continue;
			if(obstacles[i].obj.position.x >= carBoundL && obstacles[i].obj.position.x <= carBoundR && obstacles[i].obj.position.z >= 1.5 && obstacles[i].obj.position.z <= 2.5)
			{
				return true;
			}
		}
		return false;
	}

}