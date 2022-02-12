export default class Car {
	constructor(scene, generator) {
		this.obj = generator.get('car');
		this.obj.position.set(0, 0.7, 2);
		this.obj.scale.setScalar(0.3);
		this.obj.rotation.y = Math.random()*2*Math.PI;
		scene.add(this.obj);
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