function calculate(a,b,calback){
    let result=a+b;
    calback(result);

}

calculate(10,20,function(output){
    console.log("Result is: ",output)
})