# Composer Language Server

A basic example project for connecting the Monaco Editor with an own Xtext language server. Note that this project is definitly not production ready and is based on the implementation of the following other projects:

* [xtext-languageserver-example](https://github.com/cdietrich/xtext-languageserver-example)
* [monaco-languageclient](https://github.com/TypeFox/monaco-languageclient/tree/master/example/src)

## Getting started

1. Clone project
2. Import as Gradle project into Eclipse
3. Open command line in project folder and run following commands:

```sh
# Windows
.\gradlew.bat clean build
# Linux or Mac
./gradlew clean build
cd monaco-editor-lsp-example
npm install
```

4. Run the `main`-method in the class `RunWebSocketServer3.xtend` in the subproject in Eclipse. Note that you should use the Eclipse IDE for Java and DSL Developers. Alternatively you can run the language server directly in the project folder with `.\gradlew.bat run` on Windows or `./gradlew run` on Linux or Mac.
5. On the command line start the frontend with the Monaco Editor:

```sh
cd monaco-editor-lsp-example
npm run serv
```

After that your browser will open up `localhost:8080` with a running Monaco Editor which is connected with the port 4389. See the network tab in the Chrome developer tools for more information regarding the messages which are sent between the client and the server.
