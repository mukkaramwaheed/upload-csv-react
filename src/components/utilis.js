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
            data[index] = arr[x] + ',' + arr[mid];
          break;
        } else if (partnerInPair < arr[mid]) {
          end = mid - 1;
        } else if (partnerInPair > arr[mid]) {
          start = mid + 1;
        }
      }
      index++;
    }
    return data?.filter((val) => val !== undefined || val !== '');
  }
};

const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createUniqueAndValidArray = (arr) => {

    if (arr && Array.isArray(arr)) {
        let result = arr?.filter((val) => {
            if (Number(val) && !isNaN(val)) {
               return val
            } 
        });
        return result;
    } 
    return false
};

export const getEquation = (arr, values) => {
    let uniqueArr = createUniqueAndValidArray(arr);
    if (uniqueArr && uniqueArr.length > 0) {
        let data = [];
        let i = 0;
        for (let val of values) {
            data[i] = getNumbers(uniqueArr, val);
            i++;
        }

        if (data) {
            for (let j = 0; j < data.length; j++) {
            if (data[j]) {
                data[j] = getRandomItemArr(data[j]);
            }
            }
        }

        let result = [];
        if (data) {
            for (let k = 0; k < data.length; k++) {
            if (data[k]) {
                result[k] = getOprand(data[k], values[k]);
            }
            }
        }
        result =
            '((' +
            result[0] +
            ')) * ' +
            '(' +
            result[1] +
            ' * (' +
            result[2] +
            '))';
        console.log('change 123', result);
        return eval(result);
    } else {
        return false
    }
};

const getOprand = (value, equalNum) => {
  if (value) {
    let result = value.split(',');
    let info =
      parseFloat(result[0]) * parseFloat(result[1]) === equalNum ? '*' : '+';
    let getEquation = `${parseFloat(result[0])} ${info} ${parseFloat(
      result[1]
    )}`;
    return getEquation;
  }
};
