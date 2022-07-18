
/* 
  障碍物类
*/

function Stone() {
  this.stoneArr = [
    {row: 6, col: 5},
    {row: 7, col: 5},
    {row: 8, col: 5},
    {row: 9, col: 5},

    {row: 15, col: 13},
    {row: 15, col: 14},
    {row: 15, col: 15},
    {row: 15, col: 16}
  ];
}
Stone.prototype.init = function(mapArr) {
  this.mapArr = mapArr;
  this.renderStone();
}

Stone.prototype.renderStone = function() {
  for (var i=0; i<this.stoneArr.length; i++) {
    this.mapArr[this.stoneArr[i].row][this.stoneArr[i].col].style.backgroundImage = "url(../img/block.png)";
    this.mapArr[this.stoneArr[i].row][this.stoneArr[i].col].type = 2;
  }
};
