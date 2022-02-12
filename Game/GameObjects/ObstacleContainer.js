import MBox from "./MeeseekBox";
import Tree from "./Tree";

const ob_list = [Tree] 
export default class ObstacleContainer {
	constructor(scene, generator) {
		this.obstacles = [];
		this.scene = scene;
		this.generator = generator;
	}

	update(dt) {
		for(let i = this.obstacles.length - 1; i >= 0; i--) {
			const oo = this.obstacles[i];
			oo.update(dt);
			if (oo.obj) {
				oo.obj.position.z += 8 * dt;
				if (oo.obj.position.z > 25) {
					this.scene.remove(oo.obj);
					this.obstacles.splice(i, 1);
				}
			}
		}
	}

	generate_new_obstacle(p) {
		const new_ob = new (randomItem(ob_list))(this.scene, this.generator, p)
		this.obstacles.push(new_ob)
		return new_ob
	}
}

function randomItem(items) {
	return items[Math.floor(Math.random()*items.length)]
}