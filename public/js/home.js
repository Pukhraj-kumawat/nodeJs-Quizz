
function addQuestion(quizzId){    
    document.getElementById(`${quizzId}`)
        .innerHTML = `
        <form action="/createMcq" method="post">                            
            <label for="quizTitle">Question </label>
            <input type="text"   name="questionBody" required>      
            <input type="text"  class="" name="option" required placeholder="A">                                
            <input type="text"  class="" name="option" required placeholder="B">                                
            <input type="text"  class="" name="option" required placeholder="C">                                
            <input type="text"  class="" name="option" required placeholder="D">    
            
            <label for="choices">Correct option :</label>
            <select id="choices" name="AnswerIndex">
                <option value="0">(A)</option>
                <option value="1">(B)</option>
                <option value="2">(C)</option>
                <option value="3">(D)</option>
            </select>    
            <input type="hidden" value=${quizzId} name="quizzId">                 
            <p><input type="submit" value="Submit" style="transform: scale(0.9); background-color: gray;" "></p>                                      
        </form>`
    
}










