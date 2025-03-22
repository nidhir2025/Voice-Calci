document.getElementById("voiceInput").addEventListener("click", function () {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = function () {
        document.getElementById("screen").value = "Listening...";
    };

    recognition.onresult = function (event) {
        let voiceInput = event.results[0][0].transcript;
        let processedInput = voiceInput.toLowerCase()
            .replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/multiply/g, "*")
            .replace(/times/g, "*")
            .replace(/divide/g, "/");

        document.getElementById("screen").value = processedInput;

        try {
            // Safe evaluation of mathematical expressions
            let result = Function(`"use strict"; return (${processedInput})`)();
            document.getElementById("screen").value = processedInput + " = " + result;
        } catch (error) {
            document.getElementById("screen").value = "Error";
        }
    };

    recognition.onerror = function (event) {
        document.getElementById("screen").value = "Voice Error!";
        console.error("Speech recognition error:", event.error);
    };

    recognition.start();
});
