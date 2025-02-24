from fastapi import HTTPException
from langchain_community.document_loaders.parsers.audio import OpenAIWhisperParser
from langchain.document_loaders import Blob
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

_ = load_dotenv(find_dotenv())
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


class LangchainClient():

    def __init__(self) -> None:
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        self.__transcript_dir = "app/cache/transcription"

    def transcribe_video(self, audio_path: str) -> str:
        try:
            audio_blob = Blob(path=audio_path)
            parser = OpenAIWhisperParser()
            transcription = parser.parse(audio_blob)

            audio_filename = audio_path.split('/')[-1]
            transcription_filename = audio_filename.rsplit('.', 1)[0] + '.txt'

            transcription_path = f"{self.__transcript_dir}/{transcription_filename}"
            with open(transcription_path, 'w') as file:
                file.write(transcription[0].page_content)

            return transcription_path

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])
