function init() {
    var board = document.createElement("table");
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
    var dragedobj;
    
    for(var i = 0;i < boardcontents.length;++i){
        var tr = board.insertRow(-1);
		for(var j = 0;j < boardcontents[i].length;++j){
            var td = tr.insertCell(-1);
            var element = document.createElement("div");
            element.className = "token";
            if (boardcontents[i][j].length != 0){
                element.appendChild(document.createTextNode(boardcontents[i][j]));
            }
            td.appendChild(element);
            td.height = 20;
		}
	}
    $(function(){
        $(".token").draggable();
    });
	board.rules = "all";
	board.frame = "box";
}

 
window.onload = init();