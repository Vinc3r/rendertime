<!DOCTYPE HTML>
<html>
<head>
	<meta name="description" content="Cette page permet d\'&eacute;valuer grossi&egrave;rement le temps que mettront vos rendus &agrave; se calculer." />
	<script type="text/javascript">
		//variables et valeurs par defaut :
		var Hanim = 0; //nb heures d\'anim
		var Manim = 0; //nb minutes d\'anim
		var Sanim = 0; //nb secondes d\'anim
		var TpsAnim = 0; //duree anim converties en secondes
		//var FrameAnim = 0; //nombre de frames de l\'anim
		var Hframe = 0; //nb heures de calcul d\'une frame
		var Mframe = 0; //nb minutes de calcul d\'une frame
		var Sframe = 0; //nb secondes de calcul d\'une frame
		var TpsMoyenFrame = 0; //duree de calcul d\'une frame convertie en secondes
		var fps = 25; //framerate
		var computerZZZ = 1; //nb machines de calcul
		var TpsTotal = 0; //(TpsAnim*TpsMoyenFrame*fps)/computerZZZ
		var TpsTotalH = 0;
		var TpsTotalM = 0;
		var TpsTotalS = 0; 
		var framesTotal = 0; //nb d\'images a sortir
	</script>
</head>
<body>
	<h1 id="titrePage" class="sections">Rendertime</h1>
	<noscript>
		<p style="background-color:#BB6464;font-weight:bold;border-top:1px #fff dotted;border-bottom:1px #fff dotted;padding:5px;text-align:center;">L'activation de javascript est n&eacute;cessaire pour la bonne ex&eacute;cution de la page.
		Pas d'inqui&eacute;tude, je ne suis point un vil piratin.</p>
		</noscript>
	<h2 class="sections">Aide &agrave; l'approximation du temps de rendu d'une animation</h2>
	<div id="choixValeurs" class="sections">
		<p>Dur&eacute;e de l'animation : 
			<select name="dureeH" onchange="dureeAnimHeures(this.value)"><?php for($i=0;$i<24;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> h 
			<select name="dureeM" onchange="dureeAnimMinutes(this.value)"><?php for($i=0;$i<60;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> min 
			<select name="dureeS" onchange="dureeAnimSecondes(this.value)"><?php for($i=0;$i<60;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> s<!--, ou bien en nombre de frames <input name="dureeFrame" size="10" onchange="dureeAnimFrame(this.value)"></input>--></p>
		<p>
			<a href="http://en.wikipedia.org/wiki/Frame_rate#Digital_video_and_television" class="transparentLink">Framerate</a> :
			<select name="framerate" onchange="giveFPS(this.value)">
				<option value="24">24p</option>
				<option value="25" selected="selected">25p</option>
				<option value="30">30p</option>
				<option value="48">48p</option>
				<option value="50">50i</option>
				<option value="60">60i</option>
				<option value="72">72p</option>
				<option value="90">90p</option>
				<option value="100">100p</option>
				<option value="120">120p</option>
				<option value="144">144fps</option>
				<option value="300">300fps</option>
			</select>
		</p>
		<p>
			Temps de rendu moyen d'une frame :
			<select name="oneFrameH" onchange="dureeFrameHeures(this.value)"><?php for($i=0;$i<49;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> h 
			<select name="oneFrameM" onchange="dureeFrameMinutes(this.value)"><?php for($i=0;$i<60;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> min 
			<select name="oneFrameS" onchange="dureeFrameSecondes(this.value)"><?php for($i=0;$i<60;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select> s
		</p>
		<p>
			Nombre de machines de calcul : 
			<select name="nbMachines" onchange="nbComputerZZZ(this.value)"><?php for($i=1;$i<101;$i++){echo '<option value="'.$i.'">'.$i.'</option>';}?></select>
		</p>
	</div>
	<div id="divResult" class="sections">
		<p>
			Nombre de frames : <span id="finalFrames">0</span>
		</p>
		<p>
			L&apos;animation devrait probablement se calculer en <span id="finalTime">moins de temps qu'il ne faut pour l'&eacute;crire.</span>
		</p>
	</div>
	<p id="reInit" class="sections">
		<a href=".">R&eacute;initaliser les valeurs</a>
	</p>
<script type="text/javascript">
	var divTpsTotal = document.getElementById('finalTime');
	var divFinalFrames = document.getElementById('finalFrames');
	function dureeAnimHeures(valeurDureeH){Hanim = parseInt(valeurDureeH);calcul();} //recup duree anim Heures
	function dureeAnimMinutes(valeurDureeM){Manim = parseInt(valeurDureeM);calcul();} //recup duree anim Minutes
	function dureeAnimSecondes(valeurDureeS){Sanim = parseInt(valeurDureeS);calcul();} //recup duree anim Secondes
	//function dureeAnimFrame(valeurFrameAnim){FrameAnim = parseInt(valeurFrameAnim);calcul();} //recup nombre de frames
	function giveFPS(valeurFPS){fps = parseInt(valeurFPS);calcul();} //recup fps
	function dureeFrameHeures(valeurOneFrameH){Hframe = parseInt(valeurOneFrameH);calcul();} //recup duree frame Heures
	function dureeFrameMinutes(valeurOneFrameM){Mframe = parseInt(valeurOneFrameM);calcul();} //recup duree frame Minutes
	function dureeFrameSecondes(valeurOneFrameS){Sframe = parseInt(valeurOneFrameS);calcul();} //recup duree frame Secondes
	function nbComputerZZZ(valeurNbComputerZZZ){computerZZZ = parseInt(valeurNbComputerZZZ);calcul();}  //recup nombre machines de calculs
	function calcul(){
		TpsAnim = (3600*Hanim)+(60*Manim)+Sanim;
		TpsMoyenFrame = 3600*Hframe+60*Mframe+Sframe;
		//if(TpsAnim==0 && FrameAnim!='') TpsAnim = FrameAnim;
		TpsTotal = (TpsAnim*TpsMoyenFrame*fps)/computerZZZ;
		TpsTotalH = Math.floor(TpsTotal/3600);
		TpsTotalM = (Math.floor(TpsTotal/60))-(TpsTotalH*60);
		framesTotal = TpsAnim*fps;
		divTpsTotal.style.fontSize = "1.05em";
		divTpsTotal.innerHTML = TpsTotalH+" h "+TpsTotalM+" min.";
		divFinalFrames.innerHTML = framesTotal;	
	}
</script>
</body>
</html>
