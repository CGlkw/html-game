class Tetirs {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.speed = 10;
        this.direction = [[0,1],[-1,0],[0,-1],[1,0]];
    }
}
export default Tetirs;