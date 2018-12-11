class Ease {
  /**
   * Decelerating to zero velocity
   * @param {number} t - Current time
   * @param {number} b - Start value
   * @param {number} c - Change in value
   * @param {number} d - Duration
   */
  static easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, (-10 * t) / d) + 1) + b
  }
}

export default Ease
