# 0.4 New note diagram

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server

    activate S
    B->>S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of B:Send form data {note: new value}
    Note left of S: The server adds the new note to the list of notes 
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate S
    S-->>B: <HTML> containing main.css main.js </HTML>
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S-->>B: css file
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate S
    S-->>B: javaScript file
    deactivate S

    Note right of B: The browser starts executing the JavaScript code that fetches the JSON from the server

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S-->>B: [{..., "content": "My new Note", "date": "2023-1-1" }]
    deactivate S
    Note right of B: The browser executes the callback function (xhttp.onreadystatechange) that renders the notes<br>(include new note)
