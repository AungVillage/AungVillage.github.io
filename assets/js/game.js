var time_left;
var pass_left;
var score;
var time_element = document.getElementById("time");
var score_element = document.getElementById("score");
var pass_element = document.getElementById("pass");
var content_element = document.getElementById("content");
var times; // 计算次数，3次后检测正误
var ini_a,ini_b,ini_c,ini_d;
var game_mode = 1; // 1正常 2错题
var errors = new Array();
var e;
var oDiv=null; //拖拽对象
var disX=0; //拖拽偏移
var disY=0;
var oDivX=0;//拖拽前位置
var oDivY=0;
var selected_card=null;

var content = "";
    content += "<div id=\"card_a\" style=\"position:absolute;width:35%;height:35%;top:10%;left:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "    <img id=\"a\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchstart=\"fnDown(event)\"/>\n";
    content += "    <num id=\"num_a\" style=\"position:absolute;top:5%;left:49%; color:red;\">5<\/num>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/add.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/sub.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/mul.png\"ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/div.png\" ondrop=\"drop(event)\"/>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_b\" style=\"position:absolute;width:35%;height:35%;top:10%;right:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"b\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchstart=\"fnDown(event)\"/>\n";
    content += "  <num id=\"num_b\" style=\"position:absolute;top:5%;left:49%; color:red;\">5<\/num>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/add.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/sub.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/mul.png\"ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/div.png\" ondrop=\"drop(event)\"/>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_c\" style=\"position:absolute;width:35%;height:35%;bottom:10%;left:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"c\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchstart=\"fnDown(event)\"/>\n";
    content += "  <num id=\"num_c\" style=\"position:absolute;top:5%;left:49%; color:red;\">5<\/num>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/add.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/sub.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/mul.png\"ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/div.png\" ondrop=\"drop(event)\"/>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_d\" style=\"position:absolute;width:35%;height:35%;bottom:10%;right:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"d\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchstart=\"fnDown(event)\"/>\n";
    content += "  <num id=\"num_d\" style=\"position:absolute;top:5%;left:49%; color:red;\">5<\/num>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/add.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;top:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/sub.png\" ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;left:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/mul.png\"ondrop=\"drop(event)\"/>\n";
    content += "    <img class=\"symbol\" hidden style=\"position:absolute;bottom:-10%;right:-10%\" width=\"30%\" height=\"20%\" src=\"assets/img/div.png\" ondrop=\"drop(event)\"/>\n";
    content += "<\/div>\n";

function allowDrop(ev)
{
  ev.preventDefault();
}

function drag(ev)
{
  ev.dataTransfer.setData("Text",ev.target.id);
  console.log(ev.target.id);
}

function validate(num){
  times += 1;
  if(times>=3){
    if(num=="24"){
      score+=10;
      score_element.innerHTML=score;
      content_element.innerHTML = '<div style="color:red; font-size:48px; text-align:center; vertical-align:middle;">回答正确！<br> 得10分！</div>';
    } else if(game_mode!=2){
      var temp = new Array(ini_a,ini_b,ini_c,ini_d);
      errors.push(temp);
      content_element.innerHTML = '<div style="color:red; font-size:48px; text-align:center; vertical-align:middle;">错误！<br>请继续努力！</div>';
    }
    setTimeout("makeQuestion()",1000);
  }
}

function calc(num_a,num_b,op){
  if(num_a.parentNode==num_b.parentNode)
    return false;
  var a = parseFloat(num_a.innerHTML);
  var b = parseFloat(num_b.innerHTML);
  console.log(a,op,b);
  switch (op) {
    case '+':
      num_b.innerHTML=a+b;
      num_a.parentNode.innerHTML="";
      break;
    case '-':
      num_b.innerHTML=a-b;
      num_a.parentNode.innerHTML="";
      break;
    case '×':
      num_b.innerHTML=a*b;
      num_a.parentNode.innerHTML="";
      break;
    case '÷':
      num_b.innerHTML=a/b;
      num_a.parentNode.innerHTML="";
      break;
    default:
      return false;
  }
  return true;
}

