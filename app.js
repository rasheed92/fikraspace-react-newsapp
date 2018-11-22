
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
let arr = []
let SearchBox = styled.input`
  border-radius: 20px;
  background-color: #000;
  color: #fff;
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
  background-color: red;
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
  flex-grow: 2;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
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
margin: 0px 1px 6px 183px;
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

      searchValue: '',
      sortBy: 'publishedAt',
      CounterVote: [],
      pageSize: '15',
      storge :[{text:'',vote:''}],
    }


    this.getNews()


  }

  getNews(searchTerm = 'Iraq', sortBy = 'publishedAt', pageSize = '15') {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          news: data.articles,


        })
        
console.log( data.articles[1].source)
console.log( data.articles)

      })
      for (let index = 0; index < 20; index++) {
        arr.push(1);
        this.state.CounterVote= arr
     
      
    
    }
  }

 
  onInputChange(event) {
    this.setState({
      searchValue: event.target.value

    })
    console.log(this.state.CounterVote)
  }
  optionSortBy(event) {
    this.setState({
      sortBy: event.target.value

    })

    this.getNews(this.state.sortBy)
    console.log(this.state.sortBy)
  }

  optionPageSize(event) {
    this.setState({
      pageSize: event.target.value

    })

    this.getNews(this.state.pageSize)
    console.log(this.state.pageSize)
  }


  onKeyUp(event) {
    if (event.key == 'Enter') {
      this.getNews(this.state.searchValue)
      this.setState({
        searchValue: ''
      })
    }
  }
  upvote() {

    let upvote = document.getElementsByClassName('up')
    // if (arr.length == 0) {

    //   for (let index = 0; index < upvote.length; index++) {
    //     arr.push(1);
    //     this.state.CounterVote[index] = arr[index]
     
    //   }
     
   
    // }
    for (let index = 0; index < upvote.length; index++) {
      upvote[index].addEventListener('click', (event) => {
        this.state.CounterVote[index]++
        console.log(index)
        // console.log(upvote[index])
        document.getElementById("description" + index).textContent = this.state.CounterVote[index];

      })

    }

  }
  downvote() {

    let upvote = document.getElementsByClassName('down')
    // if (arr.length == 0) {

    //   for (let index = 0; index < upvote.length; index++) {
    //     arr.push(1);
    //     // this.state.CounterVote[index] = arr[index]
     
    //   }

    // }
    for (let index = 0; index < upvote.length; index++) {
      upvote[index].addEventListener('click', (event) => {
        arr[index]--
        console.log(index)
        // console.log(upvote[index])
        document.getElementById("description" + index).textContent = arr[index];

      })

    }

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
          <SortOption defaultValue={this.sortBy} onChange={this.optionSortBy.bind(this)}>
            <option value="relevancy">relevancy</option>
            <option value="popularity">popularity</option>
            <option selected>SortBy</option>
          </SortOption>
          <Pagelimit defaultValue={this.pageSize} onChange={this.optionPageSize.bind(this)}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option selected>pageSize</option>
          </Pagelimit>
        </div>
        <NewsContainer>
          {

            this.state.news.map((item, i) => {
              return (

                <NewsItem key={i}>
                  <img width="124px;" height="124px" src={item.urlToImage} />
                  <NewsText>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <DateTime>{item.publishedAt}</DateTime>
                  </NewsText>
                  <Vdiv>
                    <VoteImg onClick={this.upvote.bind(this)} className="up" src={require('./assets/upvote.svg')} />
                    <p id={"description" + i}>{arr[i]}</p>
                    <VoteImg onClick={this.downvote.bind(this)}  className="down" src={require('./assets/downvote.svg')} />
                  </Vdiv>
                </NewsItem>
              )
            })
          }

        </NewsContainer>
        {/* <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul> */}
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

