export default class Cone {
	constructor(scene, generator, p) {
		this.name = 'cone'
		this.obj = generator.get('cone');
		this.obj.position.set(p[0], 0.75, p[2]);
		this.obj.rotation.y = Math.random()*2*Math.PI;
		scene.add(this.obj);
		this.width = 0.2;
		this.length = 0.2;
		this.score = 0;
		this.coin = -5;
	}

	update(dt) {
	}
}