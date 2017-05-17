![GitHub Logo](/assets/images/Logo Amarelo Com Neon.png)

# Asteroids-Copy © David, Francielly, Kougam, Leonardo, Richard - Universidade Católica de Santa Catarina Jaragua do Sul / 2017

Um projeto WEB sobre desenvolvimento de polígonos com a replica e modificada do jogo Asteroids, tendo todos os direitos originais reservados a Atari, para fins totalmente educacionais, ou seja, sem fins lucrativos.

O jogo vai ser uma representação em neon do classico Asterois desenvolvido com HTML5, CSS3, JS com framework Phaser para desenvolvimento de jogos e demais aplicativos de desenvolvimento grafico da coleção Adobe.


Funcionalidades

Tela Inicial:

* Requisitos Não Funcionais

  * A página inicial vai contar com um menu superior que vai apresentar o nome do jogo de forma personalizada, e também com a logo da equipe em um local mais reservado ao rodapé da página junto de um botão de Zoom para alterar a resolução do jogo.
  
  * Apenas um grande botão de PLAY deve ser apresentado junto ao menu superior e a logo da equipe com o Zoom.
  
  * Todas as cores padrões do jogo devem ser vibrantes em destaque com um fundo mais escuro e contando sempre com um efeito de neon.

* Requisitos funcionais

  * Quando o botão de PLAY for acionado o menu superior deve subir suavemente e desaparecer, dando início ao jogo a nave deve de aparecer suavemente ao centro da tela junto ao Score e ao botão de som.
  
  * Quando clicarem no botão de Zoom o canvas do jogo devera de alternar entre duas resoluções para melhor agradar ao usuário final.

Jogando:

* Requisitos Não Funcionais
  
  * Cada objeto, com exceção da nave, do botão de Zoom, do botão de Som, do botão de play, da logo da equipe e do logo do jogo, uma vez gerados em tela, terão as suas cores bases alteradas.
  
  * O som do jogo deve ser continuo, apenas será mutado.
  
  * Toda destruição será acompanhada de uma animação de destruição.

* Requisitos Funcionais
  * As teclas WASD junto ao mouse ficaram responsáveis pelo movimento e rotação da nave pelo cenário, isso irá acionar a animação dos propulsores.
  * O botão direito do mouse irá disparar os projeteis da nave.
  * Quando a nave colidir com qualquer objeto de jogo que não seja o seu próprio projetil disparado ela irá ser automaticamente destruída, acionando a animação de destruição.
  * Quando a nave ou um projetil atingir um meteoro grande o meteoro deverá se dividir em dois meteoros médios.
  * Quando a nave ou um projetil atingir um meteoro médio o meteoro deverá se dividir em três meteoros pequenos.
  * Quando a nave ou um projetil atingir um meteoro pequeno o meteoro deverá ser destruído, acionando a animação de destruição.
  * Quando a nave ou um projetil atingir uma nave alienígena a nave alienígena deverá ser destruída, acionando a animação de destruição.
  * Cada meteoro ou nave alienígena destruídos deveram acrescentar pontos no score no canto superior direito da tela.
  * Quando a nave, meteoros ou a nave alienígena ultrapassarem os limites do canvas elas deveram ser transportados para o extremo oposto do canvas da região de onde acabaram de ultrapassar.
  * Quando clicado no botão de som o áudio do jogo ira alternar entre ativo e inativo.





Integrantes da Equipe (todos atuaram com desenvolvimento WEB):

  * (Scrum Master) - Richard Wilhian Schug - Desenvolvimento JS para funcionamento das regras de negocio do jogo com Phaser e organização geral do trabalho


  * David Morreira - Auxilio com desenvolvimento HTML e JS
  
  * Francielly Taynara Pinter Alegre - Estrutura HTML e fusão do desenvolvimento grafico e CSS
  
  * Kougam Marques Lemke - Designer WEB CSS com integração das produções graficas
  
  * Leonardo Ribeiro dos Santos Reis - Designer grafico e atuação junto a produção visual CSS
  
  
Previsão de desenvolvimento para o dia 22/03/2017 - Tela do basica do jogo, movimento da nave e sistema de colisão


