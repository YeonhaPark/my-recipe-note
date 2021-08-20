import { validationResult } from 'express-validator';
/**
 * 유효성 검사는 router 파트에서 전담
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // if no errors
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};
