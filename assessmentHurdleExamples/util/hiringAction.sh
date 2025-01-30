#!/bin/bash
# Called from parent of `util`.
# Does not expect applicants.csv to exist in AGENCY_DIR; you can add applicants later.
# Expects the following env vars to be set:

: "${HOST?Need to set HOST}";
: "${TOKEN?Need to set TOKEN}";
: "${AGENCY_DIR?Need to set AGENCY_DIR}";

if ! /bin/bash ./util/checkJSON.sh "$AGENCY_DIR"; then
    echo "Exiting because of bad JSON in AGENCY_DIR"
    exit 1;
fi

printf "HOST: $HOST\nTOKEN: $TOKEN\nAGENCY_DIR: $AGENCY_DIR\n";

# This creates the actual hiring action
HA_ID=`curl --silent -X PUT -H "Authorization: token ${TOKEN}" -H "Content-Type: application/json" -d @${AGENCY_DIR}/assessmentHurdle.json ${HOST}/api/assessment-hurdle/ | jq '.data.id'`;

if [[ $HA_ID == null ]]; 

then 
    printf "\nFailed to create a new hiring action";
    printf "\nNo hiring action ID";
    exit 1; 
fi

# Remove leading `"` 
HA_ID="${HA_ID%\"}" 
# Remove trailing `"``
export HA_ID="${HA_ID#\"}"

: "${HA_ID?Need to set HA_ID}"
printf "\nHA ID: ${HA_ID}\n";

printf "$AGENCY_DIR : $HA_ID\n" >> last_run_ha_id.txt

export APPLICANTS_FILE=${AGENCY_DIR}/applicants.csv
export USERS_FILE=${AGENCY_DIR}/users.json

# Assumes being called from the parent directory.
# These can all be called independently
# with the correct env vars.
/bin/bash ./util/addUsers.sh && \
/bin/bash ./util/addSpecialties.sh && \
/bin/test -f "$APPLICANTS_FILE" && /bin/bash ./util/addApplicants.sh \
printf "\n\nHiring action successfully created!" && exit;
printf "\n\nHiring action creation failed";
