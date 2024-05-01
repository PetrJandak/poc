module.exports = {
    print(val, serialize) {
      if (val._id) {
        val._id = 'constant-id';
      }
      return serialize(val);
    },
  
    test(val) {
      return val && val._id;
    }
  };
  