## Instrucciones

Las únicas instrucciones de funcionamiento son el cambiar los métodos de escritura de CRLF a LF en caso de trabajar en windows, en los archivos entrypoint.sh y pg_failover.sh dado que windows trabaja por defecto con carriage return y line feed, y pero las máquinas de docker, usan bash de linux, que solo usa line feed.