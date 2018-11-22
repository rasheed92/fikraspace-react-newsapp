
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

let SearchBox = styled.input`
  border-radius: 20px;
  background-color: #000;
  color: #ffff;
  font-size: 1.2rem;
  border: 0px;
  height: 40px;
  outline: none;
  padding: 0 10px;
`
let Navigation = styled.header`
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
  background-color: #ebf2f5;
  padding: 20px 10%;

`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
  
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
  flex-basis:800px;
  flex-grow: 2;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`

let SortOption = styled.select`
padding: 0px 32px;
height: 32px;
justify-items: center;
justify-content: center;
margin: 0px 1px 6px 183px;
font-size: 20px;
background-color: #8e8e8e;
color: #ffffff;
`
let Pagelimit = styled.select`
padding: 0px 32px;
height: 32px;
justify-items: center;
justify-content: center;
margin: 0px 1px 6px 494px;
font-size: 20px;
background-color: #8e8e8e;
color: #ffffff;
`
let PageLang = styled.select`
padding: 0px 32px;
height: 32px;
justify-items: center;
justify-content: center;
margin: 0px 1px 6px 504px;
font-size: 20px;
background-color: #8e8e8e;
color: #ffffff;
`
let Vdiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
flex-grow: 1;
margin: auto
`
let VoteImg = styled.img`
height: 20px;
width: 20px;
margin: auto

`



class News extends Component {

  constructor() {
    super()
    this.state = {
      news: [],
      new2: [],
      searchValue: '',
      sortBy: 'publishedAt',
      CounterVote: [],
      pSize: '',
      isLoading: true,
      Planguage: 'en'
    }


    this.componentDidMount()


  }

  getNews(searchTerm = 'Iraq', sortBy = 'publishedAt', pSize = '10', Planguage = 'en') {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&language=${Planguage}&pageSize=${pSize}&sortBy=${sortBy}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        let element = []
        for (let index = 0; index < data.articles.length; index++) {
          element[index] = [{
            title: data.articles[index].title,
            description: data.articles[index].description,
            publishedAt: data.articles[index].publishedAt,
            urlToImage: data.articles[index].urlToImage,
            vote: 1
          }]

        }
        this.setState({
          news: data.articles,
          new2: element


        })
      })

  }


  onInputChange(event) {
    this.setState({
      searchValue: event.target.value

    })
    this.getNews(this.state.getNews)
  }
  optionSortBy(event) {
    this.setState({
      sortBy: event.target.value

    })

    this.getNews(this.state.sortBy)
    console.log(this.state.sortBy)
  }
  optionPlanguage(event) {
    this.setState({

      Planguage: event.target.value

    })

    this.getNews(this.state.Planguage)
    console.log(this.state.Planguage)
  }
  optionPageSize(event) {
    this.setState({
      pSize: event.target.value

    })

    this.getNews(this.state.pSize)
    console.log(this.state.pSize)
  }


  onKeyUp(event) {
    if (event.key == 'Enter') {
      this.getNews(this.state.searchValue)
      this.setState({
        searchValue: '',
        pSize:this.state.pSize,
        Planguage:this.state.Planguage,
        sortBy:this.state.sortBy
      })
    }
  }


  componentDidMount() {
    if (localStorage.length == 0) {
      this.getNews()
      console.log(this.state.searchValue)

    } else {
      this.setState({
        new2: JSON.parse(localStorage.getItem('data')),


      })
      console.log("data from localStorage")
      console.log(this.state.searchValue)
    }


  }
  componentWillMount() {
    localStorage.getItem('date') && this.setState({
      new2: JSON.parse(localStorage.getItem('data')),


    })
  }
  componentWillUpdate(nextProps, nextState, i) {

    localStorage.setItem('data', JSON.stringify(nextState.new2))


  }
  upvote(i) {

    console.log(this.state.new2[i])
    let upvote = this.state.new2[i][0]
    upvote.vote++
    this.setState({
      upvote: upvote
    })


    //  this.state.new2[i][0].vote++


    //     this.state.CounterVote[index]=value
    //  document.getElementById("description" + i).textContent =  this.state.new2[i][0].vote;

    console.log(this.state.new2[i][0].vote)
    //this.componentWillUpdate()
  }
  downvote(i) {
    let downvote = this.state.new2[i][0]
    downvote.vote--
    this.setState({
      downvote: downvote
    })

    // this.state.new2[i][0].vote--
    // document.getElementById("description" + i).textContent =  this.state.new2[i][0].vote;
    // this.loadDB()

  }
  render() {

    return (
      <React.Fragment>
        <Navigation>
          <img width="150px;" src={require('./assets/logo.svg')} />
          <SearchBox
            onChange={this.onInputChange.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            value={this.state.searchValue} placeholder="search term" />
        </Navigation>
        <div>
          <SortOption onChange={this.optionSortBy.bind(this)}>
            <option value="publishedAt" selected>Newest Articles</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Most Probably</option>
          </SortOption>
          <Pagelimit onChange={this.optionPageSize.bind(this)}>
            <option value="20">20</option>
            <option value="15">15</option>
            <option value="10" >10</option>
            <option value="5" defaultValue={this.pSize} selected>5</option>
          </Pagelimit>
          <PageLang onChange={this.optionPlanguage.bind(this)}>
            <option value="en" selected>en</option>
            <option value="ar">ar</option>
            <option value="de">de</option>
            <option value="es">es</option>

          </PageLang>
        </div>
        <NewsContainer>
          {

            this.state.new2.map((item, i) => {
              return (

                <NewsItem key={i}>
                  <img width="124px;" height="124px" src={item[0].urlToImage} />
                  <NewsText>
                    <h1>{item[0].title}</h1>
                    <p>{item[0].description}</p>
                    <DateTime>{item[0].publishedAt}</DateTime>
                  </NewsText>
                  <Vdiv>
                    <VoteImg onClick={this.upvote.bind(this, i)} className="up" src={require('./assets/upvote.svg')} />
                    <p id={"description" + i}>{item[0].vote}</p>
                    <VoteImg onClick={this.downvote.bind(this, i)} className="down" src={require('./assets/downvote.svg')} />
                  </Vdiv>
                </NewsItem>
              )
            })
          }

        </NewsContainer>
      </React.Fragment>
    )
  }
}

function App() {
  return <div>
    <News />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))

