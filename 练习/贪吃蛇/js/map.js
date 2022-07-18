
/* 
  地图类

  @Map
    row         地图的行
    col         地图的列
    width       每个格子的宽度
    height      每个格子的高度
    container   地图容器元素

*/

function Map(row, col, width, height) {
  this.row = row;
  this.col = col;
  this.width = width;
  this.height = height;
  this.container = document.createElement('div');
  this.mapArr = [];
}

Map.prototype.init = function() {
  var mapW = this.col * this.width;
  var mapH = this.row * this.height;

  this.container.className = 'container';

  for (var i=0; i<this.row; i++) {
    this.mapArr.push([]);
  }

  // 创建地图小格子, 并分组存入二维数组中。
  for (var i=0; i<this.row * this.col; i++) {
    var cell = document.createElement('div');
    // 设置地图初始状态为 0
    cell.type = 0;
    this.mapArr[Math.floor(i/this.col)].push(cell);
    this.container.appendChild( cell );
  }

  var styleTag = document.createElement('style');

  // 通过 style 标签设置样式
  styleTag.innerHTML = `
    .container {
      width: ${mapW}px;
      height: ${mapH}px;
    }
    .container div {
      width: ${this.width}px;
      height: ${this.height}px;
      border: 1px solid #999;
      box-sizing: border-box;
      float: left;
      background-size: cover;
    }
  `;
  document.head.appendChild(styleTag);
  document.body.appendChild(this.container);

}