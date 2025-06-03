import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/landing/Header';
import { Footer } from '../../components/landing/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
              Về Chúng Tôi
            </h1>
            <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto font-medium">
              Chúng tôi cung cấp giải pháp quản lý đại lý toàn diện, giúp doanh nghiệp tối ưu hóa 
              quy trình vận hành và nâng cao hiệu quả kinh doanh.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-blue-800 mb-6">Sứ Mệnh</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Chúng tôi cam kết mang đến cho khách hàng những giải pháp công nghệ 
                  tiên tiến nhất để quản lý hệ thống đại lý một cách hiệu quả và minh bạch.
                </p>
                <h2 className="text-4xl font-bold text-blue-800 mb-6">Tầm Nhìn</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Trở thành nhà cung cấp giải pháp quản lý đại lý hàng đầu tại Việt Nam, 
                  góp phần thúc đẩy sự phát triển bền vững của các doanh nghiệp.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/chiphien.webp"
                  alt="Về chúng tôi"
                  className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-blue-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-blue-800 text-center mb-12">
              Tính Năng Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "📊",
                  title: "Báo cáo thông minh",
                  description: "Phân tích dữ liệu chuyên sâu với dashboard trực quan và báo cáo chi tiết."
                },
                {
                  icon: "🔧",
                  title: "Quản lý toàn diện",
                  description: "Từ nhập hàng, xuất hàng đến thanh toán, tất cả trong một hệ thống."
                },
                {
                  icon: "🚀",
                  title: "Hiệu suất cao",
                  description: "Xử lý nhanh chóng với công nghệ hiện đại và giao diện thân thiện."
                },
                {
                  icon: "🔒",
                  title: "Bảo mật tuyệt đối",
                  description: "Dữ liệu được mã hóa và bảo vệ với công nghệ bảo mật tiên tiến."
                },
                {
                  icon: "📱",
                  title: "Responsive Design",
                  description: "Hoạt động mượt mà trên mọi thiết bị từ desktop đến mobile."
                },
                {
                  icon: "⚡",
                  title: "Tích hợp dễ dàng",
                  description: "Kết nối với các hệ thống hiện có một cách đơn giản và hiệu quả."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn quản lý hệ thống đại lý một cách hiệu quả nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all font-semibold text-lg"
              >
                Đăng ký ngay
              </Link>
              <Link
                to="/login"
                className="inline-block px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About; 