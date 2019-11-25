from imutils import paths
from os import walk
import face_recognition
import cv2

image_labels = []
for (path, dirs, files) in walk('training_images'):
    label = path.split('/')[-1]
    for f in files:
        image_labels.append((path + '/' + f, label))

data = {
    'encoding': [],
    'label': []
}

for (image_path, label) in image_labels:
    image = cv2.imread(image_path)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    boxes = face_recognition.face_locations(rgb)
    enc = face_recognition.face_encodings(rgb, boxes)
    data['encoding'].append(enc[0])
    data['label'].append(label)

def get_label(enc):
    comp = face_recognition.compare_faces(data['encoding'], enc)
    if True in comp:
        match_ids = [i for (i, b) in enumerate(comp) if b]
        counts = {}
        for i in match_ids:
            label = data['label'][i]
            counts[label] = counts.get(label, 0) + 1
        pred_label = max(counts, key=counts.get)
        return pred_label
    return 'unknown'

cap = cv2.VideoCapture(0)
haar = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

while(True):
    _, frame = cap.read()
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = haar.detectMultiScale(gray, scaleFactor=1.1,
            minNeighbors=10, minSize=(30,30))
    boxes = [(y, x + w, y + h, x) for (x, y, w, h) in rects]
    for top, right, bottom, left in boxes:
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
    enc = face_recognition.face_encodings(rgb, boxes)
    for (top, right, bottom, left), e in zip(boxes, enc):
        label = get_label(e)
        if label:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            y = top - 15 if top - 15 > 15 else top + 15
            cv2.putText(frame, label, (left, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 255, 0), 2)
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()

exit()

image = cv2.imread('test.jpg')
rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
boxes = face_recognition.face_locations(rgb)
enc = face_recognition.face_encodings(rgb, boxes)
for ((top, right, bottom, left), e) in zip(boxes, enc):
    label = get_label(e)
    if label:
        cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
        y = top - 15 if top - 15 > 15 else top + 15
        cv2.putText(image, label, (left, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)
height, width, _ = image.shape
imageS = cv2.resize(image, ((int)(width / 2), (int)(height / 2)))
cv2.imshow("Image", imageS)
cv2.waitKey(0)