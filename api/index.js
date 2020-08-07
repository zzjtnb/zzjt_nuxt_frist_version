const express = require('express')

// Create express instance
const app = express()

// Require API routes
const users = require('./routes/users')
const test = require('./routes/test')
const data = require('./data/index')
const blog = require('./blog/index')

// Import API Routes
app.use(users)
app.use(test)
app.use('/v1', data)
app.use(blog)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  console.log(process.env.PORT);
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
