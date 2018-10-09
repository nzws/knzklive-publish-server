# KnzkLive-Publish-Server

このサーバーではNode-Media-Serverを用いて配信者側からのRTMP受信→視聴者側にflvで送信を行っています。

また、RTMPの認証処理や接続イベントによる人数取得なども行っています。

(認証処理に関してはNode-Media-Serverを改造してKnzkLiveのAPIと無理やり噛み合わせています)

## インストールガイド(仮)
割と適当

```
sudo su -
yum update -y
curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install -y gcc-c++ make git nodejs
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
yum install -y yarn
yum -y install epel-release
yum -y install epel-release && rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
yum -y install ffmpeg ffmpeg-devel

adduser knzklive
useradd knzklive
su - knzklive
git clone https://github.com/KnzkDev/KnzkLive-Publish-Server
cd KnzkLive-Publish-Server
yarn install
cp config.sample.js config.js
vi config.js
```

`vi /etc/systemd/system/knzklive.service`
```
[Unit]
Description=KnzkLive
After=syslog.target network.target

[Service]
Type=simple
ExecStart=/usr/bin/yarn run start
WorkingDirectory=/home/knzklive/KnzkLive-Publish-Server
KillMode=process
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
```