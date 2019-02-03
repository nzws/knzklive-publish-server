# KnzkLive Publish Server

このサーバーではNode-Media-Serverを用いて配信者側からのRTMP受信→視聴者側にflvで送信を行っています。

また、RTMPの認証処理や接続イベントによる人数取得なども行っています。

(認証処理に関してはNode-Media-Serverを改造してKnzkLiveのAPIと無理やり噛み合わせています)

## インストールガイド(仮)
割と適当

```
sudo su -
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install -y nodejs
yum -y install epel-release
rpm -ihv http://awel.domblogger.net/7/media/x86_64/awel-media-release-7-6.noarch.rpm
yum update -y
yum install -y git ffmpeg ffmpeg-devel
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
yum install -y yarn

adduser knzklive
useradd knzklive
su - knzklive
git clone https://github.com/KnzkDev/knzklive-publish-server
cd knzklive-publish-server
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
WorkingDirectory=/home/knzklive/knzklive-publish-server
KillMode=process
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
```
