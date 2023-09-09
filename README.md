# PricerUpdater

### Desafio - Shopper

<img src = "src\assets\screencapture.png"><br>

PricerUpdater é uma aplicação web onde você pode utilizar um arquivo .csv para atualizar um lote de produtos de uma unica vez. Este arquivo .csv precisa obedecer algumas regras para que ele possa ser utilizado: <br><br>
o Todos os campos necessários existem?<br>
o Os códigos de produtos informados existem?<br>
o Os preços estão preenchidos e são valores numéricos validos.?<br>
o Os preços de atualização dos produtos ficarão abaixo do custo deles?<br>
o O valor de reajuste para mais ou para menos ultrapassa 10% do preço atual do produto?<br>

## Tutorial

1. Acesse o endereço https://github.com/raonicerqueira/desafio-shopper-server<br>
2. Faça download da API contida no projeto acima no seu desktop.<br>
3. Abra o projeto usando o VSCode https://code.visualstudio.com/ (link para download caso não possua o VSCode instalado no seu desktop).<br>
4. Execute o comando "npm run dev" no seu terminal localizado dentro da pasta do projeto para inicializar a API, se estiver tudo correto, deverá aparecer a mensagem "Server is running...".<br>
5. Acesse o endereço https://github.com/raonicerqueira/desafio-shopper<br>
6. Faça download do projeto acima no seu desktop.<br>
7. Execute o comando"npm install" e depois "npm run dev" no seu terminal localizado dentro da pasta do projeto para inicializar a aplicação web, se estiver tudo correto, deverá aparecer o endereço do localhost, na porta 3000.<br>
8. Deverá ser instalado um banco de dados MYSQL, com a database "estoque", usuário e senha "root". Na pasta assets existe um arquivo database.sql que pode ser utilizado para a criação do BD.<br>
9. Pronto, já pode utilizar um arquivo .csv para fazer a atualização dos preços dos produtos armazenados no banco de dados, lembrando que é necessário que o .csv esteja com no mesmo modelo do arquivo anexado à pasta assets do projeto.<br>
