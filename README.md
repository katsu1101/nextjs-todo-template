# Next.js TODO Template

Next.js + TypeScript + Prisma + PostgreSQL + Redis のTODOアプリテンプレート。

## 🚀 セットアップ
```sh
git clone https://github.com/あなたのGitHubユーザー名/nextjs-todo-template.git
cd nextjs-todo-template
docker-compose up -d
npm install
npx prisma migrate dev
npm run dev
```
管理ユーザ名は「ubuntu」です。
サーバ作成後、ubuntuユーザでログインしてください。

ssh-keygen -t rsa -b 4096 -C "ksasaki1101@gmail.com"
cat ~/.ssh/id_rsa.pub

ssh ubuntu@163.43.229.33
sudo apt update
sudo apt install -y docker.io

sudo systemctl start docker
sudo systemctl enable docker

sudo apt install -y docker-compose

docker --version
docker-compose --version

sudo -i
cd /home/ubuntu

git clone https://github.com/katsu1101/nextjs-todo-template.git
cd nextjs-todo-template
nano .env

sudo rm /usr/bin/docker-compose
which docker-compose

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

docker-compose version

http://163.43.229.33:3000

nano /etc/systemd/system/todo-app.service
systemctl daemon-reload
systemctl enable todo-app
systemctl start todo-app
