$.getJSON('words.json').done(data => {
    window.allWords = data
}).fail(() => {
    window.allWords = []
    alert('Unable to load words file!')
});

/*

_.debounce(function() {
            if (this.input === "") {
                this.words = []
            } else {
                this.words = allWords.filter(word => word.startsWith(this.input)).slice(0, 50);
            }
        }, 50)

        */

var app = new Vue({
    el: '#app',
    data: {
        input: '',
        words: []
    },
    watch: {
        input: _.debounce(function() {
            if (this.input === "") {
                this.words = []
            } else {
                this.words = _.sortBy(
                        allWords.filter(word => word.startsWith(this.input.slice(0, 1)))
                        .map(word => [word, Levenshtein.get(this.input, word)]),
                    x => x[1])
                    .slice(0, 50)
                    .map(x => x[0]);
            }
        }, 100)
    }
})