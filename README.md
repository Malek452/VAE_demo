# 🧠 ONNX Mouse-Controlled VAE Decoder (MNIST)

This interactive web application showcases the decoder of a Variational Autoencoder (VAE) trained on the MNIST dataset. It allows users to explore the learned latent space by moving their mouse across the screen, generating corresponding handwritten digit images in real-time using ONNX Runtime Web.

## 🚀 Live Demo

Move your mouse around the screen to generate different digit images based on the cursor's position.

> The application runs entirely in the browser and requires no server-side components.

## 🧩 How It Works

- **Latent Space Navigation**: The application maps the mouse's (x, y) coordinates to a 2D latent space ranging from -4 to 4 in both dimensions.
- **ONNX Model Inference**: These coordinates are fed into a pre-trained ONNX model representing the decoder part of a VAE.
- **Image Generation**: The decoder outputs a 28×28 grayscale image corresponding to the input latent vector, which is then displayed on an HTML5 canvas.

## 🧠 About the VAE

A Variational Autoencoder (VAE) is a type of generative model that learns to encode input data into a latent space and decode from this space back to the original data domain. In this project:

- The VAE was trained on the MNIST dataset, consisting of 28×28 images of handwritten digits.
- The encoder maps input images to a 2D latent space, capturing the underlying features of the digits.
- The decoder reconstructs images from points in this latent space.
- Only the decoder part is exported to the ONNX format and utilized in this web application.

This setup allows for intuitive exploration of the latent space, where similar latent vectors produce similar digit images.

## 🗂️ Project Structure

```
📦 project-root
├── index.html         # Main HTML file
├── script.js          # Handles canvas rendering and ONNX model inference
├── decoder.onnx       # Pre-trained ONNX model (VAE decoder)
```

## 🛠️ Technologies Used

- **HTML5 Canvas**: For rendering images and capturing mouse movements.
- **JavaScript (Vanilla)**: Core application logic.
- **[ONNX Runtime Web](https://onnxruntime.ai/)**: Executes the ONNX model in the browser.

## ✅ Requirements

No installation is necessary. Simply open `index.html` in a modern web browser with internet access to load the ONNX Runtime Web library from the CDN.

If deploying the application:

- Ensure that `index.html`, `script.js`, and `decoder.onnx` are located in the same directory.
- Hosting on platforms like GitHub Pages, Netlify, or Vercel is recommended for ease of deployment.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created by [Your Name].
