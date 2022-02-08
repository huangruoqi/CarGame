import { resolveAsync } from 'expo-asset-utils';
import { FileSystem } from 'react-native-unimodules';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { decode } from 'base64-arraybuffer';

export default async function loadGLTF(asset) {
	return await loadGLTFAsync({asset});
}

async function loadFileAsync({ asset, funcName }) {
		if (!asset) {
			throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
		}
		return (await resolveAsync(asset)).localUri ?? null;
	}

async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
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