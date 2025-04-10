## FastAPI (WPM Tracker)

This is a simple application that calculates how many words you can type per minute.

Pre-requisites:
- [Docker (choose free plan)](https://www.docker.com/pricing/)

To play:
1) Install Docker if you haven't already. This prevents you from having compatibility issues with your compiler, dependencies, and OS.
2) In a terminal, navigate to the project and run the following commands:
  ```
  docker build -t typing-speed-app .
  docker run -p 8000:8000 typing-speed-app
  ```
2) In your browser, navigate to http://localhost:8000.
3) Press *Start*, and then type the message into the prompt identical to the way it is displayed.
