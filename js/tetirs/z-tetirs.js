import Tetirs from "./tetirs.js";
import Block from "./block.js";
import tetirsData from "./tetirs-data.js";


class ZTetirs extends Tetirs{
    constructor(width, height, center_x, center_y, cooler){
        super(width, height);
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.l_direction = 0;
        this.i = 0;

        this.direction =    [[-1,-1,0,-1,1,0],
            [1,-1,1,0,0,1],
            [1,1,0,1,-1,0],
            [-1,1,-1,0,0,-1]];
    }

    init() {
        this.block_list = [];
        this.l_direction = 0;
        this.block_list.push(new Block(this.center_x -1, this.center_y-1, this.cooler));
        this.block_list.push(new Block(this.center_x , this.center_y -1 , this.cooler));
        //this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x + 1, this.center_y , this.cooler));
        this.left_block = this.block_list[0];
        this.right_block = this.block_list[3];
        this.i = 0;
        //$(document).unbind('keydown');
    }

    onChange(data,callback, render){
        switch (data) {
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.change(callback, render);
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.center_y += 1;
                if (super.check(this.nextBody(), tetirsData.data)){
                    callback();
                }else{
                    render();
                }
                break;
        }
    }

    moveLeft(){
        if (this.left_block.x <= 0) return;
        if (super.isExist(tetirsData.data, this.leftBody())) return;
        this.center_x -= 1;
    }

    moveRight(){
        if (this.right_block.x >= this.width-1) return;
        if (super.isExist(tetirsData.data, this.rightBody())) return;
        this.center_x += 1;
    }

    change(callback, render){
        let temp_center_x = this.center_x;
        let temp_center_y = this.center_y;
        if (this.l_direction === 1){
            if (temp_center_x < 1 ){
                temp_center_x = 1
            }
        }else if (this.l_direction === 3){
            if( temp_center_x> this.width -2 ){
                temp_center_x= this.width -2
            }
        }

        if (super.check(this.nextChange(temp_center_x,temp_center_y), tetirsData.data))
            return;
        this.center_x = temp_center_x;
        this.center_y = temp_center_y;
        this.l_direction += 1;
        if (this.l_direction === 4)this.l_direction=0;
        //let nextChange1 = this.nextChange();

    }

    move(callback, render){
        this.center_y += 1;
        if (super.check(this.nextBody(), tetirsData.data)){
            callback();
        }else{
            render();
        }
    }

    nextChange( temp_center_x,temp_center_y){
        let _body_list = super.copy(this.block_list);
        let _l_direction = this.l_direction + 1;
        if (_l_direction === 4)_l_direction=0;
        this.getNextBody(_body_list, temp_center_x, temp_center_y,_l_direction);
        return _body_list;
    }

    rightBody(){
        let right_body_list = super.copy(this.block_list);
        let right_center_x =  this.center_x + 1;
        let right_center_y =  this.center_y;
        this.getNextBody(right_body_list, right_center_x, right_center_y)
        return right_body_list;
    }

    leftBody(){
        let left_body_list = super.copy(this.block_list);
        let left_center_x =  this.center_x - 1;
        let left_center_y =  this.center_y;
        this.getNextBody(left_body_list, left_center_x, left_center_y)
        return left_body_list;
    }

    nextBody(){
        let next_body_list = super.copy(this.block_list);
        let next_center_x =  this.center_x;
        let next_center_y =  this.center_y;
        this.getNextBody(next_body_list, next_center_x, next_center_y)
        return next_body_list;
    }

    flush(){
        this.getNextBody(this.block_list, this.center_x, this.center_y)
        if (this.l_direction=== 0){
            this.left_block = this.block_list[0];
            this.right_block = this.block_list[3];
        }else if (this.l_direction=== 1){
            this.left_block = this.block_list[3];
            this.right_block = this.block_list[1];
        }else if (this.l_direction=== 2){
            this.left_block = this.block_list[3];
            this.right_block = this.block_list[0];
        }else if (this.l_direction=== 3){
            this.left_block = this.block_list[0];
            this.right_block = this.block_list[2];
        }
    }

    getNextBody(block_list, center_x, center_y, l_direction){
        l_direction = l_direction ===undefined ? this.l_direction : l_direction;
        let a = this.direction[l_direction];
        block_list[0].x = center_x + a[0];   // -1 0
        block_list[0].y = center_y + a[1];
        block_list[1].x = center_x+ a[2];
        block_list[1].y = center_y+ a[3];
        block_list[2].x = center_x ;
        block_list[2].y = center_y ;
        block_list[3].x = center_x + a[4];
        block_list[3].y = center_y + a[5];
    }
}
export default ZTetirs;