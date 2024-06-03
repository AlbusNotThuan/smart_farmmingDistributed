var mqtt = require("mqtt");
require("dotenv").config();

var nodes = [123, 699, 542];

function assignNode(sensorId) {
  var closest = nodes.reduce(function (prev, curr) {
    return Math.abs(curr - sensorId) < Math.abs(prev - sensorId) ? curr : prev;
  });
  return closest;
}

var client = mqtt.connect("mqtt://test.mosquitto.org");
var nodeToConnect =
  "node" + assignNode(process.env.SENSOR_AREA_CODE) + "/tempSensor";

client.on("connect", () => {
  setInterval(() => {
    client.publish(
      nodeToConnect,
      "Temparuture Sensor ID: " +
        process.env.SENSOR_TEMP_ID +
        " " +
        Math.floor(Math.random() * 100)
    );
  }, 1000);
});
