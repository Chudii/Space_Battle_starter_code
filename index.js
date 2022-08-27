let activeEnemies = [] // array of ships still active
let hidingEnemies = []
let crtEnemy = activeEnemies[0]
const shield = Math.floor((Math.random() * 5) + 1)
const numEnemies = 6
const startingHull = 20
let points = 0

let spaceship = {
    hull: startingHull + shield,
    firepower: 5,
    accuracy: .7,
    missles: 3,
    missleDmg: 10,
    recharged: false,
    leveledUp: false,
    attack(obj) {
        if (Math.random() < this.accuracy) { // if hit is good
            obj.hull -= this.firepower
            if (obj.hull <= 0) { // if enemy is eliminated
                newLog(`Clean Hit! <br> What do you want to do next?`, 'enemyElim')
                obj.active = false;
            } else { // enemy hit but still active
                newLog(`Hit! But they've returned fire... <br>`, 'enemyHit')
                obj.attack()
            }
        } else { // missed hit
            newLog(`You missed & they've returned fire... <br>`, 'shipMiss')
            obj.attack()
        }
    },
    missleLaunch(obj) {
        if (Math.random() < this.accuracy) {
            obj.hull -= this.missleDmg
            if (obj.hull <= 0) {
                newLog(`BOOM! They got obliterated`, 'enemyHit')
                obj.active = false;
            } else {
                newLog(`HIT! But they're returned fire... <br>`, 'enemyHit')
                obj.attack()
            }
        } else {
            newLog(`It missed! Prepare for return fire... <br>`, 'shipMiss')
            obj.attack()
        }
    },
    levelUp() {
        this.hull += 50
        this.firepower = 8
        this.accuracy = 0.85
    }
}

let enemySpaceship = {
    active: true,
    hull: 50,
    firepower: 8,
    accuracy: 0.8,
    type: 'rogue',
    attack() {
        if (Math.random() < this.accuracy) { // if hit is good
            spaceship.hull -= this.firepower;
            if (spaceship.hull <= 0 ) {
                newLog(`Your ship has been destroyed`, 'gameOver')
                gameOver()
            } else {
                battleLog.innerHTML += `You've been hit, new HP is ${spaceship.hull}`
                newLog('', 'shipHit')
            }
        } else { // missed hit
            battleLog.innerHTML += 'The player missed!'
            newLog('', 'enemyMiss')
        }
        
    }
}

class alienShip {
    constructor() {
        // this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
        // this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
        // this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Have either 60, 70 or 80% Accuracy
        this.active = true;
        if (Math.random() < 0.5){ // These Aliens have a 20% of spawning
            if (Math.random() < 0.5) { 
                this.hull = 12; // HP 12
                this.firepower = 4; // Attack 3 
                this.accuracy = 0.5; // 50% accurate 
                this.type = 'boss'
            } else {
                this.hull = 8; // HP 8
                this.firepower = 3; // Attack btwn 2-4 
                this.accuracy = 0.5; // 50% accurate
                this.type = 'butterfly'
            }
        } else {
            this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
            this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
            this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Have either 60, 70 or 80%
            this.type = 'bee'
        }
        activeEnemies.push(this)
    }
    attack() {
        if (Math.random() < this.accuracy) { // if hit is good
            spaceship.hull -= this.firepower;
            if (spaceship.hull <= 0 ) {
                newLog(`Your ship has been destroyed`, 'gameOver')
                gameOver()
            } else {
                battleLog.innerHTML += `You've been hit, new HP is ${spaceship.hull}`
                newLog('', 'shipHit')
            }
        } else { // missed hit
            battleLog.innerHTML += 'The alien missed!'
            newLog('', 'enemyMiss')
        }
        
    }
}

const worthBoss = document.querySelector('.worthBoss')
const worthButterfly = document.querySelector('.worthButterfly')
const worthBee = document.querySelector('.worthBee')
let battleLog = document.getElementsByClassName('battleLog')[0]

worthBoss.innerHTML = `200`
worthButterfly.innerHTML = `80`
worthBee.innerHTML = `50`
battleLog.innerHTML = `Press 'Start' to Play`

