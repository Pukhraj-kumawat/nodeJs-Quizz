function profileclick(){
    document.querySelector('.profile-data-div')
        .innerHTML = 
        `
        <h4>Profile</h4>
        <h4 onclick="yourQuizz()">Your quizzs</h4>
        <a href="/logout">Logout</a>

        `
}


function yourQuizz() {
    fetch('http://localhost:3000/yourQuizz')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(quizzTitleInstances => {
        document.querySelector('.quizz-content').innerHTML=``;
        quizzTitleInstances.forEach(yourQuizz => {
          document.querySelector('.quizz-content')
            .innerHTML += 
            `            
            <p><a href="/yourQuizzInfo?id=${yourQuizz._id}">${yourQuizz.quizzTitleName}</a></p>
            `
        });

      })
      .catch(error => {
        console.error('Error fetching quizzs:', error);
      });
  }
  

