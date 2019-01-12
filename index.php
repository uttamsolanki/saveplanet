

<html>
   <head>
      <meta name='viewport' content = 'width= device-width, initial-scale = 1.0, user-scalable = no'/>
      <script type="text/javascript" src="jquery/jquery-2.1.3.min.js"></script>
      <script type="text/javascript" src="jquery/introtoapps.min.js"></script>
      <script type="text/javascript" src="jquery/main.js"></script>
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body>
      <div class="popup_div">
         <div id="homeDesk" class="homepage">
            <span>Studend Id : <strong>215142991</strong></span>
            <div class="logo">
               <img src="images/play.png">
            </div>
            <br>
            <div class="level_btn">
               <span>
               <button id="nextLevel" class="gobuton" onclick="getDirectLevel(1);">Easy</button>
               <button id="nextLevel" class="gobuton" onclick="getDirectLevel(2);">Medium</button>
               <button id="nextLevel" class="gobuton" onclick="getDirectLevel(3);">Hard</button>
               </span>
            </div>
            <div class="play_btn">
               <button id="homePlaBtn" class="gobuton" onclick="LoadMainPage();">Play</button>
            </div>
            <div class="help_btn">

               <button id="LhelpWindow" class="gobuton" onclick="LoadHelpWindow();">Help</button>
            </div>
         </div>
</div>
</div>
      <audio id="sound1">
         <source src="sounds/blast_off!.mp3" type="audio/mp3">
      </audio>
      <audio id="bomb">
         <source src="sounds/8bit_bomb_explosion.wav" type="audio/wav">
      </audio>
      <audio id="shot">
         <source src="sounds/laser.wav" type="audio/wav">
      </audio>
      <!-- snow fall code start-->
      <!--div id="snowingScreen"></div-->
      <!-- snow fall code end-->
      <div class="centers">
         <ul>
            <li>
               <div id="mute" class="contrl" >  <img src="images/mute.png" alt="" /> </div>
               <div id="unmute" class="contrl" >  <img src="images/unmute.png" alt="" /> </div>
            </li>
            <li>
               <div id="home" class="contrl">  <img src="images/homea.png" alt="" /> </div>
            </li>
            <li>
               <div id="play" class="contrl">  <img src="images/plays.png" alt="" /> </div>
               <div id="pause" class="contrl">  <img src="images/pause.png" alt="" /> </div>
            </li>
            <li>
               <div id="reset" class="contrl">  <img src="images/reload.png" alt="" /> </div>
            </li>
            <li>
               <div id="help" class="contrl">  <img src="images/help.png" alt="" /> </div>
            </li>
            <li>
                 <p>Score <span class="gameScore">00</span></p>
            </li>
            <li>
                <p>Health <span class="health">00</span></p>
            </li>
            <li>

                 <p>Time <span class="timer">00:00</span></p>
              </li>
      </ul>
      </div>

      <img id="plane" src='images/fighter.png' border='0'/>
      <!--div id="bulletFire6" class="bulletFire" style="top: 100px; position: absolute; bottom: 5px; left: 985.25px;"></div>
      <div class="fighterPlane" style="top: 69px; left: 1006px; position: absolute;"></div-->
    <div>

    <div class="top_class" id='LevelComplet'>
        <div class="child_top" >
          <p>Level Completed</p>
          <button id="nextLevelGame" class="gobuton">Go To Next Level</button>
        </div>
      </div>
      <div class="top_class" id='helpWindow'>
        <div class="child_top">
        <p>Help</p>
        <div class='help_instution'>
          <ul>
              <li>1. Use "Left Key" to go left</li>
              <li>2. Use "Right Key" to go right</li>
              <li>3. Use "Up Key" to go up</li>
              <li>4. Use "Down Key" to go down</li>
              <li>5. Use "Space" to fire </li>
              <li>6. Hit the enemies to gain maximum score </li>
          </ul>
        </div>
        <button id="gotIt" class="gobuton" onclick ='$("#helpWindow").hide();'>
         Go it
      </button>
        </div>
      </div>
    <div class="top_class" id='gameOver'>
        <div class="child_top">
        <p>Game Over</p>
          <button id="playAgain" class="style_but"><img src="images/repeat.png" alt="" /></button>
        </div>
      </div>
   </body>
</html>
