# Swift Market Web Client

Swift Market is a global peer-to-peer marketplace powered by the XRPL. The web client is built with React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- npm 9+

## Environment Configuration

All Firebase and analytics credentials are supplied through environment variables. Copy the example file and populate it with project-specific values:

```bash
cp .env.example .env.local
```

Update the new file with secrets generated from the Firebase console. **Do not commit the populated `.env.local` file to version control.**

| Variable | Description |
| --- | --- |
| `REACT_APP_API_KEY` | Firebase Web API key |
| `REACT_APP_AUTH_DOMAIN` | Firebase auth domain (e.g. `project.firebaseapp.com`) |
| `REACT_APP_PROJECT_ID` | Firebase project ID |
| `REACT_APP_STORAGE_BUCKET` | Firebase storage bucket |
| `REACT_APP_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `REACT_APP_APP_ID` | Firebase app ID |
| `REACT_APP_MEASUREMENT_ID` | Firebase measurement ID |

## Available Scripts

```bash
npm install
npm start
npm test
npm run build
```

- `npm start` — Runs the development server at http://localhost:3000.
- `npm test` — Executes the unit test suite in watch mode.
- `npm run build` — Produces an optimized production build in the `build/` directory.

## Security Notes

- Rotate Firebase credentials immediately if they have ever been exposed in committed history.
- Revoke any leaked keys through the Google Cloud console and update `.env.local` with the new secrets.
- Always verify that `git status` shows no environment files before pushing commits.

## License

This project is released under the MIT License. See [LICENSE](../LICENSE) for details.
