 function getRandColor() {
    return '#' + (Math.random()).toString(16).slice(2, 8);
}
function getRandomColor() {
    return 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + parseFloat(Math.random() * 1).toFixed(1) + ')';
}
function getRandomColor() {
    return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
}