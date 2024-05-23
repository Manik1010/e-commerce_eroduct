// const express = require('express')
import express, { Request, Response } from 'express';
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World next')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
export default app;