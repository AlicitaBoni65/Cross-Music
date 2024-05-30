const totalCards = 18;
let cards = [];
let selectCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        e.target.classList.add('active');

        if (!selectCards[0] || selectCards[0] !== e.target) {
            selectCards.push(e.target);

            if (++currentMove == 2) {

                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + 'intentos';


                if (selectCards[0].querySelectorAll('.face')[0].innerHTML == selectCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectCards[0].classList.remove('active');
                        selectCards[1].classList.remove('active');
                        selectCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }

}
function randomValue(){
    let rnd =Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2){
        valuesUsed.push(rnd);
    }
    else{
        randomValue();
    }
}
for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#juego').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = valuesUsed[i];
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);


}