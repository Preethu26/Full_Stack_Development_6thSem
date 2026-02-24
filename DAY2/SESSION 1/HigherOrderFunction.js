function multiply(x){
    return function mul(y){
        return x*y;
    };

}
let double = multiply(2)
console.log(double(5))