/** Standard response shape for admin server actions. */
export type AdminActionResult<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export function actionSuccess<T>(message: string, data?: T): AdminActionResult<T> {
  return data !== undefined ? { success: true, message, data } : { success: true, message };
}

export function actionError(message: string): AdminActionResult<never> {
  return { success: false, message };
}
