/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// #if MTPROTO_SW
import '../mtproto/mtproto.worker';
// #endif

import {logger, LogTypes} from '../logger';
import {CACHE_ASSETS_NAME, requestCache} from './cache';
import onStreamFetch from './stream';
import {closeAllNotifications, onPing} from './push';
import CacheStorageController from '../files/cacheStorage';
import {IS_SAFARI} from '../../environment/userAgent';
import ServiceMessagePort from './serviceMessagePort';
import listenMessagePort from '../../helpers/listenMessagePort';
import {getWindowClients} from '../../helpers/context';
import {MessageSendPort} from '../mtproto/superMessagePort';
import handleDownload from './download';

export const log = logger('SW', LogTypes.Error | LogTypes.Debug | LogTypes.Log | LogTypes.Warn);
const ctx = self as any as ServiceWorkerGlobalScope;

// #if !MTPROTO_SW
let _mtprotoMessagePort: MessagePort;
export const getMtprotoMessagePort = () => _mtprotoMessagePort;

const sendMessagePort = (source: MessageSendPort) => {
  const channel = new MessageChannel();
  serviceMessagePort.attachPort(_mtprotoMessagePort = channel.port1);
  serviceMessagePort.invokeVoid('port', undefined, source, [channel.port2]);
};

const sendMessagePortIfNeeded = (source: MessageSendPort) => {
  if(!connectedWindows.size && !_mtprotoMessagePort) {
    sendMessagePort(source);
  }
};

const onWindowConnected = (source: WindowClient) => {
  log('window connected', source.id);

  if(source.frameType === 'none') {
    log.warn('maybe a bugged Safari starting window', source.id);
    return;
  }

  sendMessagePortIfNeeded(source);
  connectedWindows.add(source.id);
};

export const serviceMessagePort = new ServiceMessagePort<false>();
serviceMessagePort.addMultipleEventsListeners({
  notificationsClear: closeAllNotifications,

  toggleStorages: ({enabled, clearWrite}) => {
    CacheStorageController.toggleStorage(enabled, clearWrite);
  },

  pushPing: (payload, source) => {
    onPing(payload, source);
  },

  hello: (payload, source) => {
    onWindowConnected(source as any as WindowClient);
  }
});

const {
  onDownloadFetch,
  onClosedWindows: onDownloadClosedWindows
} = handleDownload(serviceMessagePort);

// * service worker can be killed, so won't get 'hello' event
getWindowClients().then((windowClients) => {
  log(`got ${windowClients.length} windows from the start`);
  windowClients.forEach((windowClient) => {
    onWindowConnected(windowClient);
  });
});

const connectedWindows: Set<string> = new Set();
listenMessagePort(serviceMessagePort, undefined, (source) => {
  const isWindowClient = source instanceof WindowClient;
  if(!isWindowClient || !connectedWindows.has(source.id)) {
    return;
  }

  log('window disconnected');
  connectedWindows.delete(source.id);
  if(!connectedWindows.size) {
    log.warn('no windows left');

    if(_mtprotoMessagePort) {
      serviceMessagePort.detachPort(_mtprotoMessagePort);
      _mtprotoMessagePort = undefined;
    }

    onDownloadClosedWindows();
  }
});
// #endif

const onFetch = (event: FetchEvent): void => {
  // #if !DEBUG
  if(
    !IS_SAFARI &&
    event.request.url.indexOf(location.origin + '/') === 0 &&
    event.request.url.match(/\.(js|css|jpe?g|json|wasm|png|mp3|svg|tgs|ico|woff2?|ttf|webmanifest?)(?:\?.*)?$/)
  ) {
    return event.respondWith(requestCache(event));
  }
  // #endif

  try {
    const [, url, scope, params] = /http[:s]+\/\/.*?(\/(.*?)(?:$|\/(.*)$))/.exec(event.request.url) || [];

    // log.debug('[fetch]:', event);

    switch(scope) {
      case 'stream': {
        onStreamFetch(event, params);
        break;
      }

      case 'download': {
        onDownloadFetch(event, params);
        break;
      }
    }
  } catch(err) {
    log.error('fetch error', err);
    event.respondWith(new Response('', {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {'Cache-Control': 'no-cache'}
    }));
  }
};

const onChangeState = () => {
  ctx.onfetch = onFetch;
};

ctx.addEventListener('install', (event) => {
  log('installing');
  event.waitUntil(ctx.skipWaiting().then(() => log('skipped waiting'))); // Activate worker immediately
});

ctx.addEventListener('activate', (event) => {
  log('activating', ctx);
  event.waitUntil(ctx.caches.delete(CACHE_ASSETS_NAME).then(() => log('cleared assets cache')));
  event.waitUntil(ctx.clients.claim().then(() => log('claimed clients')));
});

// ctx.onerror = (error) => {
//   log.error('error:', error);
// };

// ctx.onunhandledrejection = (error) => {
//   log.error('onunhandledrejection:', error);
// };

ctx.onoffline = ctx.ononline = onChangeState;

onChangeState();
