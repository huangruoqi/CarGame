export default class Road {
	constructor(scene, generator) {
		this.roads = []
		this.bgs = []
		this.d = -1;
		this.timeElapsed = 0;
		for(let i = 0; i < 12; i++){
			const obj = generator.get('road');
			obj.position.set(0,0,2-i*5);
			this.roads.push(obj)
		}
		
		for (let i = 0; i < 2; i++) {
			const obj = generator.get('bg');
			obj.position.set(0,-1.5,2-i*50);
			this.bgs.push(obj)
		}
		this.roads.forEach(e=>scene.add(e))
		this.bgs.forEach(e=>scene.add(e))
	}

	update(dt, speed) {
		this.roads.forEach(obj => {
			obj.position.z += 8 * speed * dt
			if (obj.position.z > 12)
				obj.position.z -= 35;
		})
		this.timeElapsed+=dt;
		if (this.timeElapsed > 1.5) {
			this.timeElapsed = 0;
			this.d*=-1;
		}

		this.bgs.forEach((obj) => {
			obj.position.z += 8 * speed * dt;
			obj.position.y += speed * dt * this.d / 1.5;
			if (obj.position.z > 30) {
				obj.position.z -=100;
			}
		})
	}
}