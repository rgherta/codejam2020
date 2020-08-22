let fs = require('fs')
let filename = process.argv[2];

let matrixList = [];



let getLines = async () => {

    let data = fs.readFileSync(0);
    let lines = data.toString().split('\n');
    

    let result = lines.reduce( (acc, line) => {
        if(line.trim() != '') acc.push(line);
        return acc;
    }, []);


    return result;

}


let processLines = async (data)=>{

    while(data.length != 0){
        let nb = data[0];
        data.splice(0,1);

        let mData = data.slice(0, nb);
        let mMatrix = mData.map(element => element.split(' ').map(x => parseInt(x)) );
        data.splice(0,nb);

        matrixList.push(mMatrix);
    }

}


let isLatin = (matrix)=>{

    let grade = matrix[0].length;
    let trace = 0, rows = 0, columns = 0;


    //compute trace
    for(i=0; i< grade; i++){
        trace = trace + matrix[i][i];
    }

    //count rows
    for(i=0; i< grade; i++){
        let uniqueElments = new Set(matrix[i]).size;
        if(uniqueElments != grade) rows++;
    }

    //count columns
    for(i=0; i< grade; i++){
        let array_column = matrix.map(e => e[i]);
        let uniqueElments = new Set(array_column).size;
        if(uniqueElments != grade) columns++;
    }
    


    return {trace: trace, rows: rows, columns: columns }

}


  

let main = async () => {

    let lines = await getLines();
    lines.splice(0, 1);

    await processLines(lines);
    let nbr = 0;

    matrixList.forEach(matrix => {
        nbr++;
        let {trace, rows, columns} = isLatin(matrix);
        console.log(`Case #${nbr}: ${trace} ${rows} ${columns}`);
    })

    //console.log(matrixList);

}


main();