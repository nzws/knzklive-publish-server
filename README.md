# KnzkLive-Publish-Server

このサーバーではNode-Media-Serverを用いて配信者側からのRTMP受信→視聴者側にflvで送信を行っています。

また、RTMPの認証処理や接続イベントによる人数取得なども行っています。

(認証処理に関してはNode-Media-Serverを改造してKnzkLiveのAPIと無理やり噛み合わせています)