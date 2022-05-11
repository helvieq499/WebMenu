this.connections = {};
this.controller = null;

onconnect = event => {
  let ctx = {
    port: event.ports[0],
    identity: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16),
  };
  this.connections[ctx.identity] = ctx;
  ctx.port.onmessage = event => handle(ctx, event);
  ctx.port.postMessage(["identity", ctx.identity]);
  broadcast(["connection", ctx.identity], ctx.identity);
}

function handle(ctx, event) {
  console.log(event.data + " from " + ctx.identity);
  if (event.data[0] == "get-identity")
    ctx.port.postMessage(["identity", ctx.identity]);
  else if (event.data[0] == "set-controller")
    broadcast(["controller", (this.controller = ctx).identity]);
  else if (event.data[0] == "send-message")
    this.connections[event.data[1]]?.port.postMessage(["message", ctx.identity, ctx === controller, event.data[2]]);
  else if (event.data[0] == "get-connections")
    ctx.port.postMessage(["connections", Object.keys(connections)]);
}

function broadcast(data, exclude) {
  for (let key of Object.keys(this.connections))
    if (key.identity != exclude)
      this.connections[key].port.postMessage(data);
}
