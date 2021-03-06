// obstacles
import Cone from "./Cone";
// rewards
import Coin from "./Coin";

const ob_list = [Cone] 
const rw_list = [Coin]
export default class ObjectContainer {
	constructor(scene, generator) {
		this.list = [];
		this.scene = scene;
		this.generator = generator;
	}

	update(dt, speed) {
		for(let i = this.list.length - 1; i >= 0; i--) {
			this.list[i].update(dt);
			const oo = this.list[i].obj;
			if (oo) {
				oo.position.z += 8 * speed * dt;
				if (oo.position.z > 12) this.remove(i);
			}
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