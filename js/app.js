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
            var cell = tr.insertCell(-1);
            cell.className = "cell";
            if (boardcontents[i][j].length != 0){
                var token = document.createElement("div");
                token.className = "token";
                if(i<promotionarea){
                    token.style.transform = "rotate(180deg)";
                }
                token.style.color="black";
                token.appendChild(document.createTextNode(boardcontents[i][j]));
                cell.appendChild(token);
            }
		}
	}
    $(function(){
        var selecting = null;
        $(".cell").on('click',function() {
            if (this.childNodes.length==0　&& selecting!==null){
                $(selecting).removeClass("ui-selected");
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting=null;
            }
        });
        $(".cell").droppable({
            drop:function(){
                if (this.childNodes.length==0　&& selecting!==null){
                    this.appendChild(selecting);
                }
            }
        });
        $(".token").draggable({
            start:function(){
                console.log("start");
                selecting=this;
            },
            stop:function(e,ui){
                console.log("stop");
                $(this).css('top',0);
                $(this).css('left',0);
                selecting=null;
            }
        });
        $(".token").on('click',function(){
            console.log("select");
            $(selecting).removeClass("ui-selected");
            selecting=this;
            $(this).addClass("ui-selected");
        });
        $(".token").on('dblclick',function(){
            this.innerText=promotionhash[this.innerText];
            this.style.color = promotioncolor[this.style.color];
        });
        $("#hand").droppable({
            over:function(){
                selecting.style.transform="rotate(0deg)";
                $(selecting).removeClass("ui-selected");
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting=null;
            }
        });
        $("#hand").on('click',function() {
            if (selecting!==null){
                selecting.style.transform="rotate(0deg)";
                $(selecting).removeClass("ui-selected");
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting=null;
            }
        });
        $("#captured").droppable({
            over:function(){
                selecting.style.transform="rotate(180deg)";
                $(selecting).removeClass("ui-selected");
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting=null;
            }
        });
        $("#captured").on('click',function() {
            if (selecting!==null){
                selecting.style.transform="rotate(180deg)";
                $(selecting).removeClass("ui-selected");
                this.appendChild(selecting);
                $(selecting).css('top',0);
                $(selecting).css('left',0);
                selecting=null;
            }
        });
    });
}

 
window.onload = init();