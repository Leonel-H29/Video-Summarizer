import os
import uuid
from fastapi import HTTPException
from moviepy import VideoFileClip
from app.clients.langchain.langchain_client import LangchainClient
from app.clients.n8n.workflow_client import WorkflowClient
from app.videos.domain.enum.language_enum import LanguageEnum


class VideosRepository:
    langchain_client = LangchainClient()
    n8n_client = WorkflowClient()
    __audio_directory = "app/cache/audio"
    __video_directory = "app/cache/video"

    def save_video(self, video_content: bytes, file_extension: str = '.mp4') -> str:

        if not os.path.exists(self.__video_directory):
            os.makedirs(self.__video_directory)
        video_path = f"{self.__video_directory}/{uuid.uuid4()}{file_extension}"

        with open(video_path, 'wb') as video_file:
            video_file.write(video_content)

        return video_path

    def extract_audio(self, video_path: str) -> str:
        try:
            clip = VideoFileClip(video_path)
            audio_path = f"{self.__audio_directory}/{uuid.uuid4()}.wav"
            clip.audio.write_audiofile(audio_path)

            if not os.path.exists(audio_path):
                raise HTTPException(
                    status_code=404, detail="The file hasn't been created")
            return audio_path

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])

    def generate_transcription(self, audio_path: str) -> str:
        return self.langchain_client.transcribe_video(audio_path)

    def generate_summary(self, transcription: str, language: LanguageEnum) -> str:
        return self.n8n_client.summary(transcription, language)

    def delete_file(self, file_path: str):
        if os.path.exists(file_path):
            os.remove(file_path)
