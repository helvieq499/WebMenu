let iframe = document.createElement("iframe");
iframe.src = "https://helvieq499.github.io/WebMenu/iframe.html";
document.head.appendChild(iframe);

window.addEventListener("message", event => {
    console.log(event);

    if (event.origin != "https://helvieq499.github.io") return;

    if (event.data[0] == "message") {
        if (event.data[3][0] == "get-display-name")
            iframe.contentWindow.postMessage(["send-message", event.data[1], ["display-name", document.title]], "*");
    }
});