function fnDown(ev)
{
  //console.log(ev);
  ev.preventDefault();
  var oEvent=ev||event;
  oDiv = ev.target.parentNode;

  oDivX = oDiv.offsetLeft;
  oDivY = oDiv.offsetTop;

  var tmp_top = oDiv.offsetHeight/3.5;
  oDiv.style.width=10+'%';
  oDiv.style.height=10+'%';
  oDiv.style.zIndex=-1;
  oDiv.style.left=oEvent.changedTouches[0].clientX-0.5*oDiv.offsetWidth+'px';
  oDiv.style.top=oEvent.changedTouches[0].clientY-0.5*oDiv.offsetHeight-tmp_top+'px';

  disX=oEvent.changedTouches[0].clientX-oDiv.offsetLeft;
  disY=oEvent.changedTouches[0].clientY-oDiv.offsetTop;

  var symbols = document.getElementsByClassName("symbol");
  for(var i=0;i<symbols.length;i++){
    symbols[i].removeAttribute("hidden");
  }

  var symbols = oDiv.getElementsByClassName("symbol");
  for(var i=0;i<symbols.length;i++){
    symbols[i].setAttribute("hidden","hidden");
  }

  document.ontouchmove=fnMove;
  document.ontouchend=fnUp;
}

function fnMove(ev)
{
    ev.preventDefault();
    var oEvent=ev||event;
    oDiv.style.left=oEvent.changedTouches[0].clientX-disX+'px';
    oDiv.style.top=oEvent.changedTouches[0].clientY-disY+'px';

    var card2 = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).parentNode;

    if(selected_card!=null){
      selected_card.src="assets/img/game_card.png";
    }
    if(card2.id.match("card")==null) {
      return;
    }
    else {
      var upX = ev.changedTouches[0].clientX;
      var upY = ev.changedTouches[0].clientY;
      var realtop = card2.offsetHeight/3.5 + card2.offsetTop;
      selected_card = card2.getElementsByTagName("img")[0];

      if(upX<card2.offsetLeft+0.3*card2.offsetWidth && upY<realtop+0.3*card2.offsetHeight){
        selected_card.src="assets/img/game_card_selected.png";
      } else if(upX>card2.offsetLeft+0.7*card2.offsetWidth && upY<realtop+0.3*card2.offsetHeight){
        selected_card.src="assets/img/game_card_selected.png";
      } else if(upX<card2.offsetLeft+0.3*card2.offsetWidth && upY>realtop+0.7*card2.offsetHeight){
        selected_card.src="assets/img/game_card_selected.png";
      } else if(upX>card2.offsetLeft+0.7*card2.offsetWidth && upY>realtop+0.7*card2.offsetHeight){
        selected_card.src="assets/img/game_card_selected.png";
      }
    }
}

function fnUp(ev)
{
    ev.preventDefault();
    document.ontouchmove=null;
    document.ontouchend=null;
    oDiv.style.left = oDivX+'px';
    oDiv.style.top = oDivY+'px';
    oDiv.style.width=35+'%';
    oDiv.style.height=35+'%';
    oDiv.style.zIndex=0;
    oDiv.getElementsByTagName("img")[0].src="assets/img/game_card.png";

    var card = oDiv;
    var card2 = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).parentNode;

    if(card2.id.match("card")==null) return;
    var num_a = card.getElementsByTagName('num')[0];
    var num_b = card2.getElementsByTagName('num')[0];

    var upX = ev.changedTouches[0].clientX;
    var upY = ev.changedTouches[0].clientY;
    var op = 0;
    var realtop = card2.offsetHeight/3.5 + card2.offsetTop;
    if(upX<card2.offsetLeft+0.3*card2.offsetWidth && upY<realtop+0.3*card2.offsetHeight){
      op = '+';
    } else if(upX>card2.offsetLeft+0.7*card2.offsetWidth && upY<realtop+0.3*card2.offsetHeight){
      op = '-';
    } else if(upX<card2.offsetLeft+0.3*card2.offsetWidth && upY>realtop+0.7*card2.offsetHeight){
      op = '×';
    } else if(upX>card2.offsetLeft+0.7*card2.offsetWidth && upY>realtop+0.7*card2.offsetHeight){
      op = '÷';
    }
    if(selected_card!=null){
      selected_card.src="assets/img/game_card.png";
    }

    var symbols = document.getElementsByClassName("symbol");
    for(var i=0;i<symbols.length;i++){
      symbols[i].setAttribute("hidden","hidden");
    }

    if(calc(num_a,num_b,op)){
      validate(num_b.innerHTML);
    }
}

