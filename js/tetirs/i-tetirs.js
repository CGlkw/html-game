import Tetirs from "./tetirs.js";
import Block from "./block.js";

class ITetirs extends Tetirs{
    constructor(width, height, center_x, center_y, cooler){
        super(width, height);
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.l_direction = 0;
        this.i = 0;
        this.init();
    }

    init() {
        this.block_list = [];
        this.block_list.push(new Block(this.center_x, this.center_y + 2, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y + 1, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y - 1, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y - 2, this.cooler));
        this.left_block = this.block_list[2];
        this.right_block = this.block_list[2];
        this.i = 0;
        this.onChange();
    }

    onChange(){
        let _this = this;
        $(document).keydown(function(event){
            switch (event.keyCode) {
                case 37:
                    if (_this.left_block.x <= 0) break;
                    _this.center_x -= 1;
                    break;
                case 38:
                    _this.change();
                    break;
                case 39:
                    if (_this.right_block.x >= _this.width-1) break;
                    _this.center_x += 1;
                    break;
                case 40:
                    _this.center_y += 1;
                    break;
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

    move(){
        this.i += 1;
        if (this.i > this.speed){
            this.center_y +=  1;
            this.flush();
            this.i = 0;
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
        if (this.direction[this.l_direction][1] === 1 || this.direction[this.l_direction][-1]){
            this.left_block = this.block_list[2];
            this.right_block = this.block_list[2];
        }else if (this.direction[this.l_direction][0] === 1){
            this.left_block = this.block_list[4];
            this.right_block = this.block_list[0];
        }else{
            this.left_block = this.block_list[0];
            this.right_block = this.block_list[4];
        }

    }

}

export default ITetirs;