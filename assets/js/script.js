var rockPaperScissors = (function() {
    const modal = document.querySelector('.rules-modal');
    const onpenModalBtn = document.querySelector('.rules-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const circles = document.querySelectorAll('.circle');
    const playerShape = document.querySelector('.picked-shape');
    const playerShapeImg = playerShape.querySelector('img');
    const aiShape = document.querySelector('.AI-shape');
    const aiShapeImg = document.querySelector('.AI-choice');
    const aiInnerCircle = document.querySelector('.AI-shape-inner');
    const loader = document.querySelector('.loader');
    const winner = document.querySelector('.winner-result');
    const playAgainBtn = document.querySelector('.play-again-btn');
    const mainShapeSelection = document.querySelector('main');
    const battleDisplay = document.querySelector('.battle-display');
    const scoreBoard = document.querySelector('.score');
    let score = 0;
    let aiHasChosen;
    let playerHasChosen;
    const shapeRelations = {
        scissors: {
            paper: 'cuts paper', 
            lizard: 'kills lizard'
        },

        spock: {
            scissors: 'smashes scissors', 
            rock: 'vaporizes rock'
        },

        paper: { 
            rock: 'covered by the paper', 
            spock: 'disproves paper'
        },

        lizard: {
            spock: 'poisons spock',
            paper: 'eats paper'
        },
        rock: {
            lizard: 'crushes lizard', 
            scissors: 'crushes scissors'
        }
    };


    const startBattle = (index) => {
        const choice = Object.keys(shapeRelations)
        playerShape.style.background = `var(--${choice[index]}Bg)`;
        playerShape.style.boxShadow = `0 12px 0 0 var(--${choice[index]}Shadow)`;
        playerShapeImg.setAttribute('src', `images/icon-${choice[index]}.svg`);
        playerHasChosen = choice[index];
        mainShapeSelection.classList.add('hidden');
        battleDisplay.classList.add('active');
        displayHideLoader();
        setTimeout(() => {
            displayHideLoader();
            aiChoice();
        }, 1000);
    }

    const loadAiChosenShape = (choice) => {
        aiShape.style.background = `var(--${choice}Bg)`;
        aiShape.style.boxShadow = `0 12px 0 0 var(--${choice}Shadow)`;
        aiInnerCircle.style.background = 'linear-gradient(0deg, #F3F3F3 0%, #DADADA 98.34%)';
        aiInnerCircle.style.boxShadow = 'inset 0 12px 0 0 #BABFD4';
        aiShapeImg.setAttribute('src', `images/icon-${choice}.svg`);
        aiShapeImg.classList.add('active')
    }

    const resetAiShape = () => {
        aiShape.style.background = 'unset';
        aiShape.style.boxShadow = 'unset';
        aiInnerCircle.style.background = 'rgba(0, 0, 0, 0.1)';
        aiInnerCircle.style.boxShadow = 'unset';
        aiShapeImg.setAttribute('src', '');
        aiShapeImg.classList.remove('active')
    }

    const aiChoice = () => {
        const selections = Object.keys(shapeRelations);
        const roll = Math.floor(Math.random() * selections.length);
        const choice = selections[roll];
        aiHasChosen = choice;
        loadAiChosenShape(choice)
        resolveWinner();
    }

    const displayHideLoader = () => {
        loader.classList.toggle('active')
    }

    const resolveWinner = () => {
        if (playerHasChosen == aiHasChosen) {
            winner.innerText = 'draw'
        } else if (aiHasChosen in shapeRelations[playerHasChosen]) {
            winner.innerText = 'you win'
            score ++;
            scoreBoard.innerText = score;
        } else  {
            winner.innerText = 'you loose'
        }
        showResults();
    }

    const showResults = () => {
        const playerPick = document.querySelector('.player-pick');
        const aiPick = document.querySelector('.AI-pick');
        const result = document.querySelector('.result');
        playerPick.style.transform = 'translateX(-50%)';
        aiPick.style.transform = 'translateX(50%)';
        result.style.transform = 'translateY(0)';
    }

    const resetForNextRound = () => {
        const playerPick = document.querySelector('.player-pick');
        const aiPick = document.querySelector('.AI-pick');
        const result = document.querySelector('.result');
        mainShapeSelection.classList.remove('hidden');
        battleDisplay.classList.remove('active');
        resetAiShape();
        playerPick.style.transform = 'translateX(0)';
        aiPick.style.transform = 'translateX(0)';
        result.style.transform = 'translateY(500px)';
    }

    const openRulesModal = () => {
        modal.classList.add('rules-modal-active');
    }

    const closeRulesModal = () => {
        modal.classList.remove('rules-modal-active');
    }

    playAgainBtn.addEventListener('click', resetForNextRound);
    onpenModalBtn.addEventListener('click', openRulesModal);
    closeModalBtn.addEventListener('click', closeRulesModal);
    modal.addEventListener('click', (e)=>{
        if (e.target != e.currentTarget) {
            return
        } else {
            modal.classList.remove('rules-modal-active');
        }
    });

    circles.forEach((circle, i) => {
        circle.addEventListener('click', (e)=> {
            startBattle(i);
        })
    })




})();