const canvas = document.getElementById('canvas');
canvas.width = 1100 //window.innerWidth;
canvas.height = window.innerHeight;//600;
const ctx = canvas.getContext('2d');
let colisao = false;
let torres = 7;

// conexao localstorage
if(localStorage.hasOwnProperty('bdFlap')){
	tabela = JSON.parse(window.localStorage.getItem('bdFlap'));
} else {
	tabela = [
		{nome: "primeiro", placar: 6},
		{nome: "segundo", placar: 5},
		{nome: "terceiro", placar: 4},
		{nome: "quarto", placar: 3},
		{nome: "quinto", placar: 2},
		{nome: "sexto", placar: 1}
	]
window.localStorage.setItem('bdFlap', JSON.stringify(tabela));
}

alert("USE A TECLA ESPACO PARA FLUTUAR")

//_4_/////////////////////////////// objetos
	class obj {
		constructor(cor, x, y, larg, alt, raio, vel, nome, res, placar){
			this.cor = cor;
			this.x = x;
			this.y = y;
			this.larg = larg;
			this.alt = alt;
			this.raio = raio;
			this.vel = vel;
			this.nome = nome;
			this.res = res;	
			this.placar = placar;
		}
		retangulo(){
			ctx.fillStyle = this.cor;                                     
			ctx.fillRect(this.x, this.y, this.larg, this.alt); 
			return ctx
		}
		circulo(){
			ctx.fillStyle = this.cor;  
			ctx.beginPath();  
			ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, true);    // x, y, raio, angulo, fimAngulo, rotacao)  
			ctx.fill();
			return ctx;
		}
		text(){                         // função para desenhar placar
			ctx.fillStyle = this.cor;  
			ctx.font = '35px sans-serif';  
			ctx.fillText(this.nome, this.x+100, this.y);
			ctx.fillText(this.res, this.x, this.y);
			ctx.fillText(this.placar, this.x, this.y+50);
			return ctx;
		 }
		 colisao(colide){
			colide.topo = colide.y - colide.raio;  
			colide.dir = colide.x + colide.raio;  
			colide.fundo = colide.y + colide.raio;  
			colide.esq = colide.x - colide.raio;  
	
			this.topo = this.y;  
			this.dir = this.x + this.larg;  
			this.fundo = this.y + this.alt;  
			this.esq = this.x; 
		
			  	if(	this.topo < colide.fundo &&
					this.dir > colide.esq && 
					this.fundo > colide.topo &&
					this.esq < colide.dir){
						colisao = true;
					}   			
					return colisao
		 }
	}
	//		    		|cor			|x           	|y			|larg		|alt	 	|raio   |vel   |nome |res   |placar
	let tela = new obj("DeepSkyBlue",	0, 			 	0,			canvas.width, canvas.height,null,null, 	null, null,  null);

	let p1 	   = new obj("yellow", 	    tela.larg/2, 	tela.alt-20,null,		null, 		 20, 	 5,    	null, 			null,  				0);
	let p1Placar = new obj("blue", 	    tela.larg/8, 	tela.alt/8, null,		null,  		null,	 null,  tabela[0].nome,	tabela[0].placar,  	p1.placar);

	let torre = [];
	for(i=0;i<=torres;i++){
		torre[i]  = new obj("white", 	tela.larg,     		 0,		100,		100, 		 null, 	 -1,   	null, null,  null);
	}
	torre[0].x=tela.larg;	 	torre[0].y=0;	torre[0].alt=100;
	torre[1].x=tela.larg;	  	torre[1].y=200;	torre[1].alt=600;

	torre[2].x=tela.larg+300; 	torre[2].y=0;	torre[2].alt=300;
	torre[3].x=tela.larg+300; 	torre[3].y=400;	torre[3].alt=600;

	torre[4].x=tela.larg+600; 	torre[4].y=0;	torre[4].alt=200;
	torre[5].x=tela.larg+600;	torre[5].y=300;	torre[5].alt=600;

	torre[6].x=tela.larg+900; 	torre[6].y=0;	torre[6].alt=400;
	torre[7].x=tela.larg+900;  	torre[7].y=500;	torre[7].alt=600;

	
//_3.2_///////////////////////////// movimento p1
	let espaco = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 32){
			espaco = true;   
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 32){
			espaco = false;    
		}
	}
//_3.1_////////////////////////////// recomeco
	function reset() {  
		//window.location.reload()
		p1.x = tela.larg/2; 	 
		p1.y = tela.alt-20;
		p1Placar.placar = 0;
		torre[0].x = tela.larg;
		torre[1].x = tela.larg;
		torre[2].x = tela.larg+300;
		torre[3].x = tela.larg+300;
		torre[4].x = tela.larg+600;
		torre[5].x = tela.larg+600;
		torre[6].x = tela.larg+900;
		torre[7].x = tela.larg+900;
		espaco = false;
	 }
//_3_///////////////////////////// ranking
	 function lista(){
		alert(	tabela[0].placar+' | '+tabela[0].nome+"\n"+ 
				tabela[1].placar+' | '+tabela[1].nome+"\n"+ 
				tabela[2].placar+' | '+tabela[2].nome+"\n"+ 
				tabela[3].placar+' | '+tabela[3].nome+"\n"+ 
				tabela[4].placar+' | '+tabela[4].nome+"\n"+ 
				tabela[5].placar+' | '+tabela[5].nome		
		);
	 }
	 function ranking(){
		let resultado = {
			nome: prompt("registre seu nome"),
			placar: p1Placar.placar
			}

			tabela = JSON.parse(window.localStorage.getItem('bdFlap'));
			tabela.pop();
			tabela.push(resultado);
			tabela.sort(function (a, b) {
				if (a.placar < b.placar) {
					return 1;
				}
				if (a.placar > b.placar) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
			window.localStorage.setItem('bdFlap', JSON.stringify(tabela));
			
			lista();

			p1Placar.nome=tabela[0].nome;
			p1Placar.res=tabela[0].placar;
	 }
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
  // movimento p1 
		if (p1.y > 580){
			p1.y = 580;
		} 
		if (espaco && p1.y > 10) { // move p1
			p1.y -= 2;  
		} else { 
			p1.y += 2;
		}		
	// movimento torre
		for(i in torre){
			torre[i].x += torre[i].vel; 
			if (torre[i].x + torre[i].larg == 0){
				torre[i].x = tela.larg;
			};
		}	
  	// Colisao atualiza
		for(i in torre){
			if (torre[i].colisao(p1)) {
				colisao = false;
				alert("voce perdeu!!!");
				ranking();
				reset(); 								
			}
		}									
 	 // pontuacao atualiza
		for(i in torre){
			if (p1.x == torre[i].x){
				p1Placar.placar += 0.5;
			}				
		} 	
	}
//_2.1_///////////////////////////// desenha
	function desenha() {  
		tela.retangulo();
		p1.circulo();
		for(i in torre){
			torre[i].retangulo();
		}
		p1Placar.text();
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);