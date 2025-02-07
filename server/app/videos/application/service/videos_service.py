from fastapi import HTTPException, UploadFile
from app.videos.domain.enum.language_enum import LanguageEnum
from app.videos.infrastructure.repositories.videos_repository import VideosRepository


class VideosService:
    videoRepository = VideosRepository()

    async def summary(self, video_file: UploadFile, language: LanguageEnum):
        try:
            video_content = await video_file.read()
            video_path = self.videoRepository.save_video(video_content)
            audio_path = self.videoRepository.extract_audio(
                video_path)
            transcription_path = self.videoRepository.generate_transcription(
                audio_path
            )
            return self.videoRepository.generate_summary(transcription_path, language)

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])

        finally:
            self.videoRepository.delete_file(audio_path)
            self.videoRepository.delete_file(transcription_path)
            self.videoRepository.delete_file(video_path)
