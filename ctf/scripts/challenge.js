
// --- CHALLENGE.JS ---

function sanitize(input) {
    return input.replace(/[^a-zA-Z0-9_-]/g, '');
}

async function hashFlag(flag) {
    const encoder = new TextEncoder();
    const data = encoder.encode(flag);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkFlag() {
    const correctHash = document.querySelector('meta[name="hash"]').content;
    const input = document.getElementById('flag-input').value;
    const result = document.getElementById("result");
    const hashedInput = await hashFlag(input);

    if (hashedInput === correctHash) {
        result.textContent = "Correct!";
        result.style.color = "lime";
    } else {
        result.textContent = "Incorrect. Try again.";
        result.style.color = "red";
    }
}

document.querySelector("button").addEventListener("click", checkFlag);