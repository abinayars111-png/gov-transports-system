# AI-BASED REAL-TIME PASSENGER COUNTING SYSTEM FOR SMART PUBLIC TRANSPORT

**Domain:** Smart Cities and Urban Innovation

## Description
AI-based Passenger Detection, Tracking, and Counting System for improving rural transport monitoring using Computer Vision and Machine Learning.
The system detects passengers using YOLOv8 and tracks them with DeepSORT to maintain unique IDs and prevent duplicate counting.

## Features
1. Real-time passenger detection
2. Multi-object tracking with stable IDs
3. Automated passenger counting
4. Works with live webcam or CCTV feed
5. Designed for rural transport monitoring systems

## Architecture Flow

```text
Camera Input
     ↓
Frame Capture (OpenCV)
     ↓
YOLOv8 Person Detection
     ↓
Bounding Boxes
     ↓
DeepSORT Tracking
     ↓
Unique Track IDs
     ↓
Passenger Counting
     ↓
Real-time Visualization
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Linux/Mac
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install ultralytics opencv-python deep-sort-realtime
   # or using requirements.txt
   # pip install -r requirements.txt
   ```

## Running the System

Start the passenger detection and counting process by running the main script:
```bash
python main.py
```
*(Note: Replace `main.py` with the actual name of your main script if it is different, and provide any necessary arguments like `--source 0` for webcam).*

## Authors
- **MARIA JEBILA M**
- **ABINAYA RS**
