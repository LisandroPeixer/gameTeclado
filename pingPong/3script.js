const canvas = document.getElementById('canvas');     // referencia do canvas pelo ID
const ctx = canvas.getContext('2d');                  // contexto 2D

//_6_/////////////////////////////// variaveis
   const quadraAltura = canvas.height;
   const quadraLargura = canvas.width; 
   const redeLargura = 4;
   const redeAltura = canvas.height;
   const raqueteLargura = 10;
   const raqueteAltura = 100;
   let setaCima = false;
   let setaBaixo = false;
//_5_/////////////////////////////// declarando objetos
   const rede = {                                // rede 
      x: quadraLargura / 2 - redeLargura / 2,  
      y: 0,  
      Largura: redeLargura,  
      Altura: redeAltura,  
      cor: "#FFF"
   };
   const P1 = {                                  // raquete P1
      x: 10,  
      y: quadraAltura / 2 - raqueteAltura / 2,  
      Largura: raqueteLargura,  
      Altura: raqueteAltura,  
      cor: '#FFF',  
      placar: 0
   };
   const COM = {                                 // raquete COM
      x: quadraLargura - (raqueteLargura + 10),  
      y: quadraAltura / 2 - raqueteAltura / 2,  
      Largura: raqueteLargura,  
      Altura: raqueteAltura,  
      cor: '#FFF',  
      placar: 0
   };
   const bola = {                                // bola
      x: quadraLargura / 2,  
      y: quadraAltura / 2,  
      raio: 7,  
      velocidade: 7,  
      velocidadeX: 5,  
      velocidadeY: 5,  
      cor: '#05EDFF'
   };
//_4_/////////////////////////////// desenhando objetos
   function desenhaRede() {                                       // função para desenhar rede
      ctx.fillStyle = rede.cor;                                   // define a cor da rede
      ctx.fillRect(rede.x, rede.y, rede.Largura, rede.Altura);
   }
   function desenhaPlacar(x, y, placar) {                         // função para desenhar placar
      ctx.fillStyle = '#fff';  
      ctx.font = '35px sans-serif';  
      ctx.fillText(placar, x, y);
   }
   function desenhaRaquete(x, y, Largura, Altura, cor) {          // função para desenhar raquete
      ctx.fillStyle = cor;  
      ctx.fillRect(x, y, Largura, Altura);
   }
   function desenhaBola(x, y, raio, cor) {                        // função para desenhar bola
      ctx.fillStyle = cor;  
      ctx.beginPath();  
      ctx.arc(x, y, raio, 0, Math.PI * 2, true);    // x, y, raio, angulo, fimAngulo, rotacao)  
      ctx.closePath();                                // π * 2 raio = 360 graus
      ctx.fill();
   }
//_3.3_///////////////////////////// funcao Movendo as raquetes
   window.addEventListener('keydown', teclaParaBaixo);   // adiciona um eventListener à janela do navegador
   window.addEventListener('keyup', teclaParaCima);

   function teclaParaBaixo(event) {    // é ativado quando pressionamos uma tecla
      switch (event.keyCode) {         // pega o keyCode
         case 38:                      // tecla "seta para cima" 
         setaCima = true;      
         break;    
         case 40:                      // tecla "seta para baixo" 
         setaBaixo = true;      
         break;  
      }
   }

   function teclaParaCima(event) {     // é ativado quando soltamos a tecla
      switch (event.keyCode) {         // pega o keyCode
         case 38:                      // tecla "seta para cima"  
         setaCima = false;      
         break;    
         case 40:                      // tecla "seta para baixo"   
         setaBaixo = false;      
         break;  
      }
   }

//_3.2_///////////////////////////// funcao de recomeco
   function reset() {  

      bola.x = quadraLargura / 2;          // reseta o valor da bola para valores mais antigos
      bola.y = quadraAltura / 2;  
      bola.velocidade = 7;  
 
      bola.velocidadeX = -bola.velocidadeX;   // muda a direção da bola
      bola.velocidadeY = -bola.velocidadeY;
   }

