"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Save, Send, Check, FileText } from "lucide-react"
import "./Feedback.css"

export default function Feedback() {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    treatment: "",
    ratings: {},
    comment: "",
    doctorComment: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoSaveIndicator, setAutoSaveIndicator] = useState(false)

  const treatmentOptions = {
    "Emergency Department": ["First Aid", "ER Check-up", "Emergency Surgery", "Triage Assessment"],
    Cardiology: ["ECG", "Stress Test", "Echocardiogram", "Cardiology Consultation"],
    Orthopedics: [
      "Fracture Fixation",
      "Joint Injection",
      "Physical Therapy",
      "Casting/Splinting",
      "Orthopedic Consultation",
    ],
    Pediatrics: ["Vaccination", "Child Check-up", "Growth Monitoring", "Well-Baby Check", "Pediatric Consultation"],
    "General Surgery": [
      "Appendectomy",
      "Biopsy",
      "Surgical Consultation",
      "Wound Debridement",
      "Minor Surgical Procedure",
    ],
    "Internal Medicine": [
      "Diabetes Consultation",
      "Hypertension Management",
      "Thyroid Consultation",
      "Chronic Disease Monitoring",
    ],
    Radiology: ["X-ray", "MRI", "CT Scan", "Ultrasound", "Mammography"],
  }

  const doctorOptions = {
    "Emergency Department": ["Dr. Santos", "Dr. Reyes", "Dr. Lopez", "Dr. Vega", "Dr. Tamayo"],
    Cardiology: ["Dr. Cruz", "Dr. Fernando", "Dr. Navarro", "Dr. Ramos", "Dr. Belmonte"],
    Orthopedics: ["Dr. Morales", "Dr. Jimenez", "Dr. Javier", "Dr. Alonzo", "Dr. Villanueva"],
    Pediatrics: ["Dr. Bautista", "Dr. Ramos", "Dr. Santiago", "Dr. Alcaraz", "Dr. Dela Cruz"],
    "General Surgery": ["Dr. Manalo", "Dr. Robles", "Dr. Espino", "Dr. Aquino", "Dr. Trinidad"],
    "Internal Medicine": ["Dr. Salvador", "Dr. Lim", "Dr. Herrera", "Dr. Sandoval", "Dr. Evangelista"],
    Radiology: ["Dr. Yu", "Dr. Ocampo", "Dr. Soriano", "Dr. Rivera", "Dr. Ong"],
  }

  const questions = [
    { id: "1", text: "How would you rate the cleanliness of our facility?", category: "Facility" },
    { id: "2", text: "How satisfied were you with the waiting time?", category: "Service" },
    { id: "3", text: "How would you rate the professionalism of our staff?", category: "Staff" },
    { id: "4", text: "How clear was the communication from medical staff?", category: "Communication" },
    { id: "5", text: "How would you rate your overall experience?", category: "Overall" },
  ]

  const emojis = ["😞", "😐", "😊", "😄", "🤩"]
  const emojiLabels = ["Very Poor", "Poor", "Good", "Very Good", "Excellent"]

  // Calculate progress
  const calculateProgress = useCallback(() => {
    const department = formData.department
    const ratingCount = Object.keys(formData.ratings).length
    const totalSteps = questions.length + 1
    const completedSteps = (department ? 1 : 0) + ratingCount
    return Math.round((completedSteps / totalSteps) * 100)
  }, [formData.department, formData.ratings, questions.length]) // Added questions.length to dependency array

  // Check if form is valid for submission
  const isFormValid =
    formData.department && formData.doctor && formData.treatment && Object.keys(formData.ratings).length > 0

  // Auto-save functionality
  const autoSave = useCallback(() => {
    const draftData = {
      ...formData,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("hospitalFeedbackDraft", JSON.stringify(draftData))
    setAutoSaveIndicator(true)
    setTimeout(() => setAutoSaveIndicator(false), 2000)
  }, [formData])

  // Load draft on component mount
  useEffect(() => {
    const draftData = localStorage.getItem("hospitalFeedbackDraft")
    if (draftData) {
      try {
        const draft = JSON.parse(draftData)
        setFormData(draft)
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }, [])

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 30000)
    return () => clearInterval(interval)
  }, [autoSave])

  const handleDepartmentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
      doctor: "",
      treatment: "",
    }))
  }

  const handleRating = (questionId, rating) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [questionId]: rating,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const feedback = JSON.parse(localStorage.getItem("hospitalFeedback")) || []
      const newFeedback = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString(),
      }
      feedback.push(newFeedback)
      localStorage.setItem("hospitalFeedback", JSON.stringify(feedback))
      localStorage.removeItem("hospitalFeedbackDraft")

      setIsSubmitting(false)
      setShowSuccessModal(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "/"
      }, 3000)
    }, 1500)
  }

  const saveDraft = () => {
    autoSave()
    setShowDraftModal(true)
  }

  const progress = calculateProgress()

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button onClick={() => window.history.back()} className="back-button">
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="header-title">Patient Feedback Form</h1>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Instructions */}
        <div className="form-instructions">
          <div className="instructions-title">Feedback Guide</div>
          <div className="instructions-steps">
            <div className="step">
              <strong>1.</strong> Choose your <strong>Department</strong>, <strong>Doctor</strong>, and{" "}
              <strong>Treatment</strong>.
            </div>
            <div className="step">
              <strong>2.</strong> Rate each question using the emoji scale from 😞 to 🤩.
            </div>
            <div className="step">
              <strong>3.</strong> Add optional comments to help us improve.
            </div>
            <div className="step">
              <strong>4.</strong> You may <strong>Save as Draft</strong> and continue later.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Department Selection */}
          <div className="form-section">
            <label className="form-label">Which department did you visit? *</label>
            <select
              value={formData.department}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select a department</option>
              {Object.keys(doctorOptions).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Selection */}
          <div className="form-section">
            <label className="form-label">Which doctor did you see? *</label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData((prev) => ({ ...prev, doctor: e.target.value }))}
              className="form-select"
              required
              disabled={!formData.department}
            >
              <option value="">Select a doctor</option>
              {formData.department &&
                doctorOptions[formData.department]?.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
            </select>
          </div>

          {/* Treatment Selection */}
          <div className="form-section">
            <label className="form-label">What treatment did you receive? *</label>
            <select
              value={formData.treatment}
              onChange={(e) => setFormData((prev) => ({ ...prev, treatment: e.target.value }))}
              className="form-select"
              required
              disabled={!formData.department}
            >
              <option value="">Select a treatment</option>
              {formData.department &&
                treatmentOptions[formData.department]?.map((treatment) => (
                  <option key={treatment} value={treatment}>
                    {treatment}
                  </option>
                ))}
            </select>
          </div>

          {/* Rating Questions */}
          <div className="questions-section">
            {questions.map((question) => (
              <div key={question.id} className="question-item">
                <h3 className="question-text">{question.text}</h3>
                <div className="rating-options">
                  {emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleRating(question.id, idx + 1)}
                      className={`rating-button ${formData.ratings[question.id] === idx + 1 ? "selected" : ""}`}
                    >
                      {emoji}
                      <div className="rating-tooltip">{emojiLabels[idx]}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Doctor Comment */}
          <div className="form-section">
            <label className="form-label">Would you like to leave a comment about the doctor? (Optional)</label>
            <textarea
              value={formData.doctorComment}
              onChange={(e) => setFormData((prev) => ({ ...prev, doctorComment: e.target.value }))}
              placeholder="Share your thoughts about the doctor..."
              rows={4}
              className="form-textarea"
              id="pediatricianComment"
            />
          </div>

          {/* Additional Comments */}
          <div className="form-section">
            <label className="form-label">Additional Comments (Optional)</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Please share any additional feedback or suggestions..."
              rows={4}
              maxLength={500}
              className="form-textarea"
            />
            <div
              className={`character-count ${formData.comment.length > 400 ? "error" : formData.comment.length > 300 ? "warning" : ""}`}
            >
              {formData.comment.length}/500 characters
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={saveDraft} className="save-draft-button" disabled={isSubmitting}>
              <Save size={20} />
              Save Draft
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`submit-button ${isSubmitting ? "loading" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Auto-save Indicator */}
      <div className={`auto-save-indicator ${autoSaveIndicator ? "show" : ""}`}>Draft saved</div>

      {/* Success Modal */}
      <div className={`modal ${showSuccessModal ? "show" : ""}`}>
        <div className="modal-content">
          <div className="success-icon">
            <Check size={32} />
          </div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully. We appreciate your time and input.</p>
          <div className="redirect-message">Redirecting to homepage...</div>
        </div>
      </div>

      {/* Draft Saved Modal */}
      <div className={`modal ${showDraftModal ? "show" : ""}`}>
        <div className="modal-content">
          <div className="draft-icon">
            <FileText size={32} />
          </div>
          <h2>Draft Saved!</h2>
          <p>Your progress has been saved. You can continue later from where you left off.</p>
          <button onClick={() => setShowDraftModal(false)} className="close-modal-button">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
