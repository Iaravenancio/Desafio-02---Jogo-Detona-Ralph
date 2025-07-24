const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        livesRemaining: 3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if( state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over! O seu resultado foi: ' + state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./assets/audios/${audioName}.m4a`) 
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
    square.classList.remove('enemy')
});

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares [randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('audio'); // Certifique-se de que 'audio' é o nome correto do arquivo de som para acertos
            } else {
                // Se não clicou no Detona Ralph, diminui uma vida
                state.values.livesRemaining--;
                state.view.lives.textContent = state.values.livesRemaining; // Atualiza a exibição das vidas
                // playSound('wrong'); // Adicione um som para quando erra, se desejar (e um arquivo 'wrong.m4a')

                if (state.values.livesRemaining <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert('Game Over! Você ficou sem vidas. Seu resultado foi: ' + state.values.result);
                }
            }
        });
    });
}
// Listener é "alguém" que fica ouvindo alguma ação, alguém que você associa um evento e ele fica esperando alguma ação para ser executado

function initialize() {
    addListenerHitbox();
}

initialize();// função principal que vai chamar algumas funções iniciais

