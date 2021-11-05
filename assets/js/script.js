var rockPaperScissors = (function() {
    const modal = document.querySelector('.rules-modal');
    const onpenModalBtn = document.querySelector('.rules-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const circles = document.querySelectorAll('.circle');
    const playerShape = document.querySelector('.picked-shape');
    const playerInnerCircle = document.querySelector('.picked-inner-circle');
    const playerShapeImg = document.querySelector('.player-choice');
    const aiShape = document.querySelector('.AI-shape');
    const aiShapeImg = document.querySelector('.AI-choice');
    const aiInnerCircle = document.querySelector('.AI-shape-inner');
    const loader = document.querySelector('.loader');
    const winner = document.querySelector('.winner-result');
    const playAgainBtn = document.querySelector('.play-again-btn');
    const mainShapeSelection = document.querySelector('main');
    const battleDisplay = document.querySelector('.battle-display');
    const scoreBoard = document.querySelector('.score');
    const result = document.querySelector('.result');
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
        mainShapeSelection.classList.add('hidden');
        if (window.innerWidth <= 1000) {
            battleDisplay.style.display = 'grid'
        }else {
            battleDisplay.style.display = 'flex'
        }
        loadPlayerChosenShape(index)
        displayHideLoader();
        setTimeout(() => {
            displayHideLoader();
            aiChoice();
        }, 1000);
    }

    const loadPlayerChosenShape = (index) => {
        const choice = Object.keys(shapeRelations);
        playerHasChosen = choice[index];
        playerShape.style.background = `var(--${choice[index]}Bg)`;
        playerShapeImg.setAttribute('src', `images/icon-${choice[index]}.svg`);
        resizePlayerShadowChange(playerHasChosen);
    }

    const loadAiChosenShape = (choice) => {
        aiShape.style.background = `var(--${choice}Bg)`;
        aiInnerCircle.style.background = 'linear-gradient(0deg, #F3F3F3 0%, #DADADA 98.34%)';
        resizeAiShadowChange(aiHasChosen);
        aiShapeImg.setAttribute('src', `images/icon-${choice}.svg`);
        aiShapeImg.classList.add('active');
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
            if (window.innerWidth <= 710) {
                playerShape.style.boxShadow += ',0 0 0 25px hsl(0deg 0% 100% / 7%), 0 0 0 50px hsl(0deg 0% 100% / 5%), 0 0 0 100px hsl(0deg 0% 100% / 3%)';
            }else {
                playerShape.style.boxShadow += ',0 0 0 50px hsl(0deg 0% 100% / 7%), 0 0 0 100px hsl(0deg 0% 100% / 5%), 0 0 0 150px hsl(0deg 0% 100% / 3%)';
            }
        } else  {
            winner.innerText = 'you loose'
            if (window.innerWidth <= 710) {
                aiShape.style.boxShadow += ',0 0 0 25px hsl(0deg 0% 100% / 7%), 0 0 0 50px hsl(0deg 0% 100% / 5%), 0 0 0 100px hsl(0deg 0% 100% / 3%)';
            }else {
                aiShape.style.boxShadow += ',0 0 0 50px hsl(0deg 0% 100% / 7%), 0 0 0 100px hsl(0deg 0% 100% / 5%), 0 0 0 150px hsl(0deg 0% 100% / 3%)';
            }
        }
        showResults();
    }

    const showResults = () => {
        const playerPick = document.querySelector('.player-pick');
        const aiPick = document.querySelector('.AI-pick');
        if (window.innerWidth > 1000) {
            playerPick.style.transform = 'translateX(-50%)';
            aiPick.style.transform = 'translateX(50%)';
        }
        winner.style.transform = 'translateY(0)';
        playAgainBtn.style.transform = 'translateY(0)';
    }

    const resetForNextRound = () => {
        const playerPick = document.querySelector('.player-pick');
        const aiPick = document.querySelector('.AI-pick');
        mainShapeSelection.classList.remove('hidden');
        battleDisplay.style.display = 'none';
        resetAiShape();
        playerPick.style.transform = 'translateX(0)';
        aiPick.style.transform = 'translateX(0)';
        winner.style.transform = 'translateY(120px)';
        playAgainBtn.style.transform = 'translateY(50px)';
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

    const resizePlayerShadowChange = (choice) => {
        if (window.innerWidth <= 710) {
            playerShape.style.boxShadow = `0 6px 0 0 var(--${choice}Shadow)`;
        } else {
            playerShape.style.boxShadow = `0 12px 0 0 var(--${choice}Shadow)`;
        }
    }

    const resizeAiShadowChange = (choice) => {
        if (window.innerWidth <= 710) {
            aiShape.style.boxShadow = `0 6px 0 0 var(--${choice}Shadow)`;
            aiInnerCircle.style.boxShadow = 'inset 0 5px 0 0 #BABFD4'
        } else {
            aiShape.style.boxShadow = `0 12px 0 0 var(--${choice}Shadow)`;
            aiInnerCircle.style.boxShadow = 'inset 0 12px 0 0 #BABFD4';
        }
    }

    window.addEventListener('resize', (e)=> {
        const playerPick = document.querySelector('.player-pick');
        const aiPick = document.querySelector('.AI-pick');
        if (battleDisplay.style.display == 'grid' || battleDisplay.style.display =='flex'){
            if (window.innerWidth <= 1000) {
                battleDisplay.style.display = 'grid';
                result.style.position = 'static';
                playerPick.style.transform = 'translateX(0)';
                aiPick.style.transform = 'translateX(0)';
            }else {
                battleDisplay.style.display = 'flex'
                result.style.position = 'absolute';
                playerPick.style.transform = 'translateX(-50%)';
                aiPick.style.transform = 'translateX(50%)';
            }
        }
        resizePlayerShadowChange(playerHasChosen);
        resizeAiShadowChange(aiHasChosen);

    })

})();