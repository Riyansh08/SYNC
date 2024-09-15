let IS_PROD = true;
const server = IS_PROD?
  
    "https://syncbackend.onrender.com":
    
    "http://localhost:4040"



export default server 