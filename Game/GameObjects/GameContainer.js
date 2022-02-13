import ObjectContainer from './ObjectContainer.js'
import Road from './Road.js';
import Car from './Car.js';
import patterns from './Patterns.js'

export default class GameContainer {
	constructor(scene, generator, solve_collision) {
		this.scene = scene;
		this.isPaused = true;
		generator.preload().then(() => {
			this.road = new Road(this.scene, generator);
			this.car = new Car(this.scene, generator);
			this.oc = new ObjectContainer(this.scene, generator)
			this.isPaused = false;
		})
		this.speed = 1;
		this.timeElapsed = 0;
		this.patternCount = 0;
		this.score = 0;
		this.solve_collision = solve_collision;
	}

	update(dt) {
		this.road.update(dt, this.speed);
		this.oc.update(dt, this.speed);
		// generate new objects
		this.timeElapsed+=dt;
		if (this.timeElapsed > 2) {
			this.timeElapsed = 0;
			const level = this.getLevel(this.patternCount)
			this.add_pattern(level);
			this.speed = 1 + level * 0.1;
			this.patternCount++;
		}
		// handle collision
		const obj_index = this.car.collision(this.oc.list);
		if (obj_index!=undefined) {
			this.solve_collision(this.oc.list[obj_index])
			this.oc.remove(obj_index)
		}
	}

	add_pattern(level) {
		const random_index = Math.floor(Math.random() * patterns[level].length)
		const items = patterns[level][random_index];
		for (let i = 0; i < items.length; i++) {
			switch (items[i]) {
				case 'o': 
					this.oc.generate_new_obstacle([(i % 3 - 1) * 1.5, 0.5, -30 - 2 * (Math.floor(i / 3))]);
					break;
				case 'r':
					this.oc.generate_new_reward([(i % 3 - 1) * 1.5, 0.5, -30 - 2 * (Math.floor(i / 3))]);
					break;
			}
		}
	}

	getLevel(x) {
		if (x > 100) return 0;
		return Math.floor(Math.pow(x/1.5, 0.3))+1;
	}

	setCarPosition(x) { if (this.car) this.car.obj.position.x = x; }
	setCarRotation(y) { if (this.car) this.car.obj.rotation.y = y; }
}