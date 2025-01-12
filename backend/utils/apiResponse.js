class ApiResponse {
  static success(res, message, data = null) {
    return res.status(200).json({ status: "success", message, data });
  }

  static error(res, message, code = 500) {
    return res.status(code).json({ status: "error", message });
  }

  static validationError(res, message, errors = []) {
    return res.status(400).json({ status: "validation_error", message, errors });
  }
}

module.exports = ApiResponse;
