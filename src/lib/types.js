/**
 * @typedef {object} product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {rating} rating
 * @property {string} color
 * @property {string} size
 * @property {string} brand
 */

/**
 * @typedef {object} rating
 * @property {number} rate
 * @property {number} count
 */

/**
 * @typedef {product[]} products
 */

/**
 * @typedef {string[]} categories
 */

/**
 * @typedef jobs
 * @property {Array.<job>}
 */

/**
 * @typedef job
 * @type {object}
 * @property {string} category
 * @property {string} title
 * @property {string} type
 * @property {string} location
 */

/**
 * @typedef questions
 * @property {Array.<question>}
 */

/**
 * @typedef question
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef team
 * @type {Array.<person>}
 */

/**
 * @typedef person
 * @type {Object}
 * @property {string} name
 * @property {string} role
 * @property {string} image
 */

/**
 * @typedef user
 * @type {object}
 * @property {address} address
 * @property {number} id
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {name} name
 * @property {string} phone
 */

/**
 * @typedef address
 * @type {object}
 * @property {geolocation} geolocation
 * @property {string} city
 * @property {string} street
 * @property {number} number
 * @property {string} zipcode
 */

/**
 * @typedef geolocation
 * @type {object}
 * @property {string} lat
 * @property {string} long
 */

/**
 * @typedef name
 * @type {object}
 * @property {string} firstname
 * @property {string} lastname
 */
