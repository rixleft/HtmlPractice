
/* 

  游戏类

  childNodes

    type 属性：  设置地图每一个小格式的状态
      0       空格式
      1       食物
      2       障碍物
      3       蛇身体

    forward :  移动方向
      0       向左移动
      1       向上移动
      2       向右移动
      3       向下移动

    errno : 
      0       没有碰撞
      1       碰到食物
      2       碰到障碍物
      3       咬到自己
      4       撞到墙啦
      5       按了跟上一次方向相反的按键

*/

function Game(row, col, width, height) {
  this.snake = new Snake(row, col, '../img/1.png', '../img/5.png', '../img/8.png');
  this.stone = new Stone();
  this.food = new Food(row, col);
  this.map = new Map(row, col, width, height);
  // 蛇的初始朝向
  this.forward = 2;
}
Game.prototype.init = function() {
  this.map.init();

  this.snake.init(this.map.mapArr);
  this.stone.init(this.map.mapArr);

  this.food.init(this.map.mapArr);  

  this.snake.renderSnake(this.forward);
  
  // 开始游戏
  this.start();

  // 分数
  this.score = 0;
}

Game.prototype.start = function() {
  console.log('game start');
  // 表示键盘方向键的四个属性
  var arrows = {
    ArrowLeft: 0,
    ArrowUp: 1,
    ArrowRight: 2,
    ArrowDown: 3
  };

  var that = this;

  // 绑定事件，控制蛇移动
  document.onkeydown = function(ev) {

    if ( arrows[ev.key] !== undefined ) {
      that.forward = arrows[ev.key];
      // 方向键只控制移动方向，蛇的移动由定时器来自动完成
      // that.run();
    }

  };

  // 使用定时器来移动蛇
  this.interval = setInterval(function() {
    that.run();
  }, 200);

};

// 将移动蛇的代码单独封装成函数
Game.prototype.run = function() {
  var result = this.snake.crashTest(this.forward);
  var errno = result.errno;
  var msg = result.msg;

  // 碰撞检测
  if ( errno > 1 && errno !== 5 ) {
    this.gameover();
    return;
  }

  if ( errno == 1 ) {
    // 吃到食物，积分加 1
    this.score ++;
    this.snake.eatFood(result.row, result.col, this.forward);
    this.snake.renderSnake();
    this.food.renderFood();

  } else {
    this.snake.move(this.forward);
  }  
};


Game.prototype.gameover = function() {
  alert('游戏结束！得分：' + this.score);
  clearInterval(this.interval);
};

new Game(20, 20, 30, 30).init();
// new Game(10, 10, 60, 60).init();