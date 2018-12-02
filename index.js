const { NodeMediaCluster, NodeMediaServer } = require('node-media-server'),
  axios = require('axios'),
  conf = require('./config');

let config = {
  rtmp: {
    port: 1935,
    chunk_size: 100000,
    gop_cache: false,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: conf.http_port,
    allow_origin: '*',
    mediaroot: './media'
  },
  knzklive: {
    api_endpoint: conf.endpoint,
    api_key: conf.APIKey
  }
};

if (conf.https_port) {
  config["https"] = {
    port: conf.https_port,
    cert: conf.https_cert,
    key: conf.https_key,
  };
}

if (conf.ffmpeg_path) {
  config["trans"] = {
    ffmpeg: conf.ffmpeg_path,
    tasks: [
      {
        app: 'live',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=2:hls_flags=delete_segments]',
      }
    ]
  };
}

const nmcs = new NodeMediaServer(config);
nmcs.run();

nmcs.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nmcs.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  axios.get(`${config.knzklive.api_endpoint}publish.php?token=${args.token}&live=${StreamPath}&authorization=${config.knzklive.api_key}&mode=done_publish`).then(response => {
    console.log('[donePublish]', response);
  }).catch(error => {
    console.log('[donePublish]', error);
  })
});

nmcs.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nmcs.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
