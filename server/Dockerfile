FROM python:3.9-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

CMD ["sh","./entrypoint.sh"]