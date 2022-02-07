import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Asset } from 'expo-asset';
import { loadObjAsync, loadTextureAsync } from 'expo-three';
import { resolveAsync } from 'expo-asset-utils';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { FileSystem } from 'react-native-unimodules';
import { decode } from 'base64-arraybuffer';
export default class Car {
	constructor(name, scene) {
		this.name = name;
		this.obj = null;
		this.load(scene);
	}
	
	async load(scene){
		const car = Asset.fromModule(require(`../../assets/Game/car.glb`))
		await car.downloadAsync();
		// console.log(car.localUri)
		// const loader = new GLTFLoader();
		// loader.load(car.localUri, (gltf) => {
		this.loadGLTFAsync({asset: car}).then(gltf => {
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

	async loadFileAsync({ asset, funcName }) {
		if (!asset) {
			throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
		}
		return (await resolveAsync(asset)).localUri ?? null;
	}

	async loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await this.loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      result => {
        resolve(result);
      },
      err => {
        reject(err);
      },
    );
  });
	}


}