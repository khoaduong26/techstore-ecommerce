import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { formatVND } from '../../data/products';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export default function CheckoutView() {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    user,
    placeOrder,
    navigateTo
  } = useShop();

  const [fullName, setFullName] = useState(user?.name || 'Nguyễn Văn A');
  const [phone, setPhone] = useState(user?.phone || '0988 123 456');
  const [email, setEmail] = useState(user?.email || 'nguyenvana@gmail.com');
  const [city, setCity] = useState(user?.city || 'TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');
  const [address, setAddress] = useState(user?.address || 'Số 45, Đường Lê Duẩn, Phường Bến Nghé');
  const [note, setNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' | 'QR' | 'MOMO' | 'CARD'

  // VAT invoice checkbox
  const [needVat, setNeedVat] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }

    const orderData = {
      fullName,
      phone,
      email,
      city,
      district,
      address,
      note,
      paymentMethod,
      needVat,
      vat: needVat ? { companyName, taxCode, companyAddress } : null
    };

    placeOrder(orderData);
  };

  if (cart.length === 0) {
    navigateTo('cart');
    return null;
  }

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigateTo('cart')}
            className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 mb-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại giỏ hàng</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Thanh Toán &amp; Đặt Hàng
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
          <Lock className="w-5 h-5 text-emerald-600" />
          <span>Thanh toán bảo mật SSL 256-bit</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Info & Payment Methods */}
        <div className="lg:col-span-8 space-y-7">
          {/* Step 1: Delivery Address */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>Thông tin người nhận hàng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Họ và tên người nhận *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Số điện thoại liên lạc *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Email nhận hóa đơn điện tử &amp; mã vận đơn *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Tỉnh / Thành phố *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Quận / Huyện *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Địa chỉ số nhà, tên đường chi tiết *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Số 45 Lê Duẩn, Phường Bến Nghé"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Ghi chú giao hàng (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Giao vào giờ hành chính, gọi trước khi đến 15 phút"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Electronic VAT invoice checkbox */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-slate-900">
                <input
                  type="checkbox"
                  checked={needVat}
                  onChange={(e) => setNeedVat(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded-lg border-slate-300"
                />
                <span>Yêu cầu xuất hóa đơn GTGT điện tử cho Doanh nghiệp / Công ty</span>
              </label>

              {needVat && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Tên công ty / Đơn vị</label>
                    <input
                      type="text"
                      placeholder="Công ty TNHH Công Nghệ..."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Mã số thuế (MST)</label>
                    <input
                      type="text"
                      placeholder="0108928392"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Địa chỉ đăng ký kinh doanh</label>
                    <input
                      type="text"
                      placeholder="Địa chỉ trụ sở công ty"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Payment Methods */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>Chọn phương thức thanh toán</span>
            </h3>

            <div className="space-y-3.5">
              {/* Option 1: COD */}
              <label
                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    Thanh toán bằng tiền mặt khi nhận hàng (COD)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Khách hàng kiểm tra hàng nguyên seal tem trước khi thanh toán tiền mặt cho shipper. Miễn phí thu hộ.
                  </p>
                </div>
              </label>

              {/* Option 2: VietQR */}
              <label
                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'QR'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="QR"
                  checked={paymentMethod === 'QR'}
                  onChange={() => setPaymentMethod('QR')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    Chuyển khoản Ngân hàng qua mã VietQR (Tự động 24/7)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Quét mã QR từ mọi ứng dụng ngân hàng (Vietcombank, MB, Techcombank...). Hệ thống xác nhận giao dịch tự động trong 3 giây.
                  </p>
                </div>
              </label>

              {/* Option 3: MoMo / VNPay */}
              <label
                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'MOMO'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="MOMO"
                  checked={paymentMethod === 'MOMO'}
                  onChange={() => setPaymentMethod('MOMO')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    Ví điện tử MoMo / Cổng thanh toán VNPAY-QR
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Thanh toán nhanh chóng và hưởng thêm voucher hoàn tiền trực tiếp từ ví điện tử đối tác.
                  </p>
                </div>
              </label>

              {/* Option 4: Card */}
              <label
                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    Thẻ quốc tế Visa, MasterCard, JCB hoặc Thẻ ATM Nội địa
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Hỗ trợ xác thực bảo mật 3D-Secure One-Time-Password của ngân hàng phát hành thẻ.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Preview & Submit */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100">
              Kiện Hàng ({cart.length} món)
            </h3>

            {/* Items mini list */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 flex items-center gap-3.5">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-14 h-14 object-contain bg-slate-50 rounded-2xl p-1.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      SL: {item.quantity} × {formatVND(item.product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-slate-900 tabular-nums shrink-0">
                    {formatVND(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính hàng:</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatVND(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Giảm giá voucher:</span>
                  <span className="tabular-nums">-{formatVND(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="font-extrabold text-emerald-600">MIỄN PHÍ</span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-slate-900 block">Tổng thanh toán:</span>
                  <span className="text-xs text-slate-400 font-medium">Đã bao gồm VAT 10%</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums">
                  {formatVND(cartTotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer mt-5"
            >
              <span>XÁC NHẬN ĐẶT HÀNG</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 space-y-1.5 border border-slate-100">
              <p className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Cam kết quyền lợi khách hàng
              </p>
              <p className="leading-relaxed">Bạn được kiểm tra hàng trước khi nhận, bảo hành 1 đổi 1 trong 30 ngày nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
