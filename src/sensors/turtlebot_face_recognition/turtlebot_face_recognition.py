#!/usr/bin/env python
from imutils import paths
import imutils
from os import walk
from time import sleep
import face_recognition
import cv2

class TurtlebotFaceRecognition:
    def __init__(self):
        self.haar = cv2.CascadeClassifier('/home/kasper/Desktop/Robotics-5/src/sensors/turtlebot_face_recognition/haarcascade.xml')
        image_labels = []
        for (path, dirs, files) in walk('training_images'):
            label = path.split('/')[-1]
            for f in files:
                image_labels.append((path + '/' + f, label))
        self.data = {
            'encoding': [],
            'label': []
        }
        for (image_path, label) in image_labels:
            image = cv2.imread(image_path)
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            boxes = face_recognition.face_locations(rgb)
            enc = face_recognition.face_encodings(rgb, boxes)
            self.data['encoding'].append(enc[0])
            self.data['label'].append(label)

    def get_faces(self, image):
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        rects = self.haar.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=10, minSize=(30,30))
        boxes = [(y, x + w, y + h, x) for (x, y, w, h) in rects]
        encodings = face_recognition.face_encodings(image, boxes)
        return list(zip(boxes, encodings))

    def get_label(self, encoding):
        comp = face_recognition.compare_faces(self.data['encoding'], encoding)
        if True in comp:
            match_ids = [i for (i, b) in enumerate(comp) if b]
            counts = {}
            for i in match_ids:
                label = self.data['label'][i]
                counts[label] = counts.get(label, 0) + 1
            pred_label = max(counts, key=counts.get)
            return pred_label
        return 'unknown'
    
    def process_image(self, image):
        cv2.putText(image, 'Turtlebot Face Recognition', (10, 10), (100, 40), (0, 255, 0), 2)
        faces = self.get_faces(image)
        for (top, right, bottom, left), enc in faces:
            label = self.get_label(enc)
            cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
            y = top - 15 if top - 15 > 15 else top + 15
            cv2.putText(image, label, (left, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 255, 0), 2)
