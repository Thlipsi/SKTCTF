let canvas;
let ctx;
let frameCount = 0;
const mainColor = document.querySelector('meta[name="draw-color"]');
const hoverColor = document.querySelector('meta[name="hover-color"]');

if (mainColor) {
    document.documentElement.style.setProperty('--button-color', mainColor.content);
    document.documentElement.style.setProperty('--button-hover', hoverColor.content);
}
function setup() {
    canvas = document.createElement("canvas");
    canvas.id = "art-bg";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(draw);
}

function rgbaToHex(rgba) {
    if (typeof rgba !== "string") return "#FFFFFF"; // fallback or handle gracefully

    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (!match) return "#FFFFFF"; // fallback for invalid format

    const [, r, g, b, a = "1"] = match;
    const toHex = (n) => ("0" + parseInt(n).toString(16)).slice(-2);
    const alpha = Math.round(parseFloat(a) * 255);

    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}

function draw() {
    frameCount++;
    let pathParts = window.location.pathname.split("/");
    let category = "mainpage";

    // Try to extract from `/ctf/categories/<category>/...`
    let catIndex = pathParts.indexOf("categories");
    if (catIndex !== -1 && pathParts.length > catIndex + 1) {
        category = pathParts[catIndex + 1];
    }

    let drawColor = mainColor ? rgbaToHex(mainColor.content) : "#FFFFFF";
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 1.5;
    if (category === "introduction") {
        drawIntroduction(frameCount);
    }
    else if (category === "cryptography") {
        drawCryptography(frameCount);
    } else if (category === "enumeration") {
        drawEnumeration(frameCount);
    } else if (category === "forensics") {
        drawForensics(frameCount);
    } else if (category === "log_analysis") {
        drawLogAnalysis(frameCount);
    } else {
        drawMainPage(frameCount);
    }

    requestAnimationFrame(draw);
}

function drawIntroduction(t) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let rings = 10;

    for (let i = 0; i < rings; i++) {
        let radius = 50 + i * 80;
        let points = 12 + i * 2;
        ctx.beginPath();
        for (let j = 0; j <= points; j++) {
            let angle = (Math.PI * 2 * j) / points + (t * 0.01) + i;
            let wobble = Math.sin(t * 0.2 + j) * 5;
            let x = centerX + Math.cos(angle) * (radius + wobble);
            let y = centerY + Math.sin(angle) * (radius + wobble);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Rotating center dot
    ctx.beginPath();
    let pulse = Math.sin(t * 0.1) * 5; // smaller oscillation
    let radius = Math.max(2, 8 + pulse); // never go below 2
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

    ctx.stroke();
}

function drawCryptography(t) {
    if (t % 2 !== 0) {
        return;
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.005)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let d = 450;
    let x = canvas.width / 2 + Math.sin(t * 0.03) * d;
    let y = canvas.height / 2 + Math.sin(t * 0.03) * Math.cos(t * 0.03) * d;

    ctx.beginPath();
    ctx.moveTo(
        x + rand(-100, 100),
        y + rand(-100, 100)
    );
    ctx.lineTo(
        x + rand(-40, 40),
        y + rand(-40, 40)
    );
    ctx.lineTo(
        x + rand(-40, 40),
        y + rand(-40, 40)
    );
    ctx.closePath();
    ctx.stroke();
}

function drawEnumeration(t) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const xd = 550;
    const yd = 350;

    let x = canvas.width / 2 + -Math.sin(t * 0.02) * xd;
    let y = canvas.height / 2 + Math.sin(t * 0.03) * yd;
    ctx.strokeRect(x, y, 50, 50);

    x = canvas.width / 2 + -Math.sin((t + 250) * 0.02) * xd;
    y = canvas.height / 2 + Math.sin((t + 250) * 0.03) * yd;
    ctx.strokeRect(x, y, 50, 50);
}

function drawForensics(t) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const d = 450;
    let R = d;
    let r = d * 0.4;
    let a = d * 0.2;
    let angle = t * 0.02;

    for (let i = 0; i < 2; i++) {
        let angleOffset = i === 1 ? (3 * Math.PI) / 3 : 0; // apply 30 degree (PI/6 radians) offset to second one

        let x = canvas.width / 2 + (R - r) * Math.cos(angle + angleOffset) + a * Math.cos(((R - r) / r) * (angle));
        let y = canvas.height / 2 + (R - r) * Math.sin(angle + angleOffset) - a * Math.sin(((R - r) / r) * (angle));

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t * 0.05);

        ctx.beginPath();
        ctx.moveTo(-25, -25);
        ctx.lineTo(25, 25);
        ctx.moveTo(-25, 25);
        ctx.lineTo(25, -25);
        ctx.stroke();

        ctx.restore();
    }

}

function drawLogAnalysis(t) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let offset of [0, 200]) {
        let d = offset === 0 ? 400 : 200;
        let a = (t + offset) * 0.07;
        let x = canvas.width / 2 + ((t % 40) < 20 ? -d : d) * Math.sin(a);
        let y = canvas.height / 2 + ((t % 80) < 40 ? -d : d) * Math.cos(a);

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            let angle = (2 * Math.PI / 6) * i + t * 0.07;
            let vx = x + Math.cos(angle) * 90;
            let vy = y + Math.sin(angle) * 90;
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function drawMainPage(t) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let layers = 8;

    for (let i = 0; i < layers; i++) {
        let radius = 200 + i * 70 + Math.sin(t * 0.04 + i) * 100;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
            let angle = (2 * Math.PI / 3) * j + t * 0.005;
            let vx = centerX + Math.cos(angle) * radius;
            let vy = centerY + Math.sin(angle) * radius;
            if (j === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.stroke();
    }
}


function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "rgba(0,0,0,0)";
}

setup();
