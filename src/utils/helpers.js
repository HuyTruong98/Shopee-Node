const dataPermited = (data, permitedArray) => {
  const results = {};
  Object.keys(data).map((key) => {
    if (permitedArray.indexOf(key) > -1 && data[key] !== undefined) {
      results[key] = data[key];
    }
    return null;
  });
  return results;
};

module.exports = {
  dataPermited,
};
