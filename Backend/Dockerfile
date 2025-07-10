FROM python:3

WORKDIR /usr/src/app

RUN pip install websockets flask flask_cors psycopg2-binary

COPY . .

CMD [ "python", "./backend.py" ]
EXPOSE 8765
