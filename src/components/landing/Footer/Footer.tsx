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
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo và mô tả */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex flex-col items-start space-y-3 mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-20 w-auto"
              />
              <span className="text-lg font-semibold">
                Quản lý đại lý
              </span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Hệ thống quản lý đại lý toàn diện giúp doanh nghiệp của bạn phát triển.
            </p>
          </div>

          {/* Các section links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
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
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 Hệ thống quản lý đại lý. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 