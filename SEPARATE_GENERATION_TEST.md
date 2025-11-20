1. Storing Backend Knowledge in Mem0
Memorize the following backend project information under project tag project_XXXXX:
List of all API endpoints (including URLs, HTTP methods, and input/output formats)
Authentication methods and security features
Main features included (e.g., password hashing, CORS, helmet, etc.)
Any important data models (names and key fields)
Store this knowledge so I can retrieve it and use it for frontend generation at any time in the future.
2. Retrieving Context & Generating Frontend
For project tag project_XXXXX, use the memorized backend details (API endpoints, auth, data models, and features) to generate React frontend components and API integration logic. Ensure the frontend correctly calls the backend endpoints, handles authentication as described, and uses the correct request/response formats. Do not require the raw backend code; use only what is stored in memory for this project.
If extra details or assumptions are required, explain them.
Tip: Make your tags (like project_XXXXX) clearly unique per project or user.
This approach lets you scale, avoid content filter triggers, and decouple backend/frontend context exchange.
Just copy-paste the backend summary for storage, and use only the tag/project name when generating frontend code.


use mem0 study about mem0 understand my bcakend then implement make sure that u dont delete any of my pre existing files and i found the issue the backend contexxt was the when i genrated seprately it did genrate both frontend and backend
this one worked app.post("/build/separate"
so try this once  