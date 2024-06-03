var mqtt = require("mqtt");

var client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe([
    "node123/lightSensor",
    "node123/moistSensor",
    "node123/tempSensor",
  ]);
});

client.on("message", (topic, message) => {
  console.log(message.toString());
});
