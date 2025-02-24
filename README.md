# Video Summarizer Project

## Overview

This project leverages modern web technologies and the no-code platform N8N to create a system that allows users to upload videos, automatically generate transcriptions, summarize the content, and download the summary as a PDF. This approach demonstrates how integrating no-code tools like N8N can streamline complex tasks and enhance productivity in software solutions.

## Technologies Used

- **Frontend:**
  - **React.js**: A JavaScript library for building user interfaces.
  - **Next.js**: A React framework for production.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Backend:**
  - **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
  - **Python**: Programming language that lets you work quickly and integrate systems more effectively.
  - **N8N**: Workflow automation tool that can connect anything to everything in an extendable way.
- **Other Tools:**
  - **Docker**: Used to containerize the application, ensuring consistency across various development and production environments.
  - **ffmpeg**: A complete, cross-platform solution to record, convert and stream audio and video.

## Objective

The primary goal of this project is to showcase how no-code platforms like N8N can be integrated into traditional coding projects to handle complex workflows such as video processing and text summarization efficiently.

## Workflow Description

1. **Video Upload:**

   - Users navigate to the `/transcript/local_video` page and upload a video from their local system.
   - The video is sent to the server via an HTTP POST request to `/api/transcript/local_video`.

2. **Video Processing:**

   - The server receives the video and utilizes `ffmpeg` to extract the audio.
   - The extracted audio is then transcribed using the Langchain API.

3. **Summary Generation:**

   - The transcription is sent to an N8N workflow.
   - N8N processes the transcription to generate a summary based on predefined logic or AI models.

4. **PDF Generation and Download:**
   - The summary is converted into a PDF document.
   - The PDF file is then made available for the user to download, completing the cycle from upload to summary retrieval.

## Installation and Setup

### Prerequisites

- Docker
- Node.js
- Python 3.7 or higher

### Steps to Run the Project Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository-url.git
   cd video-summarizer
   ```

2. **Set Up the Backend:**

   ```bash
   cd server
   docker build -t video-summarizer-backend .
   docker run -p 8000:8000 video-summarizer-backend
   ```

3. **Set Up the Frontend:**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the Application:**
   - Open `http://localhost:3000` in your web browser to view the application.

## Conclusion

This project exemplifies the integration of traditional programming with no-code platforms to create efficient, scalable, and easy-to-maintain applications. By automating complex processes like video transcription and summarization, we can significantly reduce development time and increase productivity.
