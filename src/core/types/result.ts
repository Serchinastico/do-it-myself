/**
 * Represents the result of an operation that can either succeed or fail.
 *
 * This type is a discriminated union, which can hold one of two possible states:
 * - A successful state, containing a value.
 * - A failure state, containing an error message.
 *
 * The `success` property is the discriminator, indicating whether the operation
 * was successful (`true`) or failed (`false`).
 *
 * Usage example:
 * ```
 * const successResult: Result<number, 'Error'> = { success: true, value: 42 };
 * const failureResult: Result<number, 'Error'> = { success: false, error: 'Error' };
 *
 * if (successResult.success) {
 *   console.log(successResult.value); // Outputs: 42
 * } else {
 *   console.log(successResult.error); // This won't execute
 * }
 *
 * if (failureResult.success) {
 *   console.log(failureResult.value); // This won't execute
 * } else {
 *   console.log(failureResult.error); // Outputs: "Error"
 * }
 * ```
 */
export type Result<TValue, TError extends string> =
  | { error: TError; success: false }
  | { success: true; value: TValue };

/**
 * A utility type representing the result of a validation operation.
 * It can either indicate success or failure with a corresponding error message.
 *
 * Usage:
 * ```
 * function validateInput(input) {
 *   if (input.length < 5) {
 *     return { error: "InputTooShort", success: false };
 *   }
 *   return { success: true };
 * }
 *
 * const result = validateInput("test");
 * if (!result.success) {
 *   console.error(result.error); // Output: InputTooShort
 * }
 * ```
 */
export type Validation<TError extends string> =
  | { error: TError; success: false }
  | { success: true };
