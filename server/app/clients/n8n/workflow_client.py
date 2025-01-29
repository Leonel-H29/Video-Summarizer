import os
from fastapi import HTTPException
import requests
from dotenv import load_dotenv, find_dotenv


_ = load_dotenv(find_dotenv())


class WorkflowClient:
    def __init__(self):
        self.__workflow_url = os.getenv('N8N_WORKFLOW_URL')

    def summary(self, transcription: str) -> str:
        try:
            response = requests.post(
                self.__workflow_url,
                json={'transcription': transcription}
            )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=str(e)
                )
            summary = response.text
            return summary

        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=str(e))
