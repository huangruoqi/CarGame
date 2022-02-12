export default class Car {
	constructor(scene, generator) {
		this.name = 'car'
		this.obj = generator.get('car');
		this.obj.position.set(0, 0.7, 2);
		this.obj.scale.setScalar(0.35);
		scene.add(this.obj);
		this.width = 0.8;
		this.length = 1.5;
	}
	
	collision(obstacles) {
		if (!this.obj) return undefined;
		for(let i = 0 ; i < obstacles.length; i++){
			if (!obstacles[i].obj) continue;
			if ((obstacles[i].width + this.width)/2 > Math.abs(this.obj.position.x - obstacles[i].obj.position.x)){
				if ((obstacles[i].length + this.length)/2 > Math.abs(this.obj.position.z - obstacles[i].obj.position.z)) {
					return i;
				}
			}
		}
		return undefined;
	}

}