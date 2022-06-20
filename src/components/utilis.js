


const getNumbers = (arr, targetSum) => {
  if ((arr && arr.length === 0) || targetSum === undefined) {
    return false;
  } else {
    let data = [];
    let index = 0;
    for (let x = 0; x <= arr.length - 1; x++) {
      let partnerInPair = targetSum - arr[x];
      let start = x + 1;
      let end = arr.length - 2;

      while (start <= end) {
        let mid = parseInt((start + end) / 2);
        if (arr[mid] === partnerInPair) {
          if (arr[x] !== undefined && arr[mid] !== undefined)
            data[index] = arr[x]+','+arr[mid];
          break;
        } else if (partnerInPair < arr[mid]) {
          end = mid - 1;
        } else if (partnerInPair > arr[mid]) {
          start = mid + 1;
        }
      }
      index++;
    }
    return data?.filter(val => val !== undefined || val !== '');
  }
};


const getRandomItemArr = (arr) => {
    // console.log('change 44', arr);
    return arr[Math.floor(Math.random()*arr.length)];
}

export const getEquation = (arr, values) => {
  let data = [];
  let i = 0;
  for (let val of values) {
    data[i] = getNumbers(arr, val);
    i++;
  }

  if (data) {
        for (let j = 0; j < data.length; j++) {
            if (data[j]) {
                data[j] = getRandomItemArr(data[j]);
            }
        }
   }

    // let result = (7 - 3) * (5 + 8 * (4 + 12));
  if (data) {
    for (let k = 0; k < data.length; k++) {
        if (data[k]) {
            data[k]['string'] = `${data[k]}`;    
        }
    }
  }  
  return data;
}


const getOprand = (value) => {
    if (value) {
        
    }
}
// 0: "1,3"
// ​
// 1: "5,8"
// ​
// 2: "2,6"
// ​
// 3: "4,8"

// const calculateResult = (data) => {

//     let result = randomItem.split(",")
 
//     if(result){
    
//     let info = parseFloat(result[0]) * parseFloat(result[1]) == 0 ?  
//     (
//     '+'
//     ): '*'

    
// }

/* let result = (
(7 - 3)*(5 + 8 * (4 + 12))
) */

// 4
// 13,
// 16