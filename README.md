# Ecommerce-App
## A web app built using ExpressJS which uses JSON file for data management and SHA-2 hashing algorithm with salting for secure storage of user passwords.

### App uses templating structure rather than any frontend framework
### Why ???
### Best question and answer to understand this taken from [Stack Overflow](https://stackoverflow.com/questions/51947023/is-there-any-need-of-learning-views-and-template-engines-in-express-when-we-have)


### Question :  
Is there any need of learning views and template engines in express when we have already learn angular in the MEAN Stack ?
### Answer :
In order to answer your question, let me explain what is angular and what are template engines in express?

### What is Angular?
Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.

### what is template engine?
A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

Some popular template engines that work with Express are Pug, Mustache, and EJS. The Express application generator uses Jade as its default, but it also supports several others.

### Conclusion :
Angular is a framework with a templating component baked in. You use it to create Single page Web Applications which means that DOM modification is happening on the client side and the app exchange with server only data. If your concern is template it is plain HTML.

Whereas, template engines' rendered views are sent to client each time by server whenever request is made each time a new page is rendered on server and sent to the client which is Great for static sites but not for rich site interactions.

If there is angular for front-end in MEAN Stack then why there are views and template engines in express.js at back-end?

This is because not every time generating views from angular is recommended sometimes it is better to use Template Engines to generate views and send the rendered page to a client, generating views at client side has its own pros and cons and generating views at server side has its own.

### Generating views using template engines (i.e. at server-side):
### pros:
### 1. Search engines can crawl the site for better SEO.
### 2. The initial page load is faster.
### 3. Great for static sites.

### cons:
### 1.Frequent server requests.
### 2.An overall slow page rendering.
### 3.Full page reloads.
### 4.Non-rich site interactions.

### Generating views using angular engines (i.e. at client-side):
### pros:
### 1.Rich site interactions
### 2.Fast website rendering after the initial load.
### 3.Great for web applications.
### 4.Robust selection of JavaScript libraries.

### cons:
### 1.Low SEO if not implemented correctly.
### 2.The initial load might require more time.
### 3.In most cases, requires an external library.

So, after knowing the pros and cons, you yourself can better decide that in particular case which one is better for you. Mean Stack has provided options for developers.

As far as your question regarding the role of these two technologies is concerned, Angular is a lot more view generator only, It has features like routing, it as services two-way data binding etc while the template engines are meant to render HTML so that it can be sent to the client.

I hope you will find this answer useful.

### References:
### 1.[what is the template engine?](https://expressjs.com/en/guide/using-template-engines.html)
### 2.[what is angular?](https://angular.io/docs#what-is-angular)
### 3.[pros/cons](https://www.quora.com/Are-templating-engines-still-neccessary-in-Node-app-development-when-there-are-front-end-frameworks-such-as-React-and-Angular-available)

