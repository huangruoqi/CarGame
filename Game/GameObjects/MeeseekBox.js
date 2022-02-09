import { Asset } from 'expo-asset';
import loadGLTF from "../utils";

export default class MBox {
	constructor(name, scene, p) {
		this.name = name;
		this.obj = null;
		this.load(scene,p);
	}
	
	async load(scene,p){
		const asset = Asset.fromModule(require(`../../assets/Game/Mbox.glb`))
		await asset.downloadAsync();
		loadGLTF(asset).then( gltf => {
				const obj = gltf.scene;
				obj.position.set(p[0], p[1], p[2]);
				// obj.rotation.y = Math.random()*2*Math.PI
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
			oo.rotation.y+=dt;
		}
		else {
			return false;
		}
		return oo.position.z>7;
	}
}