(function() {
  const navMount = document.getElementById('site-nav');
  if (!navMount) return;

  // --- 1. 狀態判定與路徑修正 ---
  const path = location.pathname.split('/').pop() || 'index.html';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isInHtmlFolder = window.location.pathname.includes('/html/');
  const rootPath = isInHtmlFolder ? '../' : './'; 

  // --- 2. 注入導覽列 (新增漢堡按鈕) ---
  navMount.innerHTML = `
    <nav id="site-nav-inner">
      <div class="nav-wrap">
        <a class="logo" href="${rootPath}${isLoggedIn ? 'index.html' : 'homepage.html'}">碳 Bee</a>
        
        <button id="mobile-menu-btn" aria-label="選單">
            <svg width="24" height="24" fill="none" stroke="#064e3b" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <div class="nav-right">
          <div class="links" id="nav-links">
            <a href="${rootPath}index.html">首頁</a>
            <a href="${rootPath}html/ai_route.html">AI 推薦</a>
            <a href="${rootPath}html/tasks.html">任務</a>
            <a href="${rootPath}html/achievements.html">成就</a>
            <a href="${rootPath}html/rewards.html">商城</a>
            <a href="${rootPath}html/game.html">遊戲</a>
            <a href="${rootPath}html/member.html">會員</a>
          </div>
          ${!isLoggedIn ? `
            <a href="${rootPath}html/auth.html" class="nav-user-icon" title="登入/註冊">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>
    </nav>

    <div id="marquee" class="marquee-container">
        <div class="marquee-text">
            限時活動：週末減碳進度雙倍提升！點擊「減碳行動」快速孵化！ | 新加入好友立即贈送 50 碳幣！ | 每日簽到可領取隨機神秘蛋！
        </div>
    </div>

    <div id="login-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;">
      <div style="background:white; padding:35px; border-radius:24px; text-align:center; max-width:340px; box-shadow:0 20px 50px rgba(0,0,0,0.2); font-family:sans-serif;">
        <div style="font-size:50px; margin-bottom:15px;">🐝</div>
        <h3 style="margin:0 0 12px 0; color:#064e3b; font-size:1.4rem;">尚未登入</h3>
        <p style="margin:0 0 25px 0; color:#6b7280; font-size:15px; line-height:1.6;">目前為訪客模式，請先登入以開啟個人化減碳追蹤與獎勵功能！</p>
        <div style="display:flex; gap:12px;">
          <button id="closeModalBtn" style="flex:1; background:#f3f4f6; border:none; padding:12px; border-radius:12px; cursor:pointer; color:#4b5563; font-weight:600;">稍後再說</button>
          <button id="goToLoginBtn" style="flex:1; background:#10b981; border:none; padding:12px; border-radius:12px; cursor:pointer; color:white; font-weight:bold;">立即登入</button>
        </div>
      </div>
    </div>
  `;

  // --- 3. 注入 CSS (大幅修改 RWD 部分) ---
  const style = document.createElement('style');

  const indexOnlyBg = (path === 'index.html' || path === '') ? `
    body::before {
      content: "";
      position: absolute;
      top: -120px; 
      left: 0; 
      right: 0; 
      height: 550px; 
      background-image: url("${rootPath}image/upbackground.png") !important;
      background-repeat: no-repeat;
      background-position: right top; 
      background-size: auto 500px; 
      z-index: -1;
      pointer-events: none;
      opacity: 1;
    }
  ` : '';

  style.textContent = `
    ${indexOnlyBg}

    #site-nav { position: sticky; top: 0; z-index: 1000; width: 100%; }
    #site-nav-inner { 
      background: rgba(255, 255, 255, 0.95); 
      backdrop-filter: blur(10px); 
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 3px solid #10b981; 
      position: relative; /* 為了手機版選單定位 */
    }
    #site-nav-inner .nav-wrap { 
      max-width: 1200px; margin: 0 auto; padding: 12px 20px; 
      display: flex; align-items: center; justify-content: space-between; 
    }
    #site-nav-inner .logo { font-weight: 800; color: #064e3b; text-decoration: none; font-size: 1.5rem; }
    
    #site-nav-inner .links { display: flex; gap: 8px; }
    #site-nav-inner .links a { 
      color: #064e3b; text-decoration: none; padding: 8px 12px; 
      border-radius: 10px; font-weight: 600; font-size: 0.95rem; transition: 0.2s; 
    }
    #site-nav-inner .links a:hover { background: rgba(16, 185, 129, 0.1); }
    #site-nav-inner .links a.active { background: #10b981; color: #fff !important; }
    
    .nav-right { display: flex; align-items: center; gap: 15px; }
    .nav-user-icon { 
      width: 38px; height: 38px; background: #10b981; color: white; 
      border-radius: 50%; display: flex; align-items: center; justify-content: center; 
      text-decoration: none; transition: 0.3s;
    }

    /* 漢堡按鈕樣式 (預設隱藏) */
    #mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
    }

    /* RWD 手機版樣式 */
