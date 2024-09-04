```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Page load
    Browser->>Browser: DomContent Loaded
    Browser->>Server: GET /projects
    Server->>Server: Read projects.json
    Server->>Server: Parse json
    Server->>Browser: HTTP 200 response
    Browser->>User: Display projects on page
```