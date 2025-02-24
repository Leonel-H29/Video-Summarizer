from fastapi import APIRouter, UploadFile, File, Form
from app.videos.application.service.videos_service import VideosService
from app.videos.domain.enum.language_enum import LanguageEnum

router = APIRouter()
router.prefix = "/transcript"

videosService = VideosService()


@router.post('/')
async def summary(video: UploadFile = File(...), language: LanguageEnum = Form(...)):
    return await videosService.summary(video, language)
