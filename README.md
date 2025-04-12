# Classificador de Imagens

Um aplicativo web que classifica imagens entre diferentes categorias de animais (Ovelha, Cavalo, Elefante, Borboleta, Galinha, Vaca e Esquilo) usando TensorFlow.js e Teachable Machine.

## Visão Geral

Este projeto implementa um classificador de imagens com uma interface de usuário amigável que permite o upload de imagens por clique ou arrastar/soltar. O modelo pré-treinado analisa a imagem e exibe as probabilidades para cada classe animal.

## Estrutura do Projeto

- `index.html` - Estrutura da página web
- `style.css` - Estilos e layout responsivo
- `site.js` - Lógica JavaScript para interação com o usuário e classificação de imagens
- `my_model/` - Diretório contendo os arquivos do modelo treinado

## Requisitos

- Navegador moderno com suporte a JavaScript
- Conexão com a Internet (para carregar as bibliotecas necessárias)

## Como Usar

1. Clone este repositório
2. Use a extensão Live Server do VS Code para iniciar um servidor local
3. Abra o navegador no endereço indicado pelo Live Server (geralmente http://127.0.0.1:5500)
4. Faça upload de uma imagem para classificá-la

## Tecnologias Utilizadas

- TensorFlow.js
- Teachable Machine
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome

## Licença

MIT
