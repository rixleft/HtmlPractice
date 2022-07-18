let arr = [3, 4, 7, 5, 6, 8, 15, 4646, 1, 23, 131];

Array.prototype.mapArray = function (fn, thisArgs) {
    if (Object.prototype.toString.call(fn) !== "[object Function]") {
        throw ('Error in params');
    }
    let resArray = [];
    let curArray = this;
    for (let i = 0; i < curArray.length; i++){
        resArray[i] = fn.call(thisArgs, curArray[i], i, curArray);
    }
    return resArray;
}
console.log(arr.mapArray((item, index, arr) => { return item + 1 }))

