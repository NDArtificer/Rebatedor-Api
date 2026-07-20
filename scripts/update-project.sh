USER=$GIT_USER
TOKEN=$GIT_TOKEN

if [ -z "$USER" ] || [ -z "$TOKEN" ]; then
  echo "Erro: GIT_USER e GIT_TOKEN devem estar definidos."
  exit 1
fi

REPO_URL="https://$USER:$TOKEN@github.com/usuario/repositorio.git"
REPO_DIR="repositorio"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "=== Clonando repositório ==="
  git clone $REPO_URL $REPO_DIR
  cd $REPO_DIR
  echo "=== Repositório clonado com sucesso ==="
else
  echo "=== Atualizando código ==="
  cd $REPO_DIR
  git pull origin main
  echo "=== Repositório atualizado com sucesso ==="
fi