from fastapi import HTTPException
from app.videos.infrastructure.repositories.videos_repository import VideosRepository


class VideosService:
    videoRepository = VideosRepository()

    async def summary(self, video_path: str):
        try:
            audio_path = self.videoRepository.extract_audio(
                video_path=video_path)
            transcription = self.videoRepository.generate_transcription(
                audio_path
            )
            summary = self.videoRepository.generate_summary(transcription)

            return {
                'transcription': transcription,
                'summary': summary
            }

        except Exception as e:
            raise HTTPException(status_code=500, detail=e.args[0])

        finally:
            self.videoRepository(audio_path)
