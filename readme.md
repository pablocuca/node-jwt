# Exemplo de autenticação com token #

Experição de 15min para token
Utilização algoritimo RS256
Criação de private key

Como gerar chave JWT RS256

ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase #
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

