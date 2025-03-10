import React from "react";

import Accordion from "../../commonComponents/Accordion";
import Alert from "../../commonComponents/Alert";
import Button from "../../commonComponents/Button";

// const EvaluationNote = (evaluator, note) => (
//   <div key={evaluator}>
//     <h5> {evaluator} Note:</h5>
//     <p style={{ whiteSpace: "pre-wrap" }}>{note}</p>
//   </div>
// );
const ResumeReview = ({
  progressBar,
  AssessmentAlert,
  handleSubmitReview,
  applicantName,
  handleRecuseFromApplication,
  handleFlagReview,
  isFormCompleted,
  isFormDisabled,
  competencies,
  experiences,
  applicantNotes,
  isTieBreaker,
}) => {
  // const applicationNoteElements = [];
  // if (isTieBreaker) {
  //   if (applicantNotes[0] && applicantNotes[0].length) {
  //     applicationNoteElements[0] = EvaluationNote("SME 1", applicantNotes[0]);
  //   } else {
  //     applicationNoteElements[0] = EvaluationNote(
  //       "SME 1",
  //       "There was no note for this applicant."
  //     );
  //   }
  //   if (applicantNotes[1] && applicantNotes[1].length) {
  //     applicationNoteElements[1] = EvaluationNote("SME 2", applicantNotes[1]);
  //   } else {
  //     applicationNoteElements[1] = EvaluationNote(
  //       "SME 2",
  //       "There was no note for this applicant."
  //     );
  //   }
  // }

  return (
    <>
      <div className="grid-container">
        <div className="grid-row smeqa-rr-sme-progress-bar">
          <div className="grid-col">{progressBar}</div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">{AssessmentAlert}</div>
        </div>
      </div>

      <form
        name="sme-rr"
        className={`usa-form smeqa-rr-form ${isFormDisabled ? "is-disabled" : ""
          }`}
        id="smeqa-rr-form"
        onSubmit={handleSubmitReview}
        noValidate
      >
        <div className="grid-container">
          <div className="grid-row grid-gap-2">
            <div className="grid-col tablet:grid-col-8">
              <h4 className="smeqa-rr__title">Resume review for</h4>
              <h1 className="smeqa-rr__applicant-name">{applicantName}</h1>
            </div>
            <div className="grid-col tablet:grid-col-4">
              <Button
                onClick={handleRecuseFromApplication}
                type="submit"
                label="Recuse yourself"
                icon="hand-paper"
                addClass="smeqa-rr__recuse "
                disabled={isFormDisabled}
              />
              <Button
                onClick={handleFlagReview}
                type="submit"
                label="Flag applicant for HR"
                outline
                addClass="smeqa-rr__skip"
                disabled={isFormDisabled}
              />
            </div>
          </div>
          {isTieBreaker && (
            <div className="grid-row grid-gap-2">
              <div className="grid-col" style={{ marginTop: "1em" }}>
                <Alert
                  type="info"
                  title="Tie-breaker"
                  body="The following statements require a tie-breaker."
                // body={
                //   // <div>
                //   //   {/* <h4>Evaluation notes for this candidate:</h4>
                //   //   {applicationNoteElements} */}
                //   // </div>
                // }
                ></Alert>
              </div>
            </div>
          )}

          <div className="grid-row grid-gap-2">
            <div className="grid-col smeqa-rr-instructions-text">
              <Accordion
                title="Instructions"
                addClass="usa-accordion--bordered smeqa-rr-instructions"
              >
                <p>Completing a resume review involves the following steps:</p>
                <ol>
                  <li>
                    Find the applicant's resume in the email sent by the U.S. Digital Corps team.
                  </li>
                  <li>
                    Align the browser window alongside the resume so that you can see both at the same time.
                  </li>
                  <li>
                    Review two pages of experience (starting with the first line of experience) to assess if they meet the minimum qualifications with experience. Look for evidence of each competency in their resume — use the experience they describe in their resume rather than searching for keywords.
                  </li>
                  <li>
                    Select "Yes" if the applicant's resume reflects a given competency. Under "Evaluation Justification," indicate where in the resume you found support for your rating (i.e., the role and/or year).
                  </li>
                  <li>
                    Select "No" if the applicant's resume does not reflect a specific competency. Under "Evaluation
Justification," explain why the resume does not meet the competency. Specify whether there is insufficient evidence of specific areas of the competency or of the competency as a whole. Provide any additional information necessary to help others retrace your decision.
                  </li>
                  <li>
                    Determine if the candidate has 52 weeks of cumulative full-time specialized experience in the competencies at the GS-7 level.
                  </li>
                  <li>
                    Click "Finish Review" to move to the next applicant.
                  </li>
                  <li>
                    Keep working through the applicants. Click "Exit Review" at the top of the page to stop at any time. Incomplete reviews will not be saved on exit.
                  </li>
                  <li>
                    If you have questions or are unsure about a specific applicant's review, click the "Flag applicant for HR" button to contact a member of the USDC team for assistance. Flagging removes the applicant from everyone's queue.
                  </li>
                </ol>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="grid-container smeqa-rr-comps">
          <div className="grid-row grid-gap-2 smeqa-rr-row">
            <div className="tablet:grid-col-8">
              {/* <h2 className="smeqa-rr-comps__title">Specialized Experience</h2> */}
            </div>
            <div className="tablet:grid-col-4">
              <h4 className="smeqa-rr-comps__title--prof">
                Resume reflects this experience?
              </h4>
            </div>
          </div>
          {competencies}
          {experiences && experiences.length > 0 && (
            <div className="grid-row grid-gap-2 smeqa-rr-row">
              <div className="tablet:grid-col-8">
                {/* <h2 className="smeqa-rr-comps__title">Experience</h2> */}
              </div>
            </div>
          )}
          {experiences}

          <div className="grid-row grid-gap-2 smeqa-rr-row">
            <div className="tablet:grid-col-4 tablet:grid-offset-8">
              <Button
                disabled={!isFormCompleted}
                type="submit"
                label="Finish Review"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResumeReview;
