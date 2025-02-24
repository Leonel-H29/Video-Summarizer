# Video Summarizer Project - Client

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Additional Documentation

Below is the detailed documentation for the video summarizer project, complementing the existing information in the `README.md` file.

#### Routes of the Project

- **`/` (Home)**: This is the main page of the project where users can start interacting with the application.

- **`/transcript`**: On this route, users can upload videos for processing, then the user can view the summary and transcription of the uploaded video. It also offers the option to download the summary in PDF format.

#### Functions of the Page

1. **Video Upload**: Users upload a video from their local device. This is handled in the `VideoUploader` component.

2. **Transcription and Summary**: Once the video is uploaded, the user can request its transcription and summary by clicking the "Transcription" button. This triggers a POST request to the server which handles the transcription and then sends this transcription to an N8N workflow to generate a summary .

3. **Viewing and Editing the Summary**: The generated summary is displayed on the page and can be edited by the user through a rich text editor provided by the `SummaryDisplay` component.

4. **Downloading the Summary as PDF**: Once the user is satisfied with the summary, it can be downloaded as a PDF file using the "Download PDF" button which triggers an N8N workflow to generate the PDF and send it to the client for download.

#### Server Connection and N8N Workflow

- **Transcription and Summary Generation**: Clicking on "Transcription" sends a POST request to `/api/transcript` with the video as part of the request body. The server processes the video, extracts the transcription, and then sends this transcription to an N8N workflow. The N8N workflow processes the transcription to generate a summary, which is then returned to the server and finally to the client.

- **PDF Generation and Download**: Clicking on "Download PDF" triggers an N8N workflow that takes the edited summary, generates a PDF, and sends it directly to the client for download.

#### Necessary Environment Variables

For the application to function correctly, the following environment variables need to be set up in a `.env.example` file:

- `NEXT_PUBLIC_API_URL`: URL of the server endpoint that handles video upload and transcription.
- `NEXT_PUBLIC_WORKFLOW_URL`: URL of the N8N endpoint that handles summary generation and PDF creation.

These variables ensure that the application can correctly communicate with the necessary backend and automation services for its operation.
