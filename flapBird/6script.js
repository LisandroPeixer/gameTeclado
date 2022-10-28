const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');
alert("USE A TECLA ESPACO PARA FLUTUAR")

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
	//					|cor		   |x                	|y   			|largura		 |altura	    |raio   |velocidade	 |velocidadeX  |velocidadeY  |placar
	let quadra = new obj("DeepSkyBlue", 0, 					 0,   			 canvas.width, 	  canvas.height, null, 	 null, 		  null,			null, 		  null);

	let torre  = new obj("white", 		quadra.largura,  	 0, 			 100, 			  100, 			 null, 	 -1, 		  null,			null, 		  null);
	let torre1 = new obj(torre.cor, 	quadra.largura,      200, 	 		 100, 			  600, 			 null, 	 -1, 		  null,			null, 		  null);
	let torre2 = new obj(torre.cor, 	quadra.largura+300,  0,  			 100, 			  250, 			 null, 	 -1, 		  null,			null, 		  null);
	let torre3 = new obj(torre.cor, 	quadra.largura+300,  350,  			 100, 			  600, 			 null, 	 -1, 		  null,			null, 		  null);
	let torre4 = new obj(torre.cor, 	quadra.largura+600,  0, 			 100, 			  400, 			 null, 	 -1, 		  null,			null, 		  null);
	let torre5 = new obj(torre.cor, 	quadra.largura+600,  500, 	 		 100, 			  600, 			 null, 	 -1, 		  null,			null, 		  null);

	let p1 	   = new obj("yellow", 		quadra.largura/2, 	 quadra.altura-20, null, 		  null, 		 20, 	 5,   		  5,   			null, 		  0);
	let p1Placar = new obj("blue", 		quadra.largura/4, 	 quadra.altura/4, null, 		  null, 		 null, 	 null, 		  null,  		null, 		  p1.placar);

//_3.3_///////////////////////////// movimento p1
	let setaCima = false;
	//let setaBaixo = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 32){
			setaCima = true;   
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 32){
			setaCima = false;    
		}
	}
//_3.2_///////////////////////////// recomeco
	function reset() {  
		window.location.reload()
	 }
	 