//_3.1_///////////////////////////// funcao detectora de colisoes
   function detectaColisao(player, bola) { 

      player.topo = player.y;  
      player.dir = player.x + player.Largura;  
      player.fundo = player.y + player.Altura;  
      player.esq = player.x;  

      bola.topo = bola.y - bola.raio;  
      bola.dir = bola.x + bola.raio;  
      bola.fundo = bola.y + bola.raio;
      bola.esq = bola.x - bola.raio;  

      return   bola.esq < player.dir &&         // retorne true or false  
               bola.topo < player.fundo && 
               bola.dir > player.esq && 
               bola.fundo > player.topo;
   }

//_2.2_///////////////////////////// função de atualização, para atualizar a posição das coisas
   function atualiza() {       

      if (setaCima && P1.y > 0) {                                          // move a raquete
         P1.y -= 8;  
      } else if (setaBaixo && (P1.y < quadraAltura - P1.Altura)) {    
            P1.y += 8;  
      }  
      
      if (bola.y + bola.raio >= quadraAltura || bola.y - bola.raio <= 0) {     // verifica se a bola bate na parede superior ou inferior
         bola.velocidadeY = -bola.velocidadeY;  
      }   
      
      if (bola.x + bola.raio >= quadraLargura) {             // se a bola bater na parede direita
         P1.placar += 1;                                     // P1 marcou 1 ponto
         reset();                                            // recomece
      }  

      if (bola.x - bola.raio <= 0) {                       // se a bola bater na parede esquerda
         COM.placar += 1;                                  // COM marcou 1 ponto
         reset();                                          // recomece
      }  
      
      bola.x += bola.velocidadeX;                               // movimento da bola  
      bola.y += bola.velocidadeY; 
      COM.y += ((bola.y - (COM.y + COM.Altura / 2))) * 0.09;    // movimento da raquete adversaria
      let player = (bola.x < quadraLargura / 2) ? P1 : COM;     // detecção de colisão da raquete

      if (detectaColisao(player, bola)) {                       // se a colisao for detectada
         let angulo = 0;                                        // o ângulo padrão é 0 graus em radianos

         if (bola.y < (player.y + player.Altura / 2)) {         // se a bola bater no topo da raquete
            angulo = -1 * Math.PI / 4;                          // então -1 * Math.PI / 4 = -45deg
         } else if (bola.y > (player.y + player.Altura / 2)) {  // e se atingiu o fundo da raquete              
            angulo = Math.PI / 4;                               // então o ângulo será Math.PI / 4 = 45deg   
         }    

//_2.2.1_/////////////////////////// muda a velocidade da bola de acordo com qual a raquete na bola bate    

         bola.velocidadeX = (player === P1 ? 1 : -1) * bola.velocidade * Math.cos(angulo);    
         bola.velocidadeY = bola.velocidade * Math.sin(angulo);              
         bola.velocidade += 0.2;                                           // aumentar a velocidade da bola  
      }
   }

//_2.1_///////////////////////////// funcao carrega canvas
   function desenha() {  
      ctx.fillStyle = "#000";                                              // cor preto   
      ctx.fillRect(0, 0, canvas.width, canvas.height);                     // desenha quadra  
      
      desenhaRede();                                                       // desenha rede
      desenhaPlacar(quadraLargura / 4, quadraAltura / 6, P1.placar);       // desenha P1 placar  
      desenhaPlacar(3 * quadraLargura / 4, quadraAltura / 6, COM.placar);  // desenha COM placar  
      desenhaRaquete(P1.x, P1.y, P1.Largura, P1.Altura, P1.cor);           // desenha P1 raquete  
      desenhaRaquete(COM.x, COM.y, COM.Largura, COM.Altura, COM.cor);      // desenha COM raquete  
      desenhaBola(bola.x, bola.y, bola.raio, bola.cor);                    // desenha bola  
   }

//_1_/////////////////////////////// funcao principal Loop 
   function Loop() {     
      atualiza();                 // atualiza() atualiza o jogo       
      desenha();                  // desenha() desenha quadra, rede, placar, raquete e bola 
   }
   setInterval(Loop, 1000 / 60);  // chama Loop() 60x por segundo 