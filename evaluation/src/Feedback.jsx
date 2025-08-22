import React, { useState, useEffect } from "react";
import "./Feedback.css";

export default function Home() {
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [treatment, setTreatment] = useState("");
  const [doctorComment, setDoctorComment] = useState("");
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const departmentData = {
    "Emergency Department": { doctors: ["Dr. Smith", "Dr. Johnson"], treatments: ["Stitching", "IV Fluids"] },
    Cardiology: { doctors: ["Dr. Adams", "Dr. Lee"], treatments: ["ECG", "Stress Test", "Angiography"] },
    Orthopedics: { doctors: ["Dr. Brown", "Dr. Davis"], treatments: ["Casting", "Physiotherapy"] },
    Pediatrics: { doctors: ["Dr. Wilson", "Dr. Taylor"], treatments: ["Vaccination", "Checkup", "Flu Shot"] },
    "General Surgery": { doctors: ["Dr. Miller", "Dr. Anderson"], treatments: ["Surgery", "Appendectomy", "Hernia Repair"] },
    "Internal Medicine": { doctors: ["Dr. Thomas", "Dr. Jackson"], treatments: ["Medication", "Blood Test", "Checkup"] },
    Radiology: { doctors: ["Dr. White", "Dr. Harris"], treatments: ["X-ray", "MRI", "CT Scan", "Ultrasound"] },
  };

  useEffect(() => {
    const completed = [department, doctor, treatment].filter(Boolean).length;
    setProgress(Math.round((completed / 3) * 100));
  }, [department, doctor, treatment]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleBack = () => window.location.href = "/";

  const closeDraftModal = () => {
    document.getElementById("draftModal").classList.remove("homeModalShow");
  };

  return (
    <div className="homeContainer">
      {/* Header */}
      <header className="homeHeader">
        <div className="homeHeaderContent">
          <button className="homeBackButton" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <h1 className="homeHeaderTitle">Patient Feedback Form</h1>
          <div className="homeProgressContainer">
            <div className="homeProgressBar">
              <div className="homeProgressFill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="homeProgressText">{progress}% Complete</span>
          </div>
        </div>
      </header>

      <main className="homeMainContent">
        {/* Instructions */}
        <div className="form-instructions minimalist">
          <div className="instructions-title">Feedback Guide</div>
          <div className="instructions-steps">
            <div className="step"><strong>1.</strong> Choose your <strong>Department</strong>, <strong>Doctor</strong>, and <strong>Treatment</strong>.</div>
            <div className="step"><strong>2.</strong> Rate each question using the emoji scale from 😞 to 🤩.</div>
            <div className="step"><strong>3.</strong> Add optional comments to help us improve.</div>
            <div className="step"><strong>4.</strong> You may <strong>Save as Draft</strong> and continue later.</div>
          </div>
        </div>

        {/* Form */}
        <form className="homeFeedbackForm">
          {/* Department */}
          <div className="homeFormSection">
            <label className="homeFormLabel">Which department did you visit? *</label>
            <select className="homeFormSelect" value={department} onChange={e => { setDepartment(e.target.value); setDoctor(""); setTreatment(""); }} required>
              <option value="">Select a department</option>
              {Object.keys(departmentData).map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

         {/* Doctor */}
<div className="homeFormSection">
  <label className="homeFormLabel">Which doctor did you see? *</label>
  <select
    className="homeFormSelect"
    value={doctor}
    onChange={(e) => setDoctor(e.target.value)}
    required
  >
    <option value="">Select a doctor</option>
    {/* Only populate options if a department is selected */}
    {department &&
      departmentData[department].doctors.map((doc) => (
        <option key={doc} value={doc}>
          {doc}
        </option>
      ))}
  </select>
</div>

{/* Treatment */}
<div className="homeFormSection">
  <label className="homeFormLabel">What treatment did you receive? *</label>
  <select
    className="homeFormSelect"
    value={treatment}
    onChange={(e) => setTreatment(e.target.value)}
    required
  >
    <option value="">Select a treatment</option>

    {department &&
      departmentData[department].treatments.map((trt) => (
        <option key={trt} value={trt}>
          {trt}
        </option>
      ))}
  </select>
</div>
          {/* Rating Questions */}
          <div className="homeQuestionsSection" id="questionsSection"></div>

          {/* Doctor Comment */}
          <div className="homeFormSection">
            <label className="homeFormLabel">Would you like to leave a comment about the doctor? (Optional)</label>
            <textarea className="homeFormTextarea" value={doctorComment} onChange={e => setDoctorComment(e.target.value)} rows="4" placeholder="Share your thoughts about the doctor..."></textarea>
          </div>

          {/* Additional Comments */}
          <div className="homeFormSection">
            <label className="homeFormLabel">Additional Comments (Optional)</label>
            <textarea className="homeFormTextarea" value={comment} onChange={handleCommentChange} rows="4" maxLength="500" placeholder="Please share any additional feedback or suggestions..."></textarea>
            <div className="homeCharacterCount">{charCount}/500 characters</div>
          </div>

          {/* Buttons */}
          <div className="homeFormActions">
            <button type="button" className="homeSaveDraftButton">Save Draft</button>
            <button type="submit" className="homeSubmitButton">Submit Feedback</button>
          </div>
        </form>
      </main>

      {/* Modals */}
      <div className="homeModal" id="successModal">
        <div className="homeModalContent">
          <div className="homeSuccessIcon">✔️</div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully. We appreciate your time and input.</p>
          <div className="redirect-message">Redirecting to homepage...</div>
        </div>
      </div>

      <div className="homeModal" id="draftModal">
        <div className="homeModalContent">
          <div className="homeSuccessIcon">💾</div>
          <h2>Draft Saved!</h2>
          <p>Your progress has been saved. You can continue later from where you left off.</p>
          <button className="homeSaveDraftButton" onClick={closeDraftModal}>Continue</button>
        </div>
      </div>
    </div>
  );
}
