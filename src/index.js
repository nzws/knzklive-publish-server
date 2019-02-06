import { NodeMediaServer } from 'node-media-server'
import axios from 'axios'
import conf from '../config'
const fs = require('fs')

const config = {
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
}

if (conf.https_port) {
  config['https'] = {
    port: conf.https_port,
    cert: conf.https_cert,
    key: conf.https_key
  }
}

if (conf.ffmpeg_path) {
  const tasks = [
    {
      app: 'live',
      ac: 'aac',
      hls: true,
      hlsFlags: '[hls_time=1:hls_list_size=2:hls_flags=delete_segments]'
    }
  ]

  if (conf.enable_ts) {
    tasks.push({
      app: 'ts',
      mp4: true,
      mp4Flags: '[movflags=faststart]'
    })
  }

  config['trans'] = {
    ffmpeg: conf.ffmpeg_path,
    tasks: tasks
  }
}

const nmcs = new NodeMediaServer(config)
nmcs.run()

nmcs.on('prePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  )
})

nmcs.on('donePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  )
  const dir =
    config.http.mediaroot +
    '/ts/' +
    StreamPath.replace(/\/live\/(\d+)stream/g, '$1') +
    'stream'
  const file = getLastFile(dir)
  axios
    .get(
      `${config.knzklive.api_endpoint}publish.php?token=${
        args.token
      }&live=${StreamPath}&authorization=${
        config.knzklive.api_key
      }&mode=done_publish&ts_file=${file}`
    )
    .then(response => {
      console.log('[donePublish]', response.data)
    })
    .catch(error => {
      console.log('[donePublish]', error)
    })
})

nmcs.on('postPlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on postPlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  )
})

nmcs.on('donePlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  )
})

function getLastFile(dir) {
  const files = fs.readdirSync(dir)
  return files[files.length - 1]
}

/* 結合するのは諦めた
function generateTS(id) {
  const path = config.http.mediaroot + '/ts/' + id + 'stream';
  const paths = getFiles(path);
  if (!paths[1]) return paths[0];
  const pathsStr = paths.join('|');
  const file = path + '/' + Date.now() + '.mp4';
  let argv = ['-i', 'concat:' + pathsStr, '-c', 'copy', file];
  const ffmpeg_exec = spawn(config.trans.ffmpeg, argv);
  console.log(argv);
  ffmpeg_exec.on('error', (e) => {
    console.error(e);
  });

  ffmpeg_exec.on('close', (code) => {
    console.log('[merged] ' + id, code);
    return file;
  });
}
*/
