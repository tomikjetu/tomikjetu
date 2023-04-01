rand = n => n * Math.random();
randRange = n => n - rand(2 * n);
const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return  Math.abs((t + hm) % m - hm) / (hm);
};
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;