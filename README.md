# Ecommerce-App
## A web app built using ExpressJS which uses JSON file for data management

### App uses templating structure rather than any frontend framework
### Why ???
### Best question and answer to understand this taken from (Stack Overflow)[https://stackoverflow.com/questions/51947023/is-there-any-need-of-learning-views-and-template-engines-in-express-when-we-have]


### Question :  
Is there any need of learning views and template engines in express when we have already learn angular in the MEAN Stack ?
### Answer :
In order to answer your question, let me explain what is angular and what are template engines in express?

What is Angular?
Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.

what is template engine?
A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

Some popular template engines that work with Express are Pug, Mustache, and EJS. The Express application generator uses Jade as its default, but it also supports several others.

So,

Angular is a framework with a templating component baked in. You use it to create Single page Web Applications which means that DOM modification is happening on the client side and the app exchange with server only data. If your concern is template it is plain HTML.

Whereas, template engines' rendered views are sent to client each time by server whenever request is made each time a new page is rendered on server and sent to the client which is Great for static sites but not for rich site interactions.

If there is angular for front-end in MEAN Stack then why there are views and template engines in express.js at back-end?

This is because not every time generating views from angular is recommended sometimes it is better to use Template Engines to generate views and send the rendered page to a client, generating views at client side has its own pros and cons and generating views at server side has its own.

Generating views using template engines (i.e. at server-side):
pros:
Search engines can crawl the site for better SEO.
The initial page load is faster.
Great for static sites.
cons:
Frequent server requests.
An overall slow page rendering.
Full page reloads.
Non-rich site interactions.
Generating views using angular engines (i.e. at client-side):
pros:
Rich site interactions
Fast website rendering after the initial load.
Great for web applications.
Robust selection of JavaScript libraries.
cons:
Low SEO if not implemented correctly.
The initial load might require more time.
In most cases, requires an external library.
So, after knowing the pros and cons, you yourself can better decide that in particular case which one is better for you. Mean Stack has provided options for developers.

As far as your question regarding the role of these two technologies is concerned, Angular is a lot more view generator only, It has features like routing, it as services two-way data binding etc while the template engines are meant to render HTML so that it can be sent to the client.

I hope you will find this answer useful.

References:

what is the template engine?
what is angular?
pros/cons