const newLog = (string, status) => {
    if (string.length > 0) {
        battleLog.innerHTML = string
    }
    if (status === 'enemyHit') {
        console.log(`%c Attack Successful! Their hull has lowered`, 'color: green;')
        console.log(`They will return fire...`)
    } else if (status === 'enemyMiss') {
        console.log('%c The alien missed!', 'color: orange;')
    } else if (status === 'shipHit') {
        console.log(`%c Your hull has decreased to ${spaceship.hull}`, 'color: red;' )
    } else if (status === 'shipMiss') {
        console.log('%c Your ship missed!', 'color: orange; font-style: italics;')
        console.log(`They will return fire...`)
    } else if (status === 'enemyElim') {
        console.log(`%c Attack Successful! Their hull has been destroyed`, 'color: green;');
    } else if (status === 'gameWon') {
        console.log('%c Winner! Winner! Chicken Dinner!', 'color: gold;')
    } else if (status === 'gameOver') {
        console.log(`%c Game Over. Your ship was destroyed`, 'border: 1px solid grey;')
    } else if (status === 'retreat') {
        console.log('%c Game Over. Mission was abandoned', 'border: 1px solid grey;')
    }
}

const checkVitals = () => {
    if (spaceship.hull > 0) {
     return true
    } else {
     return false
    }
}

const gameOver = () => {
    targetButton.style.display = "none"
    rechargeButton.style.display = "none"
}


