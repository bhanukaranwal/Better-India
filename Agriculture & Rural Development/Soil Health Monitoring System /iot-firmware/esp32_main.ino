#include <WiFi.h>
#include <HTTPClient.h>
#define SOIL_MOISTURE_PIN 34
// Assume similar defines for pH, N, P, K, temperature

const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASSWORD";
const char* server = "http://your_api_server/api/soil-data";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(1000);
}

void loop() {
  int soilMoisture = analogRead(SOIL_MOISTURE_PIN);
  // Read other sensors...

  HTTPClient http;
  http.begin(server);
  http.addHeader("Content-Type", "application/json");
  String data = "{\"moisture\":"+String(soilMoisture)+", ... }";
  int resp = http.POST(data);
  http.end();

  delay(15*60*1000); // report every 15 minutes
}
