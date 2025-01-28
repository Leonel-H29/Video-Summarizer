from fastapi import APIRouter

from app.videos.application.service.videos_service import VideosService

router = APIRouter()
router.prefix = "/transcript"

videosService=VideosService()

@router.post('/')
async def summary(video_path: str):
    return await videosService.summary(video_path)