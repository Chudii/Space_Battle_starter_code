// alienShip class and create 6 alien instances
// should have hull, firepower, and accuracy props

// object of user spaceship
// should have hull, firepower, and accuracy props

let activeEnemies = [] // array of ships still active

let spaceship = {
    hull: 20,
    firepower: 5,
    accuracy: .7,
    attack(obj) {
        if (Math.random() < this.accuracy) { // if hit is good
            obj.hull -= this.firepower;
            if (obj.hull <= 0) { // if enemy is eliminated
                console.log(`***Attack Successful*** Their hull has been destroyed`);
                activeEnemies.shift();
            } else { // enemy hit but still active
                console.log(`***Attack Successful*** Their hull has decreased to ${obj.hull}`)
                console.log(`They will return fire...`)
                obj.attack()
            }
        } else { // missed hit
            console.log('Your ship missed!')
            console.log(`They will return fire...`)
            obj.attack()
        }
    }
}

class alienShip {
    constructor() {
        this.hull = Math.floor((Math.random() * 4) + 3); // HP btwn 3-6
        this.firepower = Math.floor((Math.random() * 3) + 2); // Attack btwn 2-4 
        this.accuracy = Math.floor((Math.random() * 2) + 6) / 10; // Accuracy btwn 60-80%
        activeEnemies.push(this)
    }
    attack() {
        if (Math.random() < this.accuracy) { // if hit is good
            console.log('---You have been hit!');
            spaceship.hull -= this.firepower;
            if (spaceship.hull <= 0 ) {
                console.log(`Game Over. Your ship was destroyed`)
            } else {
                console.log(`Your hull has decreased to ${spaceship.hull}`)
            }
        } else { // missed hit
            console.log('Alien missed!')
        }
    }
}

/***********************************************************/

const checkVitals = () => {
    if (spaceship.hull > 0) {
     return true
    } else {
     return false
    }
 }

/*
 */
const startGame = () => {
    startButton.style.display = "none"
    const playerStats = document.querySelector('.playerStats')
    playerStats.innerHTML = playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
    const enemyStats = document.querySelector('.enemyStats')
    

    const enemyBoxes = document.getElementsByClassName('otherEnemies')[0]

    const launchedAttack = () => {
        let numEnemiesBeforeAttack = activeEnemies.length
        if (checkVitals()) {
            if (activeEnemies[0]) {
                spaceship.attack(activeEnemies[0])
                if (!(activeEnemies[0])) {
                    console.log('Winner! Winner! Chicken Dinner!')
                    playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                    enemyStats.innerHTML = 'Hull : 0 <br> FirePower : 0 <br> Accuracy : 0'
                } else {
                    playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
                    enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
                }
                if (numEnemiesBeforeAttack > activeEnemies.length && activeEnemies[0]) {
                    let itemDiv = document.getElementsByClassName('otherEnemies')[0];
                    itemDiv.removeChild(itemDiv.firstElementChild)
                    console.log(itemDiv)
                }
            }
        }
        
    }

    let alien1 = new alienShip()
    let alien2 = new alienShip()
    let alien3 = new alienShip()
    let alien4 = new alienShip()
    let alien5 = new alienShip()
    let alien6 = new alienShip()

    // remaining aliens who aren't fighting
    const inactiveEnemies = activeEnemies.slice(1);
    inactiveEnemies.forEach((inactiveEnemy) => {
        let itemDiv = document.createElement('div')
        itemDiv.classList.add("enemyImage")
        enemyBoxes.appendChild(itemDiv)
    })

    enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy

    const attackButton = document.getElementById('attack')
    attackButton.style.display = "block";
    attackButton.addEventListener('click', launchedAttack)
}

const resetGame = () => {
    activeEnemies = []
    spaceship.hull = 20;

    const attackButton = document.getElementById('attack')
    startButton.style.display = "block"
    attackButton.style.display = "none"
    const playerStats = document.querySelector('.playerStats')
    playerStats.innerHTML = ''
    const enemyStats = document.querySelector('.enemyStats')
    enemyStats.innerHTML = ''

    const enemyBoxes = document.getElementsByClassName('otherEnemies')[0]
    while (enemyBoxes.hasChildNodes()) {
        enemyBoxes.removeChild(enemyBoxes.firstChild);
    }
}

const startButton = document.getElementById('start');
startButton.addEventListener('click', startGame)

const resetButton = document.getElementById('reset') 
resetButton.addEventListener('click', resetGame)

