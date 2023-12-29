FROM mariadb:latest

COPY ./init /docker-entrypoint-initdb.d
COPY ./conf /etc/mysql/mariadb.conf.d/
