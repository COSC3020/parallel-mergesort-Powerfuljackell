const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

const testset1 = {array:[6, 4, 5, 3, 1, 2, 9, 8, 7],expected:[1, 2, 3, 4, 5, 6, 7, 8, 9]}
const testset2 = {array:[ 2, 1, 3, 3, 2, 6, 2, 2, 4, 6 ],expected:[1,2,2,2,2,3,3,4,6,6]}
const testset3 = {array:[ 1, 1, 1, 3, 6, 6, 1, 3, 4, 6 ],expected:[1,1,1,1,3,3,4,6,6,6]}
mergeSortThreaded(testset1.array).then(x => {
    let testWorks = JSON.stringify(x) === JSON.stringify(testset1.expected);
    console.log("\ntest: ", testWorks == true ? "Success" : "Failed");
    if(!testWorks){ throw console.log("Failed with values:", testset1.array,"\nExpected Result:",testset1.expected);}
});
mergeSortThreaded(testset2.array).then(x => {
    let testWorks = JSON.stringify(x) === JSON.stringify(testset2.expected);
    console.log("\ntest: ", testWorks == true ? "Success" : "Failed");
    if(!testWorks){ throw console.log("Failed with values:", testset2.array,"\nExpected Result:",testset2.expected);}
});
mergeSortThreaded(testset3.array).then(x => {
    let testWorks = JSON.stringify(x) === JSON.stringify(testset3.expected);
    console.log("\ntest: ", testWorks == true ? "Success" : "Failed");
    if(!testWorks){ throw console.log("Failed with values:", testset3.array,"\nExpected Result:",testset3.expected);}
});