import { Audio } from 'expo-av'
import { Asset } from 'expo-asset';

const sound_list = [
	{name: 'crash', path: require('../../assets/Music/crash.mp3')}
]

export default class Sound {
	constructor() {
		this.table = {};
		this.isLoaded = false;
		this.sounds = [];	
	}

	async preload() {
		const asset = Asset.fromModule(sound_list[0].path)
		await asset.downloadAsync();
		this.table['crash'] = asset;
	}

	async play(name) {
		const sound = new Audio.Sound();
		await sound.loadAsync(sound_list[0].path);
		await sound.playAsync();
		this.sounds.push(sound)
	}
}