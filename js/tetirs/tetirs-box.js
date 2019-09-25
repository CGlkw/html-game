import ITetirs from "./i-tetirs.js";
import tetirsData from "./tetirs-data.js";

class TetirsBox {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    init() {
        tetirsData.data = [];
        this.show_tetirs = new ITetirs(this.width,this.height,10,-3,'red');
        this.next_tetirs = new ITetirs(this.width,this.height,10,-3,'red');
        this.show_tetirs.init();
    }

    run(die, render){
        let _this = this;
        this.show_tetirs.move(function () {

            tetirsData.push(_this.show_tetirs.back_block_list)
            tetirsData.checkSuccess();
            _this.show_tetirs = _this.next_tetirs;
            _this.next_tetirs = new ITetirs(_this.width,_this.height,10,-3,'red')
            _this.show_tetirs.init();
        },function () {
            _this.flush();
            render();
        });

    }

    flush(){
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
    }
}

export default TetirsBox;