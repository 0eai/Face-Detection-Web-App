let videoStream = null;

window.onload = () => {
    toggleWebcam();
};

async function toggleWebcam() {
    const webcamButton = document.getElementById('webcamButton');
    const webcamVideo = document.getElementById('webcamVideo');
    const bboxCanvas = document.getElementById('bboxCanvas');
    const ctx = bboxCanvas.getContext('2d');

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
        webcamVideo.style.display = 'none';
        bboxCanvas.style.display = 'none';
        webcamButton.textContent = 'Start Webcam';
        return;
    }

    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideo.srcObject = videoStream;
        webcamVideo.style.display = 'block';
        bboxCanvas.style.display = 'block';
        webcamButton.textContent = 'Stop Webcam';

        webcamVideo.onloadedmetadata = () => {
            webcamVideo.play();
            bboxCanvas.width = webcamVideo.videoWidth;
            bboxCanvas.height = webcamVideo.videoHeight;
            detectFaces(ctx, webcamVideo, bboxCanvas);
        };
    } catch (error) {
        console.error("Error accessing webcam:", error);
        alert('Unable to access webcam.');
    }
}

async function detectFaces(ctx, webcamVideo, bboxCanvas) {
    const canvas = document.createElement('canvas');
    canvas.width = webcamVideo.videoWidth;
    canvas.height = webcamVideo.videoHeight;
    const context = canvas.getContext('2d');

    const formData = new FormData();

    context.drawImage(webcamVideo, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
        if (blob) {
            formData.append('image', blob, 'webcam_snapshot.png');
            try {
                const response = await fetch('/', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const faces = await response.json();
                ctx.clearRect(0, 0, bboxCanvas.width, bboxCanvas.height);
                faces.forEach(face => {
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(face.x1, face.y1, face.x2 - face.x1, face.y2 - face.y1);

                    ctx.fillStyle = 'white';
                    ctx.font = '14px Arial';
                    ctx.fillText(face.gender + '(' + face.age + '), ' + face.expression, face.x1, face.y1 - 5);
                });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Error: Failed to create blob.');
        }
        setTimeout(() => detectFaces(ctx, webcamVideo, bboxCanvas), 100);
    }, 'image/png');
}