function touchdrop(ev){
  console.log(ev);
  ev.preventDefault();
  var card = ev.target.parentNode;
  var op = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
  var num_a = card.getElementsByTagName('num')[0];
  var num_b = op.parentNode.getElementsByTagName('num')[0];
  op = op.innerHTML;
  if(calc(num_a,num_b,op)){
    validate(num_b.innerHTML);
  }
}

function drop(ev)
{
  ev.preventDefault();
  var data=ev.dataTransfer.getData("Text");
  var card = document.getElementById(data).parentNode;
  var num_a = card.getElementsByTagName('num')[0];
  var num_b = ev.target.parentNode.getElementsByTagName('num')[0];
  var op = ev.target.innerHTML;
  if(calc(num_a,num_b,op)){
    validate(num_b.innerHTML);
  }
}

function init(){
  time_left=300;
  score = 0;
  pass_left = 10;
  time_element.innerHTML = time_left;
  score_element.innerHTML = score;
  pass_element.innerHTML = pass_left;

  // document.getElementById('a').addEventListener("touchstart",drag,false);
  // document.getElementById('b').addEventListener("touchstart",drag,false);
  // document.getElementById('c').addEventListener("touchstart",drag,false);
  // document.getElementById('d').addEventListener("touchstart",drag,false);

  makeQuestion();
  timeout();
}

function end(){
  content_element.innerHTML = '<div style="color:red; font-size:48px; text-align:center; vertical-align:middle;">时间到！</div>';
}

var t;
function timeout(){
  time_element.innerHTML = time_left;
  time_left = time_left-1;
  if(time_left<0){
    end();
    return;
  }
  if(t!=null)
  {
    clearTimeout(t);
  }
  t=setTimeout("timeout()",1000);
}

function setQuestion(){
  var num_a = document.getElementById("num_a");
  var num_c = document.getElementById("num_c");
  var num_b = document.getElementById("num_b");
  var num_d = document.getElementById("num_d");
  num_a.innerHTML = ini_a;
  num_b.innerHTML = ini_b;
  num_c.innerHTML = ini_c;
  num_d.innerHTML = ini_d;
}

function makeQuestion(){
  times = 0;
  content_element.innerHTML = content;
  if(game_mode==1){
    ini_a = Math.ceil(Math.random()*13);
    ini_b = Math.ceil(Math.random()*13);
    ini_c = Math.ceil(Math.random()*13);
    ini_d = Math.ceil(Math.random()*13);
    if(ini_a==0){ini_a=ini_a+1;}
    if(ini_b==0){ini_b=ini_b+1;}
    if(ini_c==0){ini_c=ini_c+1;}
    if(ini_d==0){ini_d=ini_d+1;}
  } else if(game_mode==2){
    if(errors.length==0){
      content_element.innerHTML = '<div style="color:red; font-size:48px; text-align:center; vertical-align:middle;">错题集为空！</div>';
      return;
    }
    var i = Math.floor(Math.random()*errors.length);
    ini_a = errors[i][0];
    ini_b = errors[i][1];
    ini_c = errors[i][2];
    ini_d = errors[i][3];
  }
  setQuestion();
}

function pass(){
  pass_left-=1;
  if(pass_left<0){
    time_left=0;
  } else {
    pass_element.innerHTML = pass_left;
    makeQuestion();
  }
}

function reset(){
  if(time_left > 0){
    content_element.innerHTML = content;
    setQuestion();
    times = 0;
  } else {
    init();
  }
}

function newGame(){
  game_mode=1;
  init();
}

function error_mode(){
  game_mode=2;
  init();
}
