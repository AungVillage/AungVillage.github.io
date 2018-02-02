var time_left;
var pass_left;
var score;
var time_element = document.getElementById("time");
var score_element = document.getElementById("score");
var pass_element = document.getElementById("pass");
var content_element = document.getElementById("content");
var times; // 计算次数，3次后检测正误
var ini_a,ini_b,ini_c,ini_d;
var errors = new Array();
var e;

var content = "";
    content += "<div id=\"card_a\" style=\"position:absolute;width:35%;height:35%;top:10%;left:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "    <img id=\"a\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchend=\"touchdrop(event)\"/>\n";
    content += "    <num id=\"num_a\" style=\"position:absolute;top:49%;left:49%\">5<\/num>\n";
    content += "    <span style=\"position:absolute;top:0%;left:0%\" ondrop=\"drop(event)\">+<\/span>\n";
    content += "    <span style=\"position:absolute;top:0%;right:0%\" ondrop=\"drop(event)\">-<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;left:0%\" ondrop=\"drop(event)\">×<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;right:0%\" ondrop=\"drop(event)\">÷<\/span>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_b\" style=\"position:absolute;width:35%;height:35%;top:10%;right:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"b\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchend=\"touchdrop(event)\"/>\n";
    content += "  <num id=\"num_b\" style=\"position:absolute;top:49%;left:49%;\">5<\/num>\n";
    content += "    <span style=\"position:absolute;top:0%;left:0%\" ondrop=\"drop(event)\">+<\/span>\n";
    content += "    <span style=\"position:absolute;top:0%;right:0%\" ondrop=\"drop(event)\">-<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;left:0%\" ondrop=\"drop(event)\">×<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;right:0%\" ondrop=\"drop(event)\">÷<\/span>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_c\" style=\"position:absolute;width:35%;height:35%;bottom:10%;left:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"c\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchend=\"touchdrop(event)\"/>\n";
    content += "  <num id=\"num_c\" style=\"position:absolute;top:49%;left:49%;\">5<\/num>\n";
    content += "    <span style=\"position:absolute;top:0%;left:0%\" ondrop=\"drop(event)\">+<\/span>\n";
    content += "    <span style=\"position:absolute;top:0%;right:0%\" ondrop=\"drop(event)\">-<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;left:0%\" ondrop=\"drop(event)\">×<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;right:0%\" ondrop=\"drop(event)\">÷<\/span>\n";
    content += "<\/div>\n";
    content += "<div id=\"card_d\" style=\"position:absolute;width:35%;height:35%;bottom:10%;right:10%;\" ondragover=\"allowDrop(event)\">\n";
    content += "  <img id=\"d\" src=\"assets/img/game_card.png\" width=\"100%\" height=\"100%\" draggable=\"true\" ondragstart=\"drag(event)\" ontouchend=\"touchdrop(event)\"/>\n";
    content += "  <num id=\"num_d\" style=\"position:absolute;top:49%;left:49%;\">5<\/num>\n";
    content += "    <span style=\"position:absolute;top:0%;left:0%\" ondrop=\"drop(event)\">+<\/span>\n";
    content += "    <span style=\"position:absolute;top:0%;right:0%\" ondrop=\"drop(event)\">-<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;left:0%\" ondrop=\"drop(event)\">×<\/span>\n";
    content += "    <span style=\"position:absolute;bottom:0%;right:0%\" ondrop=\"drop(event)\">÷<\/span>\n";
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
      console.log("正确！",score);
    } else {
      var temp = new Array(a,b,c,d);
      errors.push(temp);
      console.log("错误！",errors);
    }
    content_element.innerHTML = content;
    makeQuestion();
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

function touchdrop(ev){
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
  content_element.innerHTML = content;

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
  ini_a = Math.ceil(Math.random()*13);
  ini_b = Math.ceil(Math.random()*13);
  ini_c = Math.ceil(Math.random()*13);
  ini_d = Math.ceil(Math.random()*13);
  if(ini_a==0){ini_a=ini_a+1;}
  if(ini_b==0){ini_b=ini_b+1;}
  if(ini_c==0){ini_c=ini_c+1;}
  if(ini_d==0){ini_d=ini_d+1;}
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

init();
