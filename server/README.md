# FastAPI Server Documentation

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `pip install -r requirements.txt`.
3. Set up the environment variables by copying the `.env.example` file to a new file named `.env` and filling in the necessary values.
4. Start the server with the command `python manage.py` or `python3 manage.py`. By default, the server will run on port 8082. To access the application, navigate to `http://localhost:8082` in your web browser.

## Main Endpoint

The main endpoint of the API is used to generate a summary of the video content provided by the user. Here's how it works:

- **URL**: `/api/transcript/`
- **Method**: `POST`
- **Parameters**:

  - `video`: The video file to be uploaded.
  - `language`: The language of the video content. This should be one of the supported `LanguageEnum` values.

- **Supported Languages**:
  - `Arabic (Egypt)`
  - `Arabic (Morocco)`
  - `Arabic (Saudi Arabia)`
  - `Bengali (Bangladesh)`
  - `Chinese (China)`
  - `English (UK)`
  - `English (US)`
  - `French (France)`
  - `German (Germany)`
  - `Gujarati (India)`
  - `Hindi (India)`
  - `Italian (Italy)`
  - `Japanese (Japan)`
  - `Javanese (Indonesia)`
  - `Jin (China)`
  - `Korean (South Korea)`
  - `Malay (Malaysia)`
  - `Marathi (India)`
  - `Persian (Iran)`
  - `Polish (Poland)`
  - `Portuguese (Brazil)`
  - `Portuguese (Portugal)`
  - `Punjabi (Pakistan)`
  - `Russian (Russia)`
  - `Southern Min (China)`
  - `Spanish (Argentina)`
  - `Spanish (Mexico)`
  - `Spanish (Spain)`
  - `Tamil (India)`
  - `Telugu (India)`
  - `Thai (Thailand)`
  - `Turkish (Turkey)`
  - `Urdu (Pakistan)`
  - `Vietnamese (Vietnam)`
  - `Wu (China)`
  - `Yue (China)`

**Flow**:

1. The video file is received and saved temporarily.
2. The audio is extracted from the video file.
3. The extracted audio is transcribed into text.
4. The text transcription is sent to an N8N workflow to generate a summary.
5. The summary is returned to the user, and temporary files are cleaned up.

**Response**:

- A JSON object containing the original transcription and the generated summary.

## N8N Workflow Integration

The project integrates with an N8N workflow to generate summaries of transcriptions. This is handled by the `WorkflowClient` class. It sends a POST request to the N8N workflow URL with the transcription and language as JSON payload and expects a summary in response.

```12:40:server/app/clients/n8n/workflow_client.py
class WorkflowClient:
    def __init__(self):
        self.__workflow_url = os.getenv('N8N_WORKFLOW_URL')

    def summary(self, transcription_path: str, language: LanguageEnum):
        try:
            with open(transcription_path, 'r') as file:
                transcription = file.read()

            response = requests.post(
                self.__workflow_url,
                json={
                    'transcription': transcription,
                    'language': language.value
                }
            )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=str(e)
                )
            return {
                'transcription': transcription,
                'summary': response.text
            }

        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=str(e))
```

## Environment Variables

The following environment variables are necessary for the project to function correctly. Create a `.env` file in the root of the project and ensure it contains the following:

- `N8N_WORKFLOW_URL`: The URL of the N8N workflow endpoint.
- `OPENAI_API_KEY`: The API key for OpenAI services.

An example `.env` file would look like this:

## Swagger Documentation Access

To access the Swagger UI documentation for the API, follow these steps after starting the server:

1. Navigate to `http://localhost:8082/docs` in your web browser.
2. You will be presented with an interactive UI where you can test out the different API endpoints.
3. Each endpoint can be expanded to view its documentation, which includes the expected parameters, request body, and response format.
4. You can also execute requests directly from this interface by filling in the required fields and clicking the "Try it out" button.

The Swagger UI is a helpful tool for understanding and interacting with the API's capabilities in a user-friendly manner. It is automatically generated from the codebase, ensuring that the documentation is always up to date with the latest changes.
