# Local Development:

- jq
- docker

### Useful tools

- [React Dev Tools Chrome Extension](https://github.com/facebook/react)
- [Redux Dev Tools Chrome Extension](https://github.com/reduxjs/redux-devtools)

## Running Application

### Local Development

```sh
docker compose up # this will start postgres, a frontend react server, and the backend API server
(cd ./api/agencyInfo/ && ./localHiringAction.sh) # this will populate your database wtih the basic demo application.
```

<!-- Testing:

```sh
docker compose run --rm api npm run test
``` -->

Clean up:

```sh
# This will remove _all_ volumes and containers
docker volume rm $(docker volume ls -q) # Removes local docker volumes
docker rm -f $(docker ps -aq) # Removes local docker containers
```

### GitHub Codespace
This repo is configured with a [.devcontainer](/.devcontainer) to allow you to do development
and ops work from within a GitHub Codespace.

#### Signing Commits
GitHub will refuse to recognize any other gpg key than the one that _it_ wants to sign with inside of
the Codespace, which it automatically sets up for you. At least, as far as I've been able to
determine. If you want signed commits (i.e. if your branch protection rules require it), just
click the checkbox to enable GPG signing in your GitHub Codespaces settings (the settings attached
to your GitHub account) and `git` in the Codespace will handle signing commits for you
automatically. It'll work out of the box and you don't need to do anything else to enable this.

Presumably this is handled automatically within VSCode as well if you want to use its GUI git
tools, but I haven't tested this.
