/**
 * Create unique array with valid values
 * @param {*} arr
 * @returns array
 */
export const createUniqueAndValidArray = (arr) => {
  if (arr && Array.isArray(arr)) {
    let result = arr
      ?.filter((val) => Number(val) && !isNaN(val))
      .map((val) => parseFloat(val));
    return result;
  }
  return false;
};

/**
 * This function match targetArr
 * values with the csv values if all
 * the values that need to create
 * target value exist then return true
 *
 * @param {*} arr
 * @param {*} csvArr
 * @returns bolean
 */
export const checkValuesExistInCsv = (arr, csvArr) => {
  if (arr.every((r) => csvArr.includes(r))) {
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param {*} type
 * @param {*} meg
 * @returns String
 */
export const showMeg = (type, meg) => {
  if (type === 'success') {
    return `Success: ${meg}`;
  } else if (type === 'error') {
    return `Error: ${meg}`;
  }
};

/**
 * Create string formule and calculate the value
 * @param {*} eq
 * @param {*} eqTwo
 * @param {*} eqThree
 * @returns Object
 */
export const getResult = (eq, eqTwo, eqThree) => {
  let sortEq = sortArrDescend(eq);

  let equation = `((${sortEq[0]}-${sortEq[1]}) * (${eqTwo[0]} + ${eqTwo[1]} * ( ${eqThree[0]} + ${eqThree[1]} ))`;

  let value =
    (parseFloat(sortEq[0]) - parseFloat(sortEq[1])) *
    (parseFloat(eqTwo[0]) +
      parseFloat(eqTwo[1]) * (parseFloat(eqThree[0]) + parseFloat(eqThree[1])));
  return {
    equation,
    value,
  };
};

/**
 * Sort the array in descending order
 * @param {*} arr
 * @returns array
 */
export const sortArrDescend = (arr) => {
  return arr.sort(function (a, b) {
    return b - a;
  });
};

/**
 * Create formula
 * @param {*} arr
 * @returns Object
 */
export const createEquation = (arr) => {
  let equation = [];
  let equationtwo = [];
  let equationThree = [];

  arr?.forEach((val) => {
    if (val === 3 || val === 7) {
      equation.push(val);
    } else if (val === 8 || val === 5) {
      equationtwo.push(val);
    } else if (val === 12 || val === 4) {
      equationThree.push(val);
    }
  });

  let getEqAndValue = getResult(equation, equationtwo, equationThree);
  return getEqAndValue;
};

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

export const multipleEachNumInArr = (dataArray) => {
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
