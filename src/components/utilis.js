export const getNumbers = (arr, targetSum) => {
  if ((arr && arr.length === 0) || targetSum === undefined) {
    return false;
  } else {
    let data = [];
    let index = 0;
    for (let x = 0; x <= arr.length - 1; x++) {
      let partnerInPair = targetSum - arr[x];
      let start = x + 1;
      let end = arr.length - 2;
      if (start <= end) {
        let mid = parseInt((start + end) / 2);
        if (parseFloat(arr[mid]) === parseFloat(partnerInPair)) {
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
    if (data && data.length > 0) {
      let parseData = data?.filter((val) => val !== undefined || val !== '');
      parseData = getRandomItemArr(parseData);
      parseData = getOprand(parseData, targetSum);
      return parseData;
    }
    return null;
  }
};

const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const createUniqueAndValidArray = (arr) => {
  if (arr && Array.isArray(arr)) {
    let result = arr?.filter((val) => {
      if (Number(val) && !isNaN(val)) {
        return parseFloat(val);
      }
    });
    return result;
  }
  return false;
};

export const getEquation = (arr, values) => {
  let uniqueArr = createUniqueAndValidArray(arr);
  if (uniqueArr && uniqueArr.length > 0) {
    let i = 0;
    let data = [];
    for (let val of values) {
      data[i] = getNumbers(uniqueArr, val);
      i++;
    }

    return data;
  } else {
    return false;
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

export const getResult = (data) => {
  let result =
    '((' + data[0] + ')) * ' + '(' + data[1] + ' * (' + data[2] + '))';

  return result;
};


export const createEquation = (arr) => {
  let uniqueArr = createUniqueAndValidArray(arr);
}

export const calculateArr = (dataArray) => {
  let formatedArr = createUniqueAndValidArray(dataArray);
  let data = {};
  let result = [];
  for (var i = 0; i < formatedArr.length; i++) {
    for (var j = 0; j < formatedArr.length; j++) {
      let mul = formatedArr[i] + '*' + formatedArr[j];

      let plu = formatedArr[i] + '+' + formatedArr[j];

      let div = formatedArr[i] + '/' + formatedArr[j];

      let minus = formatedArr[i] + '-' + formatedArr[j];

      data[mul] = formatedArr[i] * formatedArr[j];
      data[plu] = parseFloat(formatedArr[i]) + parseFloat(formatedArr[j]);
      data[div] = parseFloat(formatedArr[i]) / parseFloat(formatedArr[j]);
      data[minus] = parseFloat(formatedArr[i]) - parseFloat(formatedArr[j]);
      result.push(data);
    }
  }

  let unique = Array.from(new Set(result.map(JSON.stringify))).map(JSON.parse);
  return unique;
};

export const checkValuesExistInCsv = (arr, csvArr) => {

  if (arr.every((r) => csvArr.includes(r))) {
    console.log('Found all of', ar1, 'in', ar2);
  } else {
    return false
  }
}
