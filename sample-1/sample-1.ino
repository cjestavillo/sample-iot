// put your setup code here, to run once:
void setup() {
  // Connect to serial port with rate of 9600bps.
  Serial.begin(9600); 

  // delay for 1s
  delay(1000);
}

// put your main code here, to run repeatedly:
void loop() {
  // Read the value from temperature sensor.
  int value = analogRead(A3); 
  
  // Convert it into temp in C.
  int tempC = value * 0.48828125; 
  
  // Print it on Serial Monitor.
  Serial.println(tempC); 

  // Delay for 10s, specifies gap between two readings in mili seconds.
  delay(10000); 
}
