// #2 Game exercise

//     Use HTML, JavaScript, and CSS to create a simple typing game.

//     Requirements:
//          • Random letters appear in a containing <div> element, 1000px wide, at an interval of 1 second.
//          • Every 100 milliseconds, all the existing letters move right by 10px.
//          • Pressing a correct letter removes the oldest instance of that letter, and increases the score by 1 point.
//          • Pressing a letter that isn't on the page decreases the score by 1 point.
//          • Pressing Escape ends the game.
//          • If a letter gets all the way to the right-hand side of the container, the game is over.
//          • For every 20 letters that have been found, the interval of letter creation decreases by 10%.

//     Tools:
//          • Use any JavaScript libraries you like.
//          • Provide a single HTML file and your supporting .js and .css files.
//          • If you use a CSS preprocessor (SASS, LESS, etc.) please include your source files also.

function play() {
    var score = 0;
    $("#score-value").html(score);

    // generate a new random letter every second
    var lttrs = new Array();
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    var new_letters = self.setInterval(function() {
        var randX = Math.floor(Math.random()*1000);
        var randY = Math.floor(Math.random()*600);
        var randAlpha = Math.floor(Math.random()*26);
        var lttr = alpha[ Math.floor(Math.random() * 27) ];
        lttrs.push(lttr);

        $( "<div></div>" ).attr("id", lttrs.length-1).attr("class", "letter").html(lttr).css({top: randY, left: randX}).appendTo( $("#canvas") );
    }, 1000);
    // console.log(lttrs);


    // move all letters to the right every 100 ms
    var move_letters = self.setInterval(function() {
        // $(".letter").animate({ "left": "+=10px" }, "fast");
        $(".letter").each(function(index) {
            $(this).animate({ "left": "+=10px" }, "fast");
            var p = $(this).position();
            if (p.left >= 1000) {
                game_over(new_letters, move_letters);
            }
        });
    }, 100);


    // handle keypresses
    $(document).keydown(function(e){
        // esc
        if (e.keyCode==27) {
            game_over(new_letters, move_letters);
        }
        // alphabet
        if ((e.keyCode > 64) && (e.keyCode < 91)) {
            // convert to the right alphabet letter
            pressed_lttr = alpha[e.keyCode - 65];
            console.log(pressed_lttr);

            ind = $.inArray(pressed_lttr, lttrs);
            // wrong letter
            if (ind < 0) {
                score--;
            }
            // right letter
            else {
                // swap for placeholder so we don't mess up the indices
                lttrs[ind] = "*";
                $("#" + ind).remove();
                score++;
            }
            $("#score-value").html(score);
        }
    });
};


function game_over(news, moving) {
    $("<div></div>").attr("class", "game-over").html("GAME OVER").appendTo($("body"));
    clearInterval(news);
    clearInterval(moving);
    clearTimeout(news);
    clearTimeout(moving);
}


$(document).ready(function() {
    console.log( "ready!" );
    play();
});