const startBtn = document.getElementById("startbtn");
const pauseBtn = document.getElementById("pausebtn");

startBtn.addEventListener("click", () => {
    console.log("botão de play!!!");

    let audio1 = new Audio();
    audio1.src = "./traks/tune.mp3";
    audio1.crossOrigin = "anonymous";

    const container = document.getElementById("container");
    const canvas = document.getElementById("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioSource = null;
    let analyser = null;

    const ctx = canvas.getContext("2d");

    audio1.play();

    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / 2 / bufferLength;

    let x = 0;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer({ bufferLength, dataArray, barWidth });
        requestAnimationFrame(animate);
    }

    const drawVisualizer = ({ bufferLength, dataArray, barWidth }) => {
        let barHeight;
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2.2;

            const red = (i * barHeight) / 5;
            const green = i * 2;
            const blue = barHeight * 2;

            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

            ctx.fillRect(
                canvas.width / 2 - x,
                canvas.height - barHeight,
                barWidth,
                barHeight
            );
            x += barWidth;
        }

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2.2;

            const red = (i * barHeight) / 5;
            const green = i * 2;
            const blue = barHeight * 2;

            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    };

    animate();

    pauseBtn.addEventListener("click", () => {
        console.log("botão de pause!!!");
        audio1.pause();
    });
});
