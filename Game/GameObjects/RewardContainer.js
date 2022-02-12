import MBox from "./MeeseekBox";

const rw_list = [MBox] 
export default class ObstacleContainer {
	constructor(scene, generator) {
		this.rewards = [];
		this.scene = scene;
		this.generator = generator;
	}

	update(dt) {
		for(let i = this.rewards.length - 1; i >= 0; i--) {
			const oo = this.rewards[i];
			oo.update(dt);
			if (oo.obj) {
				oo.obj.position.z += 8 * dt;
				if (oo.obj.position.z > 25) {
					this.scene.remove(oo.obj);
					this.rewards.splice(i, 1);
				}
			}
		}
	}

	generate_new_reward(p) {
		const new_rw = new (randomItem(rw_list))(this.scene, this.generator, p);
		this.rewards.push(new_rw);
		return new_rw;
	}
}

function randomItem(items) {
	return items[Math.floor(Math.random()*items.length)]
}
