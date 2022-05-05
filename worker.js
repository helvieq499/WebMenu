controller = undefined;
connections = {};

onconnect = e => {
console.log(e);
  let selector = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
  connections[selector] = e.ports[0];
  e.ports[0].postMessage(["known-as", selector]);
  e.ports[0].onmessage = e => handle(selector, e.ports[0], e);
};

function handle(selector, sender, event) {
  if (event.data[0] == "set-controller") {
    controller = sender;
    delete connections[selector];
    let keys = Object.keys(connections);
    for (let key of keys)
      connections[key].postMessage(["new-controller", selector]);
  } else if (event.data[0] == "send-message") {
    connections[e.data[1]].postMessage(["message", selector, event.data[2]]);
  } else if (event.data[0] == "send-js") {
    if (sender != controller) return;
    connections[event.data[1]].postMessage(["js", selector, event.data[2]]);
  }
}
