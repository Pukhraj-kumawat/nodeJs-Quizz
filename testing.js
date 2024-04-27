const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved after timeout");
    }, 2000); // Resolves after 2 seconds
  });


console.log(promise1.then().then())