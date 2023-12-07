import axios from 'axios';

/**
 * @description - This is a class that contains helper functions used across the application.
 */

export default class HelperFunctions {
  /**
   * @description - This method is used to capitalize the first letter of every word in a string.
   * @param {string} string - The string sent.
   * @returns {string} - Returns a formatted string with capitalized first letter of every word.
   * @memberof HelperFunctions
   */
  static capitalize(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * @description - This method is used to make a request to an external API.
   * @param {string} url - The url of the external API.
   * @param {string} method - The HTTP method to be used.
   * @param {object} data - Optional data to be sent.
   * @param {object} headers - Optional headers to be sent.
   * @returns {object} - Returns a response object.
   */
  static async makeRequest(url, method, data = {}, headers = {}) {
    try {
      const response = await axios({
        url,
        method,
        data,
        headers,
      });

      return response.data;
    } catch (error) {
      console.error('Axios Request Error:', error.message);
      throw error;
    }
  }
}
