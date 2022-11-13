const canvas = document.getElementById('canvas');
canvas.width = 1100; //window.innerWidth;
canvas.height = 600 //window.innerHeight;
const ctx = canvas.getContext('2d');
let colisao = false;
let torres = 2;
let argolas = 2;
let cps = 2;

// conexao localstorage
if(localStorage.hasOwnProperty('bdAdv')){
	tabela = JSON.parse(window.localStorage.getItem('bdAdv'));
} else {
	tabela = [
		{nome: "primeiro", placar: 6},
		{nome: "segundo", placar: 5},
		{nome: "terceiro", placar: 4},
		{nome: "quarto", placar: 3},
		{nome: "quinto", placar: 2},
		{nome: "sexto", placar: 1}
	]
window.localStorage.setItem('bdAdv', JSON.stringify(tabela));
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
	//		    		|cor			|x           	|y			|larg		|alt	 	|raio   |vel   |nome 	|res   	|placar
	let tela = new obj("DeepSkyBlue",	0, 			 	0,			canvas.width, canvas.height,null,null, 	null, 	null,  	null);
	let p1 	   = new obj("purple", 	    tela.larg/2, 	tela.alt-20,null,		null, 		 30, 	 20,    null, 			null,  				0);
	let p1Placar = new obj("blue", 	    tela.larg/8, 	tela.alt/8, null,		null,  		null,	 null,  tabela[0].nome,	tabela[0].placar,  	p1.placar);

	let torre = [];
	for(i=0;i<=torres;i++){
		torre[i]  = new obj("green", 	tela.larg,  	 0,			200,		100, 		 null, 	 -10,   null, 	null,  null);
	}
	let argola = [];
	for(i=0;i<=argolas;i++){
		argola[i]  = new obj("yellow", 	tela.larg,		 0,			null,		null, 		 30, 	 -10,   null, 	null,  null);
	}
	let cp = [];
	for(i=0;i<=cps;i++){
		cp[i]  = new obj("red", 		tela.larg,  	 0,			100,		100, 		 null, 	 -10,   null, 	null,  null);
	}
	// cenario
	function cenario(){
	torre[0].x=tela.larg;		torre[0].y=	400;	
	torre[1].x=tela.larg+ 300;	torre[1].y=	200;	
	torre[2].x=tela.larg+ 600; 	torre[2].y=	200;	

	argola[0].x=tela.larg+ 100;	argola[0].y=350;
	argola[1].x=tela.larg+ 400;	argola[1].y=150;
	argola[2].x=tela.larg+ 500;	argola[2].y=350;

	cp[0].x=tela.larg+ 200; 	cp[0].y=200;	
	cp[1].x=tela.larg+ 500;		cp[1].y=400;	
	cp[2].x=tela.larg+ 800; 	cp[2].y=400;	
	}
	cenario();

//_3.2_///////////////////////////// movimento p1
	let setaFrente = false;
	let setaTras = false;	
	let espaco = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 32){
			espaco = true;   
		} else if (e.keyCode == 37){
			setaFrente = true; 
		} else if (e.keyCode == 39){
			setaTras = true;      
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 32){
			espaco = false;    
		} else if (e.keyCode == 37){
			setaFrente = false; 
		} else if (e.keyCode == 39){
			setaTras = false;      
		}
	}
//_3.1_////////////////////////////// recomeco
	function reset() {  
		//window.location.reload()
		p1.x = tela.larg/2; 	 
		p1.y = tela.alt-20;
		p1Placar.placar = 0;
		cenario();
		espaco = false;
		setaFrente = false; 
		setaTras = false;  
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

			tabela = JSON.parse(window.localStorage.getItem('bdAdv'));
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
			window.localStorage.setItem('bdAdv', JSON.stringify(tabela));
			
			lista();

			p1Placar.nome=tabela[0].nome;
			p1Placar.res=tabela[0].placar;
	 }
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
  // movimento p1 
		if (p1.y > tela.alt-(2*p1.raio)){
			p1.y = tela.alt-(2*p1.raio);
		} 
		if (p1.y < tela.y+(2*p1.raio)){
			p1.y = tela.y+(2*p1.raio);
		} 
		if (espaco) { // move p1
			p1.y -= p1.raio;  
		} else { 
			p1.y += p1.raio;
		}		
	// movimento torre
	if (setaFrente) {  // movimento cenario
		for(i in torre){ 
			torre[i].x -= torre[i].vel; 
			argola[i].x -= argola[i].vel;
			cp[i].x -= cp[i].vel;
		}	
	} else if (setaTras) {
		for(i in torre){
			torre[i].x += torre[i].vel; 
			argola[i].x += argola[i].vel;
			cp[i].x += cp[i].vel;
		}
	} 
	//progressao do cenario
	for(i in torre){
		if (torre[i].x + torre[i].larg == 0){
			torre[i].x = tela.larg;
		};
	}	
	for(i in argola){
		if (argola[i].x + argola[i].larg == 0){
			argola[i].x = tela.larg;
		};
	}	
	for(i in cp){
		cp[i].y += ((p1.y - (cp[i].y + cp[i].alt / 2)) * 0.01);   
		if (cp[i].x + cp[i].larg == 0){
			cp[i].x = tela.larg;
		};
	}	
  	// Colisao atualiza
		for(i in torre){
			if (torre[i].colisao(p1)) {
				colisao = false;
				p1.y = torre[i].y - p1.raio;								
			}
		}					
		for(i in cp){
			if (cp[i].colisao(p1)) {
				colisao = false;
				alert("voce perdeu!!!");
				ranking();
				reset(); 								
			}
		}								
 	 // pontuacao atualiza
		for(i in argola){
			if (argola[i].colisao(p1)) {
				colisao = false;
				p1Placar.placar += 10;
				argola[i].x = tela.larg;
			}				
		} 	
	}
//_2.1_///////////////////////////// desenha
	function desenha() {  
		tela.retangulo();
		p1.circulo();
		p1Placar.text();

		for(i in torre){
			torre[i].retangulo();
		}
		for(i in argola){
			argola[i].circulo();
		}
		for(i in cp){
			cp[i].retangulo();
		}
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);