@media(max-width: 850px) { 
        /* 顯示漢堡按鈕 */
        #mobile-menu-btn { 
            display: block; 
            order: 3; /* 修改這裡：原本是 2，改成 3 (變成最後一個) */
            margin-left: 10px; /* 增加一點左邊距，跟頭像保持距離 */
        }
        
        .nav-right { 
            order: 2; /* 修改這裡：原本是 3，改成 2 (變成中間) */
        } 
        
        .logo { 
            order: 1; /* Logo 維持在最左邊 */
            margin-right: auto; /* 確保 Logo 把後面兩個元素推到最右邊 */
        }

        /* 隱藏桌機版連結，改為下拉選單樣式 */
        #site-nav-inner .links { 
            display: none; /* 預設隱藏 */
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: white;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            padding: 10px 0;
            gap: 0;
            border-bottom: 2px solid #10b981;
        }

        /* 當被加上 .open class 時顯示 */
        #site-nav-inner .links.open {
            display: flex;
        }

        #site-nav-inner .links a {
            border-radius: 0;
            padding: 15px 20px;
            border-bottom: 1px solid #f0f0f0;
        }
    }

    /* 跑馬燈樣式 */
    .marquee-container {
      background: #059669; 
      color: white;
      padding: 10px 0;
      font-size: 0.9rem;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    .marquee-text {
      display: inline-block;
      padding-left: 100%;
      animation: marquee-scroll 25s linear infinite;
      font-weight: 500;
    }
    @keyframes marquee-scroll {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
  `;
  document.head.appendChild(style);

  // --- 4. 邏輯處理 ---
  
  // 4-1. 漢堡按鈕開關邏輯 (新增)
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if(menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
          navLinks.classList.toggle('open');
      });
  }

  // 4-2. 既有的連結邏輯 (Active 判定 & 登入攔截)
  const modal = document.getElementById('login-modal');
  const allNavLinks = document.querySelectorAll('#site-nav-inner .links a');

  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    const linkFilename = linkHref.split('/').pop();
    
    if (path.includes(linkFilename) && linkFilename !== '') {
       link.classList.add('active');
    }
    if ((path === 'index.html' || path === '') && linkFilename === 'index.html') {
       link.classList.add('active');
    }

    link.addEventListener('click', function(e) {
      // 點擊連結後，如果是手機版，自動收合選單
      if(window.innerWidth <= 850 && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
      }

      if (!isLoggedIn) {
         if (link.innerText !== '首頁') {
            e.preventDefault();
            modal.style.display = 'flex';
         }
      }
    });
  });

  document.getElementById('closeModalBtn').onclick = () => {
    modal.style.display = 'none';
  };

  document.getElementById('goToLoginBtn').onclick = () => {
    window.location.href = `${rootPath}html/auth.html`;
  };
})();