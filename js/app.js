function init() {
    var board = document.createElement("table");
    var hand = document.createElement("div");
    var captured = document.createElement("div");
    var cellsize = 40;
    var promotionarea = 3;
    board.id="board";
    hand.id="hand";
    captured.id="captured";
    document.body.appendChild(captured);
    document.body.appendChild(board);
    document.body.appendChild(hand);
    
    var boardcontents = [
        ["香","桂","銀","金","王","金","銀","桂","香"],
        ["","飛","","","","","","角",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","角","","","","","","飛",""],
        ["香","桂","銀","金","玉","金","銀","桂","香"]
    ];
    var promotionhash = new Object;
    promotionhash["香"]="杏";
    promotionhash["杏"]="香";
    promotionhash["桂"]="圭";
    promotionhash["圭"]="桂";
    promotionhash["銀"]="全";
    promotionhash["全"]="銀";
    promotionhash["金"]="金";
    promotionhash["王"]="王";
    promotionhash["玉"]="玉";
    promotionhash["歩"]="と";
    promotionhash["と"]="歩";
    promotionhash["飛"]="龍";
    promotionhash["龍"]="飛";
    promotionhash["角"]="馬";
    promotionhash["馬"]="角";
    
    var promotioncolor = {black:"red",red:"black"}

    for(var i = 0;i < boardcontents.length;++i){
        var tr = board.insertRow(-1);
		for(var j = 0;j < boardcontents[i].length;++j){
            var td = tr.insertCell(-1);
            var cell = document.createElement("div");
            cell.className = "cell";
            var token = document.createElement("div");
            token.className = "token";
            if(i<promotionarea){
                token.style.transform = "rotate(180deg)";
            }
            token.style.color="black";
            if (boardcontents[i][j].length != 0){
                token.appendChild(document.createTextNode(boardcontents[i][j]));
            }
            td.appendChild(cell);
            cell.appendChild(token);
		}
	}
    $(function(){
        $(".token").draggable({
            cursor:"move",
            grid:[44, 44]
        });
        $(".token").on('dblclick',function(){
            this.innerText=promotionhash[this.innerText];
            this.style.color = promotioncolor[this.style.color]
        })
        $("#hand").droppable({
            drop: function (e, ui) {
                
            }
        })
    });
}

 
window.onload = init();