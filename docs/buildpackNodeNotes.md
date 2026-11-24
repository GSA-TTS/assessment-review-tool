# Notes on Buildpack and Node versions

Accurate as of November 2026.

## Why `engines.node` is a range

The Cloud.gov `nodejs_buildpack` only ships currently supported Node lines and
removes old ones (and old patch versions) without notice. Pinning an exact version,
e.g. `18.20.6`, causes `cf restage` / `cf push` to fail with:

```
**ERROR** Unable to install node: no match found for 18.20.6 in [22.23.5 24.22.3]
```

The api `engines.node` is therefore set to `22.x` so staging picks up whatever Node 22
release the buildpack currently provides. Do not pin an exact version again.
Check the available versions in the
[nodejs-buildpack releases](https://github.com/cloudfoundry/nodejs-buildpack/releases).

## Api

Api is built by a GitHub Action workflow which uses Node 14. This is declared in
[.github/workflows/push-prod.yml](/.github/workflows/push-prod.yml)

[package.json](/api/package.json) configures `engine` to `22.x`. The api
[/api/Dockerfile](Dockerfile), which is only used for local development, uses an
older version of Node.

The application will run locally using Node 18, however it cannot be built using
Node 18. Attempting to build api using Node 18 locally (in Docker) fails during
`npm run build` with type errors from Sequelize, Passport, and other packages.

This has implications for maintaining api in the future. Since the application can
only be built using Node 14, updating its dependencies will be limited by this Node
version, making it likely that some vulnerabilities cannot be resolved without
potentially significant source code changes.

On Cloud.gov, api and frontend run in the same process, by the same buildpack
instance. The GitHub Action which deploys api deploys it alongside frontend, and
they both run in Node 22.

The team's assumption is that `engine`’s Node version was bumped based on output from the
NodeJS buildpack during the GitHub Action run, which (looking at past, successful
builds) outputs log lines like this:

```
**WARNING** A newer version of node is available in this buildpack. Please adjust
your app to use version 18.20.4 instead of version 18.20.3 as soon as possible.
Old versions of node are only provided to assist in migrating to newer versions.
```

We suspect at some point in the past, there was a buildpack which supported Node 14.
This buildpack was then deprecated, and api’s `engine`, which defines the runtime
environment for both frontend and api, was updated to the (much) newer Node version
accordingly.

At the Deploy to Cloud.gov step during the GitHub Action defined in `push-prod.yml`,
the Node version from the package.json requirement is installed. Example logs
from an older deploy (Node 18 at the time; it is now 22):

```
-----> Installing binaries
engines.node (package.json): 18.20.3
engines.npm (package.json): unspecified (use default)
-----> Installing node 18.20.3
Download [https://buildpacks.cloudfoundry.org/dependencies/node/node_18.20.3_linux_x64_cflinuxfs4_d8565231.tgz]
```

Source: The `build run` stage.

## Frontend

Frontend is built by a GitHub Action workflow which uses Node 12. This is declared in
[.github/workflows/push-prod.yml](/.github/workflows/push-prod.yml).

Unlike api, frontend’s [/frontend/package.json](package.json) does not declare a
Node `engine` version. The [/frontend/Dockerfile](Dockerfile), again only used for
local development, uses an older version of Node.

Frontend will not build in Node 18. It complains about `gyp`.
