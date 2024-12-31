# The universal image contains many useful tools including Docker-in-Docker already set up.
FROM mcr.microsoft.com/vscode/devcontainers/universal

# Add Cloud Foundry cf cli
# The package source is unstable (frequent 401s) so we install the package directly.
RUN curl -L -o /tmp/cf8.deb https://github.com/cloudfoundry/cli/releases/download/v8.8.3/cf8-cli-installer_8.8.3_x86-64.deb \
    && dpkg -i /tmp/cf8.deb \
    && rm /tmp/cf8.deb

# Install other helpful tools
RUN apt-get update \
    && apt-get install -y netcat

# Install the cf-service-connect plugin to allow easy access to Postgres
# See: https://github.com/cloud-gov/cf-service-connect
# Note: versions > 1.1.3 require a newer version of glibc than we have (2.31).
USER codespace
RUN /usr/bin/cf install-plugin https://github.com/cloud-gov/cf-service-connect/releases/download/v1.1.3/cf-service-connect_linux_amd64 -f
USER root
