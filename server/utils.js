function createResult(error, data) {
    const result = {};
  
    // check if there is any error
    if (error) {
      result["status"] = "error";
      if (error.errno === 1062) {
        result["error"] = "User already Exist";
      } else {
        result["error"] = error;
      }
    } else {
      result["status"] = "success";
      result["data"] = data;
    }
  
    return result;
  }
  
  function createErrorResult(error) {
    return {
      status: "error",
      error,
    };
  }
  
  function createSuccessResult(data) {
    return {
      status: "success",
      data,
    };
  }
  
  module.exports = {
    createResult,
    createErrorResult,
    createSuccessResult,
  };
  