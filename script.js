// get quotes from API
// USE async fetch request

let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const seasonText = document.getElementById('season');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const logo = document.getElementById('logo')

function loading() {
    loader.hidden = false;
    logo.hidden = true;
    quoteContainer.hidden = true;

}

function complete() {
    quoteContainer.hidden = false;
    logo.hidden = false;
    loader.hidden = true;
}


function newQuote() {
loading();
const quote = apiQuotes;
// console.log(quote)
authorText.textContent = quote.author;
if (quote.quote.length > 50) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// set quote, hide loader
let t = '( Season: '+ quote.season + ' , ' + 'Episode: ' + quote.episode + ' )';
seasonText.textContent = t;
quoteText.textContent = quote.quote;
complete();

}


async function getQuotes() {
    loading();
    const apiURL = 'https://seinfeld-quotes.herokuapp.com/random';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        // console.log(apiQuotes)
        newQuote();


    } catch (error) {
        // catch error
    }

}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} ${seasonText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// on load, run getQuotes
getQuotes();


