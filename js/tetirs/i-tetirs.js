import Tetirs from "./tetirs.js";
import Block from "./block.js";
import tetirsData from "./tetirs-data.js";

class ITetirs extends Tetirs{
    constructor(width, height, center_x, center_y, cooler){
        super(width, height);
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.l_direction = 0;
        this.i = 0;

    }

    init() {
        this.block_list = [];
        this.l_direction = 0;
        this.block_list.push(new Block(this.center_x, this.center_y + 2, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y + 1, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y - 1, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y - 2, this.cooler));
        this.left_block = this.block_list[2];
        this.right_block = this.block_list[2];
        this.i = 0;
        this.lock = false;
        $(document).unbind('keydown');
        this.onChange();
    }

    onChange(){
        let _this = this;

        $(document).keydown(function(event){
            if (!_this.lock ){
                this.lock = true;
                _this.back_block_list = _this.copy(_this.block_list);
                switch (event.keyCode) {
                    case 37:
                        if (_this.left_block.x <= 0) break;
                        _this.center_x -= 1;
                        _this.flush();
                        break;
                    case 38:
                        _this.change();
                        _this.flush();
                        break;
                    case 39:
                        if (_this.right_block.x >= _this.width-1) break;
                        _this.center_x += 1;
                        _this.flush();
                        break;
                    case 40:
                        _this.center_y += 1;
                        _this.flush();
                        break;
                }
            }
        });
    }

    change(){
        if (this.center_x < 2 ){
            this.center_x = 2
        }else if( this.center_x> this.width -3 ){
            this.center_x = this.width -3
        }
        this.l_direction += 1;
        if (this.l_direction === 4)this.l_direction=0;
    }

    move(callback, render){
        this.i += 1;
        if (this.i > this.speed){
            this.back_block_list = super.copy(this.block_list);
            this.center_y += 1;
            this.i = 0;
        }
        this.flush();
        if (super.check(this.block_list, tetirsData.data)){
            this.destroy();
            callback();
        }else{
            render();
        }
    }

    flush(){

        this.block_list[0].x = this.center_x + this.direction[this.l_direction][0] * 2;
        this.block_list[0].y = this.center_y + this.direction[this.l_direction][1] * 2;
        this.block_list[1].x = this.center_x + this.direction[this.l_direction][0];
        this.block_list[1].y = this.center_y + this.direction[this.l_direction][1];
        this.block_list[2].x = this.center_x;
        this.block_list[2].y = this.center_y;
        this.block_list[3].x = this.center_x + this.direction[this.l_direction][0] * -1;
        this.block_list[3].y = this.center_y + this.direction[this.l_direction][1] * -1;
        this.block_list[4].x = this.center_x + this.direction[this.l_direction][0] * -2;
        this.block_list[4].y = this.center_y + this.direction[this.l_direction][1] * -2;
        if (this.direction[this.l_direction][1] === 1 || this.direction[this.l_direction][1] === -1 ){
            this.left_block = this.block_list[2];
            this.right_block = this.block_list[2];
        }else if (this.direction[this.l_direction][0] === 1){
            this.left_block = this.block_list[4];
            this.right_block = this.block_list[0];
        }else{
            this.left_block = this.block_list[0];
            this.right_block = this.block_list[4];
        }
        this.lock = false;
    }
    next(){

    }
    destroy(){
        $(document).unbind('keydown');
    }
}

export default ITetirs;