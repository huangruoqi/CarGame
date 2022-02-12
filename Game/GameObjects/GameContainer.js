import ObjectContainer from './ObjectContainer.js'
import Road from './Road.js';
import Car from './Car.js';

/**
 * object format
 * o -> obstacle
 * r -> reward
 * . -> blank
	'123456...' ->
	123
	456
	...
**/
const patterns = [
	['...'],
	['o..', '.o.', '..o', '.r.'], // level 1
	['o..r..', 'r..o..', '.o..r.', '.r..o.', '..o..r', '..r..o', 'rrr.o.'], // level 2
	[], // level 3
	[]  // ... 
];

export default class GameContainer {
	constructor(scene, generator, solve_collision) {
		this.scene = scene;
		this.isLoaded = false;
		generator.preload().then(() => {
			this.road = new Road(this.scene, generator);
			this.car = new Car(this.scene, generator);
			this.oc = new ObjectContainer(this.scene, generator)
			this.isLoaded = true;
		})
		this.timeElapsed = 0;
		this.score = 0;
		this.solve_collision = solve_collision;
	}

	update(dt) {
		this.road.update(dt);
		this.oc.update(dt);
		// generate new objects
		this.timeElapsed+=dt;
		if (this.timeElapsed > 3) {
			this.timeElapsed = 0;
			this.add_pattern(2);
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
					this.oc.generate_new_obstacle([(i % 3 - 1) * 1.5, 0.5, -40 - 3 * (Math.floor(i / 3))]);
					break;
				case 'r':
					this.oc.generate_new_reward([(i % 3 - 1) * 1.5, 0.5, -40 - 3 * (Math.floor(i / 3))]);
					break;
			}
		}
	}

	setCarPosition(x) { this.car.obj.position.x = x; }
	setCarRotation(y) { this.car.obj.rotation.y = y; }
}