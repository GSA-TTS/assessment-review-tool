# How to Create a Hiring Action

Brief documentation about how to create a hiring action in SMEQA. This applies
to creating local hiring actions, stage, or production hiring actions. In each
scenario the only differences are the values of the `TOKEN` and `HOST`
environment variables.

The general process for creating hiring actions is to put all associated
hiring action files into a directory and use the scripts in [util/](util/) to
post the hiring action data to a SMEQA instance running somewhere. These files
will be provided to by someone from GSA TTS or another agency. You may need to
edit these slightly before using them. Be sure to validate the JSON before you
attempt to use them, because adding data like competencies is one-shot and if
you make a mistake, you'll likely need to edit data in the database directly
to correct it.	

See: [/assessmentHurdleExamples/README.md](assessmentHurdleExamples/README.md)
for detailed information about the files needed to create a hiring action.

See: [/db/README.md](db/README.md) for information about connecting to a
SMEQA instance database.

# API Token
Locally, the API authentication token is simply `admin`. To obtain the stage or
production tokens:

1. Login to Cloud.gov and navigate to the dashboard.
2. Select an appropriate instance of the application.
3. On the sidebar menu, click **Variables**.
4. The admin token is defined as an environment variable.

## Example Request

```sh
HOST=<SMEQA host> TOKEN=<token> AGENCY_DIR=/path/to/dir ./util/hiringAction.sh
```

## Other Operational Activities
A number of scripts exist to add users to a hiring action, add applicants, etc.

See: [/assessmentHurdleExamples/util](assessmentHurdleExamples/util).

# Notes
## Hiring Actions vs. Assessment Hurdles
These are synonyms. A Hiring Action is the public-facing name of a "hiring event"
that SMEs and HR professionals should review. Internal to the application, this
is modeled as a "hiring action" and the database tables, scripts and source code
refers to the data/event in this way.
