ls = JSON.parse(localStorage["WebMenu"] || "{}");
ls.save = function() {
    localStorage["WebMenu"] = JSON.stringify(this);
};

if (Array.isArray(ls.plugins))
    for (let plugin of ls.plugins)
        loadPlugin(plugin)

function loadPlugin(url) {
    if (typeof url == "string") {
        fetch(url).then(resp => resp.text()).then(data => new Function(data)());
    }
}