const startGame = () => {
    /***********************************************************\
     * CONNECTING TO DOM
    ************************************************************/

    startButton.style.display = "none"

    let target
    const legend = document.querySelector('.legend')
    const enemyName = document.querySelector('.enemyNB')
    const enemyImageLarge = document.querySelector('.enemyImageLarge')
    const playerImage = document.querySelector('.playerImage')
    const playerStats = document.querySelector('.playerStats')
    const enemyStats = document.querySelector('.enemyStats')
    const trophy = document.querySelector('.trophy')
    const scoreTracker = document.querySelector('.scoreTracker')
    const fullEnemy = document.querySelector('.enemy')
    const enemyBoxes = document.getElementsByClassName('otherEnemies')[0]
    const playerExtra = document.getElementsByClassName('playerExtra')[0]
    let counter = document.getElementsByClassName('counter')[0]
    let playerStatus = document.getElementsByClassName('playerStatus')[0]
    let score = document.getElementsByClassName('score')[0]
    
    legend.style.display = "none"
    trophy.style.display = "block"
    battleLog.innerHTML = `Press 'Target' to choose a new target<br>Press 'Attack' to destroy the aliens<br>Press 'Reset' to reset the game`
    playerStats.innerHTML = playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
    playerStatus.innerHTML = `+${shield} Extra Shield Applied`
    

    /***********************************************************\
     * FUNCTIONS
    ************************************************************/

    const launchedAttack = () => {
        dealAttack()
    }

    const dealAttack = (typeOfAttack) => {
        if (checkVitals()) { // If the ship is still active
            if (activeEnemies.length > 0) { // And if the game is still going
                if (activeEnemies[0].active) { // And if the currentEnemy is alive
                    if (spaceship.hull < startingHull && !(spaceship.recharged)) {
                        rechargeButton.style.display = "block"
                    }
                    if (typeOfAttack === 'missle') {
                        spaceship.missleLaunch(activeEnemies[0])
                    } else {
                        spaceship.attack(activeEnemies[0])
                    }
                    if (!(activeEnemies[0].active)) { // If the currentEnemy dies
                        eliminate()
                        updateHidingEnemies()
                        if(activeEnemies[0].type === 'bee') {
                            addPoints(50)
                        } else if (activeEnemies[0].type === 'butterfly') {
                            addPoints(80)
                        } else if (activeEnemies[0].type === 'boss') {
                            addPoints(200)
                        } else if (activeEnemies[0].type === 'rogue') {
                            addPoints(1000)
                        }
                        activeEnemies.shift();
                        counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
                        retreatButton.style.display = "block"
                        
                    } else { // If the currentEnemy is still alive
                        retreatButton.style.display = "none"
                    }
                    if (activeEnemies.length === 0) { // If there are no more enemies
                        newLog(`Good Win Soldier!`, 'gameWon')
                        battleLog.innerHTML += `<br> Your Score: ${points}`
                        if (!(spaceship.leveledUp)) {
                            levelUpButton.style.display = "block"
                            spaceship.leveledUp = true;
                        }
                        targetButton.style.display = "none"
                        enemyBoxes.style.display = "none"
                        retreatButton.style.display = "none"
                        attackButton.style.display = "none"
                        rechargeButton.style.display = "none"
                        playerExtra.style.display = "none"
                        playerStatus.innerHTML = ''
                        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                        enemyStats.innerHTML = 'Hull : 0 <br> FirePower : 0 <br> Accuracy : 0'
                        counter.innerHTML = `Mission Completed`
                    } else if (activeEnemies.length === 1) { // If there is one enemy left
                        enemyBoxes.style.display = "none"
                        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                        enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
                        counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
                    } else {
                        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                        enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
                    }
                    if (!(checkVitals())) {
                        attackButton.style.display = "none"
                        playerStats.innerHTML = 'Hull : 0 <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                        counter.innerHTML = `Mission Failed`
                    }
                    
                }

            } else {
                rechargeButton.style.display = "none"
                targetButton.style.display = "none"
                console.log('no enemies')
            }
            
        } else {
            rechargeButton.style.display = "none"
            targetButton.style.display = "none"
            console.log('dead ship')
        }
        playerStatus.innerHTML = ''
    }

    const selectTarget = (evt) => {
        battleLog.innerHTML = `Select your new target!`
        confirmButton.style.display = "block"
        enemyBoxes.addEventListener('click', function(evt) {
            battleLog.innerHTML = `Press 'Confirm' when you're ready`
            targetButton.style.display = 'none'
            target = evt.target
            let inactiveEnemyBoxes = document.getElementsByClassName('enemyImage')
            for (let i = 0; i < inactiveEnemyBoxes.length; i++) {
                if (inactiveEnemyBoxes[i].classList.contains('active')) {
                    inactiveEnemyBoxes[i].classList.toggle('active')
                }
            }
            let enemyBox = document.getElementsByClassName('enemyImage')[target.id - 1]
            enemyBox.classList.toggle('active')
        })
        confirmButton.addEventListener('click', function(evt) {
            if (target) {
                confirmButton.style.display = 'none'
                targetButton.style.display = 'block'
                battleLog.innerHTML = `Target Acquired.<br>What's your move?`
                this.removeEventListener('click', arguments.callee)
                crtEnemy = activeEnemies[target.id] // new current enemy to be displayed
                activeEnemies[target.id] = activeEnemies[0] // where i click, accepts the value of the current
                target = 0;
                activeEnemies[0] = crtEnemy 
                hidingEnemies = activeEnemies.slice(1);
                updateHidingEnemies()
                enemyStats.innerHTML = 'Hull : ' + crtEnemy.hull + ' <br> ' + 'FirePower : ' + crtEnemy.firepower + ' <br> ' + 'Accuracy : ' + crtEnemy.accuracy
            } 
        })
        playerStatus.innerHTML = ''
    }

    const rechargeShields = () => {
        spaceship.hull += shield
        spaceship.recharged = true;
        rechargeButton.style.display = "none"
        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
        playerStatus.innerHTML = `+${shield} Extra Shield Applied`
    }

    const eliminate = () => {
        let itemDiv = document.getElementsByClassName('otherEnemies')[0]
        if (hidingEnemies.length >= 1) {
            itemDiv.removeChild(itemDiv.firstElementChild)
            hidingEnemies.shift()
        }
    }
    
    const addHidingEnemies = () => {
        // remaining aliens who aren't fighting
        for (let i = 0; i < hidingEnemies.length; i++) {
            let itemDiv = document.createElement('div')
            itemDiv.classList.add("enemyImage")
            if (hidingEnemies[i].type === 'bee') {
                itemDiv.classList.add("bee")
            } else if(hidingEnemies[i].type === 'butterfly') {
                itemDiv.classList.add("butterfly")
            }
            itemDiv.setAttribute('id', `${i + 1}`)
            itemDiv.innerHTML = `HP ${hidingEnemies[i].hull}<br>FP ${hidingEnemies[i].firepower}<br>A ${hidingEnemies[i].accuracy}`
            enemyBoxes.appendChild(itemDiv)
        }
    }

    const updateHidingEnemies = () => {
        while (enemyBoxes.hasChildNodes()) {
            enemyBoxes.removeChild(enemyBoxes.firstChild)
        }
        addHidingEnemies()
        updateCurrentEnemy()
    }

    const updateCurrentEnemy = () => {
        if (activeEnemies[0].type === 'boss') {
            enemyName.innerHTML = 'Boss Galaga'
            enemyImageLarge.style.backgroundImage = "url('/images/enemy.gif')"
        } else if (activeEnemies[0].type === 'butterfly') {
            enemyName.innerHTML = 'Monarch'
            enemyImageLarge.style.backgroundImage = "url('/images/butterfly.gif')"
        } else if (activeEnemies[0].type === 'bee') {
            enemyName.innerHTML = 'Zipper'
            enemyImageLarge.style.backgroundImage = "url('/images/bee.gif')"
        } else if (activeEnemies[0].type === 'rogue') {
            enemyName.innerHTML = 'USS Rogue Fighter'
        }
    }

    const retreatGame = () => {
        newLog(`Spaceship has disappeared`, 'retreat')
        counter.innerHTML = 'Mission Abandoned'
        attackButton.style.display = "none"
        targetButton.style.display = "none"
        retreatButton.style.display = "none"
        rechargeButton.style.display = "none"
        playerExtra.style.display = "none"
        playerStatus.innerHTML = ''
        playerStats.innerHTML = ''
    }

    const createEnemies = () => {
        let totalEnemies = new Array(numEnemies)
        for (let i = 0; i < numEnemies; i++) {
            totalEnemies[i] = new alienShip()
        }
    }

    const createMissles = () => {
        for (let i = 0; i < spaceship.missles; i++) {
            let itemDiv = document.createElement('div')
            itemDiv.classList.add("missle")
            itemDiv.setAttribute('id', `${i + 1}`)
            playerExtra.appendChild(itemDiv)
        }
    }

    const fireMissle = (evt) => {
        let missles = document.getElementsByClassName('missle')
        if (missles[0].classList.contains('fired')) { 
            if (missles[1].classList.contains('fired')) {
                if (missles[2].classList.contains('fired')) {
                    playerStatus.innerHTML = `No more missles!`
                } else {
                    missles[2].classList.add('fired')
                    dealAttack('missle')
                }
            } else {
                missles[1].classList.add('fired')
                dealAttack('missle')
            }
        } else {
            missles[0].classList.add('fired')
            dealAttack('missle')
        }
    }

    const addPoints = (num) => { // NEEDS WORK
        points+=num
        scoreTracker.innerHTML = `${points}`
    }

    const toggleLegend = () => {
        if (legend.style.display === "none") {
            legend.style.display = 'block'
        } else {
            legend.style.display = "none"
        }
    }

    const levelUp = () => {
        playerImage.style.backgroundImage = "url('/images/gray_ship.gif')"
        enemyImageLarge.style.backgroundImage = "url('/images/enemy_ship.gif')"
        spaceship.levelUp()
        playerExtra.style.display = "block"
        levelUpButton.style.display = "none"
        attackButton.style.display = "block"
        activeEnemies.push(enemySpaceship)
        updateCurrentEnemy()
        battleLog.innerHTML = `A Rogue Fighter has appeared!<br>Take it down.`
        enemyName.style.width = '25vw'
        enemyImageLarge.style.width = '27vw'
        enemyImageLarge.style.height = '35vh'
        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
        enemyStats.innerHTML = 'Hull : ' + enemySpaceship.hull  + ' <br> ' + 'FirePower : ' + enemySpaceship.firepower + ' <br> ' + 'Accuracy : ' + enemySpaceship.accuracy
        score.style.display = "none"
        fullEnemy.style.marginLeft = '60px'
        counter.style.display = "none"
        playerStatus.style.display = "none"
    }

    /***********************************************************
     * CREATING ENEMIES
    ************************************************************/

    createEnemies()
    createMissles()
    updateCurrentEnemy()

    hidingEnemies = activeEnemies.slice(1);
    addHidingEnemies()
    scoreTracker.innerHTML = `${points}`
    counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
    enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
    
    attackButton.style.display = "block";
    targetButton.style.display = "block";
    
    playerExtra.addEventListener('click', function(evt) {fireMissle(evt)})
    attackButton.addEventListener('click', launchedAttack)
    targetButton.addEventListener('click', function(evt) {selectTarget(evt)})
    retreatButton.addEventListener('click', retreatGame)
    rechargeButton.addEventListener('click', rechargeShields)
    levelUpButton.addEventListener('click', levelUp)
    trophy.addEventListener('click', function(evt){toggleLegend()})

}
const resetGame = () => {
    document.location.reload(true);
}

const rechargeButton = document.getElementById('recharge')
const targetButton = document.getElementById('target')
const confirmButton = document.getElementById('confirm')
const retreatButton = document.getElementById('retreat')
const attackButton = document.getElementById('attack')
const levelUpButton = document.getElementById('levelUp')
const startButton = document.getElementById('start')
startButton.addEventListener('click', startGame)

const resetButton = document.getElementById('reset') 
resetButton.addEventListener('click', resetGame)
