// svaki red ima 13 sedista, pa smanjujemo za jedan u svakoj iteraciji
// dok se ne predje na drugi red, pa opet vracamo na 13
let brojDoPunog = 13;

// kreiramo prazan red
let $red = document.createElement('div');
$red.classList.add('red-u-busu');

for (let i = 1; i < 53; i++) {
    // svako sediste predstavi kao artikal
    const $article = document.createElement('article');
    // dodeli id da bi mogli da ih referenciramo
    $article.id = i;
    $article.classList.add('sediste');
    $article.textContent = i;
    // pogledaj u localStorage da li je sediste vec rezervisano  
    // localStorage simulira bazu podataka
    if (localStorage.getItem(i) !== null) {
        $article.style.backgroundColor = '#0D38DD';
        $article.style.textDecoration = 'line-through';
    } else {
        $article.style.backgroundColor = '#4267F4';
    }
    // dodamo sediste u red
    $red.append($article);
    brojDoPunog--;
    // ako je popunjen red 
    if (brojDoPunog === 0 && i < 52) {
        // dodaj u bus (glavni deo)
        document.getElementById('sedista').append($red);
        // reasign da red bude prazan
        $red = document.createElement('div');
        $red.classList.add('red-u-busu');
        // novi red je kreiran pa se dodaje 
        brojDoPunog = 13;
    } else {
        // na kraju ako brojDoPunog nije 0 da se ubaci poslednji red
        document.getElementById('sedista').append($red);
    }
}

// vizuelno prikazi da je sediste 1 drukacije(vozacevo)
document.getElementById(1).style.backgroundColor = '#DDB20D';
document.getElementById(1).innerText = '1 (vozac)';

document.getElementById('rezervacija').addEventListener('submit', e => {
    e.preventDefault();

    const brojSedista = e.target.brojSedista.value;

    const proveraSedistaUspesna = proveriDostupnostSedista(brojSedista);

    if (proveraSedistaUspesna) {
        const imeIPrezime = e.target.imeIPrezime.value;
        const email = e.target.email.value;

        document.getElementById(brojSedista).style.backgroundColor = '#0D38DD';
        document.getElementById(brojSedista).style.textDecoration = 'line-through';
        localStorage.setItem(brojSedista, JSON.stringify({ imeIPrezime, email }));
        alert(`Sediste broj ${brojSedista} je rezervisano na vase ime.`);
    }
});

// ako ima greska vrati false, inace vrati true
function proveriDostupnostSedista(brojSedista) {
    if (brojSedista === 1) {
        alert(`Sediste broj 1 je vozacevo sediste, samim tim se ne moze rezervisati!`);
        return false;
    }

    if (document.getElementById(brojSedista).style.backgroundColor === 'red') {
        alert(`Sediste broj ${brojSedista} je vec zauzeto!`);
        return false;
    }

    return true;
}