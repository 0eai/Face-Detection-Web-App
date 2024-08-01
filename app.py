
import cv2
import numpy as np
from transformers import pipeline
from ultralytics import YOLO
from huggingface_hub import hf_hub_download
from flask import Flask, render_template, request, jsonify
from PIL import Image  # Import for image processing
import io

app = Flask(__name__, template_folder='templates')

# Load YOLOv8 face detection model
model_path = hf_hub_download(repo_id="arnabdhar/YOLOv8-Face-Detection", filename="model.pt")
face_model = YOLO(model_path)

g_model_name = "rizvandwiki/gender-classification"
g_classifier = pipeline("image-classification", model=g_model_name)

age_model_name = "nateraw/vit-age-classifier"
age_classifier = pipeline("image-classification", model=age_model_name)

fe_model_name = "trpakov/vit-face-expression"
fe_classifier = pipeline("image-classification", model=fe_model_name)


def detect_face(frame):
    face_results = face_model.predict(frame, stream=False, conf=0.7)
    boxes = face_results[0].boxes.data.cpu().numpy()

    faces = []
    for box in boxes:
        x1, y1, x2, y2, conf, cls = box
        # Check if a valid face was detected before proceeding
        if x2 > x1 and y2 > y1: 
            face_image = frame[int(y1):int(y2), int(x1):int(x2)]  
            _, buffer = cv2.imencode('.jpg', face_image)
            pil_image = Image.open(io.BytesIO(buffer))  # Convert to PIL Image
            
            g_predictions = g_classifier(images=pil_image)
            # age_predictions = age_classifier(images=pil_image)
            # fe_predictions = fe_classifier(images=pil_image)

            face = {
                'x1': int(x1),
                'y1': int(y1),
                'x2': int(x2),
                'y2': int(y2),
                'conf': float(conf),
                'cls': int(cls),
                'gender': g_predictions[0]['label'] if g_predictions else "Unknown",
                # 'age': age_predictions[0]['label'] if age_predictions else "Unknown",
                # 'expression': fe_predictions[0]['label'] if fe_predictions else "Unknown",
            }
            faces.append(face)
    return faces
        
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['image']
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)

        # Convert BGR to RGB for YOLO
        frame_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces = detect_face(frame_rgb)

        return jsonify(faces)  
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
