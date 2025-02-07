import os
from fastapi import HTTPException
import requests
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import JSON
from app.videos.domain.enum.language_enum import LanguageEnum


_ = load_dotenv(find_dotenv())


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
