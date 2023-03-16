/* 
The following is a Page Rank algorithm. It's purpose is to show the likelihood of a user clicking a 
certain link in a webpage to determine its importance and order in which a search engine should present them.

The higher the pank rank score after the final number of iterations, the more important the webpage is.
*/

//Let Page A = A, Page B = B, Page C = C, Page D = D, Page E = E

//The links object contains each webpage with links which are directed to it.
let links = {
  A: ["B", "C"],
  B: ["A", "E"],
  C: ["A", "B", "C", "D"],
  D: ["A", "C", "E"],
  E: ["D"],
}

//The damping factor is the probability that the user continues following the links.
let damping = 0.75
pageRank(links, damping)

function pageRank(links, damping) {

  //Set an initial rank of each page, opting for a ratio divided by the number of pages since we do not know the page rank values during the first iteration.
  let pageRanks = {}
  let quantityOfPages = Object.keys(links).length
  for (let page in links) {
    pageRanks[page] = 1 / quantityOfPages
  }

  // Set the number of iterations

  let numIterations = 10

  for (let i = 0; i < numIterations; i++) {
    let newPageRanks = {}

    // Initialize the variable finalRank to 0;
    let finalRank = 0

    for (let page in pageRanks) {
      let subLinks = links[page]

      // Check for the links in each page and the number of page links in the individual linking pages.
      let rank = 0
      for (let j = 0; j < subLinks.length; j++) {
        let incomingPage = subLinks[j]
        rank += pageRanks[incomingPage] / links[incomingPage].length
      }

      rank = (1 - damping) / quantityOfPages + damping * rank
      newPageRanks[page] = rank
      finalRank += rank
    }

    for (let page in newPageRanks) {
      newPageRanks[page] /= finalRank
    }

    pageRanks = newPageRanks
  }

  // Containing the value of the final Rank after the last iteration
  const iterationsArr = []

  iterationsArr.push(pageRanks)
  console.log(iterationsArr)

  return pageRanks
}

/*
Results for this particular case of page links
[
  {
    A: 0.17058427957343533,
    B: 0.18869501383361656,
    C: 0.29151847378462814,
    D: 0.24172094509767908,
    E: 0.10748128771064092
  }
]
*/

/*
With the current data structure and 10 iterations, 
It is shown that Page C has the highest rank since it has the greatest number. Followed by
Page D, Page B, Page A and then Page E
*/
