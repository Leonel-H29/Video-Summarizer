import os
from fastapi import HTTPException
from moviepy import VideoFileClip
from app.clients.langchain.langchain_client import LangchainClient
from app.clients.n8n.workflow_client import WorkflowClient

class VideosRepository:
    langchain_client = LangchainClient()
    n8n_client = WorkflowClient()

    def extract_audio(self, video_path: str) -> str:
        try:
            clip = VideoFileClip(video_path)
            extension = video_path.split('.')[-1]
            audio_path = video_path.replace(extension, '.wav')
            clip.audio.write_audiofile(audio_path)
            
            if not os.path.exists(audio_path):
                raise HTTPException(status_code=404, detail="The file hasn't been created")
            return audio_path

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])
        
    def generate_transcription(self, audio_path: str) -> str:
        return self.langchain_client.transcribe_video(audio_path)
    
    def generate_summary(self, transcription: str) -> str:
        return self.n8n_client.summary(transcription)

    def delete_audio(self, audio_path: str):
        os.remove(audio_path)
    
