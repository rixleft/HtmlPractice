/* 
  蛇类
*/

function Snake(row, col, headImg, bodyImg, tailImg) {

  this.row = row;
  this.col = col;
  this.headImg = headImg;
  this.bodyImg = bodyImg;
  this.tailImg = tailImg;

  this.body = [
    {row: 2, col: 3, forward: 2},
    {row: 2, col: 2, forward: 2},
    {row: 2, col: 1, forward: 2}

    // {row: 2, col: 4},
    // {row: 2, col: 3},
    // {row: 2, col: 2}
  ]
}

Snake.prototype.init = function(mapArr) {
  this.mapArr = mapArr;
}

Snake.prototype.move = function(forward) {

  if (this.crashTest(forward).errno === 5 ) {
    return;
  }

  var x = 0, y = 0;

  // 判断移动方向
  switch (forward) {
    case 0:
      x = -1;
      y = 0;
      break;
    case 1:
      x = 0;
      y = -1;
      break;
    case 2:
      x = 1;
      y = 0;
      break;
    case 3:
      x = 0;
      y = 1;
      break;
  }
  // 清空原来的状态
  this.clear();

  this.body[0].forward = forward;

  for (var i=this.body.length - 1; i>0; i--) {
    this.body[i].row = this.body[i-1].row;
    this.body[i].col = this.body[i-1].col;
    this.body[i].forward = this.body[i-1].forward;
  }

  this.body[0].row = this.body[0].row + y;
  this.body[0].col = this.body[0].col + x;

  // 在新的位置重新绘制
  this.renderSnake();
  
};

// 移动的碰撞检测
Snake.prototype.crashTest = function(forward) {
  var x = 0, y = 0;

  console.log(forward, 'crashTest');

  // 判断移动方向
  switch (forward) {
    case 0:
      x = -1;
      y = 0;
      break;
    case 1:
      x = 0;
      y = -1;
      break;
    case 2:
      x = 1;
      y = 0;
      break;
    case 3:
      x = 0;
      y = 1;
      break;
  }

  var row = this.body[0].row + y;
  var col = this.body[0].col + x;

  if (row < 0 || row > this.row - 1 || col < 0 || col > this.col - 1) {
    console.log("撞到南墙啦！");
    return {errno: 4, msg: "撞到南墙啦！"};
  }

  var cell = this.mapArr[row][col];

  if (Math.abs(this.body[0].forward - forward) == 2) {
    console.log('回不了头啦！');
    return {errno: 5, msg: "回不了头啦！"};
  }

  if (cell.type == 1) {
    console.log('吃到美味啦！');
    return {errno: 1, row: row, col: col, msg: "吃到美味啦！"};
  }

  if (cell.type == 2) {
    console.log('撞到石头啦！');
    return {errno: 2, msg: "撞到石头啦！"};
  }

  if (cell.type == 3) {
    console.log('咬到自己啦！');
    return {errno: 3, msg: "咬到自己啦！"};

  }

  return {errno: 0, msg: "往前冲呀！"};

};

Snake.prototype.renderSnake = function() {
    var len = this.body.length, lastIndex = len - 1 ;

    var head = this.body[0];
    var tail = this.body.slice(-1)[0];
    var body = this.body.slice(1,-1);

    // 渲染蛇的头部
    this.renderBgImg(head, this.headImg);

    // 渲染蛇的身体
    this.renderBgImg(body, this.bodyImg);

    // 渲染蛇的尾巴
    this.renderBgImg(tail, this.tailImg);
};

Snake.prototype.eatFood = function(row, col, forward) {
  this.body.unshift({row: row, col: col, forward: forward});
};

Snake.prototype.clear = function() {
  console.log('clear');
  for (var i=0; i<this.body.length; i++) {
    this.mapArr[this.body[i].row][this.body[i].col].style.cssText = '';
    this.mapArr[this.body[i].row][this.body[i].col].type = 0;
  }
};

Snake.prototype.renderBgImg = function(limbs, src) {
  if (limbs.length) {
    for (var i=0; i<limbs.length; i++) {
      this.mapArr[limbs[i].row][limbs[i].col].style.backgroundImage = "url(" + src +")";
      this.mapArr[limbs[i].row][limbs[i].col].style.transform = "rotate(" + 90 * limbs[i].forward + "deg)";
      this.mapArr[limbs[i].row][limbs[i].col].type = 3;
    }
  } else {
    this.mapArr[limbs.row][limbs.col].style.backgroundImage = "url(" + src +")";
    this.mapArr[limbs.row][limbs.col].style.transform = "rotate(" + 90 * limbs.forward + "deg)";
    this.mapArr[limbs.row][limbs.col].type = 3;
  }
};