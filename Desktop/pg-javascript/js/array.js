// forEach
let nums = [1,2,3,4,5];
nums.forEach((num) => {
    console.log(num*num);   
});

// map
let nums = [44,55,66,77,88];

let newArr = nums.map((val)=> {
    return val + 10;
});

console.log(newArr);

// filter
let nums = [11,22,33,44,55,66,77,88,99];

let filterArr = nums.filter((val) => {
    return val > 50;
});

console.log(filterArr);