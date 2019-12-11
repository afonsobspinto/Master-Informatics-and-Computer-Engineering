#!/usr/bin/env python
from imutils import paths
import imutils
from os import walk
from time import sleep
import face_recognition
import os
import cv2
import os

# In millimeters
AVERAGE_FACE_HEIGHT = 192.0
AVERAGE_FACE_WIDTH = 148.0
AVERAGE_FACE_AREA = AVERAGE_FACE_WIDTH * AVERAGE_FACE_HEIGHT
CAMERA_VOCAL_LENGTH = 0.58

# In pixels
CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480

class TurtlebotFaceRecognition:
    def __init__(self, train, active_learn):
        print "Face recognition activated"
        print os.getcwd()
        #self.haar = cv2.CascadeClassifier('src/candybot5/src/sensors/turtlebot_face_recognition/haarcascade.xml')
        self.haar = cv2.CascadeClassifier('sensors/turtlebot_face_recognition/haarcascade.xml')
        self.data = {
            'encoding': [],
            'label': []
        }
        self.active_learn = active_learn
        if train:
            image_labels = []
            for (path, dirs, files) in walk('training_images'):
                label = path.split('/')[-1]
                for f in files:
                    image_labels.append((path + '/' + f, label))
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
        #boxes = face_recognition.face_locations(rgb, model='hog')
        encodings = face_recognition.face_encodings(image, boxes)
        return list(zip(boxes, encodings))

    def get_label(self, encoding):
        comp = face_recognition.compare_faces(self.data['encoding'], encoding)
        if True in comp:
            for i, b in enumerate(comp):
                if b:
                    return self.data['label'][i]
        elif self.active_learn:
            self.data['encoding'].append(encoding)
            label = str(len(self.data['encoding']))
            self.data['label'].append(label)
            return label
        return 'unknown'

    def calculate_points(self, top, right, bottom, left):
        x = left + (right - left) / 2
        y = top + (bottom - top) / 2
        area = ((right - left) * (bottom - top))
        d = (AVERAGE_FACE_AREA * CAMERA_VOCAL_LENGTH) / area
        dtc = (AVERAGE_FACE_AREA / area) * ((CAMERA_WIDTH / 2) - x) * 0.001
        return x, y, d, dtc
    
    # Processes the image and returns the calculated data:
    # Label, center x (pixels), center y (pixels), distance (meter), distance to center (meter).
    def process_image_data(self, image):
        faces = self.get_faces(image)
        ret = []
        for (top, right, bottom, left), enc in faces:
            label = self.get_label(enc)
            x, y, d, dtc = self.calculate_points(top, right, bottom, left)
            ret.append((label, x, y, d, dtc))
        return ret

    # Processes the image and draws the data on the image.
    def process_image_show(self, image):
        faces = self.get_faces(image)
        ret = []
        for (top, right, bottom, left), enc in faces:
            label = self.get_label(enc)
            x, y, d, dtc = self.calculate_points(top, right, bottom, left)
            ret.append([label, x, y, d, dtc])
            text = label + ' ({}, {}) ({}m, {}m)'.format(x, y, round(d, 2), round(dtc, 2))
            image=cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
            image=cv2.putText(image, text, (left, top - 15), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 255, 0), 2)

        cv2.imshow('', image)
        cv2.waitKey(1)
        return ret
