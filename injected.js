let canEval = false;
try {
  new Function("canEval = true;")();
} catch {}

let iframe = document.createElement("iframe");
iframe.src = "https://helvieq499.github.io/WebMenu/iframe.html";
document.head.appendChild(iframe);

let send = data => iframe.contentWindow.postMessage(data, "*");

window.addEventListener("message", event => {
  console.log(event);

  if (event.origin != "https://helvieq499.github.io") return;
  if (event.data[0] == "message") {
    if (event.data[3][0] == "get-display-name")
      send(["send-message", event.data[1], ["display-name", document.title]]);
    else if (event.data[3][0] == "js" && event.data[2])
      if (!canEval) send(["send-message", event.data[1], "no-eval"]);
      else new Function(event.data[3][1])();
  }
});
