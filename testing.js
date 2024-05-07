function fun(){
  if(0 == 0){
    console.log('are equal')
    return;
    console.log('after return inside if');
  }
  console.log('outside of return')
}
fun()