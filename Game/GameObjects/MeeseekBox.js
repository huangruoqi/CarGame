export default class Mbox {
	constructor(scene, generator, p) {
		this.obj = generator.get('mbox');
		this.obj.position.set(p[0], p[1], p[2]);
		this.obj.scale.setScalar(0.8)
		this.obj.rotation.y = Math.random()*2*Math.PI;
		scene.add(this.obj);
	}

	update(dt) {
		this.obj.rotation.y += 4*dt;
	}
}