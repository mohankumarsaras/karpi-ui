import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { TutorProfileCard } from '../../components/about/TutorProfileCard';
import { useOutletContext, useLocation } from 'react-router-dom';
import { api } from '../../services/api';
import { GalleryItem } from '../../types';
import {
  Target,
  Eye,
  BookOpen,
  ShieldCheck,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  X
} from 'lucide-react';

export const About: React.FC = () => {
  const { handleOpenEnquiry } = useOutletContext<{ handleOpenEnquiry: (course?: string) => void }>();
  const location = useLocation();

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Contact Form state
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await api.getGallery(selectedGalleryCategory || undefined);
        setGalleryItems(data);
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      }
    }
    loadGallery();
  }, [selectedGalleryCategory]);

  useEffect(() => {
    if (location.hash === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactLoading(true);

    try {
      await api.submitContact(contactData);
      setContactSubmitted(true);
      setContactData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: '',
      });
    } catch (err: any) {
      console.error(err);
      setContactError(
        err.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(', ')
            : err.response.data.message
          : 'Failed to send your message. Please check the fields and try again.'
      );
    } finally {
      setContactLoading(false);
    }
  };

  const galleryCategories = [
    'Seminars',
    'Workshops',
    'Training Sessions',
    'Student Participation',
    'Certifications',
  ];

  return (
    <div className="bg-[#030405] text-[#F8FAFC] overflow-x-hidden w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. DARK HEADER BANNER (ABOUT US)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#1E232B] text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3686C4] mb-2 sm:mb-3">
            ABOUT KARPI
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Nurturing Applied Technical Competence for Aspiring IT Engineers
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
            KARPI modernizes computer science learning for college students and graduates through hands-on labs, structured coaching, and real industry engineering practices.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. LIGHT BENTO CONTENT: STORY, MISSION, VALUES, COMPARISON
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#F8FAFC] text-[#030405] py-12 sm:py-20 border-b border-[#E2E2E2] space-y-12 sm:space-y-16">
        {/* Principal Faculty / Lead Mentor Profile */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="LEADERSHIP & MENTORSHIP"
            title="Learn Directly from Industry Veterans"
            subtitle="Real software engineering expertise cultivated over two decades of enterprise engineering and architecture."
          />
          <TutorProfileCard onOpenEnquiry={() => handleOpenEnquiry('Mentorship with Lead Tutor')} />
        </section>

        {/* Story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1656B6]">Our Origin</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#030405] leading-tight">
                Bridging Academic Curricula & Industry Engineering Reality
              </h2>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                Many engineering students graduate with strong theoretical concepts but struggle during technical interviews due to limited project building and cloud deployment experience.
              </p>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                KARPI was created to solve this specific challenge. Our courses prioritize hands-on problem solving, live code reviews, and containerized deployment over slides.
              </p>
              <div className="pt-1 sm:pt-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenEnquiry('College Partnership')}>
                  Partner With Your College
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E2E2E2] aspect-[4/3] bg-slate-900 shadow-subtle">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                  alt="Classroom coaching session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Bento */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E2E2] shadow-subtle">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] border border-[#E2E2E2] text-[#1656B6] flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#030405] mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                To provide accessible, high-quality technical education that equips students with applied coding skills, cloud knowledge, and problem-solving abilities.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E2E2] shadow-subtle">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1F5F9] border border-[#E2E2E2] text-[#0A2460] flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#030405] mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                To be a trusted partner for students, graduates, and educational institutions in building technical confidence and career readiness.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Bento Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Values"
            title="Our Core Values"
            subtitle="The foundational principles guiding every session at KARPI."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E2E2] shadow-subtle">
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#1656B6] flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-[#030405] mb-1.5">Code Over Slides</h4>
              <p className="text-xs text-[#626262] leading-relaxed">
                Concepts are reinforced through active coding exercises and project development.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E2E2] shadow-subtle">
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#1656B6] flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-[#030405] mb-1.5">Authenticity</h4>
              <p className="text-xs text-[#626262] leading-relaxed">
                Clear learning objectives, transparent expectations, and genuine skill assessments.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E2E2] shadow-subtle">
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#1656B6] flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-[#030405] mb-1.5">Student Focus</h4>
              <p className="text-xs text-[#626262] leading-relaxed">
                Supportive instruction and personalized guidance to help learners overcome technical hurdles.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section (Dark-to-Light) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Approach"
            title="What Makes KARPI Different?"
            subtitle="How our applied model contrasts with conventional teaching methods."
          />

          <div className="bg-[#030405] text-[#F8FAFC] rounded-2xl border border-[#1E232B] overflow-hidden text-xs sm:text-sm shadow-bento-dark">
            <div className="grid grid-cols-2 p-3.5 sm:p-5 bg-[#0B0D11] font-bold border-b border-[#1E232B]">
              <span className="text-[#94A3B8]">Conventional IT Training</span>
              <span className="text-[#3686C4]">KARPI Learning</span>
            </div>
            <div className="divide-y divide-[#1E232B]">
              <div className="grid grid-cols-2 p-3.5 sm:p-5">
                <span className="text-[#94A3B8]">Mainly slide-based theoretical presentations</span>
                <span className="text-white font-medium">Hands-on coding labs and live problem walkthroughs</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 sm:p-5">
                <span className="text-[#94A3B8]">Generic, basic code snippets</span>
                <span className="text-white font-medium">End-to-end practical projects and cloud deployment</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 sm:p-5">
                <span className="text-[#94A3B8]">Limited personalized feedback</span>
                <span className="text-white font-medium">Mentor code reviews and debugging assistance</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. GALLERY SECTION (INTEGRATED INTO ABOUT US FOOTER CONTENT)
         ───────────────────────────────────────────────────────────── */}
      <section id="gallery" className="bg-[#0B0D11] text-[#F8FAFC] py-14 sm:py-20 border-b border-[#1E232B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#3686C4] uppercase block">
              ACTIVITIES & WORKSHOPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Life & Learning at KARPI
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Photographs from our college guest seminars, coding workshops, and campus mentoring sessions.
            </p>
          </div>

          {/* Category Chips with smooth scroll on mobile */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            <button
              onClick={() => setSelectedGalleryCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                !selectedGalleryCategory
                  ? 'bg-[#1656B6] text-white'
                  : 'bg-[#101318] text-[#94A3B8] border border-[#1E232B] hover:text-white'
              }`}
            >
              All Photos
            </button>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#1656B6] text-white'
                    : 'bg-[#101318] text-[#94A3B8] border border-[#1E232B] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="bg-[#101318] rounded-2xl overflow-hidden border border-[#1E232B] hover:border-[#3686C4]/60 transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-[#1E232B]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                    <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded bg-[#030405]/90 text-white border border-[#1E232B]">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 line-clamp-1">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-3">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#1E232B] flex items-center justify-between text-[11px] text-[#94A3B8]">
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#3686C4]" />
                        <span className="truncate max-w-[140px] sm:max-w-none">{item.location}</span>
                      </span>
                    )}
                    {item.eventDate && (
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(item.eventDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CONTACT US SECTION (INTEGRATED INTO ABOUT US FOOTER CONTENT)
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#030405] text-[#F8FAFC] py-14 sm:py-20 border-b border-[#1E232B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Details Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0B0D11] text-white rounded-2xl p-5 sm:p-8 border border-[#1E232B] shadow-bento-dark space-y-5 sm:space-y-6">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#3686C4] uppercase block">
                  CONTACT INFORMATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Get in Touch with KARPI</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Our academic counselors, student coordinators, and seminar leads are available for queries and partnerships.
                </p>

                <div className="space-y-3.5 sm:space-y-4 text-xs text-[#94A3B8] pt-1">
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
              <div className="bg-[#0B0D11] rounded-2xl p-5 sm:p-6 border border-[#1E232B]">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1.5">
                  College Seminars & Partnerships
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  To arrange an on-campus seminar, tech symposium talk, or student coding bootcamp for your department, select "College Seminar Request" in the form.
                </p>
              </div>
            </div>

            {/* Form Box */}
            <div className="lg:col-span-7 bg-[#0B0D11] rounded-2xl p-5 sm:p-8 border border-[#1E232B] shadow-bento-dark">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#3686C4] uppercase block mb-1">
                MESSAGE FORM
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs text-[#94A3B8] mb-5 sm:mb-6">
                Fill in your details below and our team will get back to you within 24 hours.
              </p>

              {contactSubmitted ? (
                <div className="py-8 sm:py-10 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Message Sent</h4>
                  <p className="text-xs text-[#94A3B8] max-w-xs mb-5 leading-relaxed">
                    Thank you for reaching out. We have logged your enquiry and our team will get in touch shortly.
                  </p>
                  <Button variant="dark-outline" size="sm" onClick={() => setContactSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5 sm:space-y-4">
                  {contactError && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactData.fullName}
                      onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#1E232B] bg-[#030405] text-white focus:outline-none focus:border-[#3686C4]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#1E232B] bg-[#030405] text-white focus:outline-none focus:border-[#3686C4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#1E232B] bg-[#030405] text-white focus:outline-none focus:border-[#3686C4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#1E232B] bg-[#030405] text-white focus:outline-none focus:border-[#3686C4]"
                    >
                      <option value="General Enquiry">General Learning Enquiry</option>
                      <option value="Course Syllabus & Admissions">Course Syllabus & Admissions</option>
                      <option value="College Seminar Request">College Seminar / Workshop Request</option>
                      <option value="Offline Coaching Batches">Offline Coaching Batches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can our technical mentors assist you?"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#1E232B] bg-[#030405] text-white focus:outline-none focus:border-[#3686C4] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={contactLoading}
                      className="w-full"
                    >
                      {contactLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                          Sending Message...
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
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030405]/90 backdrop-blur-md">
          <div className="relative bg-[#0B0D11] rounded-2xl overflow-hidden max-w-2xl w-full border border-[#1E232B] shadow-bento-dark text-white">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video w-full bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#3686C4]">
                {activeLightbox.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {activeLightbox.title}
              </h3>
              {activeLightbox.caption && (
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  {activeLightbox.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
