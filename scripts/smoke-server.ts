import * as liveServer from 'live-server';

liveServer.start({
  root: './dist/flare',
  open: false,
  port: 4201,
  file: 'index.html'
});
