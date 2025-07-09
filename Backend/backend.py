from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os
import logging

# Desactivar todos los logs
log = logging.getLogger('werkzeug')
log.disabled = True
logging.basicConfig(level=logging.CRITICAL)

app = Flask(__name__)
app.logger.disabled = True

CORS(app)

# Configuración de conexión
DB_HOST = os.getenv("DB_HOST", "192.168.1.101")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "appdbf")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "123")

@app.route('/')
def home():
    return "", 204

@app.route('/datos')
def obtener_datos():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cur = conn.cursor()
        cur.execute("SELECT * FROM post;")
        columnas = [desc[0] for desc in cur.description]
        filas = cur.fetchall()
        resultado = [dict(zip(columnas, fila)) for fila in filas]
        cur.close()
        conn.close()
        return jsonify(resultado)
    except Exception:
        return jsonify({"error": "Error al obtener los datos"}), 500

@app.route('/insertar', methods=['POST'])
def insertar_dato():
    contenedor = request.json.get("contenedor")
    imagen = request.json.get("imagen")
    if not contenedor:
        return jsonify({"error": "Falta el campo 'contenedor'"}), 400

    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO post (contenedor, imagen) VALUES (%s, %s);",
            (contenedor, imagen if imagen else None)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"mensaje": "Dato insertado correctamente"})
    except Exception:
        return jsonify({"error": "Error al insertar el dato"}), 500

if __name__ == '__main__':
    PORT = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=PORT)
