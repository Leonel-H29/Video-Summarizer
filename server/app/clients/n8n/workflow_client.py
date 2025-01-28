import os
from fastapi import HTTPException
import requests
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())


class WorkflowClient:
    def __init__(self):
        self.__workflow_url = os.getenv('N8N_WORKFLOW_URL')

    def summary(self,transcription: str):
        try:
            response = requests.post(self.__workflow_url, json={'transcription': transcription})
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=str(e))
