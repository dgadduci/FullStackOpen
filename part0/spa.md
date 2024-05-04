# 0.5 SPA diagram

```mermaid
sequenceDiagram
participant B as Browser
participant S as Server

B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate S
S -->> B: return HTML
Note left of S: Note: HTML contains <div id='notes'>
deactivate S

rect lightblue
Note right of B: Loads required external files on the HTML page
B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate S
S -->> B: return css
deactivate S

B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate S
S -->> B: return spa.js
deactivate S
end
rect lightgreen
Note right of B:start spa script
B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate S
S -->> B: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... 
deactivate S
Note right of B: Create <ul> element <br> Create <li> elements with data Json<br>insert <li>... into <ul>
Note right of B: <br>Searches in the document for id='notes'<br>Inserts <ul><li><li>...</ul> into <div id='notes'>
end

