#!/bin/sh
set -e

echo ">>> Iniciando script de failover..."

# Esperar a que el master esté disponible inicialmente (por si se levanta lento)
until pg_isready -h db_master -U usuario -d midb >/dev/null 2>&1; do
  echo ">>> Esperando que db_master esté disponible..."
  sleep 2
done

echo ">>> Monitoreando estado del master..."

while true; do
  if ! pg_isready -h db_master -U usuario -d midb >/dev/null 2>&1; then
    echo ">>> db_master está CAÍDO, iniciando failover..."

    # Promover el slave
    docker exec -u postgres postgres-slave psql -U usuario -c "SELECT pg_promote();" -d midb

    # Conectar el slave a la red con alias `db`
    docker network connect --alias db frontend-sd-gcc_default postgres-slave || echo "Ya conectado"

    echo ">>> Failover completo. Esperando para verificar de nuevo..."
    sleep 3600  # evita promover varias veces innecesariamente
  fi

  sleep 5
done
