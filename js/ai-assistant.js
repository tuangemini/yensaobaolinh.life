/**
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU - YẾN SÀO BẢO LINH
 * Tuân thủ kỹ năng Brand Assistant Integrator
 * Kết nối song song DeepSeek & Google Gemini + Bộ nhớ dự phòng thông minh 3 lớp
 */
(function () {
  'use strict';

  // API Keys (Base64 mã hóa)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'Yến Sào Bảo Linh',
    foundedYear: 2017,
    founder: 'Anh Hùng',
    hotline: '0974 002 626',
    address: '164 Nguyễn Công Trứ, Phường Cam Nghĩa, TP. Cam Ranh, Tỉnh Khánh Hòa',
    mapsUrl: 'https://maps.app.goo.gl/ZVeX6JNn2JimF6246',
    fabTitle: 'Hỏi Yến Sào Bảo Linh',
    fabSub: 'Tư vấn chọn yến & giá gốc 24/7',
    fabBadge: 'Sẵn Sàng',
    avatarIcon: '🪶',
    subHeader: 'Đại diện chính thức • Tư vấn tận tâm 24/7',
    footerNote: 'Yến Sào Bảo Linh • Cam kết 100% Yến Thật Từ 2017',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-2.5-flash'
  };

  // KHO TRI THỨC ĐẠI DIỆN THƯƠNG HIỆU
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện tư vấn chính thức, niềm nở, uy tín và chuyên nghiệp của thương hiệu "Yến Sào Bảo Linh".

THÔNG TIN THƯƠNG HIỆU CHÍNH THỨC:
- Tên thương hiệu: Yến Sào Bảo Linh.
- Lịch sử ra đời: Thành lập từ năm 2017 (hơn 7 năm kinh nghiệm nuôi, khai thác và phân phối yến sào chuẩn gốc Cam Ranh - Khánh Hòa).
- Người sáng lập & phụ trách kỹ thuật: Anh Hùng - Chủ hệ thống nhà yến Bảo Linh.
- Địa chỉ cơ sở: 164 Nguyễn Công Trứ, Phường Cam Nghĩa, Thành phố Cam Ranh, Tỉnh Khánh Hòa (Link Google Maps: https://maps.app.goo.gl/ZVeX6JNn2JimF6246).
- Số điện thoại Hotline & Zalo: 0974 002 626 (Hỗ trợ 24/7).
- Khẩu hiệu: Tinh hoa yến sào thiên nhiên Khánh Hòa - Trọn vẹn dinh dưỡng tận gốc nhà nuôi.

CÁC DÒNG SẢN PHẨM & BÁO GIÁ THAM KHẢO:
1. Tổ Yến Tinh Chế Thượng Hạng:
   - Hộp 50g: ~2.200.000 VNĐ (5-6 tai).
   - Hộp 100g: ~4.200.000 VNĐ (10-12 tai).
   - Đặc điểm: Sạch 100% lông và tạp chất, sấy lạnh tiệt trùng khép kín, nở gấp 4-6 lần, sợi dày dai giòn.
2. Tổ Yến Thô Nguyên Tổ Khánh Hòa:
   - Hộp 50g: ~1.750.000 VNĐ.
   - Hộp 100g: ~3.300.000 VNĐ.
   - Đặc điểm: Hái trực tiếp từ vách gỗ nhà yến, nguyên vẹn mùi thơm tự nhiên và vi chất, tai dày già ít lông. Tặng kèm nhíp gắp chuyên dụng.
3. Hộp Quà Biếu Cao Cấp Hoàng Gia:
   - Giá: Từ 2.600.000 VNĐ (hộp 50g) đến 4.850.000 VNĐ (hộp 100g VIP).
   - Thiết kế đỏ nhung và viền vàng kim hoàng gia của Bảo Linh, tặng thố sứ tráng men, táo đỏ, hạt sen, đường phèn, đông trùng hạ thảo.
4. Yến Rút Lông Định Hình Xuất Khẩu:
   - Hộp 50g: ~2.700.000 VNĐ.
   - Hộp 100g: ~5.200.000 VNĐ.
   - Phương pháp rút lông khô giữ nguyên dáng tổ gốc 99%, chuẩn xuất khẩu.
5. Chân Tổ Yến Tinh Chế:
   - Hộp 50g: ~1.900.000 VNĐ | Hộp 100g: ~3.600.000 VNĐ.
   - Chân yến giòn sần sật, đậm vị, cực kỳ giàu vi chất.

CHÍNH SÁCH BÁN HÀNG & CAM KẾT:
- Cam kết 100% tổ yến nguyên chất thiên nhiên thu hoạch trực tiếp từ hệ thống nhà yến của Anh Hùng tại Cam Ranh.
- Hoàn tiền 200% nếu phát hiện yến giả, yến độn mủ trôm, rau câu, hóa chất hay đường tẩy trắng.
- Giao hàng toàn quốc hỏa tốc. Khách hàng ĐƯỢC KIỂM TRA HÀNG kỹ lưỡng trước khi thanh toán (đồng kiểm).
- Miễn phí vận chuyển cho đơn hàng từ 100g.

CÁCH DÙNG & CHƯNG YẾN ĐÚNG CÁCH:
- Ngâm nước tinh khiết 20-30 phút cho nở mềm đều (chân yến 40-50 phút).
- Chưng cách thủy lửa nhỏ liu riu trong 20-25 phút với nước tinh khiết ngập yến.
- Cho đường phèn, táo đỏ, hạt sen, gừng vào trước khi tắt bếp 5 phút.
- Thời điểm dùng tốt nhất: Buổi sáng lúc đói bụng hoặc buổi tối trước khi đi ngủ 1 tiếng.
- Liều lượng: Người lớn 3-5g/lần (2-3 lần/tuần); Trẻ em 1.5-2g/lần; Người già/người ốm 3g/lần.

QUY TẮC BẮT BUỘC KHI GIAO TIẾP:
1. Xưng hô lịch sự, lễ phép: 'Dạ, Yến Sào Bảo Linh xin chào Quý khách...', 'Dạ thưa Quý khách...'.
2. TUYỆT ĐỐI KHÔNG xưng là AI, chatbot, trí tuệ nhân tạo, DeepSeek hay Gemini. Luôn nhận mình là người đại diện tư vấn của Yến Sào Bảo Linh.
3. Khi khách hỏi giá hoặc muốn đặt mua, hãy tư vấn tận tâm và kèm số Hotline/Zalo: 0974 002 626 để được phục vụ chu đáo nhất.
4. Trả lời súc tích, ngắt đoạn rõ ràng, dùng gạch đầu dòng để khách hàng dễ đọc trên điện thoại.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ, xin kính chào Quý khách! **Yến Sào Bảo Linh** rất hân hạnh được đón tiếp Quý khách. Chúng tôi là cơ sở nuôi và khai thác yến sào nguyên chất tại Cam Ranh - Khánh Hòa từ năm 2017.\n\nQuý khách đang muốn tìm hiểu về **yến tinh chế**, **yến thô nguyên tổ**, **hộp quà biếu** hay cần hướng dẫn cách chưng yến tẩm bổ sức khỏe ạ?`
    }
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>')
      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  }

  // Fallback engine cục bộ thông minh khi mất kết nối mạng
  function getSmartFallbackReply(query) {
    const q = query.toLowerCase();

    if (q.includes('giá') || q.includes('nhiêu tiền') || q.includes('bảng giá') || q.includes('cost') || q.includes('price')) {
      return `Dạ, **Yến Sào Bảo Linh** xin gửi Quý khách bảng giá tham khảo trực tiếp từ nhà yến:\n- **Tổ Yến Tinh Chế Thượng Hạng**: 2.200.000đ/50g - 4.200.000đ/100g\n- **Tổ Yến Thô Khánh Hòa**: 1.750.000đ/50g - 3.300.000đ/100g\n- **Hộp Quà Biếu Hoàng Kim**: từ 2.600.000đ - 4.850.000đ/set VIP\n- **Yến Rút Lông Xuất Khẩu**: 2.700.000đ/50g - 5.200.000đ/100g\n- **Chân Yến Tinh Chế Giòn Sần Sật**: 1.900.000đ/50g - 3.600.000đ/100g\n\nTất cả đơn hàng đều được tặng kèm bộ đường phèn, táo đỏ, hạt sen và thố chưng.\nQuý khách liên hệ hotline/Zalo <strong class="phone-single-line" style="color: #9e0b0f;">0974 002 626</strong> để nhận thêm ưu đãi đặc biệt hôm nay ạ!`;
    }

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('cửa hàng') || q.includes('vị trí') || q.includes('map')) {
      return `Dạ, cơ sở **Yến Sào Bảo Linh** tọa lạc tại:\n📍 **Địa chỉ**: 164 Nguyễn Công Trứ, Phường Cam Nghĩa, Thành phố Cam Ranh, Tỉnh Khánh Hòa.\n🗺️ Quý khách có thể xem đường đi chi tiết trên Google Maps: [Xem trên Google Maps](https://maps.app.goo.gl/ZVeX6JNn2JimF6246)\n📞 Hotline liên hệ: <strong class="phone-single-line" style="color: #9e0b0f;">0974 002 626</strong>.\nChúng tôi luôn hoan nghênh Quý khách ghé thăm trải nghiệm trực tiếp ạ!`;
    }

    if (q.includes('chưng') || q.includes('cách nấu') || q.includes('cách dùng') || q.includes('ngâm') || q.includes('bao lâu')) {
      return `Dạ, **Cách chưng yến chuẩn vị Bảo Linh** giữ trọn vi chất:\n1. **Ngâm yến**: Ngâm nước tinh khiết 20 - 30 phút cho sợi tơi nở đều (không ngâm nước nóng).\n2. **Chưng cách thủy**: Cho yến vào thố sứ có nắp, đổ nước ngập yến, chưng cách thủy lửa nhỏ trong 20 - 25 phút.\n3. **Thêm gia vị**: Trước khi tắt bếp 5 phút, thêm đường phèn, táo đỏ, hạt sen đã hấp chín và 1-2 lát gừng mỏng khử tanh.\n*Thời điểm ăn yến tốt nhất là buổi sáng sớm hoặc buổi tối trước khi đi ngủ 1 tiếng Quý khách nhé!*`;
    }

    if (q.includes('thật giả') || q.includes('phân biệt') || q.includes('pha') || q.includes('tẩy')) {
      return `Dạ, **Yến Sào Bảo Linh** xin chia sẻ cách nhận biết yến thật nguyên chất:\n- **Yến thật**: Có mùi tanh nhẹ đặc trưng của lòng trắng trứng gà, ngâm nở gấp 4-6 lần, sợi yến dai trong veo, nước ngâm trong vắt.\n- **Yến giả/độn**: Thường có mùi tanh nồng hóa chất, khi ngâm dễ bị nhão nát, nước ngâm bị đục hoặc ngọt do ngâm tẩm đường.\n\n🛡️ Bảo Linh cam kết 100% yến thật nguyên chất từ nhà nuôi tại Cam Ranh từ năm 2017, đền bù gấp 200% nếu phát hiện tạp chất ạ!`;
    }

    if (q.includes('anh hùng') || q.includes('chủ') || q.includes('2017') || q.includes('nguồn gốc') || q.includes('lịch sử')) {
      return `Dạ, **Yến Sào Bảo Linh** ra đời từ năm **2017** tại Cam Ranh - Khánh Hòa, do **Anh Hùng** sáng lập và trực tiếp quản lý kỹ thuật hệ thống nhà yến. Với hơn 7 năm kinh nghiệm, chúng tôi cam kết mang tổ yến tận gốc từ vách gỗ nhà yến tới tay người tiêu dùng, bảo toàn trọn vẹn chất lượng cao cấp nhất!`;
    }

    if (q.includes('ship') || q.includes('giao hàng') || q.includes('vận chuyển') || q.includes('đặt hàng')) {
      return `Dạ, **Yến Sào Bảo Linh** giao hàng hỏa tốc toàn quốc. Quý khách hoàn toàn an tâm vì được **MỞ HỘP KIỂM TRA HÀNG** trước khi thanh toán. Đơn hàng từ 100g được MIỄN PHÍ SHIP toàn quốc. Quý khách có thể để lại số điện thoại hoặc nhắn tin Zalo **0974 002 626** để được lên đơn ngay ạ!`;
    }

    return `Dạ cảm ơn Quý khách đã quan tâm đến **Yến Sào Bảo Linh**! Để được tư vấn chi tiết nhất theo nhu cầu tẩm bổ (cho trẻ em, người già, mẹ bầu hay làm quà biếu VIP), Quý khách vui lòng gọi ngay Hotline/Zalo: **0974 002 626** hoặc đặt câu hỏi trực tiếp tại đây, chúng tôi luôn sẵn sàng hỗ trợ ạ!`;
  }

  // API Callers
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseekModel,
        messages: formatted,
        temperature: 0.6,
        max_tokens: 800
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('DeepSeek error: ' + res.status);
    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 800 }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Gemini error: ' + res.status);
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  async function fetchConsultation(userText) {
    chatHistory.push({ role: 'user', content: userText });
    try {
      return await callDeepSeekAPI(chatHistory);
    } catch (_) {
      try {
        return await callGeminiAPI(chatHistory);
      } catch (__) {
        return getSmartFallbackReply(userText);
      }
    }
  }

  function renderWidget() {
    if (document.querySelector('.brand-fab-launcher')) return;

    // Nút nổi FAB
    const fab = document.createElement('div');
    fab.className = 'brand-fab-launcher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="brand-fab-icon-box">
        <span class="brand-fab-pulse"></span>
        <span class="brand-fab-icon">${CONFIG.avatarIcon}</span>
      </div>
      <div class="brand-fab-text">
        <span class="brand-fab-title">${CONFIG.fabTitle}</span>
        <span class="brand-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="brand-fab-badge">${CONFIG.fabBadge}</span>
    `;

    // Cửa sổ Chat
    const chatWin = document.createElement('div');
    chatWin.className = 'brand-chat-window';
    chatWin.setAttribute('aria-hidden', 'true');
    chatWin.innerHTML = `
      <div class="brand-chat-header">
        <div class="brand-chat-profile">
          <div class="brand-avatar">
            <span>${CONFIG.avatarIcon}</span>
            <span class="brand-online-dot"></span>
          </div>
          <div class="brand-profile-meta">
            <div class="brand-title">${CONFIG.brandName}</div>
            <span class="brand-status-text">${CONFIG.subHeader}</span>
          </div>
        </div>
        <div class="brand-header-actions">
          <button class="brand-icon-btn" id="btnBrandClear" title="Làm mới cuộc trò chuyện">🔄</button>
          <button class="brand-icon-btn" id="btnBrandClose" title="Thu nhỏ">✕</button>
        </div>
      </div>

      <div class="brand-suggestion-chips" id="brandSuggestionChips">
        <button type="button" class="brand-chip" data-query="Bảng giá các loại tổ yến Bảo Linh">💰 Bảng giá yến</button>
        <button type="button" class="brand-chip" data-query="Hướng dẫn cách chưng yến ngon giữ trọn dưỡng chất">🥣 Cách chưng yến</button>
        <button type="button" class="brand-chip" data-query="Địa chỉ nhà yến Bảo Linh ở đâu và liên hệ thế nào?">📍 Địa chỉ & Hotline</button>
        <button type="button" class="brand-chip" data-query="Cách phân biệt yến thật và yến tẩm đường phụ gia?">🔍 Nhận biết yến thật</button>
      </div>

      <div class="brand-chat-body" id="brandChatBody">
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      </div>

      <div class="brand-chat-footer">
        <form class="brand-input-form" id="brandChatForm">
          <textarea class="brand-input-field" id="brandInputField" rows="1" placeholder="Nhập câu hỏi bạn cần tư vấn..."></textarea>
          <button type="submit" class="brand-send-btn" id="brandSendBtn" aria-label="Gửi câu hỏi">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
        <div class="brand-footer-note">${CONFIG.footerNote}</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Event binding
    const chatBody = document.getElementById('brandChatBody');
    const inputField = document.getElementById('brandInputField');
    const form = document.getElementById('brandChatForm');
    const btnClose = document.getElementById('btnBrandClose');
    const btnClear = document.getElementById('btnBrandClear');
    const chips = document.querySelectorAll('.brand-chip');

    function toggleChat(forceOpen) {
      const isOpen = forceOpen !== undefined ? forceOpen : !chatWin.classList.contains('open');
      chatWin.classList.toggle('open', isOpen);
      chatWin.setAttribute('aria-hidden', !isOpen);
      if (isOpen) {
        setTimeout(() => inputField.focus(), 200);
      }
    }

    // Mở khi click FAB
    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    // Nút làm mới
    btnClear.addEventListener('click', () => {
      chatHistory = [chatHistory[0]];
      chatBody.innerHTML = `
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      `;
    });

    // Suggestion Chips
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          sendUserMessage(query);
        }
      });
    });

    // Auto-resize textarea
    inputField.addEventListener('input', () => {
      inputField.style.height = 'auto';
      inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
    });

    // Enter to send (Shift + Enter for new line)
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    async function sendUserMessage(txt) {
      if (!txt || !txt.trim()) return;
      const cleanText = txt.trim();
      inputField.value = '';
      inputField.style.height = 'auto';

      // 1. Thêm tin nhắn của User
      const userDiv = document.createElement('div');
      userDiv.className = 'brand-msg user';
      userDiv.innerHTML = `<div class="brand-msg-bubble">${formatMarkdown(cleanText)}</div>`;
      chatBody.appendChild(userDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // 2. Thêm hiệu ứng gõ phím / đang tìm câu trả lời
      const typingDiv = document.createElement('div');
      typingDiv.className = 'brand-msg bot typing-indicator';
      typingDiv.innerHTML = `
        <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
        <div class="brand-msg-bubble">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      `;
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // 3. Gọi dịch vụ
      const reply = await fetchConsultation(cleanText);
      typingDiv.remove();

      // 4. Thêm tin nhắn phản hồi
      const botDiv = document.createElement('div');
      botDiv.className = 'brand-msg bot';
      botDiv.innerHTML = `
        <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
        <div class="brand-msg-bubble">${formatMarkdown(reply)}</div>
      `;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendUserMessage(inputField.value);
    });

    // Expose global API để website có thể trigger hỏi tư vấn từ nút bất kỳ
    window.askBaoLinh = function (topic) {
      toggleChat(true);
      if (topic) {
        sendUserMessage(topic);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWidget);
  } else {
    renderWidget();
  }
})();
