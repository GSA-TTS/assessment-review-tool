# Cloud.gov
Login using your browser at [cloud.gov](https://cloud.gov).

## How-to Login from the CLI
You can login to Cloud.gov from the command line using the `cf` program, like this:

```bash
cf login -a api.fr.cloud.gov --sso
```

This will provide you with a URL to Cloud.gov where you'll obtain a temporary token
which you'll use to complete the login process. Visit the URL, login, and copy the
token to the prompt on the command line.

Note: `cf` is installed in the dev container which is defined in [.devcontainer](/.devcontainer).

See: [/docs/localDevelopment.md](#dev-container).

## How-to do command-line ops for Cloud.gov
In your running dev container, either on your OS or in a GitHub Codespace,
login to `cf` by following the login instructions in this document. Then, run whatever
`cf` commands you like, e.g.:

- `cf target` to change your local Cloud Foundtry "target."
- `cf services` to list all services, including databases.
- `cf connect-to-service` to connect to the app's PostgreSQL database. See: [/db/README.md](connecting-to-the-smeqa-application-database).
