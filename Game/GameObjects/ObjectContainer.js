// obstacles
import Tree from "./Tree";
// rewards
import MBox from "./MeeseekBox";

const ob_list = [Tree] 
const rw_list = [MBox]
export default class ObjectContainer {
	constructor(scene, generator) {
		this.list = [];
		this.scene = scene;
		this.generator = generator;
	}

	update(dt) {
		for(let i = this.list.length - 1; i >= 0; i--) {
			const oo = this.list[i].obj;
			if (oo) {
				oo.position.z += 8 * dt;
				if (oo.position.z > 25) this.remove(i);
			}
			this.list[i].update(dt);
		}
	}

	generate_new_obstacle(p) { this.list.push(new (randomItem(ob_list))(this.scene, this.generator, p)); }
	generate_new_reward(p) { this.list.push(new (randomItem(rw_list))(this.scene, this.generator, p)); }

	remove(i) {
		this.scene.remove(this.list[i].obj);
		this.list.splice(i, 1);
	}
}

function randomItem(items) {
	return items[Math.floor(Math.random()*items.length)]
}