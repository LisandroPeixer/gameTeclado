const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//_4_/////////////////////////////// objetos
	class obj {
		constructor(cor, x, y, largura, altura, raio, velocidade, velocidadeX, velocidadeY, placar){
			this.cor = cor;
			this.x = x;
			this.y = y;
			this.largura = largura;
			this.altura = altura;
			this.raio = raio;
			this.velocidade = velocidade;
			this.velocidadeX = velocidadeX;
			this.velocidadeY = velocidadeY;	
			this.placar = placar;
		}
		retangulo(){
			ctx.fillStyle = this.cor;                                     
			ctx.fillRect(this.x, this.y, this.largura, this.altura); 
			return ctx
		}
		circulo(){
			ctx.fillStyle = this.cor;  
			ctx.beginPath();  
			ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, true);    // x, y, raio, angulo, fimAngulo, rotacao)  
			ctx.fill();
			return ctx;
		}
		text() {                         // função para desenhar placar
			ctx.fillStyle = this.cor;  
			ctx.font = '35px sans-serif';  
			ctx.fillText(this.placar, this.x, this.y,);
			return ctx;
		 }
	}
	let quadra = new obj("green", 0, 0, canvas.width, canvas.height, null, null, null, null, null);
	let rede = new obj("white", quadra.largura / 2 - 2, 0, 4, quadra.altura, null, null, null, null, null)

	let p1Trave = new obj(rede.cor, 10, quadra.altura / 2 - 100 / 2, 10, 100, null, null, null, null, 0)
	let p1 = new obj("blue", quadra.largura/6 , quadra.altura/2, null, null, 20, 5, 5, null, 0)
	let p2 = new obj("blue", quadra.largura/10 , quadra.altura/2, null, null, 20, 5, 5, null, 0)
	let p1Placar = new obj("white", quadra.largura / 4, quadra.altura / 4, null, null, null, null, null, null, p1.placar)
	
	let comTrave = new obj(rede.cor, quadra.largura - 20, quadra.altura / 2 - 100 / 2, 10, 100, null, null, null, null, 0)
	let com = new obj("red", 6*quadra.largura/10 , quadra.altura / 2, null, null, 20, 5, 5, null, 0)
	let com2 = new obj("red", 9*quadra.largura/10 , quadra.altura / 2, null, null, 20, 5, 5, null, 0)
	let comPlacar = new obj("white", 3* quadra.largura / 4, quadra.altura / 4, null, null, null, null, null, null, com.placar)
	
	let bola = new obj("yellow", quadra.largura / 2, quadra.altura / 2, null, null, 10, 2, 2, null, null)

//_3.3_///////////////////////////// movimento p1
	let setaCima = false;
	let setaBaixo = false;
	let setaFrente = false;
	let setaTras = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 38){
			setaCima = true; 
		} else if (e.keyCode == 40){
			setaBaixo = true;      
		} else if (e.keyCode == 37){
			setaFrente = true; 
		} else if (e.keyCode == 39){
			setaTras = true;      
		}
	} 

	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 38){
			setaCima = false; 
		} else if (e.keyCode == 40){
			setaBaixo = false;      
		} else if (e.keyCode == 37){
			setaFrente = false; 
		} else if (e.keyCode == 39){
			setaTras = false;      
		}
	}
//_3.2_///////////////////////////// recomeco
	function reset() {  
		bola.x = quadra.largura / 2;          // reseta o valor da bola para valores mais antigos
		bola.y = quadra.altura / 2;  
		bola.velocidade = 7;     
		bola.velocidadeX = -bola.velocidadeX;   // muda a direção da bola
		bola.velocidadeY = -bola.velocidadeY;
		p1.x = quadra.largura/6;
		p1.y = quadra.altura/2;
		p2.x = quadra.largura/10;
		p2.y = quadra.altura/2;
		com.x = 6*quadra.largura/10;
		com.y = quadra.altura/2;
		com2.x = 9*quadra.largura/10;
		com2.y = quadra.altura/2;
	 }
	 
