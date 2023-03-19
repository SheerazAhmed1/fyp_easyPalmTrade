export const  formatDateToDateTimeLocal = (date) => {
    const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const millisecond = date.getMilliseconds().toString().padStart(3, '0');

  const dateTimeLocal = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  return dateTimeLocal;
  }

export const  calcDays=(date)=>{

    var givenDate = new Date(date);
    

    // Get today's date
var today = new Date();

// Calculate the time difference in milliseconds
var timeDiff = givenDate.getTime() - today.getTime();

// Convert the time difference to days
var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
return daysDiff;
}

export const remainingTime=(date)=>{
  // Set the future date (change this to your desired future date)
const futureDate = new Date(date);

// Get the current date
const now = new Date();

// Calculate the time difference between the future date and the current date
const timeDiff = futureDate.getTime() - now.getTime();

// Calculate the remaining hours, minutes, and seconds
var hours = Math.floor(timeDiff / (1000 * 60 * 60));
if(hours<0){
  hours=0;
}
var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
if(minutes<0){
  minutes=0;
}
var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
if(seconds<0){
  seconds=0;
}


// Print the remaining time
// console.log(`Remaining time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
var time= `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
return time

}



export const timeCheck=(date)=>{
  // Set the future date (change this to your desired future date)
const futureDate = new Date(date);

// Get the current date
const now = new Date();

// Calculate the time difference between the future date and the current date
const timeDiff = futureDate.getTime() - now.getTime();

// Calculate the remaining hours, minutes, and seconds
var hours = (timeDiff / (1000 * 60 * 60));
if(hours<0){
  hours=0;
}
var minutes = ((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
if(minutes<0){
  minutes=0;
}
var seconds = ((timeDiff % (1000 * 60)) / 1000);
if(seconds<0){
  seconds=0;
}


// Print the remaining time
// console.log(`Remaining time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
var time= hours+minutes+seconds;
return time

}