# UselessAPI
Inspired to make an API by the KanyeREST api. Only has a GET method as for now. <br>
Ok this API is incredibly slow. And thats because I'm dumb. Here's how I wanted it to work.
API was made mostly using express

1) Generate a random link of pre-selected tweets from my friend Arhaan.
2) I have a JS script running in the bg, which scrapes all the data by visiting that site. <br>
<sub>
      This script uses puppeteer and browserless automation / microservice. <br>
      There's something known as "middleware". Not completely sure but i read into it. In the API.js file whenever we post any request <br>
      (GET,POST etc.) it will run a function. This is where i use *app.use(tweetFunction)*.
     </sub>
     <br>
     <br>
     
 3) This is where it gets a bit hazy. Through a lot of trial and error I realised that I would have to make the JS script return a *promise*.
 4) Not just the script, but whenever someone performs a *GET* request on the endpoint *('/tshirt')*, im essentially also returning a promise (like all other REST api's).
 
 <br>
 <br>
 Now I have to be honest I have very limited knowledge as to how the callback function / fat arrow actually works. I made this just for fun. And theres a lot of 
 trial and error present. I will probably read up more on it as I get better at this.
 <br>
 For some reason if you remove line 79, which is app.use(tweetFunction); , the entire thing stops working. God knows why. If anyone can explain it to me TY.

##TODO
Figure out some of the logic at the end that I can't figure out yet <br>
Also put this entire thing online so that I can use it via axios.
