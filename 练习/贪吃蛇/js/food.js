/* 
  食物类
*/


function Food(row, col) {
  this.row = row;
  this.col = col;
}
Food.prototype.init = function(mapArr) {
  // console.log('Food init');

  this.mapArr = mapArr;
  this.renderFood();

}
Food.prototype.renderFood = function() {
  var row = this.getRandNum(this.row),
      col = this.getRandNum(this.col);

  if (this.mapArr[row][col].type) {
    this.renderFood();
  } else {
    this.mapArr[row][col].style.backgroundImage = "url(../img/food.jpg)";
    this.mapArr[row][col].type = 1;
  }
};


Food.prototype.getRandNum = function(x) {
  // 0 ~ x -1 之间的随机数
  return Math.floor(Math.random() * x);
};