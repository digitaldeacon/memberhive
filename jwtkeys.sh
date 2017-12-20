mkdir -p ./.ssh/
ssh-keygen -t rsa -b 4096 -f ./.ssh/jwtRS256.key
# Don't add passphrase
openssl rsa -in ./.ssh/jwtRS256.key -pubout -outform PEM -out ./.ssh/jwtRS256.key.pub
cat ./.ssh/jwtRS256.key
cat ./.ssh/jwtRS256.key.pub