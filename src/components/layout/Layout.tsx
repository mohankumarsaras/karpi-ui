import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { EnquiryModal } from '../common/EnquiryModal';

export const Layout: React.FC = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = React.useState(false);
  const [enquiryCourse, setEnquiryCourse] = React.useState('');

  const handleOpenEnquiry = (courseTitle = '') => {
    setEnquiryCourse(courseTitle);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-karpi-bg text-karpi-slate selection:bg-karpi-blue selection:text-white">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('')} />
      <main className="flex-1">
        <Outlet context={{ handleOpenEnquiry }} />
      </main>
      <Footer />
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultCourse={enquiryCourse}
      />
    </div>
  );
};

