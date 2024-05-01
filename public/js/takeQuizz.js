let isInputClick = false;

// Hide all questions div
const questionDivs = document.querySelectorAll('.question-div');
questionDivs.forEach((questionDiv)=>{
    questionDiv.style.display = 'none';
})

// Hide all next button
const nextButtons = document.querySelectorAll('.nextButton')
nextButtons.forEach((nextButton)=>{
        nextButton.style.display = 'none';
    })

// Hide submit button
const submitButton = document.querySelector('.submit-button')
submitButton.style.display = 'none';

// show first question div
document.querySelector('.question1')
.style.display = 'block';

// if quizz have only one question then show submit button
if(!document.querySelector('.question2')){
    submitButton.style.display = 'block'
}else{
    // else show next button of the first question
    document.querySelector('.nextButton1')
        .style.display = 'block';
}

function inputClick(number){
    isInputClick = true
    
}


function nextClick(event,number,noOfQuestions){
    event.preventDefault();

    // check whether input is selected or not
    if(isInputClick){
        // Fetch and hide current Question and current next button when next clicked
        const currentQuestion =  document.querySelector(`.question${number}`)
        if(currentQuestion){
            currentQuestion.style.display = 'none';
        }
        const currentNextButton =  document.querySelector(`.nextButton${number}`)
        if(currentNextButton){
            currentNextButton.style.display = 'none';
        }

        // Fetch and show next question and next next button when next clicked
        const nextQuestion =  document.querySelector(`.question${parseInt(number)+1}`)
        if(nextQuestion){
            nextQuestion.style.display = 'block';
        } 
        const nextNextButton =  document.querySelector(`.nextButton${parseInt(number)+1}`)
        if(nextNextButton){
            if((parseInt(number)+1 == noOfQuestions)){
            submitButton.style.display = 'block';
            } else{
                nextNextButton.style.display = 'block';            
            }
        }
    } else{
        alert('Please select a option')
    }
}



