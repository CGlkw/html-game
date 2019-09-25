let tetirsData = {
    init:function (width, height) {
        this.width = width;
        this.height = height;
        this.data = [];
        this.full_data = [];
    },
    push:function (list) {
        for(let key in list){
            let y = list[key].y;
            if (!this.data[y]){
                this.data[y] = [];
            }
            this.data[y][list[key].x] =list[key];
        }
    },
    checkSuccess:function () {
        for(let key in this.data){
            if(this.data[key].length === this.width){
                this.removeLine(parseInt(key));
            }
        }
    },
    removeLine(line){
        for (let i = this.data.length -1; i>=0 ; i--){
            if (i<= line ){
                if (i !== 0){
                    this.data[i] = this.data[i-1]
                }
            }
        }
    }
};
export default tetirsData;