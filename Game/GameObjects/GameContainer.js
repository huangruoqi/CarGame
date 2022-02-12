import ObstacleContainer from './ObstacleContainer.js'
import RewardContainer from './RewardContainer.js'
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
]

export default class GameContainer {
	constructor(scene, generator) {
		this.scene = scene;
		this.road = new Road(this.scene, generator);
		this.car = new Car(this.scene, generator);
		this.oc = new ObstacleContainer(this.scene, generator)
		this.rc = new RewardContainer(this.scene, generator)
		this.timeElapsed = 0;
	}

	update(dt) {
		this.timeElapsed+=dt;
		this.road.update(dt);
		this.oc.update(dt);
		this.rc.update(dt);
		// this.car.update(dt);
		if (this.timeElapsed > 3) {
			this.timeElapsed = 0;
			this.add_pattern(2);
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
					this.rc.generate_new_reward([(i % 3 - 1) * 1.5, 0.5, -40 - 3 * (Math.floor(i / 3))]);
					break;
			}
		}
	}

}