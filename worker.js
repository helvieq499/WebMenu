this.connections = {};
this.controller = null;

onconnect = event => {
    let ctx = {
        port: event.ports[0],
        identity: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16),
    };
    this.connections[ctx.identity] = ctx;
    ctx.port.onmessage = event => handle(ctx, event);
}

function handle(ctx, event) {
    console.log(event.data + " from " + ctx.identity);
    if (event.data[0] == "get-identity")
        ctx.port.postMessage(["identity", ctx.identity]);
    else if (event.data[0] == "set-controller") {
        this.controller = ctx;
        for (let key of Object.keys(this.connections))
            this.connections[key].port.postMessage(["controller", ctx.identity]);
    } else if (event.data[0] == "send-message") {
        this.connections[event.data[1]]?.port.postMessage(["message", ctx.identity, ctx === controller, event.data[2]]);
    }
}
