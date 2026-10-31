import React, { useState } from 'react';
import { api } from '../../services/api';
import { Button } from '../../components/common/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: '',
      });
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(', ')
            : err.response.data.message
          : 'Failed to send your message. Please check the fields and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#030405] text-[#F8FAFC]">
      {/* Dark Header */}
      <section className="py-14 sm:py-20 border-b border-[#1E232B] text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-3">
            Contact & Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Get in Touch with KARPI
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Reach out with queries about course curricula, batch timings, offline coaching, or on-campus college seminars.
          </p>
        </div>
      </section>

      {/* Light Content Body */}
      <div className="bg-[#F8FAFC] text-[#030405] py-14 sm:py-16 border-b border-[#E2E2E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Dark Details Bento Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#030405] text-white rounded-2xl p-6 sm:p-8 border border-[#1E232B] shadow-bento-dark space-y-6">
                <h3 className="text-xl font-bold">Contact Details</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Our academic counselors and student coordinators are available for guidance.
                </p>

                <div className="space-y-4 text-xs text-[#94A3B8]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#3686C4] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-0.5">Central Hub</strong>
                      <span>Tech Park Hub, Electronic City, Bengaluru, Karnataka, India</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#3686C4] shrink-0" />
                    <div>
                      <strong className="block text-white mb-0.5">Direct Line</strong>
                      <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#3686C4] shrink-0" />
                    <div>
                      <strong className="block text-white mb-0.5">Email Inquiries</strong>
                      <a href="mailto:info@karpi.org" className="hover:text-white transition-colors">info@karpi.org</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#3686C4] shrink-0" />
                    <div>
                      <strong className="block text-white mb-0.5">Operating Hours</strong>
                      <span>Monday - Saturday: 9:00 AM - 7:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* College Seminars Note */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E2E2] shadow-subtle">
                <h4 className="font-bold text-[#030405] text-xs uppercase tracking-wider mb-1.5">
                  College Seminars & Partnerships
                </h4>
                <p className="text-xs text-[#626262] leading-relaxed">
                  To arrange an on-campus seminar, tech talk, or faculty workshop for your students, choose "College Seminar Request" in the form.
                </p>
              </div>
            </div>

            {/* Light Form Box */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E2E2] shadow-subtle">
              <h3 className="text-xl font-bold text-[#030405] mb-1">Send a Message</h3>
              <p className="text-xs text-[#626262] mb-6">
                Fill in your details below and an academic advisor will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[#030405] mb-1">Message Sent</h4>
                  <p className="text-xs text-[#626262] max-w-xs mb-5 leading-relaxed">
                    Thank you for reaching out. We have logged your enquiry and our team will get in touch shortly.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#030405] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#030405] mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#030405] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#030405] mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                    >
                      <option value="General Enquiry">General Learning Enquiry</option>
                      <option value="Course Syllabus & Admissions">Course Syllabus & Admissions</option>
                      <option value="College Seminar Request">College Seminar / Workshop Request</option>
                      <option value="Offline Coaching Batches">Offline Coaching Batches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#030405] mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can our technical mentors assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E2E2E2] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#1656B6] resize-none"
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
