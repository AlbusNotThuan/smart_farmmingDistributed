const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter SENSOR_AREA_CODE: ", (SENSOR_AREA_CODE) => {
  rl.question("Enter light sensor ID: ", (LIGHT_SENSOR_ID) => {
    rl.question("Enter moisture sensor ID: ", (MOIST_SENSOR_ID) => {
      rl.question("Enter temperature sensor ID: ", (TEMP_SENSOR_ID) => {
        const sensorFiles = [
          { filename: "lightSensor.js", sensorId: LIGHT_SENSOR_ID },
          { filename: "moistSensor.js", sensorId: MOIST_SENSOR_ID },
          { filename: "tempSensor.js", sensorId: TEMP_SENSOR_ID },
        ];

        sensorFiles.forEach((file) => {
          const content = `
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
var nodeToConnect = "node" + assignNode(${SENSOR_AREA_CODE}) + "/${file.sensorId}";

client.on("connect", () => {
  setInterval(() => {
    client.publish(
      nodeToConnect,
      "${file.sensorId} ID: " + ${file.sensorId} + " " + Math.floor(Math.random() * 100)
    );
  }, 1000);
});
`;
          fs.writeFileSync(file.filename, content);
        });

        rl.close();
      });
    });
  });
});
