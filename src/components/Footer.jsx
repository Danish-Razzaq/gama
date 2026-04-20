import React from 'react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white dark:bg-[#030610] border-t border-gray-200 dark:border-gray-800 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0A192F] dark:text-white">
                Gama<span className="text-[#FF6B00]">Suite</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              The operating system for modern freight forwarders. Elevate your customer experience today.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer group">
                <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer group">
                <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['Features', 'Integrations', 'Security', 'Pricing'].map(l => <li key={l}><a href="#" className="hover:text-[#FF6B00] transition-colors">{l}</a></li>)}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(l => <li key={l}><a href="#" className="hover:text-[#FF6B00] transition-colors">{l}</a></li>)}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>1-800-GAMA-NOW</li>
              <li>hello@gamasuite.com</li>
              <li>100 Tech Hub Blvd, Suite 400<br/>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 GamaSuite. All rights reserved.</p>
          <button onClick={scrollToTop} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#FF6B00] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
