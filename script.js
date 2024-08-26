const snakes={
'32':10,
'36':6,
'48':26,
'62':18,
'88':24,
'95':56,
'97':78,
}
const ladders={
'1':38,
'4':14,
'8':30,
'28':76,
'21':42,
'50':67,
'71':92,
'80':99,
}
//generating the board
const board=document.getElementById('board')

let bordlen=board.style.height
bordlen=Number(bordlen.slice(0,bordlen.length-2))
let odd=120;
let even=101;
    for(let i=1;i<=10;i++){
        const row=document.createElement('div');
        row.id=`r${i}`;
        row.classList.add('row');
        row.style.display='flex';
        if (!(i%2==0)){
            odd-=20;
        }
        else{
            even-=20;
        }
        for (let j=1;j<=10;j++){
            const box=document.createElement('div')
            box.classList.add('box');

            box.style.border='1.2px solid black'
            row.appendChild(box);
            if (!(i%2==0))
                 {//box.textContent=odd-(j-1);
                box.id=odd-(j-1);}
            else
                {//box.textContent=even+(j-1);
                    box.id=even+(j-1);}
        }
        board.appendChild(row);
        
    }

//game functionality

//generating the random number
const randomNumber=()=>{
     return Math.ceil(Math.random()*6)
     
} 

let poutcome=document.getElementById('poutcome');
let coutcome=document.getElementById('coutcome');
const Restart=document.getElementById('Restart');
Restart.style.display='none';

let player=-1;
let computer=-1;
let winner=null
const roll=document.getElementById('roll')
//checking win condition
const win=()=>{
    if (player===100 || computer===100){
        if (player===100){
            winner='You';
        }
        else{
            winner='Computer';
        }
        return true;
    }
    else{
        return false
    }
}

//Adding indicator to box //player
const playerindex=(id)=>{
    if(id>=1){
    let box=document.getElementById(id)
    // console.log(box)
    const index=document.createElement('div')
    index.id='b'
    index.classList.add('index')
    index.style.backgroundColor='blue';
    box.appendChild(index)
    }
}
//clearing the past index //player
const clearindex=(id)=>{
    if (id>=1){
    let box=document.getElementById(id);
    let index=box.querySelector('#b');
    index.remove()
    }
}
//Adding indicator to box //computer
const comindex=(id)=>{
    if(id>=1){
    let box=document.getElementById(id)
    // console.log(box)
    const index=document.createElement('div')
    index.id='y';
     index.classList.add('index');
    index.style.backgroundColor='yellow'
    box.appendChild(index)
    }
}
//clearing the past index //computer
const clearindexc=(id)=>{
    if (id>=1){
    let box=document.getElementById(id);
    let index=box.querySelector('#y')
    index.remove()
    // box.innerHTML='';
    }
}

//checking snake condition
const ifsnake=(val)=>{
    if(String(val) in snakes){
        //console.log(`oops! snake bite at:${val}`)
        let audio=new Audio('down.mp3');
        audio.play();
        return snakes[String(val)]
    }
    else{
        return val
    }
}
//checking ladder condition
const ifladder=(val)=>{
    if(String(val) in ladders){
        //console.log(`Wow! Ladder at:${val}`);
        let audio=new Audio('up.mp3');
        audio.play();
        return ladders[String(val)]
    }
    else{
        return val
    }
}


//computer action
const comroll=()=>{
    let previous=computer;
    let destination=previous;
    let coutput=randomNumber();
    coutcome.innerHTML=coutput;
            if(computer===-1){
                if(coutput===1){
                    clearindexc(computer);
                    computer+=coutput;
                    destination=computer;
                }
                else{
                    computer=-1;
                    roll.style.width='40px';
                    roll.style.height='40px';
                    roll.style.backgroundImage=`url('image/${coutput}dice.jpg')`;
                }
            }
            else{
                    clearindexc(computer);
                    computer+=coutput;
                    destination=computer;
            }
            if (computer>=0){
            if (computer>100){
                computer-=coutput
                destination=computer
                comindex(computer)
                roll.style.width='40px';
                roll.style.height='40px';
                roll.style.backgroundImage=`url('image/${coutput}dice.jpg')`

            }
            else{
            let i=previous
            const move=setInterval(()=>{
                comindex(i)
                i++;
                
            
            },1000/2)
            let j=previous
            const remove=setInterval(()=>{
                clearindexc(j);
                j++;
                if(j===(destination)){
                    clearInterval(remove)
                    if (i===(destination)){
                        clearInterval(move);
                        computer=ifsnake(computer)
                        computer=ifladder(computer)
                        comindex(computer)
                        if (win()){
                            let audio=new Audio('win.mp3');
                            audio.play();
                            coutcome.textContent='Won';
                            poutcome.textContent='Loose';
                        }
                        else{
                        if (coutput===1){
                            comroll()
                        }
                        else{
                            roll.style.width='40px';
                            roll.style.height='40px';
                            roll.style.backgroundImage=`url('image/${coutput}dice.jpg')`
                           
                        }
    
                    }
                    }
                    
                }
            },1000/1.8)
            
    }}

}
//player action
roll.addEventListener('click',()=>{
    let previous=player;
    let destination=player;
    let poutput=randomNumber();
    roll.style.width='0px';
    roll.style.height='0px';
    
    poutcome.innerHTML=poutput;
        if (player===-1){
            if(poutput===1){
                player+=poutput;
                destination=player;
            }
            else{
                player=-1;
                roll.style.width='0px';
                roll.style.height='0px';
                
                comroll()
            }
        }
        else{
            clearindex(player);
            player+=poutput;
            destination=player;
        }
        if(player>=0){
        if (player>100){
            player-=poutput;
            destination=player;
            playerindex(player);
            roll.style.width='0px';
            roll.style.height='0px';
            
            comroll();
        }
        else{
            let i=previous;
            const pmove=setInterval(()=>{
                playerindex(i)
                roll.style.width='0px';
                roll.style.height='0px';
                
                i++;
                if (i===(destination)){
                    clearInterval(pmove);
                    
                }
            },1000/2)
            let j=previous
            const premove=setInterval(()=>{
                clearindex(j);
                j++;
                if(j===(destination)){
                    clearInterval(premove);
                    player=ifsnake(player);
                    player=ifladder(player)
                    playerindex(player);
                    if (win()){
                        let audio=new Audio('win.mp3');
                        audio.play();
                        poutcome.textContent='Win';
                        coutcome.textContent='Loose';
                        roll.style.width='0px';
                        roll.style.height='0px';
                        
                    }
                    else{
                    if (poutput!=1){
                        roll.style.width='0px';
                        roll.style.height='0px';
                        
                        comroll()
                    }
                    else{

                        roll.style.width='40px';
                        roll.style.height='40px';
                        roll.style.backgroundImage=`url('image/${poutput}dice.jpg')`;


                    }
                    
                }
                }
            },1000/1.8)
            
    }}

        }

    )
const start=document.getElementById('start');
const playdice=document.getElementById('playdice');
start.addEventListener('click',()=>{
    start.remove();
    playdice.style.display='flex';
    playdice.style.justifyContent='space-between';
    playdice.style.alignItems='center';
    // const restart=document.createElement('button');
    // restart.textContent='Restart';
    // document.body.appendChild(restart);
    Restart.style.display='block';
})
Restart.addEventListener('click',()=>{
    clearindex(player);
    clearindexc(computer);
    player=-1;
    computer=-1;
    poutcome.textContent='';
    coutcome.textContent='';
    roll.style.height='40px';
    roll.style.width='40px';
    roll.style.backgroundImage=`url('image/1dice.jpg')`;
    
})