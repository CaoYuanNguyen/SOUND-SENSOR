#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

#ifndef APSSID 
#define APSSID "wifi" // existing Wifi network 
#define APPSK "28072010" 
#endif

const char *ssid = APSSID; 
const char *password = APPSK;
const char *URL = "http://192.168.203.129:8000/postdata";

const int sampleWindow = 50;                              // Sample window width in mS (50 mS = 20Hz)
unsigned int sample;
 
WiFiClient client;
HTTPClient http;

#define SENSOR_PIN A0
#define PIN_QUIET 3
#define PIN_MODERATE 4
#define PIN_LOUD 5
 
void setup ()  
{   
  pinMode (SENSOR_PIN, INPUT); // Set the signal pin as input  
  pinMode(PIN_QUIET, OUTPUT);
  pinMode(PIN_MODERATE, OUTPUT);
  pinMode(PIN_LOUD, OUTPUT); 
 
  digitalWrite(PIN_QUIET, LOW);
  digitalWrite(PIN_MODERATE, LOW);
  digitalWrite(PIN_LOUD, LOW);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nĐã kết nối với WiFi.");

  Serial.begin(9600);
  
}  
 
   
void loop ()  
{ 
  
   unsigned long startMillis= millis();                   // Start of sample window
   float peakToPeak = 0;                                  // peak-to-peak level
 
   unsigned int signalMax = 0;                            //minimum value
   unsigned int signalMin = 1024;                         //maximum value
 
                                                          // collect data for 50 mS
   while (millis() - startMillis < sampleWindow)
   {
      sample = analogRead(SENSOR_PIN);                    //get reading from microphone
      if (sample < 1024)                                  // toss out spurious readings
      {
         if (sample > signalMax)
         {
            signalMax = sample;                           // save just the max levels
         }
         else if (sample < signalMin)
         {
            signalMin = sample;                           // save just the min levels
         }
      }
   }
 
   peakToPeak = signalMax - signalMin;                    // max - min = peak-peak amplitude
   int db = map(peakToPeak,20,900,49.5,90);             //calibrate for deciBels
 
  
  
  if (db <= 60)
  {
    
    Serial.println("Level: Quite");
    postJsonData("low");
    digitalWrite(PIN_QUIET, HIGH);
    digitalWrite(PIN_MODERATE, LOW);
    digitalWrite(PIN_LOUD, LOW);
  }
  else if (db > 60 && db<85)
  {
     Serial.println("Level: Moderate");
    postJsonData("medium");
    digitalWrite(PIN_QUIET, LOW);
    digitalWrite(PIN_MODERATE, HIGH);
    digitalWrite(PIN_LOUD, LOW);
  }
  else if (db>=85)
  {
    Serial.println("Level: High");
    postJsonData("high");
    digitalWrite(PIN_QUIET, LOW);
    digitalWrite(PIN_MODERATE, LOW);
    digitalWrite(PIN_LOUD, HIGH);
 
  }

  delay(1000); // Wait for 1 second

}


void postJsonData(String data) {
  if (http.begin(client, URL)) {
    DynamicJsonDocument doc(1024);
    doc["value"] = data; 

    String output;
    serializeJson(doc, output);

    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(output);

    if (httpCode > 0) {
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
      String payload = http.getString();
      Serial.println("respone from server:");
      Serial.println(payload);

      // DynamicJsonDocument responseDoc(1024);
      // DeserializationError error = deserializeJson(responseDoc, payload);

      // if (!error) {
      //   // Gán giá trị từ JSON vào biến global
      //   globalFlag = responseDoc["flag"].as<bool>();
      //   Serial.println("Global flag updated:");
      //   Serial.println(globalFlag ? "true" : "false");
      // } else {
      //   Serial.println("Failed to parse JSON");
      // }


    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("cannot HTTP connect");
  }
}