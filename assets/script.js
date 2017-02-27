  // Audio script
  var audio, playbtn, seek_bar, audio2;
  function initAudioPlayer() {
  	audio = new Audio();
  	audio.src = "assets/audio/ffxiv_boss_theme.mp3";
  	audio.loop = true;
  	audio.play();

  	audio2 = new Audio();
  	audio2.src = "assets/audio/victory.mp3";

  	// Object references
  	playbtn = document.getElementById("playpausebtn");
  	mutebtn = document.getElementById("mutebtn");
  	// Add Event Handler
  	playbtn.addEventListener("click", playPause);
  	mutebtn.addEventListener("click", mute);
  	// Functions
  	function playPause() {
  		if (audio.paused) {
  			audio.play();
  			playbtn.style.background = "url('assets/images/pause_button.png') no-repeat";
  		}
  		else {
  			audio.pause();
  			playbtn.style.background = "url('assets/images/play_button.png') no-repeat";
  		}
  	}

  	function mute() {
  		if (audio.muted) {
  			audio.muted = false;
  			mutebtn.style.background = "url('assets/images/mute_button.png') no-repeat";
  		}
  		else {
  			audio.muted = true;
  			mutebtn.style.background = "url('assets/images/unmute_button.png') no-repeat";	
  		}
  	}
  }
    // end audio script

  window.onload = function(){
  	initAudioPlayer();
  	play();
  };

  var categories;
  var selectedCategory;
  var moogleHelp;
  var word;
  var guess;
  var guesses = [];
  var healthPoints;
  var counter;
  var space;
  var list;

  var showHP = document.getElementById("myHp");
  var showCategory = document.getElementById("selectedCategory");
  var getMoogle = document.getElementById("hint");
  var moogleHelp = document.getElementById("clue");
  var victoryMsg = document.getElementById("msg");



  // Keyboard Script
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var button = function () {
  	var gameKeyboard = document.getElementById("buttons");
  	gameKeyboard.innerHTML = "";
  	var keys = document.createElement("ul");
  	for (var i = 0; i < alphabet.length; i++) {
  		keys.id = "alphabet";
  		list = document.createElement("li");
  		list.id = "letter";
  		list.innerHTML = alphabet[i];
  		check(list);
  		gameKeyboard.appendChild(keys);
  		keys.appendChild(list);
  	}
  }

  // Select Category
  var selectCat = function () {
    if (selectedCategory === categories[0]) {
      categoryName.innerHTML = "The Category is People";
    } else if (selectedCategory === categories[1]) {
      categoryName.innerHTML = "The Category is Summons";
    } else if (selectedCategory === categories[2]) {
      categoryName.innerHTML = "The Category is Bestiary";
    }
  }

  // Create guesses
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

   // Show lives
   comments = function () {
    showHP.innerHTML = "HP: " + healthPoints + "/10";
    if (healthPoints < 1) {
      victoryMsg.innerHTML = "Game Over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        victoryMsg.innerHTML = "Victory!";
        audio2.play();
        audio.pause();
        setTimeout(function(){
        	audio2.pause();
        	audio2.currentTime = 0;
        	audio.play();
        }, 5000);

      }
    }
  }

  // OnClick Function
   check = function (list) {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      }
      var x = (word.indexOf(guess));
      if (x === -1) {
        healthPoints -= 1;
        comments();
      } else {
        comments();
      }
    }
  }

  play = function() {
  	categories = [
  		["Cloud", "Squall", "Kain", "Tifa", "Sephiroth", "Balthier", "Tidus","Aerith", "Terra"],
  		["Ifrit", "Garuda", "Ramuh", "Shiva", "Titan", "Odin", "Carbuncle", "Bahamut", "Leviathan"],
  		["Chocobo", "Moogle", "Behemoth", "Malboro", "Goblin", "Manticore", "Sahagin", "Cactuar"]
  	];
  	for (var p = 0; p < categories.length; p++) {
  		for (var o = 0; o < categories[p].length; o++) {
  			categories[p][o] = categories[p][o].toLowerCase();
  		}
  	}
  	selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  	word = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    button();

    guesses = [ ];
    healthPoints = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

	// Moogle Help

    hint.onclick = function() {

      hints = [
        ["Wields a giant Buster Sword", "He owns a Gunblade", "The original Dragoon", "She can kick your butt", "The One-Winged Angel", "The Leading Man", "A Rising Star Blitzball player from Zanarkand", "The Flower Girl", "Half esper, Half Human"],
        ["The Lord of Inferno", "Lady of the Vortex", "Lord of Levin", "Lady of Frost", "Lord of Crags", "Dark Rider of the Shroud", "Ruby Light Weilder", "Conqueror of the Skies", "Lord of the Whorl"],
        ["Giant Birds used as Mount", "Servant of the Gods", "Large Purple Creature with Bullhorns", "Large Green Tentacle Plants", "Race of Beastmen that have Superior Trade Skills", "It's a Giant Man-Eating Monster", "Fish that Walks on Land", "Little Cacti with Stiff Arms and Legs"]
    ];

    var catagoryIndex = categories.indexOf(selectedCategory);
    var hintIndex = selectedCategory.indexOf(word);
    moogleHelp.innerHTML = "Moogle says: " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    list.parentNode.removeChild(list);
    victoryMsg.innerHTML = "";
    moogleHelp.innerHTML = "";
    play();
  }

  for (var i = 0; i < 5; i++) {
    console.log("My name is Bob");
}


