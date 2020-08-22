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

let processLines = async (data)=>{

    let matrixList = [];

    while(data.length != 0){
        let nb = data[0];
        data.splice(0,1);

        let mData = data.slice(0, nb);
        let mMatrix = mData.map(element => element.split(' ').map(x => parseInt(x)) );
        data.splice(0,nb);

        matrixList.push(mMatrix);
    }

    return matrixList;
}


let isOverlapped = (test) => {
    let overlap = false;
    sorted = test.slice().sort((a,b)=>{return a[0]-b[0]});
    //console.log(sorted);

    // for(let i=1; i<= sorted.length-1; i++){
    //     if(sorted[i][0] >= t) {
    //         overlap = false;
    //     } else {
    //         t = sorted[i][1];
    //     }
    // };


    for(let i=0; i<= sorted.length-3; i++){
        if( (sorted[i][1] != sorted[i+1][0] && sorted[i][1] != sorted[i+2][0] && sorted[i+1][1] != sorted[i+2][0] ) )
        for(let k=sorted[i][0]; k<=sorted[i][1]; k++){
            if(k>=sorted[i][0] && k>=sorted[i+1][0] && k>=sorted[i+2][0] && k <=sorted[i][1] && k <= sorted[i+1][1] && k <= sorted[i+2][1]
                ){
                overlap = true
            }
        }
    };


    return overlap;
}



let main = async()=>{
    let lines = await getLines();
    lines.splice(0, 1);

    let tests = await processLines(lines);

    //console.log(tests);

    let mCase = 1;


    tests.forEach(test => {

        //check if impossible <=> all activities overlap
        
        let primary = "C";
        let secondary = "J";

        if(isOverlapped(test)){
            console.log(`Case #${mCase}: IMPOSSIBLE`);
        } else {
            


            let result = primary;
            for(let i=1; i<= test.length-1; i++){

                //check if not overlapping with any previous activity
                let overlapped = "false";
                for(let j=0; j<i; j++){
                    if( (test[j][1] > test[i][0] && test[j][1]<test[i][1]) || (test[j][0] > test[i][0] && test[j][0]<test[i][1]) 
                        || (test[j][0] > test[i][0] && test[j][1]<test[i][1]) || (test[j][0] < test[i][0] && test[j][1]>test[i][1])
                    ){
                        console.log('comparing: ', test[i][0], '-', test[i][1], '----', test[j][0], '-', test[j][1], '--! ', result.charAt(j), ' chr', j)
                            //overlapped
                            overlapped = result.charAt(j);
                            break;
                    }
                }

                if(overlapped != "false"){
                    if (overlapped == "C") {
                        result = result + secondary;
                    }
                    if (overlapped == "J") {
                        result = result + primary;
                    }
                } else {
                    result = result + primary;

                }
                


            };

            console.log(`Case #${mCase}: ${result}`);
        }

        mCase++;
    })

    

    //console.log(tests);


}




main()
