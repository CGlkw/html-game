import ITetirs from "./i-tetirs.js";
import OTetirs from "./o-tetirs.js";
import tetirsData from "./tetirs-data.js";
import TTetirs from "./t-tetirs.js";

class TetirsBox {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.key_lock = true;
        this.speed = 10;
        this.i = 0;
    }

    init() {
        tetirsData.data = [];
        this.show_tetirs = this.getNextTetirs();
        this.next_tetirs = this.getNextTetirs();
        this.show_tetirs.init();
        tetirsData.init(this.width,this.height);
        this.keyDownListen();
    }

    keyDownListen(){
        let _this = this;
        $(document).keydown(function(event){
            if (!_this.key_lock ){
                this.lock = true;
                _this.show_tetirs.onChange(event.keyCode,function () {
                    tetirsData.push(_this.show_tetirs.block_list)
                    tetirsData.checkSuccess();
                    _this.show_tetirs = _this.next_tetirs;
                    _this.next_tetirs = _this.getNextTetirs();
                    _this.show_tetirs.init();
                }, function () {
                    _this.flush();
                });
            }
        });
    }

    run(die, render){
        let _this = this;
        this.i += 1;
        if (this.i > this.speed) {
            this.show_tetirs.move(function () {
                tetirsData.push(_this.show_tetirs.block_list)
                tetirsData.checkSuccess();
                _this.show_tetirs = _this.next_tetirs;
                _this.next_tetirs = _this.getNextTetirs();
                _this.show_tetirs.init();
            }, function () {
                _this.flush();
                render();
            });
            this.i = 0;
        }else{
            this.flush();
            render();
        }
    }

    flush(){
        this.show_tetirs.flush();
        tetirsData.full_data = [];
        for (let key in tetirsData.data){
            for (let k in tetirsData.data[key]){
                tetirsData.full_data.push(tetirsData.data[key][k]);
            }
        }
        for (let key in this.show_tetirs.block_list){
            if (this.show_tetirs.block_list[key].y >= 0){
                tetirsData.full_data.push(this.show_tetirs.block_list[key])
            }
        }
        this.key_lock = false;
    }

    getNextTetirs(){
        let number = Math.round(Math.random()*2);
        switch (number) {
            case 0:
                return new ITetirs(this.width, this.height, 4, -3, '#38fdff');
            case 1:
                return new OTetirs(this.width, this.height, 4, -3, '#ff9b0c');
            case 2:
                return new TTetirs(this.width, this.height, 4, -3, '#8432ff');
        }
    }
}

export default TetirsBox;