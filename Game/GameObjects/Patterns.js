/**
 * object format
 * o -> obstacle
 * r -> reward
 * . -> blank
 *	[
			'or.',
			'r..',
			'...',
		]
**/
const level_0 = [
	['...'],
]
const level_1 = [
	['o..'], 
	['.o.'], 
	['..o'],
]
const level_2 = [
	[
		'o..',
		'r..', 
	],
	[
		'r..',
		'o..', 
	],
	[
		'.o.',
		'.r.', 
	],
	[
		'.r.',
		'.o.', 
	],
	[
		'..o',
		'..r', 
	],
	[
		'..r',
		'..o', 
	],
	[
		'rrr',
		'.o.',
	]
]
const level_3 = [
	[
		'r..',
		'...',
		'oo.',
		'.o.',
		'...',
		'..o'
	],
]
const level_4 = [
	[
		'...',
	],
]
const level_5 = [
	[
		'...',
	],
]
const level_6 = [
	[
		'...',
	],
]

const patterns = [
	level_0,
	level_1, 
	level_2,
	level_3,
	level_4,
	level_5,
	level_6,
]




export default patterns.map((level) => level.map((line) => line.join('')))