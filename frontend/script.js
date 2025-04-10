const paragraphs = [
    "You cannot enter here. Go back to the abyss prepared for you! Go back! Fall into the nothingness that awaits you and your master!",
    "Home is behind, the world ahead,\n" +
    "and there are many paths to tread\n" +
    "through shadows to the edge of night,\n" +
    "until the stars are all alight.",
    "How do you pick up the threads of an old life? How do you go on, when in your heart, you begin to understand, " +
    "there is no going back? There are some things that time cannot mend, some hurts that go too deep that have taken hold.",
    "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.",
    "Far over the misty mountains cold\n" +
    "To dungeons deep and caverns old\n" +
    "We must away ere break of day\n" +
    "To seek the pale enchanted gold."
];

let target;
let startTime;
let countdownInterval;

function startTest() {
    const input = document.getElementById("input");
    const countdownDisplay = document.getElementById("countdown");
    const promptElement = document.getElementById("prompt");
    input.value = "";
    input.disabled = true;

    target = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    promptElement.innerText = target;

    let countdown = 3;
    countdownDisplay.innerText = countdown;

    countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.innerText = countdown;
        countdownDisplay.classList.add('countdown-animation');
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerText = "Go!";
            input.disabled = false;
            input.focus();
            startTime = new Date();
            input.addEventListener("input", onTyping);
        }
    }, 1000);
}

function onTyping() {
    const inputText = document.getElementById("input").value;

    if (inputText === target) {
        const endTime = new Date();
        const seconds = (endTime - startTime) / 1000;
        const words = target.split(" ").length;
        const wpm = (words / seconds) * 60;

        document.getElementById("wpmDisplay").innerText = `You typed at ${wpm.toFixed(2)} WPM!`;

        document.getElementById("input").disabled = true;
        submitResult(wpm);
    }
}

async function submitResult(wpm) {
    const result = { wpm };

    await fetch("http://127.0.0.1:8000/typing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
    });

    console.log("Result submitted!");
}