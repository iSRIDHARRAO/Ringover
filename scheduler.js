function scheduler(taskarray,task){
    target=taskarray.length;
    if(task['dep']!='nill'){
        console.log("Not Nill")
        for(let i=0;i<taskarray.length;i++){
        
            if(task['dep']==taskarray[i]['name']){
                target = i
                break
            }
        }
        console.log(`Matched at ${target} and to insert at ${target+1} position`)
        taskarray.splice(target+1,0,task)
        console.log(`Final List of elements:-`)
            for(let i=0;i<taskarray.length;i++){
                console.log(taskarray[i])
            }
            return(taskarray);
    }
    else{
       
            console.log("Nill")
            for(let i=0;i<taskarray.length;i++){
            
                if(task['priority']<taskarray[i]['priority']){
                    target=i
                    break
                }

            }
            console.log(`Matched at ${target} and to insert at ${target} position`)
            taskarray.splice(target,0,task)
            console.log(`Final List of elements:-`)
            for(let i=0;i<taskarray.length;i++){
                console.log(taskarray[i])
            }
            return(taskarray)
        
    }

}


module.exports = scheduler
