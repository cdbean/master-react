import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/local')

const articleSchema = {
  articleTitle: String,
  articleContent: String
}

const Article = mongoose.model('Article', articleSchema, 'articles')

const app = express()
app.server = http.createServer(app)

app.use(cors())

// for falcor-express middleware to work with falcor-browser
app.use(bodyParser.json({extended: false}))

app.use(express.static('dist'))

app.get('/', (req, res) => {
  Article.find((err, articleDocs) => {
    const ourArticles = articleDocs.map((articleItem) => {
      return `<h2>${articleItem.articleTitle}</h2> ${articleItem.articleContent}`
    }).join('<br/>')

    res.send(`<h1>Publishing App Initial Application!</h1>${ourArticles}`)
  })
})

app.server.listen(process.env.PORT || 3000)
console.log(`Started on Port ${app.server.address().port}`)

export default app
