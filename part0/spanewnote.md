# 0.6 SPA new note diagram

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server
rect green

Note right of B: **spa.jsScript**<br>create note object<br>push into [notes]<br>update HTML  <ul>new<li></ul><br>send to server new note
end
B ->> S: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of B: {content: "New note", date: "2024-05-04T21:26:20.882Z"}

activate S
S -->> B: response {"message":"note created"}
deactivate S

Note right of B:console display response