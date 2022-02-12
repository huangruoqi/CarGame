export default class Tree {
	constructor(scene, generator, p) {
		this.name = 'tree'
		this.obj = generator.get('tree');
		this.obj.position.set(p[0], p[1], p[2]);
		this.obj.rotation.y = Math.random()*2*Math.PI;
		scene.add(this.obj);
		this.width = 0.2;
		this.length = 0.2;
		this.score = -200;
	}

	update(dt) {
	}
}