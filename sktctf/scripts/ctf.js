// --- CTF.JS ---
function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.id('art-bg');
    noFill();
    strokeWeight(1);
}
function draw() {
    stroke("white");
    background(0, 4);
    let centerX = width / 2;
    let centerY = height / 2;
    let layers = 8;
    let t = frameCount;
    for (let i = 0; i < layers; i++) {
        let radius = 200 + i * 70 + sin(t * 0.01 + i) * 100;
        beginShape();
        for (let j = 0; j < 6; j++) {
            let angle = TWO_PI / 3 * j + t * 0.005;
            let vx = centerX + cos(angle) * radius;
            let vy = centerY + sin(angle) * radius;
            vertex(vx, vy);
        }
        endShape(CLOSE);
    }
}
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}