class Tetirs {
    constructor(width, height){
        this.width = width;
        this.height = height;

    }

    check(data, list){
        if (this.isExist(list, data)){
            return true;
        }else if (this.isOnBoot(data)){
            return true;
        }
    }

    isOnBoot(data){
        for(let key in data){
            if (data[key].y >= this.height){
                return true;
            }
        }
    }

    isExist(list, data){
        for (let key in list){
            for (let k in list[key]){
                for (let j in data){
                    if (list[key][k].x === data[j].x && list[key][k].y === data[j].y)
                        return key;
                }

            }
        }
    }

    copy(list) {
        let temp = []
        for (var key in list){
            temp[key] =  Object.assign({}, list[key]);
        }
        return temp;
    }
}
export default Tetirs;