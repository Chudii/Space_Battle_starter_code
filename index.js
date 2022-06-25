let activeEnemies = [] // array of ships still active
let hidingEnemies = []

let spaceship = {
    hull: 20,
    firepower: 5,
    accuracy: .7,
    attack(obj) {
        if (Math.random() < this.accuracy) { // if hit is good
            obj.hull -= this.firepower;
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
    }
}

class alienShip {
    constructor() {
        this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
        this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
        this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Have either 60, 70 or 80% Accuracy
        this.active = true;
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

    const playerStats = document.querySelector('.playerStats')
    const enemyStats = document.querySelector('.enemyStats')
    const enemyBoxes = document.getElementsByClassName('otherEnemies')[0]
    let counter = document.getElementsByClassName('counter')[0]

    battleLog.innerHTML = "Press 'Attack' to destroy the aliens"
    playerStats.innerHTML = playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
    counter.innerHTML = "6 Aliens Remaining"

    /***********************************************************\
     * FUNCTIONS
    ************************************************************/

    const launchedAttack = () => {
        let currentAttacker = activeEnemies[0]
        if (checkVitals()) {
            if (activeEnemies.length > 0) {
                if (currentAttacker.active) {
                    spaceship.attack(activeEnemies[0])
                    if (!(currentAttacker.active)) {
                        eliminate()
                        activeEnemies.shift();
                        counter.innerHTML = `${activeEnemies.length} Aliens Remaining`
                        retreatButton.style.display = "block"
                    } else {
                        retreatButton.style.display = "none"
                    }
                    if (activeEnemies.length === 0) {
                        newLog(`Good Win Soldier!`, 'gameWon')
                        enemyBoxes.style.display = "none"
                        retreatButton.style.display = "none"
                        attackButton.style.display = "none"
                        playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                        enemyStats.innerHTML = 'Hull : 0 <br> FirePower : 0 <br> Accuracy : 0'
                        counter.innerHTML = `Mission Completed`
                    } else if (activeEnemies.length === 1) {
                        enemyBoxes.style.display = "none"
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
            }
            
        }
        
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
            enemyBoxes.appendChild(itemDiv)
        }
    }

    const retreatGame = () => {
        newLog(`Spaceship has disappeared`, 'retreat')
        counter.innerHTML = 'Mission Abandoned'
        attackButton.style.display = "none"
        retreatButton.style.display = "none"

        playerStats.innerHTML = ''
    }

    /***********************************************************
     * CREATING ENEMIES
    ************************************************************/

    let alien1 = new alienShip()
    let alien2 = new alienShip()
    let alien3 = new alienShip()
    let alien4 = new alienShip()
    let alien5 = new alienShip()
    let alien6 = new alienShip()

    hidingEnemies = activeEnemies.slice(1);
    addHidingEnemies()

    enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy

    
    attackButton.style.display = "block";
    attackButton.addEventListener('click', launchedAttack)
    retreatButton.addEventListener('click', retreatGame)

}
const resetGame = () => {
    document.location.reload(true);
}

const retreatButton = document.getElementById('retreat')
const attackButton = document.getElementById('attack')

const startButton = document.getElementById('start');
startButton.addEventListener('click', startGame)

const resetButton = document.getElementById('reset') 
resetButton.addEventListener('click', resetGame)



