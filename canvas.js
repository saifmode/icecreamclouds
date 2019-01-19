// utilities: randomInt, distance, randomColor()
	let randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
	let distance = (x1, y1, x2, y2) => {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))};
	
// set up canvas
	let canvas = document.querySelector('canvas'); 
	let c = canvas.getContext('2d');
	canvas.width = innerWidth;
	canvas.height = innerHeight;
				let cellWidth = 100;
				let cellHeight = 100;
				let rows = canvas.height / cellWidth;
				let cols = canvas.width / cellHeight;
				let padding = 5;
				let radius = Math.min(cellWidth, cellHeight) / 2;
 //// Random colour palette generator
	let trans = 0.8; // sets palette transparency. for random transparency values, just do Math.random()
	let randomColorArray = [];
	let randomRange = Math.floor(Math.random()*153) + 100; // sets the range
	let randomMin = Math.floor(Math.random()*(256-randomRange)); // sets a minimum
	let paletteSize = ((canvas.height / cellWidth) * (canvas.width / cellHeight)); // sets a palette size

	for (let i = 0; i < paletteSize; i++) {
		// *** cool settings
		let colorFromRange = randomMin + Math.floor(Math.random()*randomRange);
		let staggeredColorFromRange = randomMin + (i*Math.round((randomRange/(paletteSize-1))));
		let inverseStaggered = randomMin + randomRange - (i*Math.round((randomRange/(paletteSize-1))));
		let rVal; let gVal; let bVal;
			const themes = {
			DarkGrey: 	`rgba(
						${inverseStaggered},
						${inverseStaggered},
						${inverseStaggered},
						${trans})`,
			LightGrey: `rgba(
						${staggeredColorFromRange},
						${staggeredColorFromRange},
						${staggeredColorFromRange},
						${trans})`,
			Blank:		`rgba(
						${'red'},
						${'green'},
						${'blue'},
						${trans})`,
			Ice: 		`rgba(
						${staggeredColorFromRange},
						${inverseStaggered},
						${150},
						${trans})`,
			Rusty: 		`rgba(
						${staggeredColorFromRange},
						${Math.floor(Math.random()*66)},
						${33},
						${trans})`,
			Random: 	`rgba(
						${randomMin + Math.floor(Math.random()*randomRange)},
						${randomMin + Math.floor(Math.random()*randomRange)},
						${randomMin + Math.floor(Math.random()*randomRange)},
						${trans})`, // random unlinked RGB values, but within the set range
			PureRandom: `rgba(
						${Math.floor(Math.random()*256)},
						${Math.floor(Math.random()*256)},
						${Math.floor(Math.random()*256)},
						${trans})` // random, ignores range
			};
		randomColorArray.push(themes.Ice); // change this to whatever theme :)
	}
	let randomColor = () => randomColorArray[randomInt(0, randomColorArray.length - 1)];
// animate!
	let ticker = 0;
	let tickerSpeed = 1;
	const animate = () => {
		requestAnimationFrame(animate);
		if (ticker % tickerSpeed === 0){
				c.clearRect(0, 0, canvas.width, canvas.height);
		

				for (let i = 0; i < rows; i++) {
					for (let j = 0; j < cols; j++) {
						c.save();
						
						c.translate(j * cellWidth, i * cellHeight);
						c.beginPath()
		
						let s = Math.sin(j * (ticker / 100)) * 0.25 + 0.75;
						c.arc(cellWidth / 2, cellHeight / 2, (radius*5 - padding) * s, 0, Math.PI * 2, false);
						c.fillStyle = randomColorArray[j * i];
						c.fill();
						c.closePath();
		
						c.restore();
					}
				}}
		

		ticker++;
	}

	animate();
