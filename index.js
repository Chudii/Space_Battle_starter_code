let activeEnemies = [] // array of ships still active
let hidingEnemies = []
let crtEnemy = activeEnemies[0]
const shield = Math.floor((Math.random() * 5) + 1)
const numEnemies = 6
const startingHull = 20

let spaceship = {
    hull: startingHull + shield,
    firepower: 5,
    accuracy: .7,
    missles: 3,
    missleDmg: 10,
    recharged: false,
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
            newLog(`BOOM! They got obliterated`, 'enemyHit')
            obj.active = false;
        } else {
            newLog(`It missed! Prepare for return fire... <br>`, 'shipMiss')
            obj.attack()
        }
    }
}

class alienShip {
    constructor() {
        // this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
        // this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
        // this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Have either 60, 70 or 80% Accuracy
        this.active = true;
        if (Math.random() < 0.2){ // These Aliens have a 20% of spawning
            if (Math.random() < 0.3) { 
                this.hull = 12; // HP 10
                this.firepower = 3; // Attack 3 
                this.accuracy = 0.5; // 50% accurate 
            } else {
                this.hull = 8; // HP 8
                this.firepower = 3; // Attack btwn 2-4 
                this.accuracy = 0.5; // 50% accurate
            }
        } else {
            this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
            this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
            this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Have either 60, 70 or 80%
        }
        activeEnemies.push(this)
    }
    attack() {
        if (Math.random() < this.accuracy) { // if hit is good
            spaceship.hull -= this.firepower;
            if (spaceship.hull <= 0 ) {
                newLog(`Your ship has been destroyed`, 'gameOver')
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

let battleLog = document.getElementsByClassName('battleLog')[0]
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

const startGame = () => {
    /***********************************************************\
     * CONNECTING TO DOM
    ************************************************************/

    startButton.style.display = "none"
    let target
    const playerStats = document.querySelector('.playerStats')
    const enemyStats = document.querySelector('.enemyStats')
    const enemyBoxes = document.getElementsByClassName('otherEnemies')[0]
    const playerExtra = document.getElementsByClassName('playerExtra')[0]
    let counter = document.getElementsByClassName('counter')[0]
    let playerStatus = document.getElementsByClassName('playerStatus')[0]

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
                        activeEnemies.shift();
                        counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
                        retreatButton.style.display = "block"
                        
                    } else { // If the currentEnemy is still alive
                        retreatButton.style.display = "none"
                    }
                    if (activeEnemies.length === 0) { // If there are no more enemies
                        newLog(`Good Win Soldier!`, 'gameWon')
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
            confirmButton.style.display = 'none'
            targetButton.style.display = 'block'
            battleLog.innerHTML = `Target Acquired.<br>What's your move?`
            this.removeEventListener('click', arguments.callee)
            crtEnemy = activeEnemies[target.id] // new current enemy to be displayed
            activeEnemies[target.id] = activeEnemies[0] // where i click, accepts the value of the current
            activeEnemies[0] = crtEnemy 
            hidingEnemies = activeEnemies.slice(1);
            updateHidingEnemies()
            // enemyBox = document.getElementsByClassName('enemyImage')[target.id - 1]
            // this.removeEventListener('click', arguments.callee)
            enemyStats.innerHTML = 'Hull : ' + crtEnemy.hull + ' <br> ' + 'FirePower : ' + crtEnemy.firepower + ' <br> ' + 'Accuracy : ' + crtEnemy.accuracy
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
    }

    const retreatGame = () => {
        newLog(`Spaceship has disappeared`, 'retreat')
        counter.innerHTML = 'Mission Abandoned'
        attackButton.style.display = "none"
        targetButton.style.display = "none"
        retreatButton.style.display = "none"
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

    /***********************************************************
     * CREATING ENEMIES
    ************************************************************/

    createEnemies()
    createMissles()

    hidingEnemies = activeEnemies.slice(1);
    addHidingEnemies()
    counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
    enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
    
    attackButton.style.display = "block";
    targetButton.style.display = "block";
    
    playerExtra.addEventListener('click', function(evt) {fireMissle(evt)})
    attackButton.addEventListener('click', launchedAttack)
    targetButton.addEventListener('click', function(evt) {selectTarget(evt)})
    retreatButton.addEventListener('click', retreatGame)
    rechargeButton.addEventListener('click', rechargeShields)

}
const resetGame = () => {
    document.location.reload(true);
}

const rechargeButton = document.getElementById('recharge')
const targetButton = document.getElementById('target')
const confirmButton = document.getElementById('confirm')
const retreatButton = document.getElementById('retreat')
const attackButton = document.getElementById('attack')

const startButton = document.getElementById('start')
startButton.addEventListener('click', startGame)

const resetButton = document.getElementById('reset') 
resetButton.addEventListener('click', resetGame)



