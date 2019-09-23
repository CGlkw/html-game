let snake = {
  color:'black',
  runLock:true,
  food:{
    index:[],
    color: 'red',
    getFood:function () {
      while (true){
        snake.food.index = [Math.round(Math.random()*(width-1)),Math.round(Math.random()*(height-1))];
        if (!snake.isExist(snake.body,snake.food.index))break;
      }
    }
  },
  init:function (width,height) {
    this.body = [[40,15],[41,15],[42,15],[43,15],[44,15],[45,15]];
    this.direction = [-1,0];
    this.length = this.body.length;
    this.score = 0;
    this.width = width || 50;
    this.height = height || 30;
    this.run();
    snake.food.getFood();
  },
  run:function () {
    $(document).keydown(function(event){
      if (snake.runLock) return;
      switch (event.keyCode) {
        case 37:
          if (snake.direction[0] === 1) break;
          snake.direction = [-1,0];
          break;
        case 38:
          if (snake.direction[1] === 1) break;
          snake.direction = [0,-1];
          break;
        case 39:
          if (snake.direction[0] === -1) break;
          snake.direction = [1,0];
          break;
        case 40:
          if (snake.direction[1] === -1) break;
          snake.direction = [0,1];
          break;
      }
      snake.runLock = true;
    });
  },
  move:function (die, render) {
    let newHeadIndex = [this.body[0][0]+this.direction[0],this.body[0][1]+this.direction[1]];
    this.body.unshift(newHeadIndex);
    if (newHeadIndex[0]===snake.food.index[0] && newHeadIndex[1]===snake.food.index[1]){
      this.length +=1;
      this.score +=1;
      snake.food.getFood();
    }else {
      this.body.splice(this.body.length-1);
    }
    if (this.isDie()){
      die(this)
    }else{
      render();
    }
    snake.runLock = false;
  },
  isDie:function () {
    if (this.isExist(this.body, this.body[0], 0)>0
      || this.body[0][0] < 0
      || this.body[0][0] >= this.width
      || this.body[0][1] < 0
      || this.body[0][1] >= this.height )return true;
  },
  isExist:function(list, data, exist){
    exist = exist !== undefined ? exist : -1;
    for (let key in list){
      if (list[key][0] === data[0] && list[key][1] === data[1])
        if(key != exist)
          return key;
    }
  }
}
