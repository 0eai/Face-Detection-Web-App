# Face Detection and Classification App

This project is a web application that performs face detection and classification using various machine learning models. It detects faces in an image, identifies their gender, and includes placeholders for age and expression classification.

## Features

- **Face Detection**: Uses the YOLOv8 model for detecting faces in images.
- **Gender Classification**: Utilizes a pre-trained model for identifying the gender of detected faces.
- **Age Classification**: Placeholder for an age classification model.
- **Expression Classification**: Placeholder for a facial expression classification model.

## Technologies Used

- **Flask**: Web framework for Python.
- **OpenCV**: Library for image processing.
- **NumPy**: Library for numerical computations.
- **Pillow**: Library for image processing.
- **Transformers**: Library for natural language processing and more.
- **Ultralytics**: Library for YOLO models.
- **Hugging Face Hub**: Platform for sharing machine learning models.
- **Torch**: Deep learning library used by the models.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/0eai/Face-Detection-Web-App.git
    cd face-detection-app
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the Flask app:
    ```sh
    python app.py
    ```

5. Open your web browser and go to `http://127.0.0.1:5000`.

## File Structure

- `app.py`: The main Flask application file.
- `templates/index.html`: The HTML file for the web interface.
- `static/`: Directory for static files like JavaScript and CSS.
- `requirements.txt`: List of Python dependencies.
- `README.md`: This readme file.

## Usage

1. Start the Flask application.
2. Open the web application in your browser.
3. Click the "Start Webcam" button to activate the webcam.
4. The application will continuously detect faces and display bounding boxes with gender labels.
5. To stop the webcam, click the "Stop Webcam" button.

## Models

- **Face Detection Model**: YOLOv8 model from the Hugging Face Hub.
- **Gender Classification Model**: Pre-trained model `rizvandwiki/gender-classification`.
- **Age Classification Model**: Placeholder for the model `nateraw/vit-age-classifier`.
- **Expression Classification Model**: Placeholder for the model `trpakov/vit-face-expression`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Ultralytics](https://ultralytics.com) for the YOLO models.
- [Hugging Face](https://huggingface.co/) for providing the model hub.
- [OpenCV](https://opencv.org/) for image processing capabilities.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

For any questions or inquiries, please contact [ankit@soongsil<dot>ac<dot>kr](mailto:ankit@soongsil<dot>ac<dot>kr).
