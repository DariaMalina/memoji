
let comparison = (el1, el2) => {
    if (el1.children[1].textContent === el2.children[1].textContent) {
        el1.children[1].classList.add('green')
        el2.children[1].classList.add('green')
    } else {
        el1.children[1].classList.add('red')
        el2.children[1].classList.add('red')
        setTimeout(() => {
            reversal(el1.children)
            reversal(el2.children)
        }, 1000)
        setTimeout(() => {
            el1.children[1].classList.remove('red')
            el2.children[1].classList.remove('red')
        }, 1500)
    }
}
let coup = (el) => {
    el[0].style.transform = 'rotateY(180deg)'
    el[1].style.transform = 'rotateY(360deg)'
}
let reversal = (el) => {
    el[0].style.transform = 'rotateY(360deg)'
    el[1].style.transform = 'rotateY(180deg)'
}
let openCardsTuple = []
document.addEventListener("click", event => {
    if (event.target.classList.contains('front')) {
        let parent = event.target.parentNode
        coup(parent.children)
        if (openCardsTuple.length < 2) {
            openCardsTuple.push(parent)
        } else {
            openCardsTuple = []
            openCardsTuple.push(parent)
        }
        if (openCardsTuple.length === 2) {
            comparison(openCardsTuple[0], openCardsTuple[1])
        }
    }
});
