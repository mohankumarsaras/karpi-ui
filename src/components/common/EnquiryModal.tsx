import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { Button } from './Button';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCourse = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeOrInstitution: '',
    interestedCourse: defaultCourse,
    preferredLearningMode: 'Online Live',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, interestedCourse: defaultCourse }));
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.submitEnquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(', ')
            : err.response.data.message
          : 'Unable to submit enquiry. Please verify your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030405]/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-bento-dark relative max-h-[90vh] overflow-y-auto border border-[#E2E2E2] text-[#030405]">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-[#030405] rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#030405] mb-1">Enquiry Submitted</h3>
            <p className="text-[#626262] text-xs max-w-xs mb-5 leading-relaxed">
              Thank you, <strong className="text-[#030405]">{formData.fullName}</strong>. Our academic team will contact you within 24 hours.
            </p>
            <Button variant="primary" size="sm" onClick={handleResetAndClose}>
              Done
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1656B6]">Course & Batch Enquiry</span>
              <h3 className="text-xl font-extrabold text-[#030405] mt-0.5">
                Register Your Interest
              </h3>
              <p className="text-xs text-[#626262] mt-1">
                Provide your details to receive syllabus, fee details, and batch timings.
              </p>
            </div>

            {error && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#030405] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#030405] mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#030405] mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#030405] mb-1">
                    College / Degree
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BE / BCA"
                    value={formData.collegeOrInstitution}
                    onChange={(e) => setFormData({ ...formData, collegeOrInstitution: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#030405] mb-1">
                    Preferred Mode
                  </label>
                  <select
                    value={formData.preferredLearningMode}
                    onChange={(e) => setFormData({ ...formData, preferredLearningMode: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                  >
                    <option value="Online Live">Online Live</option>
                    <option value="Offline Classroom">Offline Coaching</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#030405] mb-1">
                  Interested Track
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Full-Stack Engineering, AWS"
                  value={formData.interestedCourse}
                  onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#030405] mb-1">
                  Notes or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Questions about schedule, prerequisites, or fees..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6] resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Submit Course Enquiry
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
