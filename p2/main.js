let fs = require('fs')
let filename = process.argv[2];

let getLines = async () => {

    let data = fs.readFileSync(0);
    let lines = data.toString().split('\n');
    
    let result = lines.reduce( (acc, line) => {
        if(line.trim() != '') acc.push(line);
        return acc;
    }, []);

    return result;

}


let main = async () => {

    let lines = await getLines();
    lines.splice(0, 1);
    let mCase = 1;
    

    lines.forEach(line => {

        let mString = line.replace(/1/g, "(1)");

        mString = mString.replace(/2/g, "((2))");
        mString = mString.replace(/3/g, "(((3)))");
        mString = mString.replace(/4/g, "((((4))))");
        mString = mString.replace(/5/g, "(((((5)))))");
        mString = mString.replace(/6/g, "((((((6))))))");
        mString = mString.replace(/7/g, "(((((((7)))))))");
        mString = mString.replace(/8/g, "((((((((8))))))))");
        mString = mString.replace(/9/g, "(((((((((9)))))))))");

        let i = 0;
        while(i<10){
            mString = mString.replace(/\)\(/g, "");
            i++;
        }
        


        console.log(`Case #${mCase}: ${mString}`);
        mCase++;
    })



}


main();