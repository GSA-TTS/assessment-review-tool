# Local Development

You'll need Rancher to run this application locally. You can use another container runtime
but you'll need a way to use the application's [docker-compose.yml](/docker-compose.yml)
file so the simplest path forward is just to use Rancher, which ships with docker-compose
compatibility.

You will likely encounter difficulties trying to run this on your GFE. One path
 is to use a [GitHub Codespace](#github-codespace).

# Tools
## Necessary

- jq
- Rancher
- [mkcert](https://github.com/FiloSottile/mkcert)

TODO: Bake `mkcert` into the [devcontainer Dockerfile](/.devcontainer/Dockerfile).

## Useful

- [React Dev Tools Chrome Extension](https://github.com/facebook/react)
- [Redux Dev Tools Chrome Extension](https://github.com/reduxjs/redux-devtools)


## Running the Application

```sh
docker compose up
```

This will start PostgreSQL, a frontend React server, the backend API server, and a
[traefik](#local-ssh) container.


```sh
docker compose up --build
```

This will start everything after rebuilding our containers.

### Populate Local Data

The application can't be tested without data, so you'll need to populate it with some
dummy data. Data for local development is located in
[assessmentHurdleExamples/resumeYesNoOnlySmall/](/assessmentHurdleExamples/resumeYesNoOnlySmall).

`cd` to `assessmentHurdleExamples/` and load it like this:

```sh
TOKEN=admin \
HOST=http://localhost:8000 \
AGENCY_DIR=resumeYesNoOnlySmall \
./util/hiringAction.sh
```

Note: even though Trafik is terminating SSL on port `4433`, both the frontend and API
continue to be exposed over HTTP ports.


### Local SSL
[docker-compose.yml](/docker-compose.yml) is configured to serve the application
over HTTP on port `8080`. For example: [http://localhost:8000/](http://localhost:8000/).

Because the session cookie is `Secure`, you wont get very far trying to use the
application over HTTP. Fortunately, docker-compose.yaml is already configured to serve
HTTPS over port `4443` using using [Traefik](https://traefik.io/), provided you have
generated a local certificate and stored it in [localcert/](/localcert/).

Use [mkcert](https://github.com/FiloSottile/mkcert) to generate a local certificate
and key for use by Traefik.

```bash
mkcert -ecdsa -key-file domain.key -cert-file domain.crt smeqa.local "*.smeqa.local"
```

Store these generated files in the `localcert/` directory, located in the root of this
repo.

If you want your browser to accept this certificate without a big, annoying warning,
you will need to add its root certificate to your OS. First, you may not have
permission to do this on your device. Second, **this is risky if you do not understand
the implications, so proceed with caution.**

```sh
mkcert -install
```

#### Local SSL Domain
Per the instructions above, you've generated a certificate for the `smeqa.local` domain.
Edit your `/etc/hosts` file such that this domain resolves to your local.

```
127.0.0.1       smeqa.local
```

Now, you can access the application over HTTPS at
[https://smeqa.local:4443](https://smeqa.local:4443).


### GitHub Codespace
This repo is configured with a [.devcontainer](/.devcontainer) to allow you to do
development and ops work from within a GitHub Codespace.

SSL termination with Traefik has not been tested in the Codespace environment. As
of now this is left as an exercise for the reader.

#### Signing Commits
GitHub will refuse to recognize any other GPG key than the one that _it_ wants to sign with inside of
the Codespace, which it automatically sets up for you. At least, as far as I've been able to
determine. If you want signed commits (i.e. if your branch protection rules require it), just
click the checkbox to enable GPG signing in your GitHub Codespaces settings (the settings attached
to your GitHub account) and `git` in the Codespace will handle signing commits for you
automatically. It'll work out of the box and you don't need to do anything else to enable this.

Presumably this is handled automatically within VSCode as well if you want to use its GUI git
tools, but I haven't tested this.

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
