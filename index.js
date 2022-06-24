// alienShip class and create 6 alien instances
// should have hull, firepower, and accuracy props

// object of user spaceship
// should have hull, firepower, and accuracy props

const activeEnemies = [] // array of ships still active

const spaceship = {
    hull: 5,
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



let alien1 = new alienShip()
let alien2 = new alienShip()
let alien3 = new alienShip()
let alien4 = new alienShip()
let alien5 = new alienShip()
let alien6 = new alienShip()

// THE GAME

console.log(activeEnemies)
console.log(
    `You are beginning to attack!`
)

// ATTACK 1

while (alien1.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien1)
    if (alien1.hull <= 0) {
        console.log(activeEnemies)
    }
}


// ATTACK 2
while (alien2.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien2)
    if (alien2.hull <= 0) {
        console.log(activeEnemies)
    }
}

// ATTACK 3
while (alien3.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien3)
    if (alien3.hull <= 0) {
        console.log(activeEnemies)
    }
}

// ATTACK 4
while (alien4.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien4)
    if (alien4.hull <= 0) {
        console.log(activeEnemies)
    }
}


// ATTACK 5
while (alien5.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien5)
    if (alien5.hull <= 0) {
        console.log(activeEnemies)
    }
}


// ATTACK 6
while (alien6.hull > 0 && spaceship.hull > 0) {
    spaceship.attack(alien6)
    if (alien6.hull <= 0) {
        console.log(activeEnemies)
    }
}

/***********************************************************/

// // accessing playerStats class
const playerStats = document.querySelector('.playerStats')
playerStats.innerHTML = 'Hull : 0 <br> FirePower: 0 <br> Accuracy : 0'

// // accessing the current attacking enemy
const enemyStats = document.querySelector('.enemyStats')
enemyStats.innerHTML = 'Hull : 0 <br> FirePower: 0 <br> Accuracy : 0'
// playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
// console.log(playerStats)



// enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy

// start game by pressing button
// const startButton = document.getElementById('start');
// startButton.addEventListener('click', function(evt) {
//     const enemyBox = document.getElementsByClassName('otherEnemies')[0]
//     console.log(enemyBox)

//     const cavalry = activeEnemies.slice(1);

//     cavalry.forEach((enemy) => {
//     let itemDiv = document.createElement('div')
//     itemDiv.classList.add("enemyImage")
//     enemyBox.appendChild(itemDiv);

//     // accessing playerStats class
//     const playerStats = document.querySelector('.playerStats')
//     playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
//     console.log(playerStats)

//     // accessing the current attacking enemy
//     const enemyStats = document.querySelector('.enemyStats')
//     enemyStats.innerHTML = 'Hull : ' + activeEnemies[0].hull + ' <br> ' + 'FirePower : ' + activeEnemies[0].firepower + ' <br> ' + 'Accuracy : ' + activeEnemies[0].accuracy
//     evt.preventDefault()
//     let alien1 = new alienShip()
//     let alien2 = new alienShip()
//     let alien3 = new alienShip()
//     let alien4 = new alienShip()
//     let alien5 = new alienShip()
//     let alien6 = new alienShip()

// // THE GAME

// console.log(activeEnemies)
// console.log(
//     `You are beginning to attack!`
// )

// // ATTACK 1

// while (alien1.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien1)
//     if (alien1.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }


// // ATTACK 2
// while (alien2.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien2)
//     if (alien2.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }

// // ATTACK 3
// while (alien3.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien3)
//     if (alien3.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }

// // ATTACK 4
// while (alien4.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien4)
//     if (alien4.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }


// // ATTACK 5
// while (alien5.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien5)
//     if (alien5.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }


// // ATTACK 6
// while (alien6.hull > 0 && spaceship.hull > 0) {
//     spaceship.attack(alien6)
//     if (alien6.hull <= 0) {
//         console.log(activeEnemies)
//     }
// }
// })
    
// })

const resetButton = document.getElementById('reset') 
resetButton.addEventListener('click',function(evt) {

    // accessing playerStats class
    const playerStats = document.querySelector('.playerStats')
    playerStats.innerHTML = 'Hull : ' + spaceship.hull + ' <br> ' + 'FirePower : ' + spaceship.firepower + ' <br> ' + 'Accuracy : ' + spaceship.accuracy
    console.log(playerStats)

    const enemyStats = document.querySelector('.enemyStats')
})

