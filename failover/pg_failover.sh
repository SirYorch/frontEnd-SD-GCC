#!/bin/sh

MASTER_HOST="db_master"
SLAVE_HOST="db_slave"
PGUSER="replicador"
PGPASSWORD="replipass"
PGPORT=5432
RETRIES=10

export PGPASSWORD="$PGPASSWORD"  

echo "[INFO] Iniciando monitoreo de failover..."

while true; do
  echo "[CHECK] Verificando estado del master..."
  pg_isready -h "$MASTER_HOST" -p "$PGPORT" -U "$PGUSER"
  if [ $? -ne 0 ]; then
    echo "[FAILOVER] El master no responde. Intentando conectar al slave..."

    for i in $(seq 1 $RETRIES); do
      echo "[TRY] Conectando a $SLAVE_HOST (intento $i)..."
      psql -h "$SLAVE_HOST" -U "$PGUSER" -d postgres -c "SELECT 1;" && break
      sleep 2
    done

    echo "[PROMOTE] Ejecutando promoción en el slave..."
    psql -h "$SLAVE_HOST" -U "$PGUSER" -d postgres -c "SELECT pg_promote();"

    echo "[INFO] Promoción enviada al slave. Saliendo del monitoreo."
    break
  else
    echo "[OK] Master activo. Próxima verificación en 10 segundos..."
  fi
  sleep 10
done
