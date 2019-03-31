# KnzkLive Publish Server

[![CircleCI](https://circleci.com/gh/KnzkDev/knzklive-publish-server.svg?style=svg)](https://circleci.com/gh/KnzkDev/knzklive-publish-server)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=KnzkDev/knzklive-publish-server)](https://dependabot.com)
[![eslint: airbnb](https://badgen.net/badge/eslint/airbnb/red?icon=airbnb)](https://github.com/airbnb/javascript)
[![code style: prettier](https://badgen.net/badge/code%20style/prettier/pink)](https://github.com/prettier/prettier)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/green)](http://makeapullrequest.com)
[![MIT License](https://badgen.net/badge/license/MIT/blue)](LICENSE)

**Moved to [KnzkDev/Node-Media-Server](https://github.com/KnzkDev/Node-Media-Server)**

This server utilizes Node-Media-Server to receive RTMP from the streamer's side, handles the sending of FLV to the viewers, RTMP authentication, and counts the number of connection event.
(For the authentication process, we modified the Node-Media-Server and forcibly meshed for the KnzkLive API together.)
