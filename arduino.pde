int relaisPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(relaisPin, OUTPUT);

}

void loop() {
  while (Serial.available() > 0) {
    int choice = Serial.parseInt();
    if (Serial.read() == '\n') {
      if (choice == 1) {
        digitalWrite(relaisPin, HIGH);
        Serial.println("ON");
      } else if (choice == 0) {
        digitalWrite(relaisPin, LOW);
        Serial.println("OFF");
      } else {
        Serial.println("ERROR");
      }
    }
  }
}
