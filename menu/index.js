let worker = new SharedWorker("worker.js");
let send = (...args) => worker.port.postMessage(args);

send("set-controller");

worker.port.onmessage = msg => {
  console.log(msg);
  if (msg.data[0] == "connection")
    send("send-message", msg.data[1], ["get-display-name"]);
  if (msg.data[0] == "message")
    handle(msg.data);
};

function handle(data) {
  if (data[3][0] == "get-display-name")
    send("send-message", data[1], ["display-name", document.title]);
  else if (data[3][0] == "display-name") {
    let elem = document.createElement("div");
    elem.textContent = data[3][1];
    elem.onclick = openTab;
    document.getElementById("tabs").appendChild(elem);
  }
}

function openTab() { console.log(this); }
