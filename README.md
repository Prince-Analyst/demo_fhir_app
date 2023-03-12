# Demo Fhir App

## About the App

This prototype app picks insights from [Medplum](app.medplum.com) app to create an **Electronic Health Record (EHR)** platform for the **creation, retrieval & manipulation** of medical resources in compliance with **FHIR standards** for easy transfer and integration of medical records across EHR platforms.

The app runs locally by spinning up docker images of:

- Fhir-Server
- Ehrbase-Server and
- Postgresql

## Get Started

To run this app: kindly follow the steps

1. Open your terminal.
2. Run the following commands
   - `npm install`
   - `npm install medblocks-ui`
   - `npm install tailwindcss autoprefixer`
   - `npm install magic-string` (if you are running the app in a **WSL** environment)
   - `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`
   - `npx tailwindcss init -p`
3. Start the docker container by running `docker-compose up` or `docker-compose up -d` to run in a detached mode.
4. Afterwards, run `npm run dev`
5. To access the **fhir-server**, open [http://localhost:8090/fhir](http://localhost:8090/fhir) on your browser.
6. To access the **ehrbase-server**, open [http://localhost:8080/ehrbase/swagger-ui/index.html#/](http://localhost:8080/ehrbase/swagger-ui/index.html#/) on your browser
