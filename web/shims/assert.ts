/** Browser stand-in for node:assert. poker-ts uses it as a bare guard. */
function assert(value: unknown, message?: string): asserts value {
  if (!value) throw new Error(message ?? 'Assertion failed')
}
export default assert
