const playingField = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
]
let openCardsTuple = []
let mixArray = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻']
let number = 59
const mix = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
}
const arrInsertion = (x, y, el) => {
    playingField[x][y] = el
}

document.querySelector('.gap__button').addEventListener('click', event => {
    event.target.style.boxShadow = '0px 0px 4px 4px rgba(34, 60, 80, 1) inset;'
    location.reload()
})
const win = () => {
    document.querySelector('.block').style.display = 'flex'
    document.querySelector('.gap__button').textContent = 'Play again'
    document.querySelector('.span1').textContent = 'W'
    document.querySelector('.span2').textContent = 'i'
    document.querySelector('.span3').textContent = 'n'
    number = 0
}
const lose = () => {
    let span4 = document.createElement('span')
    span4.textContent = 'e'
    span4.classList.add('span4')
    document.querySelector('.gap__p').append(span4)
    document.querySelector('.block').style.display = 'flex'
    document.querySelector('.gap__button').textContent = 'Try again'
    document.querySelector('.span1').textContent = 'L'
    document.querySelector('.span2').textContent = 'o'
    document.querySelector('.span3').textContent = 'S'
    number = 0
}

const shuffle = () => {
    mixArray = mix(mixArray)
    let i = 0
    for (let node of document.querySelectorAll('.card')) {
        node.children[1].textContent = mixArray[i]
        i++
    }
}

const winner = () => {
    return playingField.flat().every(el => {
        return el !== null;
    })
}

const comparison = (el1, el2) => {
    let content1 = el1.children[1].textContent;
    let content2 = el2.children[1].textContent;
    let child1 = el1.children[1]
    let child2 = el2.children[1]
    if (content1 === content2) {
        arrInsertion(el1.id[0], el1.id[1], content1)
        arrInsertion(el2.id[0], el2.id[1], content2)
        setTimeout(() => {
            child1.classList.add('green')
            child2.classList.add('green')
        }, 500)

    } else {
        setTimeout(() => {
            child1.classList.add('red')
            child2.classList.add('red')
        }, 500)
        setTimeout(() => {
            reverseCards(el1.children)
            reverseCards(el2.children)
        }, 1000)
        setTimeout(() => {
            child1.classList.remove('red')
            child2.classList.remove('red')
        }, 1500)
    }
    console.log(playingField)
}
const coupCard = (el) => {
    el[0].style.transform = 'rotateY(180deg)'
    el[1].style.transform = 'rotateY(360deg)'
}
const reverseCards = (el) => {
    el[0].style.transform = 'rotateY(360deg)'
    el[1].style.transform = 'rotateY(180deg)'
}

document.addEventListener("click", event => {
    if (event.target.classList.contains('front')) {
        let parent = event.target.parentNode
        coupCard(parent.children)
        if (openCardsTuple.length < 2) {
            openCardsTuple.push(parent)
        } else {
            openCardsTuple = [parent]
        }
        if (openCardsTuple.length === 2) {
            comparison(openCardsTuple[0], openCardsTuple[1])
            setTimeout(() => {
                let answer = winner()
                if (answer) {
                    win()
                }
            }, 1000)
        }
    }
});
let counter = setInterval(() => {
    if (number === 0) {
        let answer = winner()
        if (!answer) {
            clearInterval(timer)
            lose()
        }
    } else {
        document.querySelector('.sec').textContent = number;
        number--
        if (number < 10) {
            document.querySelector('.sec').textContent = '0' + number
        }
    }
}, 1000)


function timer() {
    setTimeout(() => {
        document.querySelector('.min').textContent = '00:'
    }, 1000)

    setTimeout(() => {
        clearInterval(counter)
    }, 60000)
}

(function startGame() {
    shuffle()
    timer()
}())




