# KnzkLive Publish Server

[![CircleCI](https://circleci.com/gh/KnzkDev/knzklive-publish-server.svg?style=svg)](https://circleci.com/gh/KnzkDev/knzklive-publish-server)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=KnzkDev/knzklive-publish-server)](https://dependabot.com)
[![eslint: airbnb](https://badgen.net/badge/eslint/airbnb/red?icon=airbnb)](https://github.com/airbnb/javascript)
[![code style: prettier](https://badgen.net/badge/code%20style/prettier/pink)](https://github.com/prettier/prettier)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/green)](http://makeapullrequest.com)
[![MIT License](https://badgen.net/badge/license/MIT/blue)](LICENSE)

This server utilizes Node-Media-Server to receive RTMP from the streamer's side, handles the sending of FLV to the viewers, RTMP authentication, and counts the number of connection event.
(For the authentication process, we modified the Node-Media-Server and forcibly meshed for the KnzkLive API together.)

## Installation guide

```bash
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
git clone https://github.com/KnzkDev/knzklive-publish-server && cd knzklive-publish-server
yarn install
cp config.sample.js config.js
nano config.js
```

`nano /etc/systemd/system/knzklive.service`

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
