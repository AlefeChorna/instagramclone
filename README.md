# instagramclone

# TODO server

# Mobile

## Executar

``` yarn -y   ||   npm install ```
``` react-native run android   ||  react-native run-ios ```

Esta aplicação usa como servidor a biblioteca json-server que já vem instalada
como dependência de desenvolvimento no mobile.

Para rodar o servidor de teste digite o seguinte comando:
``` yarn json-server server.json -d 1000 -w ```

 - Tag "-w" indica que quando o arquivo server.jsom sofrer alguma alteração o servifor
 ira reiniciar automaticamente.
 - Tag "-d" indica que toda requisição tera um delay de 1000 milisegundos.
 
 Obs: Caso esteje rodando a aplicação em um celular Android rode o seguinte comandopara fazer o
 redirecionamento de portas:
	-> adb reverse tcp:port_mobile tcp:port_server
	Ex: adb reverse tcp:3000 tcp:3000 