import TetirsBox from "./tetirs-box.js";
import tetirsData from "./tetirs-data.js";
const width = 300;
const height = 600;
const box = 30;



let ctx_dom = document.getElementById("tetirs");

 ctx_dom.width = width ;
 ctx_dom.height = height ;
let ctx = ctx_dom.getContext('2d');

ctx.fillStyle="#5f5f5f";
ctx.fillRect(0,0,width,height);

function render(list) {
    for (let i = 0 ; i < height/30 ;i ++){
        for (let j = 0 ; j < width/30 ;j ++){
            if(list[i] && list[i][j]){
                ctx.fillStyle = list[i][j].cooler;
                ctx.fillRect(list[i][j].x * box + 1,list[i][j].y * box +1,box -1, box -1);
            }else{
                ctx.fillStyle="#1d1d1d";
                ctx.fillRect(j * box + 1,i * box +1,box -1, box -1);
            }

        }

    }
}

let timmerID;
let tetirsBox = new TetirsBox(width /box, height/box);
$(function () {

    tetirsBox.init();

    render(tetirsData.full_data);
});



let tetirsRender = {
    start:function (){
    timmerID=window.setInterval(function () {
        tetirsRender.run()
    },33);  //调取函数，调取频率毫秒
},
    stop:function (){
    window.clearInterval(timmerID);  //只有遇到clearInterval() 才停止
},
    reset:function () {
    tetirsBox.reset();
    render(tetirsData.full_data);
    },

    run:function () {
    tetirsBox.run(function () {

    },function () {
        render(tetirsData.full_data)
    });
    }
}

export default tetirsRender;