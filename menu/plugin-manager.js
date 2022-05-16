plugins = [];

ls = JSON.parse(localStorage["WebMenu"] || "{}");
ls.save = function () {
  localStorage["WebMenu"] = JSON.stringify(this);
};

if (Array.isArray(ls.plugins))
  for (let plugin of ls.plugins)
    loadPlugin(plugin)

function addPlugin(url) {
  plugins.push(url);
  plugins.save();
}

function loadPlugin(url) {
  if (typeof url == "string")
    fetch(url).then(resp => resp.text()).then(loadPluginRaw);
}

function loadPluginRaw(data) {
  let fn;
  try {
    fn = new Function(data);
  } catch (err) {
    console.error("Failed to compile plugin: " + err)
    return;
  }

  let ret;
  try {
    ret = fn();
  } catch (err) {
    console.error("Failed to run plugin: " + err);
    return;
  }

  let inst;
  try {
    inst = new ret();
  } catch (err) {
    console.error("Failed to instantiate plugin: " + err);
    return;
  }

  plugins.push(inst);
}
