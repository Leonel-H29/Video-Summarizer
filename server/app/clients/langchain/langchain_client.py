from fastapi import HTTPException
from langchain_community.document_loaders.parsers.audio import OpenAIWhisperParser
from langchain.document_loaders import Blob
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

_ = load_dotenv(find_dotenv())

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


class LangchainClient():

    def transcribe_video(self, audio_path: str) -> str:
        try:
            audio_blob = Blob(path=audio_path)
            parser = OpenAIWhisperParser(api_key=OPENAI_API_KEY)
            transcription = parser.parse(audio_blob)
            return transcription[0].page_content

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])