//_3.1_///////////////////////////// colisoes
 // Colisao p1 detecta
	function detectaColisaoP1(p1, bola) { 
 		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		bola.topo = bola.y - bola.raio;  
		bola.dir = bola.x + bola.raio;  
		bola.fundo = bola.y + bola.raio;
		bola.esq = bola.x - bola.raio;  

		return  bola.topo < p1.fundo &&
				bola.dir > p1.esq && 
				bola.fundo > p1.topo &&
				bola.esq < p1.dir;   			
	}
 // Colisao p2 detecta
	function detectaColisaoP2(p2, bola) { 
	   p2.topo = p2.y - p2.raio;  
	   p2.dir = p2.x + p2.raio;  
	   p2.fundo = p2.y + p2.raio;  
	   p2.esq = p2.x - p2.raio;  

	   bola.topo = bola.y - bola.raio;  
	   bola.dir = bola.x + bola.raio;  
	   bola.fundo = bola.y + bola.raio;
	   bola.esq = bola.x - bola.raio;  

	   return  bola.topo < p2.fundo &&
			   bola.dir > p2.esq && 
			   bola.fundo > p2.topo &&
			   bola.esq < p2.dir;   			
   }
 // Colisao com detecta
	function detectaColisaoCom(com, bola) { 
		com.topo = com.y - com.raio;  
		com.dir = com.x + com.raio;  
		com.fundo = com.y + com.raio;  
		com.esq = com.x - com.raio;  

		bola.topo = bola.y - bola.raio;  
		bola.dir = bola.x + bola.raio;  
		bola.fundo = bola.y + bola.raio;
		bola.esq = bola.x - bola.raio;  

		return  bola.topo < com.fundo &&
				bola.dir > com.esq && 
				bola.fundo > com.topo &&
				bola.esq < com.dir;   			
	}
 // Colisao com detecta
	function detectaColisaoCom2(com2, bola) { 
		com2.topo = com2.y - com2.raio;  
		com2.dir = com2.x + com2.raio;  
		com2.fundo = com2.y + com2.raio;  
		com2.esq = com2.x - com2.raio;  

		bola.topo = bola.y - bola.raio;  
		bola.dir = bola.x + bola.raio;  
		bola.fundo = bola.y + bola.raio;
		bola.esq = bola.x - bola.raio;  

		return  bola.topo < com2.fundo &&
				bola.dir > com2.esq && 
				bola.fundo > com2.topo &&
				bola.esq < com2.dir;   			
	}		   
 // Colisao gol p1 detecta
	function detectaGolP1(p1Trave, bola) { 
		p1Trave.topo = p1Trave.y;  
		p1Trave.dir = p1Trave.x + p1Trave.largura;  
		p1Trave.fundo = p1Trave.y + p1Trave.altura;  
		p1Trave.esq = p1Trave.x; 

		bola.topo = bola.y - bola.raio;  
		bola.dir = bola.x + bola.raio;  
		bola.fundo = bola.y + bola.raio;
		bola.esq = bola.x - bola.raio;  

		return  bola.topo < p1Trave.fundo &&
				bola.dir > p1Trave.esq && 
				bola.fundo > p1Trave.topo &&
				bola.esq < p1Trave.dir;       				
	}
 // Colisao gol com	detecta
	function detectaGolCom(comTrave, bola) { 
		comTrave.topo = comTrave.y;  
		comTrave.dir = comTrave.x + comTrave.largura;  
		comTrave.fundo = comTrave.y + comTrave.altura;  
		comTrave.esq = comTrave.x; 

		bola.topo = bola.y - bola.raio;  
		bola.dir = bola.x + bola.raio;  
		bola.fundo = bola.y + bola.raio;
		bola.esq = bola.x - bola.raio;  

		return  bola.topo < comTrave.fundo &&
				bola.dir > comTrave.esq && 
				bola.fundo > comTrave.topo &&
				bola.esq < comTrave.dir;            				
	}
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
 	// movimento p1 
		if (setaCima && p1.y > 10) {                                          			// move p1
		    p1.y -= 10;  
		} else if (setaBaixo && (p1.y < quadra.altura -10 - p1.altura)) {    
			p1.y += 10;  
		}  else	if (setaFrente && p1.x > 10) {                                          
			p1.x -= 10;  
		} else if (setaTras && (p1.x < (quadra.largura) - 15 - p1.largura)) {    
			p1.x += 10;  
		}
	// movimento da bola  	
		if (bola.y + bola.raio >= quadra.altura || bola.y - bola.raio <= 0) {    		// verifica se a bola bate nas paredes
			bola.velocidadeY = -bola.velocidadeY;  
		} else if (bola.x + bola.raio >= quadra.largura || bola.x - bola.raio <= 0) {    
			bola.velocidadeX = -bola.velocidadeX;  
		} 		 			 
		 bola.x += bola.velocidadeX;                              
		 bola.y += bola.velocidadeY; 
 	// movimento com
		 com.y += ((bola.y - (com.y + com.altura / 2)) * 0.09);    
		 com.x += ((bola.x - (com.x + com.largura / 2)) * 0.09); 
		 p2.y += ((bola.y - (p2.y + p2.altura / 4)) * 0.09);
		 com2.y += ((bola.y - (com2.y + com2.altura / 2)) * 0.09);     
 // Colisao atualiza
  // Colisao p1 atualiza
		if (detectaColisaoP1(p1, bola)) {                       // se a colisao for detectada
			let angulo = 0;                                     // o ângulo padrão é 0 graus em radianos
			if (bola.x + bola.raio < p1.x + p1.raio)  {         // se a bola bater no topo do p1
				angulo = -1 * Math.PI / 4;      				// então -1 * Math.PI / 4 = -45deg
			} else if (bola.y + bola.raio > p1.y + p1.raio) {  	// e se atingiu o fundo do p1              
				angulo = Math.PI / 4;           				// então o ângulo será Math.PI / 4 = 45deg   
			} 
	// muda a velocidade da bola de acordo com a batida   
		bola.velocidadeX = (detectaColisaoP1(p1, bola) ? 1 : -1) * bola.velocidade * Math.cos(angulo);    
		bola.velocidadeY = bola.velocidade * Math.sin(angulo);              
		bola.velocidade += 0.2;  
		} 
  // Colisao p2 atualiza
		if (detectaColisaoP2(p2, bola)) {                       // se a colisao for detectada
			let angulo = 0;                                     // o ângulo padrão é 0 graus em radianos
			if (bola.x + bola.raio < p2.x + p2.raio)  {         // se a bola bater no topo do p2
				angulo = -1 * Math.PI / 4;      				// então -1 * Math.PI / 4 = -45deg
			} else if (bola.y + bola.raio > p2.y + p2.raio) {  	// e se atingiu o fundo do p2              
				angulo = Math.PI / 4;           				// então o ângulo será Math.PI / 4 = 45deg   
			} 
	// muda a velocidade da bola de acordo com a batida   
		bola.velocidadeX = (detectaColisaoP2(p2, bola) ? 1 : -1) * bola.velocidade * Math.cos(angulo);    
		bola.velocidadeY = bola.velocidade * Math.sin(angulo);              
		bola.velocidade += 0.2;  
		} 		
  // Colisao com atualiza
		if (detectaColisaoCom(com, bola)) {                     // se a colisao for detectada
			let angulo = 0;                                     // o ângulo padrão é 0 graus em radianos
			if (bola.x + bola.raio < com.x + com.raio) {        // se a bola bater no topo da raquete
				angulo = -1 * Math.PI / 4;      				// então -1 * Math.PI / 4 = -45deg
			} else if (bola.y + bola.raio > com.y + com.raio) { // e se atingiu o fundo da raquete              
				angulo = Math.PI / 4;           				// então o ângulo será Math.PI / 4 = 45deg   
			} 
	// muda a velocidade da bola de acordo com a batida   
		bola.velocidadeX = (detectaColisaoCom(com, bola) ? -1 : 1) * bola.velocidade * Math.cos(angulo);    
		bola.velocidadeY = bola.velocidade * Math.sin(angulo);              
		bola.velocidade += 0.2;
		}
  // Colisao com2 atualiza
		if (detectaColisaoCom2(com2, bola)) {                      // se a colisao for detectada
			let angulo = 0;                                        // o ângulo padrão é 0 graus em radianos
			if (bola.x + bola.raio < com2.x + com2.raio) {         // se a bola bater no topo da raquete
				angulo = -1 * Math.PI / 4;      				   // então -1 * Math.PI / 4 = -45deg
			} else if (bola.y + bola.raio > com2.y + com2.raio) {  // e se atingiu o fundo da raquete              
				angulo = Math.PI / 4;           				   // então o ângulo será Math.PI / 4 = 45deg   
			} 
	// muda a velocidade da bola de acordo com a batida   
		bola.velocidadeX = (detectaColisaoCom2(com2, bola) ? -1 : 1) * bola.velocidade * Math.cos(angulo);    
		bola.velocidadeY = bola.velocidade * Math.sin(angulo);              
		bola.velocidade += 0.2;
		}		
  // Colisao gol p1 atualiza
		if (detectaGolP1(p1Trave, bola)) {
				comPlacar.placar += 1;  				// com marcou 1 ponto
				reset(); 								// recomece
		}
  // Colisao gol com atualiza
		if (detectaGolCom(comTrave, bola)) {	                                          
				p1Placar.placar += 1;                   // p1 marcou 1 ponto
				reset();                                // recomece
		}
  // Se a bola sair da quadra		
		if (bola.x > quadra.largura*2 || bola.x > quadra.altura*2){
			alert("bola fora!!!");
			reset();
		}	
	}		
//_2.1_///////////////////////////// desenha
	function desenha() {  
		quadra.retangulo();
		rede.retangulo();
		p1Trave.retangulo();
		p1.circulo();
		p2.circulo();
		p1Placar.text();
		comTrave.retangulo();
		com.circulo();
		com2.circulo();
		comPlacar.text();
		bola.circulo();
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);