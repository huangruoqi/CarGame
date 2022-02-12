export default class Road {
	constructor(scene, generator) {
		this.objs = []
		for(let i = 0; i < 10; i++){
			const obj = generator.get('road');
			obj.position.set(0,0,2-i*5);
			this.objs.push(obj)
		}
		for (let i = 0; i < 10; i++) {
			scene.add(this.objs[i]);
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