//_3.1_///////////////////////////// colisoes
 // Colisao torre detecta
	function detectaColisaoTorre(p1, torre) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		torre.topo = torre.y;  
		torre.dir = torre.x + torre.largura;  
		torre.fundo = torre.y + torre.altura;  
		torre.esq = torre.x; 

	return  torre.topo < p1.fundo &&
			torre.dir > p1.esq && 
			torre.fundo > p1.topo &&
			torre.esq < p1.dir;   			
	}
 // Colisao torre1 detecta
	function detectaColisaoTorre1(p1, torre1) { 
 		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		torre1.topo = torre1.y;  
		torre1.dir = torre1.x + torre1.largura;  
		torre1.fundo = torre1.y + torre1.altura;  
		torre1.esq = torre1.x; 

		return  torre1.topo < p1.fundo &&
				torre1.dir > p1.esq && 
				torre1.fundo > p1.topo &&
				torre1.esq < p1.dir;   			
	}
 // Colisao torre2 detecta
	function detectaColisaoTorre2(p1, torre2) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		torre2.topo = torre2.y;  
		torre2.dir = torre2.x + torre2.largura;  
		torre2.fundo = torre2.y + torre2.altura;  
		torre2.esq = torre2.x; 

		return  torre2.topo < p1.fundo &&
				torre2.dir > p1.esq && 
				torre2.fundo > p1.topo &&
				torre2.esq < p1.dir;   			
	}
 // Colisao torre3 detecta
	function detectaColisaoTorre3(p1, torre3) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		torre3.topo = torre3.y;  
		torre3.dir = torre3.x + torre3.largura;  
		torre3.fundo = torre3.y + torre3.altura;  
		torre3.esq = torre3.x; 

		return  torre3.topo < p1.fundo &&
				torre3.dir > p1.esq && 
				torre3.fundo > p1.topo &&
				torre3.esq < p1.dir;   			
	}
 // Colisao torre4 detecta
 function detectaColisaoTorre4(p1, torre4) { 
	p1.topo = p1.y - p1.raio;  
	p1.dir = p1.x + p1.raio;  
	p1.fundo = p1.y + p1.raio;  
	p1.esq = p1.x - p1.raio;  

	torre4.topo = torre4.y;  
	torre4.dir = torre4.x + torre4.largura;  
	torre4.fundo = torre4.y + torre4.altura;  
	torre4.esq = torre4.x; 

	return  torre4.topo < p1.fundo &&
			torre4.dir > p1.esq && 
			torre4.fundo > p1.topo &&
			torre4.esq < p1.dir;   			
	}
 // Colisao torre5 detecta
 function detectaColisaoTorre5(p1, torre5) { 
	p1.topo = p1.y - p1.raio;  
	p1.dir = p1.x + p1.raio;  
	p1.fundo = p1.y + p1.raio;  
	p1.esq = p1.x - p1.raio;  

	torre5.topo = torre5.y;  
	torre5.dir = torre5.x + torre5.largura;  
	torre5.fundo = torre5.y + torre5.altura;  
	torre5.esq = torre5.x; 

	return  torre5.topo < p1.fundo &&
			torre5.dir > p1.esq && 
			torre5.fundo > p1.topo &&
			torre5.esq < p1.dir;   			
	}	
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
  // movimento p1 
		if (p1.y > 580){
			p1.y = 580;
		} 
		if (setaCima && p1.y > 10) {                                          			// move p1
			p1.y -= 2;  
		} else { 
			p1.y += 2;
		}		
	// movimento torre
		torre.x += torre.velocidade; 
		if (torre.x + torre.largura == 0){
			torre.x = quadra.largura;
		};
		torre1.x += torre1.velocidade;
		if (torre1.x + torre1.largura == 0){
			torre1.x = quadra.largura;
		};
		torre2.x += torre2.velocidade;
		if (torre2.x + torre2.largura == 0){
			torre2.x = quadra.largura;
		};
		torre3.x += torre3.velocidade; 
		if (torre3.x + torre3.largura == 0){
			torre3.x = quadra.largura;
		}; 
		torre4.x += torre4.velocidade;
		if (torre4.x + torre4.largura == 0){
			torre4.x = quadra.largura;
		};
		torre5.x += torre5.velocidade; 
		if (torre5.x + torre5.largura == 0){
			torre5.x = quadra.largura;
		}; 		   

  // Colisao atualiza
	// Colisao Torre p1 atualiza
		if (detectaColisaoTorre(p1, torre)) {
			alert("voce perdeu!!!");
			reset(); 								
		}			
	// Colisao Torre1 p1 atualiza
		if (detectaColisaoTorre1(p1, torre1)) {
			alert("voce perdeu!!!");
			reset(); 								
		}
	// Colisao Torre2 p1 atualiza
		if (detectaColisaoTorre2(p1, torre2)) {
			alert("voce perdeu!!!");
			reset(); 		
		}						
	// Colisao Torre3 p1 atualiza
		if (detectaColisaoTorre3(p1, torre3)) {
			alert("voce perdeu!!!");
			reset(); 
		}
	// Colisao Torre4 p1 atualiza
	if (detectaColisaoTorre4(p1, torre4)) {
		alert("voce perdeu!!!");
		reset(); 
	}
	// Colisao Torre5 p1 atualiza
	if (detectaColisaoTorre5(p1, torre5)) {
		alert("voce perdeu!!!");
		reset(); 
	}							
  // pontuacao atualiza
		if (p1.x == torre.x){
			p1Placar.placar += 1;
		};
		// if (p1.x == torre1.x){
		// 	p1Placar.placar += 1;
		// };
		if (p1.x == torre2.x){
			p1Placar.placar += 1;
		};
		// if (p1.x == torre3.x){
		// 	p1Placar.placar += 1;
		// };
		if (p1.x == torre4.x){
			p1Placar.placar += 1;
		};
		// if (p1.x == torre5.x){
		// 	p1Placar.placar += 1;
		// };				
	} 	
//_2.1_///////////////////////////// desenha
	function desenha() {  
		quadra.retangulo();
		torre.retangulo();
		torre1.retangulo();
		torre2.retangulo();
		torre3.retangulo();
		torre4.retangulo();
		torre5.retangulo();
		p1.circulo();
		p1Placar.text();
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);