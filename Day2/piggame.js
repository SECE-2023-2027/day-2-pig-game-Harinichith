
    let scores, currentScore, activePlayer, playing;
    const diceEl = document.getElementById('dice');
    const btnRoll = document.querySelector('.btn-roll');
    const btnHold = document.querySelector('.btn-hold');
    const btnNew = document.querySelector('.btn-new');
    function init() {
      scores = [0, 0];
      currentScore = 0;
      activePlayer = 0;
      playing = true;
      document.getElementById('score-0').textContent = '0';
      document.getElementById('score-1').textContent = '0';
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';
      document.getElementById('name-0').textContent = 'PLAYER 1';
      document.getElementById('name-1').textContent = 'PLAYER 2';
      document.querySelector('.player-1').classList.remove('winner');
      document.querySelector('.player-2').classList.remove('winner');
      document.querySelector('.player-1').classList.add('active');
      document.querySelector('.player-2').classList.remove('active');

      diceEl.src = 'dice-1.png';
      diceEl.style.display = 'block';
    }

    function switchPlayer() {
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      document.querySelector('.player-1').classList.toggle('active');
      document.querySelector('.player-2').classList.toggle('active');
    }

    btnRoll.addEventListener('click', function () {
      if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
          currentScore += dice;
          document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
          switchPlayer();
        }
      }
    });

    btnHold.addEventListener('click', function () {
      if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
          playing = false;
          document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
          document.querySelector(`.player-${activePlayer + 1}`).classList.add('winner');
          document.querySelector(`.player-${activePlayer + 1}`).classList.remove('active');
        } else {
          switchPlayer();
        }
      }
    });
    btnNew.addEventListener('click', init);
    init();