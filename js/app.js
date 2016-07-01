function init() {
    var board = document.createElement("table");
    var cellsize = 40;
    var promotionarea = 3;
    document.body.appendChild(board);
    
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
            token.style.fontSize = cellsize * 0.8;
            if (boardcontents[i][j].length != 0){
                token.appendChild(document.createTextNode(boardcontents[i][j]));
            }
            td.appendChild(cell);
            cell.appendChild(token);
            td.height = cellsize;
            td.width = cellsize;
		}
	}
	
    $(function(){
        $(".token").draggable({cursor:"move"});
    });
	board.rules = "all";
	board.frame = "box";
}

 
window.onload = init();