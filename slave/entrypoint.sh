#!/bin/bash
set -e

until pg_isready -h db_master -p 5432 -U replicador; do
  echo "Esperando al master..."
  sleep 2
done

if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "Haciendo pg_basebackup desde el master..."
  rm -rf "$PGDATA"/*
  pg_basebackup -h db_master -D "$PGDATA" -U replicador -v -P --wal-method=stream
  echo "primary_conninfo = 'host=db_master port=5432 user=replicador password=replipass'" >> "$PGDATA/postgresql.auto.conf"
  touch "$PGDATA/standby.signal"
  chown -R postgres:postgres "$PGDATA"
fi

exec docker-entrypoint.sh postgres
