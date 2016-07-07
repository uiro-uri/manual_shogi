function init() {
    var board = document.createElement("table");
    var hand = document.createElement("div");
    var captured = document.createElement("div");
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
    
    var promotioncolor = {black:"red",red:"black"};

    for(var i = 0;i < boardcontents.length;++i){
        var tr = board.insertRow(-1);
		for(var j = 0;j < boardcontents[i].length;++j){
            var cell = tr.insertCell(-1);
            cell.className = "cell";
            if (boardcontents[i][j].length != 0){
                var piece = document.createElement("div");
                piece.className = "piece";
                if(i<promotionarea){
                    piece.classList.add("opponents");
                } else {
                    piece.classList.add("yours");
                }
                piece.style.color="black";
                piece.appendChild(document.createTextNode(boardcontents[i][j]));
                cell.appendChild(piece);
            }
		}
	}
    $(function(){
        var selecting = null;
        $(".cell").on('click',function() {
            if (this.childNodes.length==0 && selecting!==null){
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
            }
        });
        $(".cell").droppable({
            drop:function(){
                if (this.childNodes.length==0 && selecting!==null){
                    this.appendChild(selecting);
                }
            }
        });
        $(".piece").draggable({
            start:function(){
                console.log("start");
                $(selecting).removeClass("ui-selected");
                selecting=this;
                $(this).addClass("ui-selected");
            },
            stop:function(){
                console.log("stop");
                $(this).css('top',0);
                $(this).css('left',0);
            }
        });
        $(".piece").on('click',function(){
            $(selecting).removeClass("ui-selected");
            selecting=this;
            $(this).addClass("ui-selected");
        });
        $(".piece").on('dblclick',function(){
            this.innerText=promotionhash[this.innerText];
            this.style.color = promotioncolor[this.style.color];
        });
        $("#hand").droppable({
            drop:function(){
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting.classList.add("yours");
                selecting.classList.remove("opponents");
            }
        });
        $("#hand").on('click',function() {
            if (selecting!==null){
                this.appendChild(selecting);
                selecting.classList.add("yours");
                selecting.classList.remove("opponents");
            }
        });
        $("#captured").droppable({
            drop:function(){
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting.classList.add("opponents");
                selecting.classList.remove("yours");
            }
        });
        $("#captured").on('click',function() {
            if (selecting!==null){
                this.appendChild(selecting);
                selecting.classList.add("opponents");
                selecting.classList.remove("yours");
            }
        });
    });
}
 
window.onload = init();