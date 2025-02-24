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

   - Users navigate to the `/transcript/` page and upload a video from their local system.
   - The video is sent to the server via an HTTP POST request to `/api/transcript/`.

2. **Video Processing:**

   - The server receives the video and utilizes `ffmpeg` to extract the audio.
   - The extracted audio is then transcribed using the Langchain API.

3. **Summary Generation:**

   - The transcription is sent to an N8N workflow.
   - N8N processes the transcription to generate a summary based on predefined logic or AI models.

4. **PDF Generation and Download:**
   - The summary is converted into a PDF document.
   - The PDF file is then made available for the user to download, completing the cycle from upload to summary retrieval.

**SCHEMA**

![image](https://github.com/user-attachments/assets/192299e2-2f9c-4c3a-9bbb-e8894d5c456c)


### N8N Workflows

### Video Local Summary Workflow

![Captura desde 2025-02-24 08-11-24](https://github.com/user-attachments/assets/ea453145-ea4d-46a8-b1f2-7b06e16daadb)

This workflow is designed to handle the summarization of video transcriptions. Here's a step-by-step breakdown of the process:

1. **Webhook**: The workflow is triggered by a webhook that receives the transcription data.
2. **Edit Fields**: This node processes the incoming data to ensure it is in the correct format or extracts necessary fields.
3. **Conditional (If node)**: This node checks if the transcription data is valid.
   - If the transcription is valid, the workflow proceeds to generate a summary.
   - If not, it moves to the "Return a Error Message" node.
4. **OpenAI Message Model**: This node uses the OpenAI API to generate a summary from the transcription.
5. **Wait**: This node introduces a delay to ensure that the summary generation process has completed.
6. **Respond to Webhook**: Finally, the summary is sent back to the original caller through the webhook response.

### PDF Generation Workflow

![Captura desde 2025-02-24 08-11-08](https://github.com/user-attachments/assets/cb0ed9be-60c6-4e76-9234-b4a5b34c282b)


This workflow manages the generation of a PDF from the summarized text. The steps include:

1. **Webhook**: Triggered when a request to generate a PDF is received.
2. **Save to Directory**: This node saves the summary text as a PDF file in a specified directory.
3. **Check File Creation**: After attempting to save the file, this node checks if the PDF was successfully created.
   - If the file exists, it proceeds to send a success message.
   - If the file does not exist, it sends an error message indicating the failure.

### Setting Up and Running the Workflows

To set up and run these workflows:

1. Ensure that N8N is installed and running.
2. Import the workflow configurations into your N8N environment.
3. Configure the webhook URLs in your server application to match those expected by the N8N workflows.
4. Test the workflows by sending requests from your server application to verify that they execute as expected and handle all cases (success and error scenarios).

## Installation and Setup

### Prerequisites

- Docker
- Node.js
- Python 3.7 or higher

### Steps to Run the Project Locally

1. **Using Docker Compose:**

   To start all services (server, client, N8N, and other dependencies), navigate to the root directory of the project and run:

   ```bash
   docker-compose up
   ```

   This command will build and start all the containers defined in the `docker-compose.yml` file.

2. **Individual Project Setup:**

   For detailed instructions on setting up the server or client individually, please refer to their respective README files:

   - [Server README](server/README.md)
   - [Client README](client/README.md)

3. **Access the Application:**
   - Open `http://localhost:3000` in your web browser to view the application.

## Conclusion

This project exemplifies the integration of traditional programming with no-code platforms to create efficient, scalable, and easy-to-maintain applications. By automating complex processes like video transcription and summarization, we can significantly reduce development time and increase productivity.
