import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
console.log('Task#1a:');
const final2014= fifaData.filter((item)=>{
    return (item.Stage === 'Final' && item.Year === 2014);
});  
console.log(final2014);
console.log(`Home Team name for 2014 FIFA Final: ${final2014[0]["Home Team Name"]}`);
console.log('Task#1b:');
console.log(`Away Team name for 2014 FIFA Final: ${final2014[0]["Away Team Name"]}`);
console.log('Task#1c:');
console.log(`Home Team goals for 2014 FIFA Final: ${final2014[0]["Home Team Goals"]}`);
console.log('Task#1d:');
console.log(`Away Team goals for 2014 FIFA Final: ${final2014[0]["Away Team Goals"]}`);
console.log('Task#1e:')
if(final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]){
    console.log(`Winner 2014 FIFA : ${final2014[0]["Home Team Name"]}`)
}else {
    console.log(`Winner 2014 FIFA: ${final2014[0]["Away Team Name"]}`)
}

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

console.log('Task#2: Array of objects with only finals data');
let finalsList = getFinals(fifaData);
console.log(finalsList);

function getFinals(inData) {
return(inData.filter((item)=> {
    return(item.Stage==='Final')
})) 
};

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */
/* Note getFinals function returns an array */
// function getYears(callback,inData) {
// return (callback(inData)).map((item) =>{
//         return(item.Year)
//     });
// };
function getYears(callback,inData){
    let years=[];
    years = callback(inData).map((item) => item.Year);
    return years;
}
console.log('Task#3 Array of Finals Year :');
console.log(getYears(getFinals,fifaData));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback,inData) {
let winner = callback(inData).map((item)=>{
    if(item["Home Team Goals"] > item["Away Team Goals"]){
        return item["Home Team Name"]}
    else if (item["Away Team Goals"] > item["Home Team Goals"]){
        return item["Away Team Name"]}
    else {return item["Win conditions"]}
})
return winner;
};
 /* Note for me-Checking Win Condition doesnt work as many has empty in this */
console.log("Task#4:")
console.log('All time FIFA Winners List:')
console.log(getWinners(getFinals,fifaData));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners (returns array of all winners country name)
 * callback function getYears  (returns years)
 */
console.log("Task#5:")
/* Get Winner country name by years for the Finals in FIFA data */
// console.log(getWinnersByYear(getWinners,getYears,getFinals,fifaData));

getWinnersByYear(getWinners,getYears,fifaData);

function getWinnersByYear(callback1,callback2,inArray) {
let winnerList = []; 
let winYearList =[];
winnerList=callback1(getFinals,inArray); /* Gets the name of final Winners*/
winYearList=callback2(getFinals,inArray);/* Gets year on which finals held */
// console.log('winnerList' + winnerList);
// console.log('winYearList' + winYearList);
// for ( let year in winYearList){
//     console.log(`In ${winYearList[year]}, ${winnerList[year]} won the world cup!`)}
winnerList.forEach((item,currentValue) => {
  console.log(`In ${winYearList[currentValue]}, ${item} won the world cup!`)});
}

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */
console.log('Task#6:');
getAverageGoals(fifaData);
function getAverageGoals(inData) {
let avg=0;
let totGoals=0;
let totHomeGoals = inData.reduce((accum,currentValue)=> {
    return(accum + currentValue["Home Team Goals"]);
},0);  
let totAwayGoals = inData.reduce((accum,currentValue) => {
    return(accum + currentValue["Away Team Goals"]);
},0);
console.log(totHomeGoals);
console.log(totAwayGoals);
let avgHGoals=(totHomeGoals/inData.length).toFixed(2);
let avgAGoals=(totAwayGoals/inData.length).toFixed(2);
totGoals = totHomeGoals + totAwayGoals;
avg = totGoals/inData.length;
console.log('Average no.of home team goals scored per match:'+ avgHGoals);
console.log('Average no.of away team goals scored per match:'+ avgAGoals);
console.log('Avg number of total goals scored per match :' + avg);
return(avg);
};

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */
console.log('Stretch#1');
/* No.Of WC wins by FRANCE: */
console.log(getCountryWins(fifaData,"FRA"));
/* No.Of WC wins by BRAZIL: */
console.log(getCountryWins(fifaData,"BRA"));
    
function getCountryWins(inArray,teamInitials) {
    /* no.of wins for the country in teamInitials */
    let noOfWins=0;
    noOfWins=inArray.reduce((accum,currentValue) => 
    {
      if(currentValue["Home Team Initials"] === teamInitials )
      { /*console.log(currentValue["Home Team Name"]);*/
        /* Win as Home Team */
        if (currentValue["Home Team Goals"] > currentValue["Away Team Goals"] && currentValue.Stage==='Final')
        {console.log(currentValue.Year);
          accum=accum+1
        }else if (currentValue["Home Team Goals"] === currentValue["Away Team Goals"] && currentValue.Stage==='Final')
        {
          if(currentValue["Win conditions"].includes(currentValue["Home Team Name"])){
          console.log(currentValue.Year);
          accum=accum+1;}
        }
      }
      if(currentValue["Away Team Initials"] === teamInitials )
      { /*console.log(currentValue["Away Team Name"]);*/
        /* Win as Away Team */
        if (currentValue["Away Team Goals"] > currentValue["Home Team Goals"] && currentValue.Stage==='Final')
        { console.log(currentValue.Year);
          accum=accum+1
        }else if(currentValue["Away Team Goals"] === currentValue["Home Team Goals"] && currentValue.Stage==='Final')
        {
          if(currentValue["Win conditions"].includes(currentValue["Away Team Name"])){
          console.log(currentValue.Year);
          accum=accum+1;}
        }
      }    
      return accum},0);
      console.log(`${teamInitials} won the FIFA WorldCup ${noOfWins} times!!!`)
      return noOfWins;
    };
    


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// console.log('Stretch#3:')
// function getGoals(inData) {
//  let finalsData=[];
//  finalsData=inData.filter((item)=> item.Stage === 'Finals')
// /* the team with the most goals score */
//  /* how many goals for each country*/
//  totalgoals=finalsData.map((item)=>finalsData["Home Team Goals"]);  
//  return totalgoals;
// };

// console.log(getGoals());


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

// function badDefense(inData) {
// let  finalsData=inData.filter((item)=> item.Stage === 'Finals')
// /* map each country in finals with its against goal*/
// finalsData.forEach((value,index){
//   let outArr=[];
//   outArr[index] = {'country' : value["Home Team Name"],'AgainstGoals' : value["Away Team Goals"]}
//   // outArr.push{'country' : value["Away Team Name"],'AgainstGoals' : value["Away Team Goals"]}
//   console.log(outArr);
// })
// };

// badDefense(fifaData);

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
