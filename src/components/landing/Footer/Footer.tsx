import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Tính năng', href: '#' },
      { label: 'Bảng giá', href: '#' },
      { label: 'Hướng dẫn', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Đối tác', href: '#' },
      { label: 'Tuyển dụng', href: '#' },
    ],
  },
  {
    title: 'Liên hệ',
    links: [
      { label: 'support@example.com', href: 'mailto:support@example.com' },
      { label: '0123 456 789', href: 'tel:0123456789' },
      { label: 'Địa chỉ văn phòng', href: '#' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white py-16 px-6 rounded-t-3xl shadow-2xl ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo và mô tả */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex flex-col items-start space-y-3 mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-24 w-auto drop-shadow-xl"
              />
              <span className="text-2xl font-extrabold text-white">Quản lý đại lý</span>
            </Link>
            <p className="text-cyan-100 text-base mt-2 font-medium">
              Hệ thống quản lý đại lý toàn diện giúp doanh nghiệp của bạn phát triển.
            </p>
          </div>

          {/* Các section links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4 text-cyan-200 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-cyan-100 hover:text-white font-semibold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-cyan-700 mt-12 pt-8 text-center text-cyan-200">
          <p className="font-medium">© 2024 Hệ thống quản lý đại lý. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;