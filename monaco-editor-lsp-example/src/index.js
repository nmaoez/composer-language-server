import * as monaco from 'monaco-editor';
import {
  listen
} from 'vscode-ws-jsonrpc';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection
} from 'monaco-languageclient';
import ReconnectingWebSocket from 'reconnecting-websocket';
import languageMode from './language-mode';

const EDITOR_CONTENT = `Hello Xtext!
Hello VSCode from Xtext!
Hello ThisFile from Other!
Hello you!`;

const LANGUAGE_ID = 'expression';

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const createLanguageClient = connection => new MonacoLanguageClient({
  name: 'Composer Expressions Language Client',
  clientOptions: {
    documentSelector: [LANGUAGE_ID],
    errorHandler: {
      error: () => ErrorAction.Continue,
      closed: () => CloseAction.DoNotRestart
    }
  },
  connectionProvider: {
    get: (errorHandler, closeHandler) => Promise.resolve(createConnection(connection, errorHandler, closeHandler))
  }
});

const createUrl = (host, port, path) => `${location.protocol === 'https:' ? 'wss' : 'ws'}://${host}:${port}${path}`;

const createWebSocket = url => new ReconnectingWebSocket(url, undefined, {
  maxReconnectionDelay: 10000,
  minReconnectionDelay: 1000,
  reconnectionDelayGrowFactor: 1.3,
  connectionTimeout: 10000,
  maxRetries: Infinity,
  debug: false
});

monaco.languages.register({
  id: LANGUAGE_ID,
  aliases: [
    LANGUAGE_ID
  ],
  extensions: [`.${LANGUAGE_ID}`],
  mimetypes: [
    `text/${LANGUAGE_ID}`
  ]
});
monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, languageMode);

monaco.editor.create(document.getElementById('container'), {
  model: monaco.editor.createModel(EDITOR_CONTENT, LANGUAGE_ID, monaco.Uri.parse(`inmemory:/demo/${guid()}.${LANGUAGE_ID}`))
});

MonacoServices.install(monaco);

listen({
  webSocket: createWebSocket(createUrl('localhost', '4389', '/')),
  onConnection: connection => {
    const languageClient = createLanguageClient(connection).start();
    connection.onClose(() => languageClient.dispose());
  }
});
