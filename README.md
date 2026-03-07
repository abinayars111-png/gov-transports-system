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


## Authors
- **MARIA JEBILA M**
- **ABINAYA RS**
